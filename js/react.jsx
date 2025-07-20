import React, { createContext, useContext, useState, useEffect } from "react";
import { init as ffInit, fetchFlags, onFlagsUpdated } from "./index.js";

// Context to hold current flags map
const FeatureFuseContext = createContext({});

/**
 * Provider that initializes the SDK and keeps flags up to date.
 * @param {{ environmentID: string, url?: string, pollInterval?: number }} options
 */
export function FeatureFuseProvider({ children, options }) {
  const { environmentID, url, pollInterval = 30000 } = options;
  const [flags, setFlags] = useState({});

  useEffect(() => {
    if (!environmentID) {
      console.error("FeatureFuseProvider requires environmentID");
      return;
    }
    let mounted = true;

    // Initialize SDK and fetch flags once
    ffInit({ environmentID, url });

    async function loadFlags() {
      try {
        const fetched = await fetchFlags(environmentID, url);
        if (mounted) setFlags(fetched);
      } catch (err) {
        console.error("FeatureFuse fetch error:", err);
      }
    }
    loadFlags();

    // Subscribe to updates via emitter
    const unsubscribe = onFlagsUpdated((newFlags) => {
      if (mounted) setFlags(newFlags);
    });

    // Optional polling
    let timerId;
    if (pollInterval > 0) {
      timerId = setInterval(loadFlags, pollInterval);
    }

    return () => {
      mounted = false;
      unsubscribe();
      if (timerId) clearInterval(timerId);
    };
  }, [environmentID, url, pollInterval]);

  return (
    <FeatureFuseContext.Provider value={flags}>
      {children}
    </FeatureFuseContext.Provider>
  );
}

/**
 * Hook to select specific flags or get all.
 * @param {string[]} keys
 * @returns {{ [flag: string]: { enabled: boolean } }}
 */
export function useFlags(keys = []) {
  const flags = useContext(FeatureFuseContext);
  if (!Array.isArray(keys) || keys.length === 0) {
    // Return all flags
    return Object.fromEntries(
      Object.entries(flags).map(([k, v]) => [k, { enabled: Boolean(v) }])
    );
  }
  // Return only selected flags
  return Object.fromEntries(
    keys.map((key) => [key, { enabled: Boolean(flags[key]) }])
  );
}
