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
import { FeatureFuseProvider, useFlags } from "featurefuse-sdk/react";

function App() {
  return (
    <FeatureFuseProvider options={{ environmentID: "ENV_ID" }}>
      <HomePage />
    </FeatureFuseProvider>
  );
}

function HomePage() {
  const flags = useFlags(["chat_widget"]);
  return <>{flags.chat_widget.enabled && <ChatWidget />}</>;
}
```

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
