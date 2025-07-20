import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { fetchFlags, onFlagsUpdated } from "./index.js";

// Context to hold current flags map and version counter
const FeatureFuseContext = createContext({
  flags: {},
  version: 0,
  forceRefresh: () => {}
});

/**
 * Provider that initializes the SDK and keeps flags up to date.
 * @param {{ environmentID: string, url?: string, pollInterval?: number }} options
 */
export function FeatureFuseProvider({ children, options }) {
  const { environmentID, url, pollInterval = 30000 } = options;
  const [flags, setFlags] = useState({});
  const [version, setVersion] = useState(0);

  const forceRefresh = useCallback(async () => {
    if (!environmentID) return;
    try {
      const fetched = await fetchFlags(environmentID, url);
      setFlags(fetched);
      setVersion((prev) => prev + 1);
    } catch (err) {
      console.error("FeatureFuse force refresh error:", err);
    }
  }, [environmentID, url]);

  useEffect(() => {
    if (!environmentID) {
      console.error("FeatureFuseProvider requires environmentID");
      return;
    }
    let mounted = true;

    async function loadFlags() {
      try {
        const fetched = await fetchFlags(environmentID, url);
        if (mounted) {
          setFlags(fetched);
          setVersion((prev) => prev + 1); // Increment version to trigger re-renders
        }
      } catch (err) {
        console.error("FeatureFuse fetch error:", err);
      }
    }

    // Initial load
    loadFlags();

    // Subscribe to updates via emitter
    const unsubscribe = onFlagsUpdated((newFlags) => {
      if (mounted) {
        setFlags(newFlags);
        setVersion((prev) => prev + 1); // Increment version to trigger re-renders
      }
    });

    // Set up polling
    let timerId;
    if (pollInterval > 0) {
      timerId = setInterval(() => {
        loadFlags();
      }, pollInterval);
    }

    return () => {
      mounted = false;
      unsubscribe();
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [environmentID, url, pollInterval]);

  return (
    <FeatureFuseContext.Provider value={{ flags, version, forceRefresh }}>
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
  const { flags, version } = useContext(FeatureFuseContext);

  // Memoize the keys array to prevent unnecessary re-renders
  const memoizedKeys = useMemo(() => {
    return Array.isArray(keys) ? [...keys].sort() : [];
  }, [keys]);

  // Memoize the result to prevent unnecessary re-renders
  const result = useMemo(() => {
    if (!Array.isArray(memoizedKeys) || memoizedKeys.length === 0) {
      // Return all flags
      return Object.fromEntries(
        Object.entries(flags).map(([k, v]) => [k, { enabled: Boolean(v) }])
      );
    } else {
      // Return only selected flags
      return Object.fromEntries(
        memoizedKeys.map((key) => [key, { enabled: Boolean(flags[key]) }])
      );
    }
  }, [flags, memoizedKeys, version]);

  return result;
}

/**
 * Hook to get the forceRefresh function for manual flag updates.
 * @returns {function} forceRefresh function
 */
export function useForceRefresh() {
  const { forceRefresh } = useContext(FeatureFuseContext);
  return forceRefresh;
}
