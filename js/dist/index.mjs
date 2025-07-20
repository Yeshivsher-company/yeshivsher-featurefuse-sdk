var j = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function k(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var S = { exports: {} };
(function(m, g) {
  var d = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof j < "u" && j, A = function() {
    function B() {
      this.fetch = !1, this.DOMException = d.DOMException;
    }
    return B.prototype = d, new B();
  }();
  (function(B) {
    (function(b) {
      var a = typeof B < "u" && B || typeof self < "u" && self || // eslint-disable-next-line no-undef
      typeof j < "u" && j || {}, n = {
        searchParams: "URLSearchParams" in a,
        iterable: "Symbol" in a && "iterator" in Symbol,
        blob: "FileReader" in a && "Blob" in a && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in a,
        arrayBuffer: "ArrayBuffer" in a
      };
      function s(e) {
        return e && DataView.prototype.isPrototypeOf(e);
      }
      if (n.arrayBuffer)
        var i = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], f = ArrayBuffer.isView || function(e) {
          return e && i.indexOf(Object.prototype.toString.call(e)) > -1;
        };
      function v(e) {
        if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
          throw new TypeError('Invalid character in header field name: "' + e + '"');
        return e.toLowerCase();
      }
      function w(e) {
        return typeof e != "string" && (e = String(e)), e;
      }
      function h(e) {
        var t = {
          next: function() {
            var o = e.shift();
            return { done: o === void 0, value: o };
          }
        };
        return n.iterable && (t[Symbol.iterator] = function() {
          return t;
        }), t;
      }
      function c(e) {
        this.map = {}, e instanceof c ? e.forEach(function(t, o) {
          this.append(o, t);
        }, this) : Array.isArray(e) ? e.forEach(function(t) {
          if (t.length != 2)
            throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + t.length);
          this.append(t[0], t[1]);
        }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
          this.append(t, e[t]);
        }, this);
      }
      c.prototype.append = function(e, t) {
        e = v(e), t = w(t);
        var o = this.map[e];
        this.map[e] = o ? o + ", " + t : t;
      }, c.prototype.delete = function(e) {
        delete this.map[v(e)];
      }, c.prototype.get = function(e) {
        return e = v(e), this.has(e) ? this.map[e] : null;
      }, c.prototype.has = function(e) {
        return this.map.hasOwnProperty(v(e));
      }, c.prototype.set = function(e, t) {
        this.map[v(e)] = w(t);
      }, c.prototype.forEach = function(e, t) {
        for (var o in this.map)
          this.map.hasOwnProperty(o) && e.call(t, this.map[o], o, this);
      }, c.prototype.keys = function() {
        var e = [];
        return this.forEach(function(t, o) {
          e.push(o);
        }), h(e);
      }, c.prototype.values = function() {
        var e = [];
        return this.forEach(function(t) {
          e.push(t);
        }), h(e);
      }, c.prototype.entries = function() {
        var e = [];
        return this.forEach(function(t, o) {
          e.push([o, t]);
        }), h(e);
      }, n.iterable && (c.prototype[Symbol.iterator] = c.prototype.entries);
      function r(e) {
        if (!e._noBody) {
          if (e.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          e.bodyUsed = !0;
        }
      }
      function T(e) {
        return new Promise(function(t, o) {
          e.onload = function() {
            t(e.result);
          }, e.onerror = function() {
            o(e.error);
          };
        });
      }
      function O(e) {
        var t = new FileReader(), o = T(t);
        return t.readAsArrayBuffer(e), o;
      }
      function y(e) {
        var t = new FileReader(), o = T(t), l = /charset=([A-Za-z0-9_-]+)/.exec(e.type), p = l ? l[1] : "utf-8";
        return t.readAsText(e, p), o;
      }
      function C(e) {
        for (var t = new Uint8Array(e), o = new Array(t.length), l = 0; l < t.length; l++)
          o[l] = String.fromCharCode(t[l]);
        return o.join("");
      }
      function D(e) {
        if (e.slice)
          return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer;
      }
      function M() {
        return this.bodyUsed = !1, this._initBody = function(e) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : n.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : n.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : n.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : n.arrayBuffer && n.blob && s(e) ? (this._bodyArrayBuffer = D(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : n.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || f(e)) ? this._bodyArrayBuffer = D(e) : this._bodyText = e = Object.prototype.toString.call(e) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, n.blob && (this.blob = function() {
          var e = r(this);
          if (e)
            return e;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }), this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var e = r(this);
            return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else {
            if (n.blob)
              return this.blob().then(O);
            throw new Error("could not read as ArrayBuffer");
          }
        }, this.text = function() {
          var e = r(this);
          if (e)
            return e;
          if (this._bodyBlob)
            return y(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(C(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, n.formData && (this.formData = function() {
          return this.text().then(Q);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var Z = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
      function K(e) {
        var t = e.toUpperCase();
        return Z.indexOf(t) > -1 ? t : e;
      }
      function P(e, t) {
        if (!(this instanceof P))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        t = t || {};
        var o = t.body;
        if (e instanceof P) {
          if (e.bodyUsed)
            throw new TypeError("Already read");
          this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new c(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !o && e._bodyInit != null && (o = e._bodyInit, e.bodyUsed = !0);
        } else
          this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new c(t.headers)), this.method = K(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal || function() {
          if ("AbortController" in a) {
            var u = new AbortController();
            return u.signal;
          }
        }(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && o)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(o), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
          var l = /([?&])_=[^&]*/;
          if (l.test(this.url))
            this.url = this.url.replace(l, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var p = /\?/;
            this.url += (p.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      P.prototype.clone = function() {
        return new P(this, { body: this._bodyInit });
      };
      function Q(e) {
        var t = new FormData();
        return e.trim().split("&").forEach(function(o) {
          if (o) {
            var l = o.split("="), p = l.shift().replace(/\+/g, " "), u = l.join("=").replace(/\+/g, " ");
            t.append(decodeURIComponent(p), decodeURIComponent(u));
          }
        }), t;
      }
      function W(e) {
        var t = new c(), o = e.replace(/\r?\n[\t ]+/g, " ");
        return o.split("\r").map(function(l) {
          return l.indexOf(`
`) === 0 ? l.substr(1, l.length) : l;
        }).forEach(function(l) {
          var p = l.split(":"), u = p.shift().trim();
          if (u) {
            var F = p.join(":").trim();
            try {
              t.append(u, F);
            } catch (H) {
              console.warn("Response " + H.message);
            }
          }
        }), t;
      }
      M.call(P.prototype);
      function x(e, t) {
        if (!(this instanceof x))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        if (t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.status < 200 || this.status > 599)
          throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
        this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new c(t.headers), this.url = t.url || "", this._initBody(e);
      }
      M.call(x.prototype), x.prototype.clone = function() {
        return new x(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new c(this.headers),
          url: this.url
        });
      }, x.error = function() {
        var e = new x(null, { status: 200, statusText: "" });
        return e.ok = !1, e.status = 0, e.type = "error", e;
      };
      var Y = [301, 302, 303, 307, 308];
      x.redirect = function(e, t) {
        if (Y.indexOf(t) === -1)
          throw new RangeError("Invalid status code");
        return new x(null, { status: t, headers: { location: e } });
      }, b.DOMException = a.DOMException;
      try {
        new b.DOMException();
      } catch {
        b.DOMException = function(t, o) {
          this.message = t, this.name = o;
          var l = Error(t);
          this.stack = l.stack;
        }, b.DOMException.prototype = Object.create(Error.prototype), b.DOMException.prototype.constructor = b.DOMException;
      }
      function L(e, t) {
        return new Promise(function(o, l) {
          var p = new P(e, t);
          if (p.signal && p.signal.aborted)
            return l(new b.DOMException("Aborted", "AbortError"));
          var u = new XMLHttpRequest();
          function F() {
            u.abort();
          }
          u.onload = function() {
            var _ = {
              statusText: u.statusText,
              headers: W(u.getAllResponseHeaders() || "")
            };
            p.url.indexOf("file://") === 0 && (u.status < 200 || u.status > 599) ? _.status = 200 : _.status = u.status, _.url = "responseURL" in u ? u.responseURL : _.headers.get("X-Request-URL");
            var R = "response" in u ? u.response : u.responseText;
            setTimeout(function() {
              o(new x(R, _));
            }, 0);
          }, u.onerror = function() {
            setTimeout(function() {
              l(new TypeError("Network request failed"));
            }, 0);
          }, u.ontimeout = function() {
            setTimeout(function() {
              l(new TypeError("Network request timed out"));
            }, 0);
          }, u.onabort = function() {
            setTimeout(function() {
              l(new b.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function H(_) {
            try {
              return _ === "" && a.location.href ? a.location.href : _;
            } catch {
              return _;
            }
          }
          if (u.open(p.method, H(p.url), !0), p.credentials === "include" ? u.withCredentials = !0 : p.credentials === "omit" && (u.withCredentials = !1), "responseType" in u && (n.blob ? u.responseType = "blob" : n.arrayBuffer && (u.responseType = "arraybuffer")), t && typeof t.headers == "object" && !(t.headers instanceof c || a.Headers && t.headers instanceof a.Headers)) {
            var q = [];
            Object.getOwnPropertyNames(t.headers).forEach(function(_) {
              q.push(v(_)), u.setRequestHeader(_, w(t.headers[_]));
            }), p.headers.forEach(function(_, R) {
              q.indexOf(R) === -1 && u.setRequestHeader(R, _);
            });
          } else
            p.headers.forEach(function(_, R) {
              u.setRequestHeader(R, _);
            });
          p.signal && (p.signal.addEventListener("abort", F), u.onreadystatechange = function() {
            u.readyState === 4 && p.signal.removeEventListener("abort", F);
          }), u.send(typeof p._bodyInit > "u" ? null : p._bodyInit);
        });
      }
      return L.polyfill = !0, a.fetch || (a.fetch = L, a.Headers = c, a.Request = P, a.Response = x), b.Headers = c, b.Request = P, b.Response = x, b.fetch = L, b;
    })({});
  })(A), A.fetch.ponyfill = !0, delete A.fetch.polyfill;
  var E = d.fetch ? d : A;
  g = E.fetch, g.default = E.fetch, g.fetch = E.fetch, g.Headers = E.Headers, g.Request = E.Request, g.Response = E.Response, m.exports = g;
})(S, S.exports);
var ee = S.exports;
const te = /* @__PURE__ */ k(ee);
var N = { exports: {} };
(function(m) {
  var g = Object.prototype.hasOwnProperty, d = "~";
  function A() {
  }
  Object.create && (A.prototype = /* @__PURE__ */ Object.create(null), new A().__proto__ || (d = !1));
  function E(n, s, i) {
    this.fn = n, this.context = s, this.once = i || !1;
  }
  function B(n, s, i, f, v) {
    if (typeof i != "function")
      throw new TypeError("The listener must be a function");
    var w = new E(i, f || n, v), h = d ? d + s : s;
    return n._events[h] ? n._events[h].fn ? n._events[h] = [n._events[h], w] : n._events[h].push(w) : (n._events[h] = w, n._eventsCount++), n;
  }
  function b(n, s) {
    --n._eventsCount === 0 ? n._events = new A() : delete n._events[s];
  }
  function a() {
    this._events = new A(), this._eventsCount = 0;
  }
  a.prototype.eventNames = function() {
    var s = [], i, f;
    if (this._eventsCount === 0)
      return s;
    for (f in i = this._events)
      g.call(i, f) && s.push(d ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(i)) : s;
  }, a.prototype.listeners = function(s) {
    var i = d ? d + s : s, f = this._events[i];
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var v = 0, w = f.length, h = new Array(w); v < w; v++)
      h[v] = f[v].fn;
    return h;
  }, a.prototype.listenerCount = function(s) {
    var i = d ? d + s : s, f = this._events[i];
    return f ? f.fn ? 1 : f.length : 0;
  }, a.prototype.emit = function(s, i, f, v, w, h) {
    var c = d ? d + s : s;
    if (!this._events[c])
      return !1;
    var r = this._events[c], T = arguments.length, O, y;
    if (r.fn) {
      switch (r.once && this.removeListener(s, r.fn, void 0, !0), T) {
        case 1:
          return r.fn.call(r.context), !0;
        case 2:
          return r.fn.call(r.context, i), !0;
        case 3:
          return r.fn.call(r.context, i, f), !0;
        case 4:
          return r.fn.call(r.context, i, f, v), !0;
        case 5:
          return r.fn.call(r.context, i, f, v, w), !0;
        case 6:
          return r.fn.call(r.context, i, f, v, w, h), !0;
      }
      for (y = 1, O = new Array(T - 1); y < T; y++)
        O[y - 1] = arguments[y];
      r.fn.apply(r.context, O);
    } else {
      var C = r.length, D;
      for (y = 0; y < C; y++)
        switch (r[y].once && this.removeListener(s, r[y].fn, void 0, !0), T) {
          case 1:
            r[y].fn.call(r[y].context);
            break;
          case 2:
            r[y].fn.call(r[y].context, i);
            break;
          case 3:
            r[y].fn.call(r[y].context, i, f);
            break;
          case 4:
            r[y].fn.call(r[y].context, i, f, v);
            break;
          default:
            if (!O)
              for (D = 1, O = new Array(T - 1); D < T; D++)
                O[D - 1] = arguments[D];
            r[y].fn.apply(r[y].context, O);
        }
    }
    return !0;
  }, a.prototype.on = function(s, i, f) {
    return B(this, s, i, f, !1);
  }, a.prototype.once = function(s, i, f) {
    return B(this, s, i, f, !0);
  }, a.prototype.removeListener = function(s, i, f, v) {
    var w = d ? d + s : s;
    if (!this._events[w])
      return this;
    if (!i)
      return b(this, w), this;
    var h = this._events[w];
    if (h.fn)
      h.fn === i && (!v || h.once) && (!f || h.context === f) && b(this, w);
    else {
      for (var c = 0, r = [], T = h.length; c < T; c++)
        (h[c].fn !== i || v && !h[c].once || f && h[c].context !== f) && r.push(h[c]);
      r.length ? this._events[w] = r.length === 1 ? r[0] : r : b(this, w);
    }
    return this;
  }, a.prototype.removeAllListeners = function(s) {
    var i;
    return s ? (i = d ? d + s : s, this._events[i] && b(this, i)) : (this._events = new A(), this._eventsCount = 0), this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = d, a.EventEmitter = a, m.exports = a;
})(N);
var re = N.exports;
const ne = /* @__PURE__ */ k(re), I = new ne();
function G(m) {
  return I.on("update", m), () => I.off("update", m);
}
const V = "https://api.featurefuse.yeshivsher.com/api/flags";
let U = {};
async function $({ environmentID: m, url: g = V } = {}) {
  try {
    return await z(m, g);
  } catch (d) {
    return console.error("FeatureFuse init error:", d), {};
  }
}
async function z(m, g = V) {
  if (!m)
    throw new Error("environmentID is required");
  const d = g.includes("?") ? "&" : "?", A = `${g}${d}envID=${encodeURIComponent(
    m
  )}&_=${Date.now()}`;
  try {
    const E = await te(A, { cache: "no-store", mode: "cors" });
    if (!E.ok)
      return console.error("FeatureFuse fetch failed:", E.statusText), {};
    const B = await E.json();
    return U = Object.fromEntries(B.map((b) => [b.name, b.enabled])), I.emit("update", { ...U }), { ...U };
  } catch (E) {
    return console.error("FeatureFuse fetch error:", E), {};
  }
}
function X(m) {
  return !!U[m];
}
function J() {
  return { ...U };
}
typeof module < "u" && (module.exports = { init: $, fetchFlags: z, hasFeature: X, getFlags: J, onFlagsUpdated: G });
typeof module < "u" && (module.exports = { init: $, hasFeature: X, getFlags: J, onFlagsUpdated: G });
export {
  z as fetchFlags,
  J as getFlags,
  X as hasFeature,
  $ as init,
  G as onFlagsUpdated
};
