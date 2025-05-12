import fetch from "cross-fetch";

const DEFAULT_URL =
  "https://yeshivsher-featurefuse-backend-681868222932.europe-west3.run.app";
let _flags = {};

/**
 * Initialize SDK by fetching flags once.
 * @param {{ environmentID: string, url?: string }} options
 * @returns {Promise<object>} Resolves with fetched flags object.
 */
export async function init({ environmentID, url = DEFAULT_URL } = {}) {
  if (!environmentID) {
    throw new Error("environmentID is required");
  }
  try {
    const res = await fetch(url, { headers: { "X-Env-ID": environmentID } });
    if (!res.ok) {
      console.error("FeatureFuse fetch failed:", res.statusText);
      return {};
    }
    const data = await res.json();
    _flags = {};
    data.forEach((f) => {
      _flags[f.name] = f.enabled;
    });
    return { ..._flags };
  } catch (err) {
    console.error("FeatureFuse fetch error:", err);
    return {};
  }
}

/**
 * Check if a feature is enabled.
 * @param {string} name
 * @returns {boolean}
 */
export function hasFeature(name) {
  return Boolean(_flags[name]);
}

/**
 * Get all fetched flags.
 * @returns {object}
 */
export function getFlags() {
  return { ..._flags };
}

// Support CommonJS
if (typeof module !== "undefined") {
  module.exports = { init, hasFeature, getFlags };
}
