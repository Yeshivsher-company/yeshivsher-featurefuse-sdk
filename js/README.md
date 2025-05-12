# featurefuse-sdk

A minimal JavaScript SDK for FeatureFuse feature flags. Fetches flags once on initialization—no polling or subscriptions.

## Installation

```bash
npm install featurefuse-sdk
```

## API Usage

### Vanilla JavaScript (ESM or CommonJS)

```js
// ESM
import { init, hasFeature, getFlags } from "featurefuse-sdk";

// CommonJS
// const { init, hasFeature, getFlags } = require('featurefuse-sdk');

// Initialize and fetch flags
const flags = await init({ environmentID: "YOUR_ENV_ID" });

// Check a feature
if (hasFeature("dark_mode")) {
  enableDarkMode();
}

// Or inspect all flags
console.log(getFlags());
```

### React Integration

```jsx
import React from "react";
import { FlagsmithProvider, useFlags } from "featurefuse-sdk/react";

function HomePage() {
  const flags = useFlags(["chat_widget", "design_v2"]);
  return (
    <>
      {flags.chat_widget.enabled && <ChatWidget />}
      {flags.design_v2.enabled ? <NewDesign /> : <OldDesign />}
    </>
  );
}

export default function App() {
  return (
    <FlagsmithProvider options={{ environmentID: "YOUR_ENV_ID" }}>
      <HomePage />
    </FlagsmithProvider>
  );
}
```

## Module Formats

- **ESM**: `import { init } from 'featurefuse-sdk';`
- **CommonJS**: `const { init } = require('featurefuse-sdk');`

## License

MIT
