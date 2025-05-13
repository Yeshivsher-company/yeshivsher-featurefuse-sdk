# FeatureFuse SDK

A multi-language SDK for FeatureFuse feature flags. Fetch flags using your environment ID in JavaScript, React, Python, and C#.

Please first sign up for an account to access the SDK at [FeatureFuse](https://featurefuse.yeshivsher.com).

## Directory Structure

```
featurefuse-sdk/
├── js/
│   ├── package.json
│   ├── index.js
│   └── react.js
├── python/
│   ├── setup.py
│   └── featurefuse/
│       └── client.py
└── csharp/
    ├── FeatureFuse.SDK.csproj
    └── src/
        └── FeatureFuseClient.cs
```

## Supported SDKs

- **JavaScript** (`@featurefuse/sdk`)
- **React** (`@featurefuse/sdk/react`)
- **Python** (`featurefuse-sdk` on PyPI)
- **C#** (`FeatureFuse.SDK` on NuGet)

---

### JavaScript SDK

**Install:**

```bash
npm install @featurefuse/sdk
```

**Usage (ESM):**

```js
import { init, hasFeature, getFlags } from "@featurefuse/sdk";

// Fetch flags once
await init({ environmentID: "YOUR_ENV_ID" });

// Check a feature
if (hasFeature("dark_mode")) {
  enableDarkMode();
}

// Inspect all flags
console.log(getFlags());
```

**Usage (CommonJS):**

```js
const { init, hasFeature, getFlags } = require("@featurefuse/sdk");
```

### React Integration

```jsx
import React from "react";
import { FeatureFuseProvider, useFlags } from "@featurefuse/sdk/react";

function HomePage() {
  const flags = useFlags(["chat_widget"]);
  return <>{flags.chat_widget.enabled && <ChatWidget />}</>;
}

export default function App() {
  return (
    <FeatureFuseProvider options={{ environmentID: "YOUR_ENV_ID" }}>
      <HomePage />
    </FeatureFuseProvider>
  );
}
```

### Python SDK

**Install:**

```bash
pip install featurefuse-sdk
```

**Usage:**

```python
from featurefuse.client import FeatureFuseClient

client = FeatureFuseClient('YOUR_ENV_ID')
flags = client.fetch()
if client.has_feature('chat'):
    show_chat()
```

### C# SDK

**Install:**

```powershell
Install-Package FeatureFuse.SDK
```

**Usage:**

```csharp
using FeatureFuse.SDK;

var client = new FeatureFuseClient("YOUR_ENV_ID");
if (client.HasFeature("design_v2")) {
    EnableNewDesign();
}
```

## Module Formats (JS)

- **ESM**: `import { init } from '@featurefuse/sdk';`
- **CommonJS**: `const { init } = require('@featurefuse/sdk');`

## License

MIT
