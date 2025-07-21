import fetch from "cross-fetch";
import EventEmitter from "eventemitter3";

// Internal emitter to broadcast flag updates
const emitter = new EventEmitter();

/**
 * Subscribe to flag updates.
 * @param {function(object)} cb
 * @returns {function()} unsubscribe
 */
export function onFlagsUpdated(cb) {
  emitter.on("update", cb);
  return () => emitter.off("update", cb);
}

const DEFAULT_URL = "https://api.featurefuse.yeshivsher.com/api/flags";
let _flags = {};

/**
 * Fetch flags once via query param (no custom headers), with cache-busting.
 * @param {{ environmentID: string, url?: string, flagNames?: string[]|string }} options
 * @returns {Promise<object>} Resolves with fetched flags object.
 */
export async function init({
  environmentID,
  url = DEFAULT_URL,
  flagNames
} = {}) {
  try {
    return await fetchFlags(environmentID, url, flagNames);
  } catch (error) {
    console.error("FeatureFuse init error:", error);
    // Return empty flags object on any errors to prevent app crashes
    return {};
  }
}

/**
 * Low-level fetch to retrieve and store flags.
 * @param {string} environmentID
 * @param {string} url
 * @param {string[]|string} [flagNames] - Optional flag name(s) to fetch
 */
export async function fetchFlags(environmentID, url = DEFAULT_URL, flagNames) {
  if (!environmentID) throw new Error("environmentID is required");
  const sep = url.includes("?") ? "&" : "?";
  let fetchUrl = `${url}${sep}envID=${encodeURIComponent(
    environmentID
  )}&_=${Date.now()}`;

  // Add flag query parameter if flagNames provided
  if (
    flagNames &&
    (Array.isArray(flagNames) ? flagNames.length > 0 : !!flagNames)
  ) {
    const flagParam = Array.isArray(flagNames)
      ? flagNames.join(",")
      : flagNames;
    fetchUrl += `&flag=${encodeURIComponent(flagParam)}`;
  }

  try {
    const res = await fetch(fetchUrl, {
      cache: "no-store",
      mode: "cors"
    });
    if (!res.ok) {
      console.error("FeatureFuse fetch failed:", res.statusText);
      return {};
    }
    const data = await res.json();
    _flags = Object.fromEntries(data.map((f) => [f.name, f.enabled]));
    // notify subscribers of updated flags
    emitter.emit("update", { ..._flags });
    return { ..._flags };
  } catch (error) {
    console.error("FeatureFuse fetch error:", error);
    // Return empty flags object on network errors to prevent app crashes
    return {};
  }
}

/**
 * Check if a feature is enabled (from last fetch).
 */
export function hasFeature(name) {
  return Boolean(_flags[name]);
}

/**
 * Get the last-fetched flags map.
 */
export function getFlags() {
  return { ..._flags };
}

/**
 * Fetch only specific flags by name using the flag query parameter.
 * @param {string} environmentID
 * @param {string[]|string} flagNames - Flag name(s) to fetch
 * @param {string} [url] - Optional override for the API endpoint
 * @returns {Promise<object>} Resolves with fetched flags object.
 */
export async function fetchSpecificFlags(
  environmentID,
  flagNames,
  url = DEFAULT_URL
) {
  return fetchFlags(environmentID, url, flagNames);
}

// Import React components
import { FeatureFuseProvider, useFlags, useForceRefresh } from "./react.jsx";

// Export React components
export { FeatureFuseProvider, useFlags, useForceRefresh };

// CommonJS fallback
if (typeof module !== "undefined") {
  module.exports = {
    init,
    fetchFlags,
    fetchSpecificFlags,
    hasFeature,
    getFlags,
    onFlagsUpdated,
    FeatureFuseProvider,
    useFlags,
    useForceRefresh
  };
}
