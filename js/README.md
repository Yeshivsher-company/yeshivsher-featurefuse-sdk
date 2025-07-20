## JavaScript SDK

### Install

```bash
npm install featurefuse-sdk
# or yarn add featurefuse-sdk
```

### API

#### `init(options)`

Fetches flags once by appending `?envID=...` to the URL, so no custom headers are sent.

- `options.environmentID` (string) **required**
- `options.url` (string) override default endpoint

```js
import { init, hasFeature, getFlags } from "featurefuse-sdk";

// Default SaaS endpoint:
const flags = await init({ environmentID: "ENV_ID" });
```

#### `hasFeature(name)`

Check if a specific feature is enabled.

#### `getFlags()`

Retrieve last-fetched flags object.

#### `fetchFlagsPost(environmentID, url?)`

Fetch flags using POST method to completely bypass browser cache. This is useful when GET requests are being cached aggressively.

```js
import { fetchFlagsPost } from "featurefuse-sdk";

// Fetch using POST to bypass cache
const flags = await fetchFlagsPost("ENV_ID");
```

### React Integration

```jsx
import {
  FeatureFuseProvider,
  useFlags,
  useForceRefresh
} from "featurefuse-sdk/react";

function App() {
  return (
    <FeatureFuseProvider
      options={{
        environmentID: "ENV_ID",
        pollInterval: 10000 // Optional: poll every 10 seconds
      }}
    >
      <HomePage />
    </FeatureFuseProvider>
  );
}

function HomePage() {
  const flags = useFlags(["chat_widget"]);
  const forceRefresh = useForceRefresh();

  return (
    <>
      {flags.chat_widget.enabled && <ChatWidget />}
      <button onClick={forceRefresh}>Refresh Flags</button>
    </>
  );
}
```

#### Provider Options

- `environmentID` (string) **required** - Your FeatureFuse environment ID
- `url` (string) - Override the default API endpoint
- `pollInterval` (number) - How often to poll for flag updates (default: 30000ms)

#### Hooks

- `useFlags(keys?)` - Get feature flags. Pass an array of flag names or leave empty for all flags
- `useForceRefresh()` - Get a function to manually refresh flags and trigger re-renders

**Note**: The SDK now automatically triggers component re-renders when feature flags change, ensuring your UI stays in sync with flag updates.

### Caching Behavior

The SDK implements multiple cache-busting strategies to ensure you always get the latest feature flag values:

- **URL Cache Busting**: Adds timestamp and last fetch time parameters to prevent URL-based caching
- **HTTP Headers**: Sends aggressive cache-busting headers including `Cache-Control`, `Pragma`, `Expires`, `If-None-Match`, and `If-Modified-Since`
- **Request Object**: Uses `Request` constructor with `cache: "no-cache"` to bypass browser cache
- **POST Method**: Provides `fetchFlagsPost()` function that uses POST requests to completely bypass GET caching
- **Internal Cache**: Maintains an in-memory cache

If you're still experiencing caching issues, you can:

1. Use the `fetchFlagsPost()` function to bypass GET caching completely
2. Use the `useForceRefresh()` hook in React components (automatically tries POST first)
3. Reduce the `pollInterval` in the React provider for more frequent updates

## Other SDKs

- **Python**: `pip install featurefuse-sdk`
- **C#**: `Install-Package FeatureFuse.SDK`

## Publishing

```bash
npm publish --access public
# or
yarn publish --access public
```

## License

MIT
