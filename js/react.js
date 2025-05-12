import React, { createContext, useContext, useState, useEffect } from "react";
import { init as ffInit, getFlags } from "./index.js";

const FeatureFuseContext = createContext({ flags: {} });

/**
 * React provider that fetches flags once on mount.
 */
export function FlagsmithProvider({ children, options }) {
  const [flags, setFlags] = useState({});

  useEffect(() => {
    let mounted = true;
    ffInit(options).then((fetched) => {
      if (mounted) setFlags(fetched);
    });
    return () => {
      mounted = false;
    };
  }, [JSON.stringify(options)]);

  return (
    <FeatureFuseContext.Provider value={{ flags }}>
      {children}
    </FeatureFuseContext.Provider>
  );
}

/**
 * Hook to select specific flags or all.
 * @param {string[]} keys
 * @returns {{ [key: string]: { enabled: boolean } }}
 */
export function useFlags(keys = []) {
  const { flags } = useContext(FeatureFuseContext);
  if (!Array.isArray(keys)) {
    return { ...flags };
  }
  const selected = {};
  keys.forEach((key) => {
    selected[key] = { enabled: Boolean(flags[key]) };
  });
  return selected;
}
