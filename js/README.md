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
