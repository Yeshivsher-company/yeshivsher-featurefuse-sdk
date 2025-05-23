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

const DEFAULT_URL =
  "https://yeshivsher-featurefuse-backend-681868222932.europe-west3.run.app/api/flags";
let _flags = {};

/**
 * Fetch flags once via query param (no custom headers), with cache-busting.
 * @param {{ environmentID: string, url?: string }} options
 * @returns {Promise<object>} Resolves with fetched flags object.
 */
export async function init({ environmentID, url = DEFAULT_URL } = {}) {
  return fetchFlags(environmentID, url);
}

/**
 * Low-level fetch to retrieve and store flags.
 * @param {string} environmentID
 * @param {string} url
 */
export async function fetchFlags(environmentID, url = DEFAULT_URL) {
  if (!environmentID) throw new Error("environmentID is required");
  const sep = url.includes("?") ? "&" : "?";
  const fetchUrl = `${url}${sep}envID=${encodeURIComponent(
    environmentID
  )}&_=${Date.now()}`;
  const res = await fetch(fetchUrl, { cache: "no-store", mode: "cors" });
  if (!res.ok) {
    console.error("FeatureFuse fetch failed:", res.statusText);
    return {};
  }
  const data = await res.json();
  _flags = Object.fromEntries(data.map((f) => [f.name, f.enabled]));
  // notify subscribers of updated flags
  emitter.emit("update", { ..._flags });
  return { ..._flags };
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

// CommonJS fallback
if (typeof module !== "undefined") {
  module.exports = { init, fetchFlags, hasFeature, getFlags };
}
if (typeof module !== "undefined") {
  module.exports = { init, hasFeature, getFlags, stopPolling };
}
