/* v1.2.26,1.2.29,1 2018-10-25 10:14:18 */
!(function() {
  function cond() {
    return Math.random();
  }
  function chkQuerySet() {
    var n,
      e = window[QUERY_KEY];
    return isNaN(e)
      ? ((n = location.href.split(QUERY_KEY + '=')[1]),
        (e = parseFloat(n)),
        void (isNaN(e) || (GREY_RATIO = e)))
      : void (GREY_RATIO = e);
  }
  var GREY_RATIO = 1,
    QUERY_KEY = 'aq-nc-grey-ratio',
    STABLE_ACTION = function() {},
    NEW_ACTION = function() {
      !(function(n) {
        function e(i) {
          if (t[i]) return t[i].exports;
          var o = (t[i] = { i: i, l: !1, exports: {} });
          return n[i].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
        }
        var t = {};
        return (
          (e.m = n),
          (e.c = t),
          (e.i = function(n) {
            return n;
          }),
          (e.d = function(n, t, i) {
            e.o(n, t) || Object.defineProperty(n, t, { configurable: !1, enumerable: !0, get: i });
          }),
          (e.n = function(n) {
            var t =
              n && n.__esModule
                ? function() {
                    return n['default'];
                  }
                : function() {
                    return n;
                  };
            return e.d(t, 'a', t), t;
          }),
          (e.o = function(n, e) {
            return Object.prototype.hasOwnProperty.call(n, e);
          }),
          (e.p = ''),
          e((e.s = 107))
        );
      })([
        function(n, e, t) {
          'use strict';
          function i(n, e) {
            if (y) return void n.classList.add(e);
            var t = n.className || '';
            t.match(new RegExp('(^|\\s)' + e + '(\\s|$)')) || (n.className = t + ' ' + e);
          }
          function o(n, e) {
            if (y) return void n.classList.remove(e);
            var t = n.className || '',
              i = t.replace(new RegExp('(^|\\s)' + e + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
            i != t && (n.className = i);
          }
          function r(n) {
            var e = [];
            for (var t in n)
              n.hasOwnProperty(t) && e.push(encodeURIComponent(t) + '=' + encodeURIComponent(n[t]));
            return e.join('&');
          }
          function a(n, e, t) {
            var i = v.createElement('script');
            i.src = n;
            var o;
            (i.onload = function() {
              (i.onload = null), i.parentNode.removeChild(i), -1 != o && (clearTimeout(o), e('ok'));
            }),
              (i.onerror = function() {
                (i.onerror = null),
                  i.parentNode.removeChild(i),
                  -1 != o && (clearTimeout(o), e('err'));
              }),
              (o = setTimeout(function() {
                (o = -1), e(m);
              }, t || 5e3));
            var r = v.getElementsByTagName('script')[0];
            r.parentNode.insertBefore(i, r);
          }
          function c(n, e, t, i) {
            function o() {
              l++;
              var s = n.indexOf('?') > -1 ? '&' : '?',
                u = n;
              l > 1 && (u = n + s + '__retry=' + l),
                a(
                  u,
                  function(n) {
                    if (r) return void e(m);
                    if ('ok' === n) e(n);
                    else {
                      if (n === m || l >= i) return void e(m);
                      c = setTimeout(function() {
                        o();
                      }, 3e3);
                    }
                  },
                  t
                );
            }
            i = i || 3;
            var r,
              c,
              s,
              l = 0;
            (e = (function(n) {
              return function() {
                s || ((s = !0), clearTimeout(c), n.apply(null, arguments));
              };
            })(e)),
              o(),
              setTimeout(function() {
                (r = !0), e(m);
              }, t);
          }
          function s(n, e, t, i) {
            i = i || 1e4;
            var o,
              c = '__jsonp_' + b++;
            (e = e || {}), (e.callback = c);
            var s = n.indexOf('?') > -1 ? '&' : '?';
            (n = n + s + r(e)),
              a(
                n,
                function(n) {
                  -1 !== o && 'ok' != n && (clearTimeout(o), t(n));
                },
                i
              ),
              (h[c] = function(n) {
                delete h[c], clearTimeout(o), t('ok', n);
              }),
              (o = setTimeout(function() {
                (o = -1), t(m);
              }, i));
          }
          function l(n, e, t, i, o) {
            function r() {
              u++;
              var l = n.indexOf('?') > -1 ? '&' : '?',
                f = n;
              u > 1 && (f = n + l + '__retry=' + u),
                s(
                  f,
                  e,
                  function(n, e) {
                    if (a) return void t(m);
                    if ('ok' === n) t(n, e);
                    else {
                      if (n === m || u >= o) return void t(m);
                      c = setTimeout(function() {
                        r();
                      }, 3e3);
                    }
                  },
                  i
                );
            }
            o = o || 3;
            var a,
              c,
              l,
              u = 0;
            (t = (function(n) {
              return function() {
                l || ((l = !0), clearTimeout(c), n.apply(null, arguments));
              };
            })(t)),
              r(),
              setTimeout(function() {
                (a = !0), t(m);
              }, i);
          }
          function u(n) {
            for (var e, t, i = [].slice.call(arguments), o = i.length, r = 1; o > r; r++) {
              e = i[r];
              for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
            }
            return n;
          }
          function f(n) {
            var e,
              t = [],
              i = f;
            if ('string' == typeof n)
              return (
                '"' +
                n
                  .replace(/(['"\\])/g, '\\$1')
                  .replace(/(\n)/g, '\\n')
                  .replace(/(\r)/g, '\\r')
                  .replace(/(\t)/g, '\\t') +
                '"'
              );
            if ('undefined' == typeof n) return 'undefined';
            if ('object' === ('undefined' == typeof n ? 'undefined' : g(n))) {
              if (null === n) return 'null';
              if (n.sort) {
                for (e = 0; e < n.length; e++) t.push(i(n[e]));
                t = '[' + t.join() + ']';
              } else {
                for (e in n) n.hasOwnProperty(e) && t.push('"' + e + '":' + i(n[e]));
                t = '{' + t.join() + '}';
              }
              return t;
            }
            return n.toString();
          }
          function d(n, e) {
            e &&
              p(n, e) &&
              (n.classList
                ? n.classList.remove.apply(n.classList, e.split(/\s+/))
                : (n.className = n.className
                    .replace(new RegExp('(\\s|^)' + e + '(\\s|$)'), ' ')
                    .replace(/^\s+|\s+$/g, '')));
          }
          function p(n, e) {
            if (!e) return !1;
            if (n.classList) {
              for (var t = e.split(/\s+/), i = 0; i < t.length; i++)
                if (!n.classList.contains(t[i])) return !1;
              return !0;
            }
            return new RegExp('(\\s|^)' + e + '(\\s|$)').test(n.className);
          }
          function _(n, e, t) {
            if (((e = e || v), (t = t || '*'), v.getElementsByClassName))
              return e.getElementsByClassName(n);
            for (
              var i = [], o = '*' === t && e.all ? e.all : e.getElementsByTagName(t), r = o.length;
              --r >= 0;

            )
              p(o[r], n) && i.push(o[r]);
            return i;
          }
          var g =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function(n) {
                    return typeof n;
                  }
                : function(n) {
                    return n &&
                      'function' == typeof Symbol &&
                      n.constructor === Symbol &&
                      n !== Symbol.prototype
                      ? 'symbol'
                      : typeof n;
                  },
            h = window,
            v = document,
            m = 'timeout',
            y = !!v.documentElement.classList,
            b = (1e10 * Math.random()) >>> 0,
            k = function(n, e) {
              for (var t = [], i = 0, o = n.length; o > i; i++) t.push(e(n[i], i));
              return t;
            },
            w = function(n, e, t) {
              n.addEventListener
                ? n.addEventListener(e, t, !1)
                : n.attachEvent
                  ? n.attachEvent('on' + e, function(n) {
                      return t(n || h.event);
                    })
                  : (n['on' + e] = function(n) {
                      return t(n || h.event);
                    });
            },
            x = {},
            X = function(n, e) {
              x[n] && e(null, x[n]);
              var t = new Image();
              (t.onreadystatechange = function() {
                t.readyState;
              }),
                (t.onload = function() {
                  var i = t.naturalWidth ? [t.naturalWidth, t.naturalHeight] : [t.width, t.height];
                  (x[n] = i), e(null, i);
                }),
                (t.onerror = function(n) {
                  e(n);
                }),
                (t.src = n);
            },
            A = function(n) {
              for (var e = n.offsetLeft, t = n.offsetParent; null !== t; )
                (e += t.offsetLeft), (t = t.offsetParent);
              return e;
            },
            T = function(n) {
              for (var e = n.offsetTop, t = n.offsetParent; null !== t; )
                (e += t.offsetTop), (t = t.offsetParent);
              return e;
            };
          n.exports = {
            addClass: i,
            delClass: o,
            formatParams: r,
            getElementLeft: A,
            getElementTop: T,
            getElementsByClassName: _,
            getImgSize: X,
            getOS: t(18),
            hasClass: p,
            jsonp: l,
            loadScript: c,
            map: k,
            mix: u,
            obj2str: f,
            on: w,
            removeClass: d,
          };
        },
        function(n, e, t) {
          'use strict';
          function i(n, e, t) {
            if (n) {
              var i = 0,
                o = n.length;
              if (o === +o) for (; o > i && e.call(t, n[i], i, n) !== !1; i++);
              else for (i in n) if (n.hasOwnProperty(i) && e.call(t, n[i], i, n) === !1) break;
            }
          }
          function o(n, e) {
            if (!e) return !1;
            if (n.classList) {
              for (var t = e.split(/\s+/), i = 0; i < t.length; i++)
                if (!n.classList.contains(t[i])) return !1;
              return !0;
            }
            return new RegExp('(\\s|^)' + e + '(\\s|$)').test(n.className);
          }
          function r(n, e) {
            e &&
              !o(n, e) &&
              (n.classList
                ? n.classList.add.apply(n.classList, e.split(/\s+/))
                : (n.className += ' ' + e));
          }
          function a(n, e) {
            e &&
              o(n, e) &&
              (n.classList
                ? n.classList.remove.apply(n.classList, e.split(/\s+/))
                : (n.className = n.className
                    .replace(new RegExp('(\\s|^)' + e + '(\\s|$)'), ' ')
                    .replace(/^\s+|\s+$/g, '')));
          }
          function c(n) {
            var e = [];
            for (var t in n)
              n.hasOwnProperty(t) && e.push(encodeURIComponent(t) + '=' + encodeURIComponent(n[t]));
            return e.join('&');
          }
          function s(n) {
            for (var e = n.offsetLeft, t = n.offsetParent; null !== t; )
              (e += t.offsetLeft), (t = t.offsetParent);
            return e;
          }
          function l(n) {
            for (var e = n.offsetTop, t = n.offsetParent; null !== t; )
              (e += t.offsetTop), (t = t.offsetParent);
            return e;
          }
          var u = window,
            f = document,
            d = t(2),
            p = (e.rndId = function(n) {
              return ((n || '') + Math.random()).replace('.', '');
            });
          (e.each = i),
            (e.hasClass = o),
            (e.addClass = r),
            (e.removeClass = a),
            (e.toggleClass = function(n, e) {
              o(n, e) ? a(n, e) : r(n, e);
            }),
            (e.getElementsByClassName = function(n, e, t) {
              if (((e = e || f), (t = t || '*'), f.getElementsByClassName))
                return e.getElementsByClassName(n);
              for (
                var i = [],
                  r = '*' === t && e.all ? e.all : e.getElementsByTagName(t),
                  a = r.length;
                --a >= 0;

              )
                o(r[a], n) && i.push(r[a]);
              return i;
            }),
            (e.setCookie = function(n, e, t) {
              t = t || 7;
              var i = new Date();
              i.setTime(i.getTime() + 864e5 * t),
                (document.cookie = [
                  encodeURIComponent(n),
                  '=',
                  encodeURIComponent('' + e),
                  ';expires=',
                  i.toGMTString(),
                ].join(''));
            }),
            (e.send = function(n) {
              var e = p('_nc_r_'),
                t = (u[e] = new Image());
              (t.onload = t.onerror = function() {
                u[e] = null;
              }),
                (t.src = n);
            }),
            (e.obj2param = c),
            (e.addHourStamp = function(n, e) {
              var t = Math.floor(new Date().getTime() / (36e5 * (e || 2))),
                i = -1 === n.indexOf('?') ? '?' : '&';
              return n + i + '_t=' + t;
            });
          var _ = {};
          e.isIEX = function(n) {
            if (n in _) return _[n];
            var e = f.createElement('b');
            return (
              (e.innerHTML = '<!--[if IE ' + n + ']><i></i><![endif]-->'),
              (_[n] = 1 === e.getElementsByTagName('i').length)
            );
          };
          var s = (e.getElementLeft = function(n) {
              for (var e = n.offsetLeft, t = n.offsetParent; null !== t; )
                (e += t.offsetLeft), (t = t.offsetParent);
              return e;
            }),
            l = (e.getElementTop = function(n) {
              for (var e = n.offsetTop, t = n.offsetParent; null !== t; )
                (e += t.offsetTop), (t = t.offsetParent);
              return e;
            });
          (e.getClientRect = function(n) {
            var e = f.documentElement.scrollTop;
            if ((f.documentElement.scrollLeft, n.getBoundingClientRect)) {
              var t = n.getBoundingClientRect();
              return { left: t.left, right: t.right, top: t.top - e, bottom: t.bottom - e };
            }
            var i = s(n),
              o = l(n);
            return { left: i, right: i + n.offsetWidth, top: o, bottom: o + n.offsetHeight };
          }),
            (e.getOffset = function(n) {
              var e = n.target;
              void 0 === e.offsetLeft && (e = e.parentNode);
              var t = g(e),
                i = { x: u.pageXOffset + n.clientX, y: u.pageYOffset + n.clientY };
              return { offsetX: i.x - t.x, offsetY: i.y - t.y };
            });
          var g = (e.getPageCoord = function(n) {
              for (var e = { x: 0, y: 0 }; n; )
                (e.x += n.offsetLeft), (e.y += n.offsetTop), (n = n.offsetParent);
              return e;
            }),
            h = {
              before: function(n, e) {
                return function() {
                  return n.call(this), e.apply(this, arguments);
                };
              },
              after: function(n, e) {
                return function() {
                  var t = n.apply(this, arguments);
                  return e.call(this, t, arguments), t;
                };
              },
            };
          (e.decorator = h),
            (e.mix = function(n) {
              for (var e, t, i = [].slice.call(arguments), o = i.length, r = 1; o > r; r++) {
                e = i[r];
                for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
              }
              return n;
            }),
            (e.clone = function(n) {
              var e = {};
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
              return e;
            }),
            (e.addHandler = function(n, e, t) {
              n.addEventListener
                ? n.addEventListener(e, t, !1)
                : n.attachEvent && n.attachEvent('on' + e, t);
            }),
            (e.removeHandler = function(n, e, t) {
              n.removeEventListener
                ? n.removeEventListener(e, t, !1)
                : n.detachEvent && n.detachEvent('on' + e, t);
            }),
            (e.getEvent = function(n) {
              return n ? n : u.event;
            }),
            (e.getTarget = function(n) {
              return n.target || n.srcElement;
            }),
            (e.bind = function(n, e) {
              var t = [].slice,
                i = t.call(arguments, 2),
                o = function() {},
                r = function() {
                  return n.apply(this instanceof o ? this : e, i.concat(t.call(arguments)));
                };
              return (o.prototype = n.prototype), (r.prototype = new o()), r;
            }),
            (e.imageLoaded = function(n) {
              var e = d.defer(),
                t = new Image();
              return (
                (t.onload = function() {
                  e.resolve(this);
                }),
                (t.onerror = function(n) {
                  e.reject({ type: 'img', error: n });
                }),
                setTimeout(function() {
                  e.reject({ type: 'img', error: 'timeout' });
                }, 5e3),
                (t.src = n),
                e.promise
              );
            }),
            (e.request = function(n) {
              var e = d.defer(),
                t = n.data || {},
                i = ('jsonp_' + Math.random()).replace('.', '');
              (u[i] = function(n) {
                e.resolve(n);
              }),
                (t[n.callback || 'callback'] = i),
                e.promise.always(function() {
                  try {
                    delete u[i];
                  } catch (n) {
                    u[i] = null;
                  }
                });
              var o = f.createElement('script');
              o.src = n.url + (-1 === n.url.indexOf('?') ? '?' : '&') + c(t);
              var r = f.getElementsByTagName('script')[0];
              return (
                r.parentNode.insertBefore(o, r),
                setTimeout(function() {
                  e.reject({ type: 'request', error: 'timeout' });
                }, 5e3),
                e.promise
              );
            }),
            (e.getElementLeft = s),
            (e.getElementTop = l);
        },
        function(n, e, t) {
          'use strict';
          function i(n) {
            return this instanceof i
              ? ((this._state = l),
                (this._onFulfilled = []),
                (this._onRejected = []),
                (this._value = null),
                (this._reason = null),
                void (d(n) && n(a(this.resolve, this), a(this.reject, this))))
              : new i(n);
          }
          function o(n, e, t) {
            return function(i) {
              if (d(e))
                try {
                  var o = e(i);
                  r(o)
                    ? o.then(
                        function(e) {
                          n.resolve(e);
                        },
                        function(e) {
                          n.reject(e);
                        }
                      )
                    : n.resolve(o);
                } catch (a) {
                  n.reject(a);
                }
              else n[t](i);
            };
          }
          function r(n) {
            return n && d(n.then);
          }
          function a(n, e) {
            var t = [].slice,
              i = t.call(arguments, 2),
              o = function() {},
              r = function() {
                return n.apply(this instanceof o ? this : e, i.concat(t.call(arguments)));
              };
            return (o.prototype = n.prototype), (r.prototype = new o()), r;
          }
          function c(n) {
            return function(e) {
              return {}.toString.call(e) == '[object ' + n + ']';
            };
          }
          function s(n, e) {
            for (var t = 0, i = n.length; i > t; t++) e(n[t], t);
          }
          var l = 0,
            u = 1,
            f = 2;
          (i.prototype = {
            constructor: i,
            then: function(n, e) {
              var t = new i(),
                r = o(t, n, 'resolve'),
                a = o(t, e, 'reject');
              return (
                this._state === u
                  ? r(this._value)
                  : this._state === f
                    ? a(this._reason)
                    : (this._onFulfilled.push(r), this._onRejected.push(a)),
                t
              );
            },
            resolve: function(n) {
              this._state === l &&
                ((this._state = u),
                (this._value = n),
                s(this._onFulfilled, function(e) {
                  e(n);
                }),
                (this._onFulfilled = []));
            },
            reject: function(n) {
              this._state === l &&
                ((this._state = f),
                (this._reason = n),
                s(this._onRejected, function(e) {
                  e(n);
                }),
                (this._onRejected = []));
            },
            catch: function(n) {
              return this.then(null, n);
            },
            always: function(n) {
              return this.then(n, n);
            },
          }),
            (i.defer = function() {
              var n = {};
              return (
                (n.promise = new i(function(e, t) {
                  (n.resolve = e), (n.reject = t);
                })),
                n
              );
            }),
            (i.race = function(n) {
              var e = i.defer();
              return (
                n.length,
                s(n, function(n) {
                  n.then(
                    function(n) {
                      e.resolve(n);
                    },
                    function(n) {
                      e.reject(n);
                    }
                  );
                }),
                e.promise
              );
            }),
            (i.all = function(n) {
              var e = i.defer(),
                t = n.length,
                o = [];
              return (
                s(n, function(n, i) {
                  n.then(
                    function(n) {
                      (o[i] = n), t--, 0 === t && e.resolve(o);
                    },
                    function(n) {
                      e.reject(n);
                    }
                  );
                }),
                e.promise
              );
            }),
            (i.resolve = function(n) {
              return new i(function(e) {
                e(n);
              });
            }),
            (i.reject = function(n) {
              return new i(function(e, t) {
                t(n);
              });
            });
          var d = c('Function');
          n.exports = i;
        },
        function(n, e, t) {
          'use strict';
          function i(n) {
            var e = ('_nc_r_' + Math.random()).replace(/\./, ''),
              t = (r[e] = new Image());
            (t.onload = t.onerror = function() {
              r[e] = null;
            }),
              (t.src = n);
          }
          var o = (t(4).URL_MAP, '//cf.aliyun.com/scratchCardSlide/dataReport.jsonp'),
            r = window;
          e.log = function(n, e) {
            var t,
              r,
              a = e || o,
              c = ['a', 't', 'scene', 'ns', 'jsv', 'usa', 'p', 'jsType', 'os', 'em', 'ec'],
              s = [],
              l = c.length;
            for (t = 0; l > t; t++)
              (r = c[t]), n.hasOwnProperty(r) && s.push(r + '=' + encodeURIComponent(n[r]));
            s.push('r=' + Math.random()), i(a + '?' + s.join('&'));
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(1),
            o = { log: '//log.mmstat.com/', gm: '//gm.mmstat.com/', gj: '//gj.mmstat.com/' };
          e.mmstat_base = o;
          var r = i.isIEX(8),
            a = i.isIEX(7),
            c = i.isIEX(6),
            s = !!(c || a || r),
            l = document.getElementsByTagName('script'),
            u = '';
          if (null != l && l.length >= 1)
            for (var f = l.length - 1; f >= 0; f--)
              if (-1 != l[f].src.indexOf('ncpc/nc.js')) {
                u = l[f].src;
                break;
              }
          var d = '';
          d =
            -1 != u.indexOf('g.alicdn.com')
              ? '//g.alicdn.com/AWSC/AWSC/awsc.js'
              : '//aeis.alicdn.com/AWSC/AWSC/awsc.js';
          var p = {
            0: {
              analyze: s
                ? '//cf2.aliyun.com/nocaptcha/analyze.jsonp'
                : '//cf.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cf.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//diablo.alibaba.com/captcha/click/get.jsonp',
              get_captcha_pre: '//diablo.alibaba.com/captcha/click/pre_get.jsonp',
              get_img: '//diablo.alibaba.com/captcha/image/get.jsonp',
              get_img_pre: '//diablo.alibaba.com/captcha/image/pre_get.jsonp',
              checkcode: s
                ? '//cf2.aliyun.com/captcha/checkcode.jsonp'
                : '//cf.aliyun.com/captcha/checkcode.jsonp',
              cc: '//diablo.alibaba.com/diablo/captcha_api/get.jsonp',
              cc_pre: '//diablo.alibaba.com/diablo/captcha_api/pre_get.jsonp',
              umid_Url: '//g.alicdn.com/security/umscript/3.3.35/um.js',
              uab_Url: d,
              umid_serUrl: 'https://ynuf.aliapp.org/service/um.json',
              api_prepare: '//cf.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cf.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cf.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
            1: {
              analyze: '//cfus.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cfus.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//usdiablo.alibaba.com/captcha/click/get.jsonp',
              get_captcha_pre: '//usdiablo.alibaba.com/captcha/click/pre_get.jsonp',
              get_img: '//usdiablo.alibaba.com/captcha/image/get.jsonp',
              get_img_pre: '//usdiablo.alibaba.com/captcha/image/pre_get.jsonp',
              checkcode: '//cfus.aliyun.com/captcha/checkcode.jsonp',
              cc: '//usdiablo.alibaba.com/diablo/captcha_api/get.jsonp',
              cc_pre: '//usdiablo.alibaba.com/diablo/captcha_api/pre_get.jsonp',
              umid_Url: '//aeis.alicdn.com/security/umscript/3.3.35/um.js',
              uab_Url: d,
              umid_serUrl: 'https://us.ynuf.aliapp.org/service/um.json',
              api_prepare: '//cfus.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cfus.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cfus.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
            2: {
              analyze: '//cfun.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cfun.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//diablo.alibaba.com/captcha/click/get.jsonp',
              get_captcha_pre: '//diablo.alibaba.com/captcha/click/pre_get.jsonp',
              get_img: '//diablo.alibaba.com/captcha/image/get.jsonp',
              get_img_pre: '//diablo.alibaba.com/captcha/image/pre_get.jsonp',
              checkcode: '//cfun.aliyun.com/captcha/checkcode.jsonp',
              cc: '//diablo.alibaba.com/diablo/captcha_api/get.jsonp',
              cc_pre: '//diablo.alibaba.com/diablo/captcha_api/pre_get.jsonp',
              umid_Url: '//g.alicdn.com/security/umscript/3.3.35/um.js',
              uab_Url: d,
              umid_serUrl: 'https://ynuf.aliapp.org/service/um.json',
              api_prepare: '//cfun.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cfun.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cfun.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
          };
          e.URL_MAP = p;
        },
        ,
        function(n, e, t) {
          'use strict';
          e.v = 949;
        },
        ,
        function(n, e, t) {
          'use strict';
          n.exports = function() {
            var n = [];
            return (
              (n.toString = function() {
                for (var n = [], e = 0; e < this.length; e++) {
                  var t = this[e];
                  t[2] ? n.push('@media ' + t[2] + '{' + t[1] + '}') : n.push(t[1]);
                }
                return n.join('');
              }),
              (n.i = function(e, t) {
                'string' == typeof e && (e = [[null, e, '']]);
                for (var i = {}, o = 0; o < this.length; o++) {
                  var r = this[o][0];
                  'number' == typeof r && (i[r] = !0);
                }
                for (o = 0; o < e.length; o++) {
                  var a = e[o];
                  ('number' == typeof a[0] && i[a[0]]) ||
                    (t && !a[2] ? (a[2] = t) : t && (a[2] = '(' + a[2] + ') and (' + t + ')'),
                    n.push(a));
                }
              }),
              n
            );
          };
        },
        ,
        function(n, e) {
          function t(n, e) {
            for (var t = 0; t < n.length; t++) {
              var i = n[t],
                o = d[i.id];
              if (o) {
                o.refs++;
                for (var r = 0; r < o.parts.length; r++) o.parts[r](i.parts[r]);
                for (; r < i.parts.length; r++) o.parts.push(s(i.parts[r], e));
              } else {
                for (var a = [], r = 0; r < i.parts.length; r++) a.push(s(i.parts[r], e));
                d[i.id] = { id: i.id, refs: 1, parts: a };
              }
            }
          }
          function i(n) {
            for (var e = [], t = {}, i = 0; i < n.length; i++) {
              var o = n[i],
                r = o[0],
                a = o[1],
                c = o[2],
                s = o[3],
                l = { css: a, media: c, sourceMap: s };
              t[r] ? t[r].parts.push(l) : e.push((t[r] = { id: r, parts: [l] }));
            }
            return e;
          }
          function o(n, e) {
            var t = g(),
              i = m[m.length - 1];
            if ('top' === n.insertAt)
              i
                ? i.nextSibling
                  ? t.insertBefore(e, i.nextSibling)
                  : t.appendChild(e)
                : t.insertBefore(e, t.firstChild),
                m.push(e);
            else {
              if ('bottom' !== n.insertAt)
                throw new Error(
                  "Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'."
                );
              t.appendChild(e);
            }
          }
          function r(n) {
            n.parentNode.removeChild(n);
            var e = m.indexOf(n);
            e >= 0 && m.splice(e, 1);
          }
          function a(n) {
            var e = document.createElement('style');
            return (e.type = 'text/css'), o(n, e), e;
          }
          function c(n) {
            var e = document.createElement('link');
            return (e.rel = 'stylesheet'), o(n, e), e;
          }
          function s(n, e) {
            var t, i, o;
            if (e.singleton) {
              var s = v++;
              (t = h || (h = a(e))), (i = l.bind(null, t, s, !1)), (o = l.bind(null, t, s, !0));
            } else
              n.sourceMap &&
              'function' == typeof URL &&
              'function' == typeof URL.createObjectURL &&
              'function' == typeof URL.revokeObjectURL &&
              'function' == typeof Blob &&
              'function' == typeof btoa
                ? ((t = c(e)),
                  (i = f.bind(null, t)),
                  (o = function() {
                    r(t), t.href && URL.revokeObjectURL(t.href);
                  }))
                : ((t = a(e)),
                  (i = u.bind(null, t)),
                  (o = function() {
                    r(t);
                  }));
            return (
              i(n),
              function(e) {
                if (e) {
                  if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
                  i((n = e));
                } else o();
              }
            );
          }
          function l(n, e, t, i) {
            var o = t ? '' : i.css;
            if (n.styleSheet) n.styleSheet.cssText = y(e, o);
            else {
              var r = document.createTextNode(o),
                a = n.childNodes;
              a[e] && n.removeChild(a[e]), a.length ? n.insertBefore(r, a[e]) : n.appendChild(r);
            }
          }
          function u(n, e) {
            var t = e.css,
              i = e.media;
            if ((i && n.setAttribute('media', i), n.styleSheet)) n.styleSheet.cssText = t;
            else {
              for (; n.firstChild; ) n.removeChild(n.firstChild);
              n.appendChild(document.createTextNode(t));
            }
          }
          function f(n, e) {
            var t = e.css,
              i = e.sourceMap;
            i &&
              (t +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                btoa(unescape(encodeURIComponent(JSON.stringify(i)))) +
                ' */');
            var o = new Blob([t], { type: 'text/css' }),
              r = n.href;
            (n.href = URL.createObjectURL(o)), r && URL.revokeObjectURL(r);
          }
          var d = {},
            p = function(n) {
              var e;
              return function() {
                return 'undefined' == typeof e && (e = n.apply(this, arguments)), e;
              };
            },
            _ = p(function() {
              return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
            }),
            g = p(function() {
              return document.head || document.getElementsByTagName('head')[0];
            }),
            h = null,
            v = 0,
            m = [];
          n.exports = function(n, e) {
            if ('undefined' != typeof DEBUG && DEBUG && 'object' != typeof document)
              throw new Error('The style-loader cannot be used in a non-browser environment');
            (e = e || {}),
              'undefined' == typeof e.singleton && (e.singleton = _()),
              'undefined' == typeof e.insertAt && (e.insertAt = 'bottom');
            var o = i(n);
            return (
              t(o, e),
              function(n) {
                for (var r = [], a = 0; a < o.length; a++) {
                  var c = o[a],
                    s = d[c.id];
                  s.refs--, r.push(s);
                }
                if (n) {
                  var l = i(n);
                  t(l, e);
                }
                for (var a = 0; a < r.length; a++) {
                  var s = r[a];
                  if (0 === s.refs) {
                    for (var u = 0; u < s.parts.length; u++) s.parts[u]();
                    delete d[s.id];
                  }
                }
              }
            );
          };
          var y = (function() {
            var n = [];
            return function(e, t) {
              return (n[e] = t), n.filter(Boolean).join('\n');
            };
          })();
        },
        function(n, e, t) {
          'use strict';
          function i(n, e) {
            var t;
            for (t in e) e.hasOwnProperty(t) && ((r[t] = r[t] || {})[n] = e[t]);
          }
          function o(n, e) {
            var t = { zh_CN: 'cn', zh_TW: 'tw', en_US: 'en' };
            return n in t && (n = t[n]), r[e][n || 'cn'];
          }
          var r = {
            SLIDER_LABEL: {
              cn: '\u5411\u53f3\u6ed1\u52a8\u9a8c\u8bc1',
              tw: '\u5411\u53f3\u6ed1\u52d5\u9a57\u8b49',
              en: 'Slide to verify',
            },
            LOADING: { cn: '\u52a0\u8f7d\u4e2d...', tw: '\u52a0\u8f09\u4e2d...', en: 'Loading...' },
            CHECK_Y: {
              cn: '\u9a8c\u8bc1\u901a\u8fc7',
              tw: '\u9a57\u8b49\u901a\u904e',
              en: 'Verified',
            },
            CHECK_N: {
              cn: '\u9a8c\u8bc1\u672a\u901a\u8fc7',
              tw: '\u9a57\u8b49\u672a\u901a\u904e',
              en: 'Not Verified',
            },
            TEXTBOX_HOLDER: { cn: '\u9a8c\u8bc1\u7801', tw: '\u9a57\u8b49\u78bc', en: 'Captcha' },
            BUTTON_OK: { cn: '\u786e \u5b9a', tw: '\u78ba \u5b9a', en: 'OK' },
            TIPS_TITLE: {
              cn: '\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165',
              tw: '\u9a57\u8b49\u78bc\u932f\u8aa4\uff0c\u8acb\u91cd\u65b0\u8f38\u5165',
              en: 'Please try again',
            },
            ERROR_TITLE: {
              cn: '\u975e\u5e38\u62b1\u6b49\uff0c\u8fd9\u51fa\u9519\u4e86',
              tw: '\u975e\u5e38\u62b1\u6b49\uff0c\u9019\u51fa\u932f\u4e86',
              en: 'Sorry, something wrong',
            },
            ERROR_RELOAD: { cn: '\u5237\u65b0', tw: '\u5237\u65b0', en: 'Reload' },
            ERROR_FEEDBACK: { cn: '\u53cd\u9988', tw: '\u53cd\u994b', en: 'Feedback' },
            OVERLAY_INFORM: {
              cn:
                '\u7ecf\u68c0\u6d4b\u4f60\u5f53\u524d\u64cd\u4f5c\u73af\u5883\u5b58\u5728\u98ce\u9669\uff0c\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801',
              tw:
                '\u7d93\u6aa2\u6e2c\u4f60\u7576\u524d\u64cd\u4f5c\u74b0\u5883\u5b58\u5728\u98a8\u96aa\uff0c\u8acb\u8f38\u5165\u9a57\u8b49\u78bc',
              en:
                'Risk has been detected with your current operating environment, please enter the verification code.',
            },
            FEEDBACK_URL: {
              cn: 'http://survey.taobao.com/survey/QgzQDdDd',
              tw: 'http://survey.taobao.com/survey/40BtED_K',
              en: 'http://survey.taobao.com/survey/Q0dcgfAv',
            },
            CLICK_LABEL_READY: {
              cn: '\u70b9\u51fb\u5706\u5708\u9a8c\u8bc1',
              tw: '\u9ede\u64ca\u5706\u5708\u9a57\u8b49',
              en: 'Click the circle to verify',
            },
          };
          (e.i18n = r), (e.upLang = i), (e.trans = o);
        },
        function(n, e, t) {
          'use strict';
          var i = window,
            o = document.getElementsByTagName('script'),
            r = '';
          if (null != o && o.length >= 1)
            for (var a = o.length - 1; a >= 0; a--)
              if (-1 != o[a].src.indexOf('nch5/index.js')) {
                r = o[a].src;
                break;
              }
          var c = '';
          c =
            -1 != r.indexOf('g.alicdn.com')
              ? '//g.alicdn.com/AWSC/AWSC/awsc.js'
              : '//aeis.alicdn.com/AWSC/AWSC/awsc.js';
          var s = {
            0: {
              analyze: '//cf.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cf.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//pin.aliyun.com/get_captcha/ver3',
              get_img: '//diablo.alibaba.com/captcha/image/get.jsonp',
              checkcode: '//cf.aliyun.com/captcha/checkcode.jsonp',
              umid_Url: '//g.alicdn.com/security/umscript/3.3.25/um.js',
              uab_Url: c,
              umid_serUrl: 'https://ynuf.aliapp.org',
              api_prepare: '//cf.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cf.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cf.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
            1: {
              analyze: '//cfus.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cfus.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//captcha.alibaba.com/get_captcha/ver3',
              get_img: '//usdiablo.alibaba.com/captcha/image/get.jsonp',
              checkcode: '//cfus.aliyun.com/captcha/checkcode.jsonp',
              umid_Url: '//aeis.alicdn.com/security/umscript/3.3.25/um.js',
              uab_Url: c,
              umid_serUrl: 'https://us.ynuf.aliapp.org',
              api_prepare: '//cfus.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cfus.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cfus.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
            2: {
              analyze: '//cfun.aliyun.com/nocaptcha/analyze.jsonp',
              initialize: '//cfun.aliyun.com/nocaptcha/initialize.jsonp',
              get_captcha: '//pin.aliyun.com/get_captcha/ver3',
              get_img: '//diablo.alibaba.com/captcha/image/get.jsonp',
              checkcode: '//cfun.aliyun.com/captcha/checkcode.jsonp',
              umid_Url: '//g.alicdn.com/security/umscript/3.3.25/um.js',
              uab_Url: c,
              umid_serUrl: 'https://ynuf.aliapp.org',
              api_prepare: '//cfun.aliyun.com/scratchCardSlide/prepare.jsonp',
              api_report: '//cfun.aliyun.com/scratchCardSlide/dataReport.jsonp',
              api_analyze: '//cfun.aliyun.com/scratchCardSlide/analyze.jsonp',
            },
          };
          if ('file:' === i.location.protocol) {
            var l, u, f;
            for (l in s)
              if (s.hasOwnProperty(l)) {
                u = s[l];
                for (f in u)
                  u.hasOwnProperty(f) && 0 === u[f].indexOf('//') && (u[f] = 'http:' + u[f]);
              }
          }
          e.URL_MAP = s;
        },
        function(n, e, t) {
          'use strict';
          !(function() {
            var t = {
              VERSION: '2.4.0',
              Result: { SUCCEEDED: 1, NOTRANSITION: 2, CANCELLED: 3, PENDING: 4 },
              Error: { INVALID_TRANSITION: 100, PENDING_TRANSITION: 200, INVALID_CALLBACK: 300 },
              WILDCARD: '*',
              ASYNC: 'async',
              create: function(n, e) {
                var i = 'string' == typeof n.initial ? { state: n.initial } : n.initial,
                  o = n.terminal || n['final'],
                  r = e || n.target || {},
                  a = n.events || [],
                  c = n.callbacks || {},
                  s = {},
                  l = {},
                  u = function(n) {
                    var e = Array.isArray(n.from) ? n.from : n.from ? [n.from] : [t.WILDCARD];
                    s[n.name] = s[n.name] || {};
                    for (var i = 0; i < e.length; i++)
                      (l[e[i]] = l[e[i]] || []),
                        l[e[i]].push(n.name),
                        (s[n.name][e[i]] = n.to || e[i]);
                    n.to && (l[n.to] = l[n.to] || []);
                  };
                i &&
                  ((i.event = i.event || 'startup'),
                  u({ name: i.event, from: 'none', to: i.state }));
                for (var f = 0; f < a.length; f++) u(a[f]);
                for (var d in s) s.hasOwnProperty(d) && (r[d] = t.buildEvent(d, s[d]));
                for (var d in c) c.hasOwnProperty(d) && (r[d] = c[d]);
                return (
                  (r.current = 'none'),
                  (r.is = function(n) {
                    return Array.isArray(n) ? n.indexOf(this.current) >= 0 : this.current === n;
                  }),
                  (r.can = function(n) {
                    return (
                      !this.transition &&
                      void 0 !== s[n] &&
                      (s[n].hasOwnProperty(this.current) || s[n].hasOwnProperty(t.WILDCARD))
                    );
                  }),
                  (r.cannot = function(n) {
                    return !this.can(n);
                  }),
                  (r.transitions = function() {
                    return (l[this.current] || []).concat(l[t.WILDCARD] || []);
                  }),
                  (r.isFinished = function() {
                    return this.is(o);
                  }),
                  (r.error =
                    n.error ||
                    function(n, e, t, i, o, r, a) {
                      throw a || r;
                    }),
                  (r.states = function() {
                    return Object.keys(l).sort();
                  }),
                  i && !i.defer && r[i.event](),
                  r
                );
              },
              doCallback: function(n, e, i, o, r, a) {
                if (e)
                  try {
                    return e.apply(n, [i, o, r].concat(a));
                  } catch (c) {
                    return n.error(
                      i,
                      o,
                      r,
                      a,
                      t.Error.INVALID_CALLBACK,
                      'an exception occurred in a caller-provided callback function',
                      c
                    );
                  }
              },
              beforeAnyEvent: function(n, e, i, o, r) {
                return t.doCallback(n, n.onbeforeevent, e, i, o, r);
              },
              afterAnyEvent: function(n, e, i, o, r) {
                return t.doCallback(n, n.onafterevent || n.onevent, e, i, o, r);
              },
              leaveAnyState: function(n, e, i, o, r) {
                return t.doCallback(n, n.onleavestate, e, i, o, r);
              },
              enterAnyState: function(n, e, i, o, r) {
                return t.doCallback(n, n.onenterstate || n.onstate, e, i, o, r);
              },
              changeState: function(n, e, i, o, r) {
                return t.doCallback(n, n.onchangestate, e, i, o, r);
              },
              beforeThisEvent: function(n, e, i, o, r) {
                return t.doCallback(n, n['onbefore' + e], e, i, o, r);
              },
              afterThisEvent: function(n, e, i, o, r) {
                return t.doCallback(n, n['onafter' + e] || n['on' + e], e, i, o, r);
              },
              leaveThisState: function(n, e, i, o, r) {
                return t.doCallback(n, n['onleave' + i], e, i, o, r);
              },
              enterThisState: function(n, e, i, o, r) {
                return t.doCallback(n, n['onenter' + o] || n['on' + o], e, i, o, r);
              },
              beforeEvent: function(n, e, i, o, r) {
                return !1 === t.beforeThisEvent(n, e, i, o, r) ||
                  !1 === t.beforeAnyEvent(n, e, i, o, r)
                  ? !1
                  : void 0;
              },
              afterEvent: function(n, e, i, o, r) {
                t.afterThisEvent(n, e, i, o, r), t.afterAnyEvent(n, e, i, o, r);
              },
              leaveState: function(n, e, i, o, r) {
                var a = t.leaveThisState(n, e, i, o, r),
                  c = t.leaveAnyState(n, e, i, o, r);
                return !1 !== a && !1 !== c && (t.ASYNC === a || t.ASYNC === c ? t.ASYNC : void 0);
              },
              enterState: function(n, e, i, o, r) {
                t.enterThisState(n, e, i, o, r), t.enterAnyState(n, e, i, o, r);
              },
              buildEvent: function(n, e) {
                return function() {
                  var i = this.current,
                    o = e[i] || (e[t.WILDCARD] != t.WILDCARD ? e[t.WILDCARD] : i) || i,
                    r = Array.prototype.slice.call(arguments);
                  if (this.transition)
                    return this.error(
                      n,
                      i,
                      o,
                      r,
                      t.Error.PENDING_TRANSITION,
                      'event ' + n + ' inappropriate because previous transition did not complete'
                    );
                  if (this.cannot(n))
                    return this.error(
                      n,
                      i,
                      o,
                      r,
                      t.Error.INVALID_TRANSITION,
                      'event ' + n + ' inappropriate in current state ' + this.current
                    );
                  if (!1 === t.beforeEvent(this, n, i, o, r)) return t.Result.CANCELLED;
                  if (i === o) return t.afterEvent(this, n, i, o, r), t.Result.NOTRANSITION;
                  var a = this;
                  (this.transition = function() {
                    return (
                      (a.transition = null),
                      (a.current = o),
                      t.enterState(a, n, i, o, r),
                      t.changeState(a, n, i, o, r),
                      t.afterEvent(a, n, i, o, r),
                      t.Result.SUCCEEDED
                    );
                  }),
                    (this.transition.cancel = function() {
                      (a.transition = null), t.afterEvent(a, n, i, o, r);
                    });
                  var c = t.leaveState(this, n, i, o, r);
                  return !1 === c
                    ? ((this.transition = null), t.Result.CANCELLED)
                    : t.ASYNC === c
                      ? t.Result.PENDING
                      : this.transition
                        ? this.transition()
                        : void 0;
                };
              },
            };
            'undefined' != typeof n && n.exports && (e = n.exports = t), (e.StateMachine = t);
          })();
        },
        function(n, e, t) {
          'use strict';
          var i = '//cf.aliyun.com';
          n.exports = {
            min_width: 300,
            min_height: 100,
            default_stroke_width: 16,
            min_events_count: 30,
            max_retry: 3,
            api_prepare: i + '/scratchCardSlide/prepare.jsonp',
            api_report: i + '/scratchCardSlide/dataReport.jsonp',
            api_analyze: i + '/scratchCardSlide/analyze.jsonp',
            obj_ok: '//img.alicdn.com/tfs/TB1OLQ7SFXXXXaoapXXXXXXXXXX-57-70.png',
            obj_fail: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
            obj_size: 70,
            bg_back: '//img.alicdn.com/tps/TB1ml9hPFXXXXcjXFXXXXXXXXXX-100-80.png',
            bg_front: '//img.alicdn.com/tps/TB1531mPFXXXXc_XpXXXXXXXXXX-100-80.png',
            err_TIMEOUT_uab: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
            err_TIMEOUT_um: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
            err_fail_prepare: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
            err_fail_analyze: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
            grid_size: 8,
            action_timeout: 6e4,
            default_options: {
              language: 'cn',
              objects: [
                '//img.alicdn.com/tfs/TB1NYk7SFXXXXcWaXXXXXXXXXXX-57-69.png',
                '//img.alicdn.com/tfs/TB12q8sSVXXXXcSXFXXXXXXXXXX-57-67.png',
              ],
              elements: [
                '//img.alicdn.com/tfs/TB1NYk7SFXXXXcWaXXXXXXXXXXX-57-69.png',
                '//img.alicdn.com/tfs/TB12q8sSVXXXXcSXFXXXXXXXXXX-57-67.png',
              ],
              obj_ok: '//img.alicdn.com/tfs/TB1OLQ7SFXXXXaoapXXXXXXXXXX-57-70.png',
              obj_fail: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
              bg_front:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
              obj_error: '//img.alicdn.com/tfs/TB1N4lDSVXXXXcFXpXXXXXXXXXX-57-66.png',
              bg_back_prepared: '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
              bg_back: '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
              bg_back_fail: '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
              bg_back_pass: '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
            },
          };
        },
        function(n, e, t) {
          'use strict';
          function i(n, e) {
            var t,
              i,
              r = e ? {} : n;
            for (t in n)
              n.hasOwnProperty(t) &&
                ((i = n[t]),
                'string' == typeof i && (i = [i]),
                (r[t] =
                  '<span class="nc-lang-cnt" data-nc-lang="' + t + '">' + o(d[t], i) + '</span>'));
            return r;
          }
          function o(n, e) {
            return (n + '').replace(/\\?\{\s*([^{}\s]+)\s*\}/g, function(n, t) {
              return '\\' === n.charAt(0) ? n.slice(1) : e[t] || '';
            });
          }
          function r(n, e) {
            var t,
              o = (p[n] = p[n] || {});
            e = i(e, !0);
            for (t in e) e.hasOwnProperty(t) && (o[t] = e[t]);
          }
          function a(n, e) {
            var t,
              o = {},
              r = (p[n] = p[n] || {});
            for (t in r) r.hasOwnProperty(t) && (o[t] = r[t]);
            e = i(e, !0);
            for (t in e) e.hasOwnProperty(t) && (o[t] = e[t]);
            return o;
          }
          function c(n, e) {
            return n.replace(/(javascript:NoCaptcha.reset\()(\))/gi, '$1' + e + '$2');
          }
          var s,
            l = 'javascript:NoCaptcha.reset()',
            u = 'https://survey.taobao.com/survey/AMnMVgrS4?type=%TYPE&str=%STR',
            f = '{0}',
            d = {
              _ggk_guide: '{0}',
              _ggk_start: f,
              _ggk_net_err: '{0}<a href="{1}">{2}</a>{3}<a target="_blank" href="{4}">{5}</a>',
              _ggk_too_fast: '{0}<a href="{1}">{2}</a>{3}<a target="_blank" href="{4}">{5}</a>',
              _ggk_action_timeout:
                '{0}<a href="{1}">{2}</a>{3}<a target="_blank" href="{4}">{5}</a>',
              _ggk_fail: '{0}<a href="{1}">{2}</a>{3}<a target="_blank" href="{4}">{5}</a>',
              _ggk_success: f,
              _ggk_loading: '{0}',
            },
            p = {
              cn: {
                _ggk_guide:
                  '\u8bf7\u5728\u5c4f\u5e55\u4e0a\u6ed1\u52a8\uff0c\u522e\u51fa\u4e24\u53ea\u5c0f\u9e21',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u7f51\u7edc\u5b9e\u5728\u4e0d\u7ed9\u529b<br/>\u8bf7',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u9988\u95ee\u9898',
                ],
                _ggk_too_fast: [
                  '\u60a8\u522e\u5f97\u592a\u5feb\u5566<br/>\u8bf7',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u9988\u95ee\u9898',
                ],
                _ggk_action_timeout: [
                  '\u6211\u7b49\u5f97\u592a\u4e45\u5566<br/>\u8bf7',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u9988\u95ee\u9898',
                ],
                _ggk_fail: [
                  '\u5440\uff0c\u5c0f\u9e21\u9003\u8dd1\u4e86<br/>\u8bf7',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u9988\u95ee\u9898',
                ],
                _ggk_loading: '\u52a0\u8f7d\u4e2d',
                _ggk_success:
                  '\u606d\u559c\u60a8\u6210\u529f\u522e\u51fa\u5c0f\u9e21\uff0c\u7ee7\u7eed\u4e0b\u4e00\u6b65\u64cd\u4f5c\u5427',
              },
              tw: {
                _ggk_guide:
                  '\u8acb\u5728\u87a2\u5e55\u4e0a\u6ed1\u52d5\uff0c\u522e\u51fa\u5169\u96bb\u5c0f\u96de',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u7db2\u8def\u5be6\u5728\u4e0d\u7d66\u529b<br/>\u8acb',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u6620\u554f\u984c',
                ],
                _ggk_too_fast: [
                  '\u60a8\u522e\u5f97\u592a\u5feb\u5566<br/>\u8acb',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u6620\u554f\u984c',
                ],
                _ggk_action_timeout: [
                  '\u6211\u7b49\u5f97\u592a\u4e45\u5566<br/>\u8acb',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u6620\u554f\u984c',
                ],
                _ggk_fail: [
                  '\u5440\uff0c\u5c0f\u96de\u9003\u8dd1\u4e86<br/>\u8acb',
                  l,
                  '\u518d\u6765\u4e00\u6b21',
                  '\u6216',
                  u,
                  '\u53cd\u6620\u554f\u984c',
                ],
                _ggk_loading: '\u52a0\u8f09\u4e2d',
                _ggk_success:
                  '\u606d\u559c\u60a8\u6210\u529f\u522e\u51fa\u5c0f\u96de\uff0c\u7e7c\u7e8c\u4e0b\u4e00\u6b65\u64cd\u4f5c\u5427',
              },
              en: {
                _ggk_guide: 'Slide to scratch out two chickens',
                _ggk_start: '',
                _ggk_net_err: [
                  'Problem with the network<br/>Please',
                  l,
                  'try again',
                  'or',
                  u,
                  'report your problem',
                ],
                _ggk_too_fast: [
                  'You were being too fast<br/>Please',
                  l,
                  'try again',
                  'or',
                  u,
                  'report your problem',
                ],
                _ggk_action_timeout: [
                  "You've been idled for too long<br/>Please",
                  l,
                  'try again',
                  'or',
                  u,
                  'report your problem',
                ],
                _ggk_fail: [
                  'Oops, the chickens ran away<br/>Please',
                  l,
                  'try again',
                  'or',
                  u,
                  'report your problem',
                ],
                _ggk_loading: 'Loading',
                _ggk_success: "Congratulations! You've got the chickens!",
              },
              es_ES: {
                _ggk_guide: 'Deslizar para rascar dos pollos',
                _ggk_start: '',
                _ggk_net_err: [
                  'Hay problemas con la red.',
                  l,
                  'Vuelve a intentarlo ',
                  'o',
                  u,
                  ' informa del problema',
                ],
                _ggk_too_fast: [
                  '\xa1Has sido demasiado r\xe1pido.',
                  l,
                  'Vuelve a intentarlo ',
                  'o',
                  u,
                  ' informa del problema',
                ],
                _ggk_action_timeout: [
                  'Se ha acabado el tiempo.',
                  l,
                  'Vuelve a intentarlo ',
                  'o',
                  u,
                  ' informa del problema',
                ],
                _ggk_fail: [
                  '\xa1Vaya! Los pollos han huido.',
                  l,
                  'Vuelve a intentarlo ',
                  'o',
                  u,
                  ' informa del problema',
                ],
                _ggk_loading: 'Cargando',
                _ggk_success: '\xa1Enhorabuena! \xa1Has atrapado los pollos!',
              },
              pl_PL: {
                _ggk_guide: 'Przesu\u0144, aby zdoby\u0107 dwa kurczaki',
                _ggk_start: '',
                _ggk_net_err: [
                  'Problem z sieci\u0105.',
                  l,
                  'Spr\xf3buj ponownie ',
                  'lub',
                  u,
                  ' zg\u0142o\u015b sw\xf3j problem',
                ],
                _ggk_too_fast: [
                  'Za szybko.',
                  l,
                  'Spr\xf3buj ponownie ',
                  'lub',
                  u,
                  ' zg\u0142o\u015b sw\xf3j problem',
                ],
                _ggk_action_timeout: [
                  'Bezczynno\u015b\u0107 trwa\u0142a zbyt d\u0142ugo.',
                  l,
                  'Spr\xf3buj ponownie ',
                  'lub',
                  u,
                  ' zg\u0142o\u015b sw\xf3j problem',
                ],
                _ggk_fail: [
                  'Ups, kurczaki uciek\u0142y.',
                  l,
                  'Spr\xf3buj ponownie ',
                  'lub',
                  u,
                  ' zg\u0142o\u015b sw\xf3j problem',
                ],
                _ggk_loading: '\u0141aduj\u0119',
                _ggk_success: 'Gratulacje! Uda\u0142o Ci si\u0119 zdoby\u0107 kurczaki!',
              },
              fr_FR: {
                _ggk_guide: "Faites glisser sur l'\xe9cran pour gratter deux poulets",
                _ggk_start: '',
                _ggk_net_err: [
                  'Probl\xe8me de r\xe9seau.',
                  l,
                  'Veuillez r\xe9essayer ',
                  'ou',
                  u,
                  ' signaler votre probl\xe8me',
                ],
                _ggk_too_fast: [
                  'Vous avez \xe9t\xe9 trop rapide.',
                  l,
                  'Veuillez r\xe9essayer ',
                  'ou',
                  u,
                  ' signaler votre probl\xe8me',
                ],
                _ggk_action_timeout: [
                  "D\xe9lai d'attente d\xe9pass\xe9.",
                  l,
                  'Veuillez r\xe9essayer ',
                  'ou',
                  u,
                  ' signaler votre probl\xe8me',
                ],
                _ggk_fail: [
                  'Oups, les poulets se sont enfuit.',
                  l,
                  'Veuillez r\xe9essayer ',
                  'ou',
                  u,
                  ' signaler votre probl\xe8me',
                ],
                _ggk_loading: 'Chargement',
                _ggk_success: "Bravo\xa0! Les poulets sont \xe0 vous'!",
              },
              de_DE: {
                _ggk_guide: 'Wischen Sie auf dem Bildschim, um zwei H\xfchner zu kratzen',
                _ggk_start: '',
                _ggk_net_err: [
                  'Netzwerkproblem. Bitte.',
                  l,
                  'versuchen Sie es erneut ',
                  'oder',
                  u,
                  ' melden Sie ein Problem',
                ],
                _ggk_too_fast: [
                  'Zu schnell. Bitte.',
                  l,
                  'versuchen Sie es erneut ',
                  'oder',
                  u,
                  ' melden Sie ein Problem',
                ],
                _ggk_action_timeout: [
                  'Zeit\xfcberschreitung, bitte.',
                  l,
                  'versuchen Sie es erneut ',
                  'oder',
                  u,
                  ' melden Sie ein Problem',
                ],
                _ggk_fail: [
                  'Hoppla, die H\xfchner sind davongelaufen.',
                  l,
                  'versuchen Sie es erneut ',
                  'oder',
                  u,
                  ' melden Sie ein Problem',
                ],
                _ggk_loading: 'Lade',
                _ggk_success: 'Gl\xfcckwunsch! Sie haben die H\xfchner erwischt!',
              },
              it_IT: {
                _ggk_guide: 'Scorri sullo schermo per grattare due polli',
                _ggk_start: '',
                _ggk_net_err: [
                  'Problemi con la rete.',
                  l,
                  'Riprova ',
                  'o',
                  u,
                  ' segnala il problema',
                ],
                _ggk_too_fast: [
                  'Sei stato troppo veloce.',
                  l,
                  'Riprova ',
                  'o',
                  u,
                  ' segnala il problema',
                ],
                _ggk_action_timeout: [
                  'Tempo scaduto.',
                  l,
                  'Riprova ',
                  'o',
                  u,
                  ' segnala il problema',
                ],
                _ggk_fail: [
                  'Ops... i polli sono scappati.',
                  l,
                  'Riprova ',
                  'o',
                  u,
                  ' segnala il problema',
                ],
                _ggk_loading: 'Sto caricando',
                _ggk_success: 'Complimenti! Hai preso i polli!',
              },
              ru_RU: {
                _ggk_guide:
                  '\u041f\u0440\u043e\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u043b\u044c\u0446\u0435\u043c \u043f\u043e \u044d\u043a\u0440\u0430\u043d\u0443, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0446\u0430\u0440\u0430\u043f\u0430\u0442\u044c \u0434\u0432\u0443\u0445 \u0446\u044b\u043f\u043b\u044f\u0442',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u0421\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u0441 \u0441\u0435\u0442\u044c\u044e.',
                  l,
                  '\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 ',
                  '\u0438\u043b\u0438',
                  u,
                  ' \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043e \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0435',
                ],
                _ggk_too_fast: [
                  '\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u044b\u0441\u0442\u0440\u043e.',
                  l,
                  '\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 ',
                  '\u0438\u043b\u0438',
                  u,
                  ' \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043e \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0435',
                ],
                _ggk_action_timeout: [
                  '\u0412\u0440\u0435\u043c\u044f \u0438\u0441\u0442\u0435\u043a\u043b\u043e.',
                  l,
                  '\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 ',
                  '\u0438\u043b\u0438',
                  u,
                  ' \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043e \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0435',
                ],
                _ggk_fail: [
                  '\u041e\u0439, \u0446\u044b\u043f\u043b\u044f\u0442\u0430 \u0443\u0431\u0435\u0436\u0430\u043b\u0438.',
                  l,
                  '\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 ',
                  '\u0438\u043b\u0438',
                  u,
                  ' \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043e \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0435',
                ],
                _ggk_loading: '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430',
                _ggk_success:
                  '\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c! \u0412\u044b \u043f\u043e\u0439\u043c\u0430\u043b\u0438 \u0446\u044b\u043f\u043b\u044f\u0442!',
              },
              ja_JP: {
                _ggk_guide:
                  '\u30e9\u30a4\u30c9\u3057\u30662\u5339\u306e\u30cb\u30ef\u30c8\u30ea\u3092\u6d88\u3057\u307e\u3059',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306b\u554f\u984c\u304c\u3042\u308a\u307e\u3059.',
                  l,
                  '\u518d\u8a66\u884c ',
                  '\u3059\u308b\u304b',
                  u,
                  ' \u554f\u984c\u3092\u5831\u544a\u3057\u3066\u304f\u3060\u3055\u3044',
                ],
                _ggk_too_fast: [
                  '\u901f\u3059\u304e\u307e\u3059.',
                  l,
                  '\u518d\u8a66\u884c ',
                  '\u3059\u308b\u304b',
                  u,
                  ' \u554f\u984c\u3092\u5831\u544a\u3057\u3066\u304f\u3060\u3055\u3044',
                ],
                _ggk_action_timeout: [
                  '\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8.',
                  l,
                  '\u518d\u8a66\u884c ',
                  '\u3059\u308b\u304b',
                  u,
                  ' \u554f\u984c\u3092\u5831\u544a\u3057\u3066\u304f\u3060\u3055\u3044',
                ],
                _ggk_fail: [
                  '\u304a\u3063\u3068\u3001\u30cb\u30ef\u30c8\u30ea\u304c\u9003\u3052\u3066\u3057\u307e\u3044\u307e\u3057\u305f.',
                  l,
                  '\u518d\u8a66\u884c ',
                  '\u3059\u308b\u304b',
                  u,
                  ' \u554f\u984c\u3092\u5831\u544a\u3057\u3066\u304f\u3060\u3055\u3044',
                ],
                _ggk_loading: '\u66f4\u65b0\u3057\u3066\u3044\u307e\u3059',
                _ggk_success:
                  '\u304a\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01\u30cb\u30ef\u30c8\u30ea\u3092\u6355\u307e\u3048\u3089\u308c\u307e\u3057\u305f!',
              },
              ko_KR: {
                _ggk_guide:
                  '\ud654\uba74 \uc704\ub97c \ubc00\uc5b4\uc11c \ub2ed \ub450 \ub9c8\ub9ac\ub97c \uc9c0\uc6b0\uc138\uc694',
                _ggk_start: '',
                _ggk_net_err: [
                  '\ub124\ud2b8\uc6cc\ud06c\uc5d0 \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4\u3059.',
                  l,
                  '\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc2dc ',
                  '\uac70\ub098',
                  u,
                  ' \ubb38\uc81c\ub97c \ubcf4\uace0\ud574 \uc8fc\uc138\uc694',
                ],
                _ggk_too_fast: [
                  '\ub108\ubb34 \ube60\ub985\ub2c8\ub2e4.',
                  l,
                  '\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc2dc ',
                  '\uac70\ub098',
                  u,
                  ' \ubb38\uc81c\ub97c \ubcf4\uace0\ud574 \uc8fc\uc138\uc694',
                ],
                _ggk_action_timeout: [
                  '\uc2dc\uac04\uc774 \ucd08\uacfc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.',
                  l,
                  '\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc2dc ',
                  '\uac70\ub098',
                  u,
                  ' \ubb38\uc81c\ub97c \ubcf4\uace0\ud574 \uc8fc\uc138\uc694',
                ],
                _ggk_fail: [
                  '\uc774\ub7f0, \ub2ed\uc774 \ub2ec\uc544\ub0ac\uc2b5\ub2c8\ub2e4.',
                  l,
                  '\ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc2dc ',
                  '\uac70\ub098',
                  u,
                  ' \ubb38\uc81c\ub97c \ubcf4\uace0\ud574 \uc8fc\uc138\uc694',
                ],
                _ggk_loading: '\ub85c\ub529',
                _ggk_success:
                  '\ucd95\ud558\ud569\ub2c8\ub2e4! \ub2ed\uc744 \uc7a1\uc73c\uc168\uad70\uc694!',
              },
              ar_SA: {
                _ggk_guide:
                  '\u062d\u0631\u0651\u0643 \u0627\u0644\u0634\u0627\u0634\u0629 \u0644\u062d\u0630\u0641 \u062f\u062c\u0627\u062c\u062a\u064a\u0646',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u062a\u0648\u062c\u062f \u0645\u0634\u0643\u0644\u0629 \u0628\u0627\u0644\u0634\u0628\u0643\u0629. \u064a\u064f\u0631\u062c\u0649.',
                  l,
                  '\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 ',
                  '\u0623\u0648',
                  u,
                  ' \u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
                ],
                _ggk_too_fast: [
                  '\u0643\u0646\u062a \u0633\u0631\u064a\u0639\u064b\u0627 \u062c\u062f\u064b\u0627. \u064a\u064f\u0631\u062c\u0649.',
                  l,
                  '\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 ',
                  '\u0623\u0648',
                  u,
                  ' \u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
                ],
                _ggk_action_timeout: [
                  '\u0627\u0646\u062a\u0647\u062a \u0627\u0644\u0645\u0647\u0644\u0629\u060c \u064a\u064f\u0631\u062c\u0649.',
                  l,
                  '\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 ',
                  '\u0623\u0648',
                  u,
                  ' \u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
                ],
                _ggk_fail: [
                  '\u0639\u0630\u0631\u064b\u0627\u060c \u0644\u0642\u062f \u0647\u0631\u0628\u062a \u0627\u0644\u062f\u062c\u0627\u062c\u0627\u062a. \u064a\u064f\u0631\u062c\u0649.',
                  l,
                  '\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 ',
                  '\u0623\u0648',
                  u,
                  ' \u0627\u0644\u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
                ],
                _ggk_loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644',
                _ggk_success:
                  '\u062a\u0647\u0627\u0646\u064a\u0646\u0627! \u0644\u0642\u062f \u062d\u0635\u0644\u062a \u0639\u0644\u0649 \u0627\u0644\u062f\u062c\u0627\u062c\u062a\u064a\u0646!',
              },
              tr_TR: {
                _ggk_guide:
                  '2 adet tavu\u011fun \xfcst\xfcn\xfc \xe7izmek i\xe7in kayd\u0131r\u0131n',
                _ggk_start: '',
                _ggk_net_err: [
                  'A\u011fla ilgili bir sorun. L\xfctfen.',
                  l,
                  'tekrar deneyin ',
                  'veya',
                  u,
                  ' sorununuzu bildirin',
                ],
                _ggk_too_fast: [
                  'Fazla h\u0131zl\u0131yd\u0131n\u0131z. L\xfctfen.',
                  l,
                  'tekrar deneyin ',
                  'veya',
                  u,
                  ' sorununuzu bildirin',
                ],
                _ggk_action_timeout: [
                  'S\xfcre doldu, l\xfctfen.',
                  l,
                  'tekrar deneyin ',
                  'veya',
                  u,
                  ' sorununuzu bildirin',
                ],
                _ggk_fail: [
                  'T\xfch, tavuklar ka\xe7t\u0131. L\xfctfen.',
                  l,
                  'tekrar deneyin ',
                  'veya',
                  u,
                  ' sorununuzu bildirin',
                ],
                _ggk_loading: 'Y\xfckleniyor',
                _ggk_success: 'Tebrikler! Tavuklar\u0131 ald\u0131n\u0131z!',
              },
              th_TH: {
                _ggk_guide:
                  '\u0e40\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e02\u0e39\u0e14\u0e40\u0e2d\u0e32\u0e44\u0e01\u0e48\u0e2a\u0e2d\u0e07\u0e15\u0e31\u0e27',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e01\u0e31\u0e1a\u0e40\u0e04\u0e23\u0e37\u0e2d\u0e02\u0e48\u0e32\u0e22.',
                  l,
                  '\u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 ',
                  '\u0e2b\u0e23\u0e37\u0e2d',
                  u,
                  ' \u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13',
                ],
                _ggk_too_fast: [
                  '\u0e04\u0e38\u0e13\u0e17\u0e33\u0e40\u0e23\u0e47\u0e27\u0e40\u0e01\u0e34\u0e19\u0e44\u0e1b.',
                  l,
                  '\u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 ',
                  '\u0e2b\u0e23\u0e37\u0e2d',
                  u,
                  ' \u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13',
                ],
                _ggk_action_timeout: [
                  '\u0e2b\u0e21\u0e14\u0e40\u0e27\u0e25\u0e32.',
                  l,
                  '\u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 ',
                  '\u0e2b\u0e23\u0e37\u0e2d',
                  u,
                  ' \u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13',
                ],
                _ggk_fail: [
                  '\u0e2d\u0e38\u0e4a\u0e1b\u0e2a\u0e4c \u0e44\u0e01\u0e48\u0e27\u0e34\u0e48\u0e07\u0e2b\u0e19\u0e35\u0e44\u0e1b\u0e41\u0e25\u0e49\u0e27.',
                  l,
                  '\u0e42\u0e1b\u0e23\u0e14\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 ',
                  '\u0e2b\u0e23\u0e37\u0e2d',
                  u,
                  ' \u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13',
                ],
                _ggk_loading: '\u0e01\u0e33\u0e25\u0e31\u0e07\u0e42\u0e2b\u0e25\u0e14',
                _ggk_success:
                  '\u0e02\u0e2d\u0e41\u0e2a\u0e14\u0e07\u0e04\u0e27\u0e32\u0e21\u0e22\u0e34\u0e19\u0e14\u0e35! \u0e04\u0e38\u0e13\u0e08\u0e31\u0e1a\u0e44\u0e01\u0e48\u0e44\u0e14\u0e49!',
              },
              vi_VN: {
                _ggk_guide:
                  'Tr\u01b0\u1ee3t tr\xean m\xe0n h\xecnh \u0111\u1ec3 c\xe0o ra hai con g\xe0',
                _ggk_start: '',
                _ggk_net_err: [
                  'M\u1ea1ng g\u1eb7p s\u1ef1 c\u1ed1.',
                  l,
                  'Vui l\xf2ng th\u1eed l\u1ea1i ',
                  'ho\u1eb7c',
                  u,
                  ' b\xe1o c\xe1o s\u1ef1 c\u1ed1 c\u1ee7a b\u1ea1n',
                ],
                _ggk_too_fast: [
                  'B\u1ea1n \u0111\xe3 qu\xe1 nhanh.',
                  l,
                  'Vui l\xf2ng th\u1eed l\u1ea1i ',
                  'ho\u1eb7c',
                  u,
                  ' b\xe1o c\xe1o s\u1ef1 c\u1ed1 c\u1ee7a b\u1ea1n',
                ],
                _ggk_action_timeout: [
                  'H\u1ebft gi\u1edd.',
                  l,
                  'Vui l\xf2ng th\u1eed l\u1ea1i ',
                  'ho\u1eb7c',
                  u,
                  ' b\xe1o c\xe1o s\u1ef1 c\u1ed1 c\u1ee7a b\u1ea1n',
                ],
                _ggk_fail: [
                  'R\u1ea5t ti\u1ebfc, l\u0169 g\xe0 \u0111\xe3 ch\u1ea1y \u0111i r\u1ed3i.',
                  l,
                  'Vui l\xf2ng th\u1eed l\u1ea1i ',
                  'ho\u1eb7c',
                  u,
                  ' b\xe1o c\xe1o s\u1ef1 c\u1ed1 c\u1ee7a b\u1ea1n',
                ],
                _ggk_loading: '\u0110ang t\u1ea3i',
                _ggk_success:
                  'Xin ch\xfac m\u1eebng! B\u1ea1n \u0111\xe3 b\u1eaft \u0111\u01b0\u1ee3c g\xe0!',
              },
              nl_NL: {
                _ggk_guide: 'Sleep over het scherm om twee kippen weg te strepen',
                _ggk_start: '',
                _ggk_net_err: [
                  'Probleem met het netwerk.',
                  l,
                  'Probeer het opnieuw ',
                  'of',
                  u,
                  ' rapporteer uw probleem',
                ],
                _ggk_too_fast: [
                  'U was te snel.',
                  l,
                  'Probeer het opnieuw ',
                  'of',
                  u,
                  ' rapporteer uw probleem',
                ],
                _ggk_action_timeout: [
                  'Time-out.',
                  l,
                  'Probeer het opnieuw ',
                  'of',
                  u,
                  ' rapporteer uw probleem',
                ],
                _ggk_fail: [
                  'Oeps, de kippen zijn weggerend.',
                  l,
                  'Probeer het opnieuw ',
                  'of',
                  u,
                  ' rapporteer uw probleem',
                ],
                _ggk_loading: 'Laden',
                _ggk_success: 'Gefeliciteerd! U hebt de kippen!',
              },
              iw_HE: {
                _ggk_guide:
                  '\u05d4\u05d7\u05dc\u05e7 \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05d2\u05e8\u05d3 \u05d5\u05dc\u05d7\u05e9\u05d5\u05e3 \u05e9\u05ea\u05d9 \u05ea\u05e8\u05e0\u05d2\u05d5\u05dc\u05d5\u05ea',
                _ggk_start: '',
                _ggk_net_err: [
                  '\u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d1\u05e2\u05d9\u05d4.',
                  l,
                  '\u05d1\u05e2\u05d9\u05d9\u05ea \u05e8\u05e9\u05ea ',
                  '\u05d0\u05d5',
                  u,
                  ' \u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d1\u05e2\u05d9\u05d4',
                ],
                _ggk_too_fast: [
                  '\u05d4\u05d9\u05d9\u05ea \u05de\u05d4\u05d9\u05e8 \u05de\u05d3\u05d9.',
                  l,
                  '\u05d1\u05e2\u05d9\u05d9\u05ea \u05e8\u05e9\u05ea ',
                  '\u05d0\u05d5',
                  u,
                  ' \u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d1\u05e2\u05d9\u05d4',
                ],
                _ggk_action_timeout: [
                  '\u05d4\u05d6\u05de\u05df \u05ea\u05dd.',
                  l,
                  '\u05d1\u05e2\u05d9\u05d9\u05ea \u05e8\u05e9\u05ea ',
                  '\u05d0\u05d5',
                  u,
                  ' \u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d1\u05e2\u05d9\u05d4',
                ],
                _ggk_fail: [
                  '\u05d0\u05d5\u05e4\u05e1, \u05d4\u05ea\u05e8\u05e0\u05d2\u05d5\u05dc\u05d5\u05ea \u05d1\u05e8\u05d7\u05d5.',
                  l,
                  '\u05d1\u05e2\u05d9\u05d9\u05ea \u05e8\u05e9\u05ea ',
                  '\u05d0\u05d5',
                  u,
                  ' \u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05d1\u05e2\u05d9\u05d4',
                ],
                _ggk_loading: '\u05d8\u05d5\u05e2\u05df',
                _ggk_success:
                  '\u05de\u05d6\u05dc \u05d8\u05d5\u05d1! \u05d4\u05e9\u05d2\u05ea \u05d0\u05ea \u05d4\u05ea\u05e8\u05e0\u05d2\u05d5\u05dc\u05d5\u05ea!',
              },
              in_ID: {
                _ggk_guide: 'Geser untuk menggurat dua ekor ayam',
                _ggk_start: '',
                _ggk_net_err: [
                  'Masalah dengan jaringan.',
                  l,
                  'Coba lagi ',
                  'atau',
                  u,
                  ' laporkan masalah Anda',
                ],
                _ggk_too_fast: [
                  'Anda terlalu cepat.',
                  l,
                  'Coba lagi ',
                  'atau',
                  u,
                  ' laporkan masalah Anda',
                ],
                _ggk_action_timeout: [
                  'Waktu habis.',
                  l,
                  'Coba lagi ',
                  'atau',
                  u,
                  ' laporkan masalah Anda',
                ],
                _ggk_fail: [
                  'Ups, ayamnya lari.',
                  l,
                  'Coba lagi ',
                  'atau',
                  u,
                  ' laporkan masalah Anda',
                ],
                _ggk_loading: 'Memuat',
                _ggk_success: 'Selamat! Anda mendapatkan ayamnya!',
              },
            };
          for (s in p) p.hasOwnProperty(s) && i(p[s]);
          (p.zh_CN = p.cn),
            (p.zh_TW = p.tw),
            (p.en_US = p.en),
            (p.iw_IL = p.iw_HE),
            (p.pt_PT = p.pt_BR),
            (p.ar_MA = p.ar_SA),
            (e.language = p),
            (e.upLang = r),
            (e.replaceLang = a),
            (e.upResetIndex = c);
        },
        function(n, e, t) {
          'use strict';
          function i(n) {
            a || o(), (a.style.display = 'block');
            var e = l.querySelector('#' + n + '-stage-2');
            e && (a.appendChild(e), (s = !0));
          }
          function o() {
            (a = l.createElement('div')),
              (a.className = 'nc-h5-overlay _nc'),
              (a.innerHTML =
                '<div class="info"><i class="nc-iconfont icon-warn"></i><span>' +
                c('OVERLAY_INFORM') +
                '</span></div>'),
              l.getElementsByTagName('body')[0].appendChild(a);
          }
          function r(n) {
            var e = l.querySelector('#' + n + '-stage-3'),
              t = l.querySelector('#' + n + '-stage-2');
            t && e && a && (e.parentNode.insertBefore(t, e), (a.style.display = 'none')), (s = !1);
          }
          var a,
            c,
            s,
            l = document;
          n.exports = {
            show: i,
            hide: r,
            setTEXT: function(n) {
              c = n;
            },
          };
        },
        function(n, e, t) {
          'use strict';
          e.fail = function(n) {
            throw new Error('NC Fail: ' + n);
          };
        },
        function(n, e, t) {
          'use strict';
          n.exports = function() {
            var n = navigator.userAgent;
            return /Windows/.test(n)
              ? 'win'
              : /Macintosh/.test(n)
                ? 'mac'
                : /Android/.test(n)
                  ? 'Android'
                  : /(iPhone|iPad)/.test(n)
                    ? 'iOS'
                    : /Linux/.test(n)
                      ? 'linux'
                      : 'unknow';
          };
        },
        function(n, e, t) {
          'use strict';
          function i(n, e) {
            if ('string' == typeof e && -1 !== e.indexOf('.')) {
              var t = e.split('.'),
                o = t[0],
                r = t.slice(1).join('.');
              return n.hasOwnProperty(o) ? i(n[o], r) : '';
            }
            return n.hasOwnProperty(e) ? n[e] : '';
          }
          function o(n) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return n.replace(/\{\{([\w\.]+)\}\}/g, function(n, t) {
              return i(e, t);
            });
          }
          e.render = o;
        },
        function(n, e, t) {
          'use strict';
          function i(n) {
            var e,
              t = '',
              i = _.getElementById('umFlash');
            if (i && !t)
              try {
                (e = i.getCookie(n) || ''), (t = e);
              } catch (o) {}
            try {
              p.localStorage && !t && ((e = localStorage[n] || ''), (t = e));
            } catch (o) {}
            if (p.navigator.cookieEnabled && !t) {
              var r = _.cookie.indexOf(n + '=');
              if (-1 != r) {
                r += n.length + 1;
                var a = _.cookie.indexOf(';', r);
                -1 == a && (a = _.cookie.length),
                  (e = decodeURIComponent(_.cookie.substring(r, a)) || ''),
                  (t = e);
              }
            }
            return t;
          }
          function o(n, e, t) {
            t = t || 7;
            var i = new Date();
            i.setTime(i.getTime() + 864e5 * t),
              (_.cookie = [
                encodeURIComponent(n),
                '=',
                encodeURIComponent('' + e),
                ';expires=',
                i.toGMTString(),
              ].join(''));
          }
          function r() {
            var n,
              e = /Firefox/.test(navigator.userAgent);
            if (e)
              try {
                n = localStorage.getItem(g);
              } catch (t) {}
            return (n = n || i(g)), n || ((n = h + a(11)), o(g, n, 3650)), n;
          }
          function a(n) {
            for (var e = ''; e.length < n; )
              e += Math.random()
                .toString()
                .substr(2);
            return e.substring(e.length - n);
          }
          function c() {
            var n = (p._sec_module = p._sec_module || {});
            if ((u = n.token)) return u;
            var e = r();
            return (u = e + h + a(3)), (n.token = u), u;
          }
          function s() {
            if (f) return f;
            var n = '_umdata';
            try {
              p.localStorage && (f = localStorage.getItem(n));
            } catch (e) {}
            return f ? f : ((f = i(n)), f || '');
          }
          function l() {
            return d ? d : (d = s() || c());
          }
          var u,
            f,
            d,
            p = window,
            _ = document,
            g = '_uab_collina',
            h = p.pointman && pointman._now ? pointman._now : new Date().getTime();
          (e.getSecToken = c), (e.getNCToken = l);
        },
        ,
        ,
        ,
        ,
        function(n, e, t) {
          (e = n.exports = t(8)()),
            e.push([
              n.i,
              ".nc-container div#nc-loading-circle {\n  background: transparent;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n}\n.nc-container div#nc-loading-circle .sk-circle {\n  background: transparent;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.nc-container #nc-loading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #818181;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n  animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.nc-container #nc-loading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n  -ms-transform: rotate(30deg);\n  transform: rotate(30deg);\n}\n.nc-container #nc-loading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n  -ms-transform: rotate(60deg);\n  transform: rotate(60deg);\n}\n.nc-container #nc-loading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.nc-container #nc-loading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n  -ms-transform: rotate(120deg);\n  transform: rotate(120deg);\n}\n.nc-container #nc-loading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n  -ms-transform: rotate(150deg);\n  transform: rotate(150deg);\n}\n.nc-container #nc-loading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.nc-container #nc-loading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n  -ms-transform: rotate(210deg);\n  transform: rotate(210deg);\n}\n.nc-container #nc-loading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n  -ms-transform: rotate(240deg);\n  transform: rotate(240deg);\n}\n.nc-container #nc-loading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.nc-container #nc-loading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n  -ms-transform: rotate(300deg);\n  transform: rotate(300deg);\n}\n.nc-container #nc-loading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n  -ms-transform: rotate(330deg);\n  transform: rotate(330deg);\n}\n.nc-container #nc-loading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n.nc-container #nc-loading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n}\n.nc-container #nc-loading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n.nc-container #nc-loading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n.nc-container #nc-loading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n  animation-delay: -0.7s;\n}\n.nc-container #nc-loading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n  animation-delay: -0.6s;\n}\n.nc-container #nc-loading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n  animation-delay: -0.5s;\n}\n.nc-container #nc-loading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n  animation-delay: -0.4s;\n}\n.nc-container #nc-loading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n.nc-container #nc-loading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n  animation-delay: -0.2s;\n}\n.nc-container #nc-loading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n  animation-delay: -0.1s;\n}\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% {\n    opacity: 0;\n  }\n  40% {\n    opacity: 1;\n  }\n}\n.nc-container .scale_text2 #nc-loading-circle .sk-circle:before {\n  background-color: #fff;\n}\n",
              '',
            ]);
        },
        function(n, e, t) {
          var i = t(25);
          'string' == typeof i && (i = [[n.i, i, '']]),
            t(10)(i, {}),
            i.locals && (n.exports = i.locals);
        },
        function(n, e, t) {
          'use strict';
          e.names = {
            init: 'init',
            ready: 'ready',
            actionstart: 'actionstart',
            actionend: 'actionend',
            beforeverify: 'beforeverify',
            afterverify: 'afterverify',
            error: 'error',
            fail: 'fail',
            success: 'success',
            refresh: 'refresh',
          };
        },
        function(n, e, t) {
          'use strict';
          function i(n, e, t) {
            function i(n) {
              r || ((r = !0), n || o(), e(n));
            }
            var r,
              a = l[n.foreign] || l[0];
            (a = s.mix(a, n.apimap)),
              (UA_Opt.LogVal = '_n'),
              u.init(n),
              (UA_Opt.sendMethod = 8),
              (UA_Opt.Token = new Date().getTime() + ':' + n.token),
              s.loadScript(
                a.uab_Url,
                function(n) {
                  if (AWSC) {
                    var e = function() {
                      if (window.__captchah5__uab) {
                        if ((clearInterval(t), 'timeout' === window.__captchah5__uab))
                          return void i(f);
                        i(n);
                      }
                    };
                    AWSC.use('uab', function(n, e) {
                      'loaded' === n
                        ? (window.__captchah5__uab = e)
                        : 'timeout' === n && (window.__captchah5__uab = 'timeout');
                    });
                    var t = setInterval(e, 100);
                    e();
                  } else i(f);
                },
                t,
                n.retryTimes
              ),
              setTimeout(function() {
                i(f);
              }, t);
          }
          function o() {}
          function r(n, e, t) {
            var i = l[n.foreign] || l[0];
            (i = s.mix(i, n.apimap)),
              (function() {
                function o() {
                  (g.onload = g.onerror = null),
                    c.body.removeChild(g),
                    -1 != v && clearTimeout(v),
                    e();
                }
                for (
                  var r,
                    s = [
                      'innerWidth',
                      'innerHeight',
                      'outerWidth',
                      'outerHeight',
                      'screenX',
                      'screenY',
                      'availWidth',
                      'availHeight',
                      'colorDepth',
                      'width',
                      'height',
                    ],
                    l = [],
                    u = 0,
                    f = s.length;
                  f > u;
                  u++
                )
                  (r = s[u]), l.push(a[r] || '-');
                var d = encodeURIComponent(l.join('|')),
                  p = i.umid_serUrl + '/dc.htm?token=' + n.token,
                  _ = navigator.userAgent;
                _.indexOf('AppleWebKit') > 0 &&
                  navigator.vendor &&
                  -1 !== navigator.vendor.indexOf('Apple') &&
                  (p = i.umid_serUrl + '/la.htm?token=' + n.token);
                var g,
                  h = p + '&jsInfo=' + d;
                _.indexOf('AppleWebKit') > 0 &&
                navigator.vendor &&
                -1 !== navigator.vendor.indexOf('Apple')
                  ? ((g = c.createElement('iframe')), (g.src = h))
                  : ((g = new Image()), (g.src = h)),
                  c.body.appendChild(g),
                  (g.style.cssText = 'position:absolute;top:-9999px'),
                  (g.onload = g.onerror = o);
                var v = setTimeout(function() {
                  v = -1;
                }, t);
              })();
          }
          var a = window,
            c = document,
            s = t(0),
            l = t(12).URL_MAP,
            u = t(48),
            f = (t(3), 'timeout');
          e.load = function(n, e) {
            var t,
              o,
              a = !0,
              c = n.options,
              s = c.timeout || 1e4;
            i(
              c,
              function(i) {
                t = 1;
                var r = i == f;
                !o && a && (r && (n._err = 'TIMEOUT_uab'), e(r), (o = 1));
              },
              s
            ),
              r(
                c,
                function(i) {
                  a = 1;
                  var r = i == f;
                  !o && t && (r && (n._err = 'TIMEOUT_um'), e(r), (o = 1));
                },
                s
              );
          };
        },
        function(n, e, t) {
          'use strict';
          var i;
          (e.init = function(n, e) {
            function t(n) {
              var t = document.querySelector('#' + e.prefix + '-stage-2');
              return t.querySelector(n);
            }
            var o = 0;
            (n.onenterts_verifying = function() {
              var r = t('.input'),
                a = r.value;
              if (((r.disabled = !0), !a)) return void n.ts_verifyfail();
              var c = e.net,
                s = t('.btn-ok');
              s.disabled = !0;
              var l = e.options;
              (t('.icon.clear').style.display = 'none'),
                (t('.icon.refresh').style.display = 'none'),
                c.postCaptcha(a, i, function(e, t, i) {
                  var r = 'ok' === e && t && t.success && 100 === t.result.code,
                    a = (t && t.result) || {};
                  (a.csessionid = i),
                    r
                      ? n.ts_verifypass(a)
                      : (o++,
                        'timeout' === e
                          ? (n.ts_verifyerror(a), (o = 0))
                          : 'number' == typeof l.errorTimes && o >= l.errorTimes
                            ? (n.ts_verifyerror(a), (o = 0))
                            : n.ts_verifyfail(a));
                });
            }),
              (n.onleavets_verifying = function() {
                var n = t('.btn-ok');
                n.disabled = !1;
                var e = t('.input');
                (e.disabled = !1),
                  (t('.icon.clear').style.display = 'block'),
                  (t('.icon.refresh').style.display = 'block');
              });
          }),
            (e.setCaptchaToken = function(n) {
              i = n;
            });
        },
        function(n, e, t) {
          'use strict';
          var i = t(0);
          e.init = function(n) {
            var e = n.fsm;
            (e.onenteractiontimeout = function() {
              i.addClass(n.el, 'nc-fail');
            }),
              (e.onleaveactiontimeout = function() {
                i.removeClass(n.el, 'nc-fail');
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterdestroyed = function() {
              n.el.innerHTML = '';
            }),
              (e.onleavedestroyed = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onentererror = function() {}), (e.onleaveerror = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(0),
            o = t(14);
          e.init = function(n) {
            var e = n.fsm,
              t = i.mix({}, o.default_options, n.options || {});
            (e.onenterfail = function() {
              i.addClass(n.el, 'nc-fail');
              var e = n.scrape.prefix,
                o = document.getElementById(e + 'container');
              if (o && t.bg_back_fail) {
                var r = i.getElementsByClassName('nc-bg', o)[0];
                r && (r.style.background = 'url(' + t.bg_back_fail + ')');
              }
            }),
              (e.onleavefail = function() {
                i.removeClass(n.el, 'nc-fail');
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterinitially = function() {}), (e.onleaveinitially = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterload_error = function() {}), (e.onleaveload_error = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(28),
            o = t(102),
            r = t(27),
            a = t(0),
            c = r.names,
            s = t(2);
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterloading = function() {
              var t = n.scrape || o.create(n);
              (n.scrape = t),
                s
                  .resolve()
                  .then(function() {
                    var e = n._custom_state._on_loading;
                    return (
                      (e = Array.isArray(e) ? e : []),
                      e.length > 0
                        ? s.all(
                            a.map(e, function(n) {
                              return n();
                            })
                          )
                        : 0
                    );
                  })
                  .then(function() {
                    return new s(function(e, t) {
                      i.load(n, function(n) {
                        return n ? t(n) : e();
                      });
                    });
                  })
                  .then(function() {
                    var e = n._custom_state.loading;
                    return (
                      (e = Array.isArray(e) ? e : []),
                      e.length > 0
                        ? s.all(
                            a.map(e, function(n) {
                              return n();
                            })
                          )
                        : 0
                    );
                  })
                  .then(function() {
                    return new s(function(e, i) {
                      o.render(t, function(t) {
                        return t ? void i(t) : (n.fire(c.ready), void e());
                      });
                    });
                  })
                  .then(function() {
                    return e.load();
                  })
                  ['catch'](function(n) {
                    e.loaderror();
                  });
            }),
              (e.onleaveloading = function() {
                n.on_leave_loading && n.on_leave_loading();
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterneed_two_step_verify = function() {}),
              (e.onleaveneed_two_step_verify = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(0),
            o = t(14);
          e.init = function(n) {
            var e = n.fsm,
              t = i.mix({}, o.default_options, n.options || {});
            (e.onenterpass = function() {
              i.addClass(n.el, 'nc-pass');
              var e = (n.index > 0 ? n.index : 1, n.scrape.prefix),
                o = document.getElementById(e + 'container');
              if (o && t.bg_back_pass) {
                var r = i.getElementsByClassName('nc-bg', o)[0];
                r && (r.style.background = 'url(' + t.bg_back_pass + ')');
              }
            }),
              (e.onleavepass = function() {
                i.removeClass(n.el, 'nc-pass');
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterready = function() {}), (e.onleaveready = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterreseting = function() {
              e.resetdone();
            }),
              (e.onleavereseting = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_error = function() {}), (e.onleavets_error = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_fail = function() {}), (e.onleavets_fail = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_loading = function() {}), (e.onleavets_loading = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_pass = function() {}), (e.onleavets_pass = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_ready = function() {}), (e.onleavets_ready = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterts_verifying = function() {}), (e.onleavets_verifying = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            var e = n.fsm;
            (e.onenterverifying = function() {}), (e.onleaveverifying = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n) {
            (window.__captchah5_uaboption = new Object()),
              n.is_Opt
                ? ((UA_Opt.MPInterval =
                    'undefined' != typeof UA_Opt.MPInterval && UA_Opt.MPInterval > 0
                      ? UA_Opt.MPInterval
                      : 4),
                  (UA_Opt.MaxMCLog =
                    'undefined' != typeof UA_Opt.MaxMCLog && UA_Opt.MaxMCLog > 0
                      ? UA_Opt.MaxMCLog
                      : 12),
                  (UA_Opt.MaxKSLog =
                    'undefined' != typeof UA_Opt.MaxKSLog && UA_Opt.MaxKSLog > 0
                      ? UA_Opt.MaxKSLog
                      : 14),
                  (UA_Opt.MaxMPLog =
                    'undefined' != typeof UA_Opt.MaxMPLog && UA_Opt.MaxMPLog > 0
                      ? UA_Opt.MaxMPLog
                      : 5),
                  (UA_Opt.MaxFocusLog =
                    'undefined' != typeof UA_Opt.MaxFocusLog && UA_Opt.MaxFocusLog > 0
                      ? UA_Opt.MaxFocusLog
                      : 6),
                  (UA_Opt.SendInterval =
                    'undefined' != typeof UA_Opt.SendInterval && UA_Opt.SendInterval > 0
                      ? UA_Opt.SendInterval
                      : 5),
                  (UA_Opt.SendMethod =
                    'undefined' != typeof UA_Opt.SendMethod && UA_Opt.SendMethod > 0
                      ? UA_Opt.SendMethod
                      : 8),
                  (UA_Opt.GPInterval =
                    'undefined' != typeof UA_Opt.GPInterval && UA_Opt.GPInterval > 0
                      ? UA_Opt.GPInterval
                      : 1),
                  (UA_Opt.MaxGPLog =
                    'undefined' != typeof UA_Opt.MaxGPLog && UA_Opt.MaxGPLog > 0
                      ? UA_Opt.MaxGPLog
                      : 10),
                  (UA_Opt.MaxTCLog =
                    'undefined' != typeof UA_Opt.MaxTCLog && UA_Opt.MaxTCLog > 0
                      ? UA_Opt.MaxTCLog
                      : 12),
                  (UA_Opt.Flag =
                    'undefined' != typeof UA_Opt.Flag && UA_Opt.Flag > 0 ? UA_Opt.Flag : 2980046),
                  (UA_Opt.OnlyHost = 'undefined' != typeof UA_Opt.OnlyHost ? UA_Opt.OnlyHost : 1),
                  (window.__captchah5_uaboption.MPInterval =
                    'undefined' != typeof UA_Opt.MPInterval && UA_Opt.MPInterval > 0
                      ? UA_Opt.MPInterval
                      : 4),
                  (window.__captchah5_uaboption.MaxMCLog =
                    'undefined' != typeof UA_Opt.MaxMCLog && UA_Opt.MaxMCLog > 0
                      ? UA_Opt.MaxMCLog
                      : 12),
                  (window.__captchah5_uaboption.MaxKSLog =
                    'undefined' != typeof UA_Opt.MaxKSLog && UA_Opt.MaxKSLog > 0
                      ? UA_Opt.MaxKSLog
                      : 14),
                  (window.__captchah5_uaboption.MaxMPLog =
                    'undefined' != typeof UA_Opt.MaxMPLog && UA_Opt.MaxMPLog > 0
                      ? UA_Opt.MaxMPLog
                      : 5),
                  (window.__captchah5_uaboption.MaxFocusLog =
                    'undefined' != typeof UA_Opt.MaxFocusLog && UA_Opt.MaxFocusLog > 0
                      ? UA_Opt.MaxFocusLog
                      : 6),
                  (window.__captchah5_uaboption.SendInterval =
                    'undefined' != typeof UA_Opt.SendInterval && UA_Opt.SendInterval > 0
                      ? UA_Opt.SendInterval
                      : 5),
                  (window.__captchah5_uaboption.SendMethod =
                    'undefined' != typeof UA_Opt.SendMethod && UA_Opt.SendMethod > 0
                      ? UA_Opt.SendMethod
                      : 8),
                  (window.__captchah5_uaboption.GPInterval =
                    'undefined' != typeof UA_Opt.GPInterval && UA_Opt.GPInterval > 0
                      ? UA_Opt.GPInterval
                      : 1),
                  (window.__captchah5_uaboption.MaxGPLog =
                    'undefined' != typeof UA_Opt.MaxGPLog && UA_Opt.MaxGPLog > 0
                      ? UA_Opt.MaxGPLog
                      : 10),
                  (window.__captchah5_uaboption.MaxTCLog =
                    'undefined' != typeof UA_Opt.MaxTCLog && UA_Opt.MaxTCLog > 0
                      ? UA_Opt.MaxTCLog
                      : 12),
                  (window.__captchah5_uaboption.Flag =
                    'undefined' != typeof UA_Opt.Flag && UA_Opt.Flag > 0 ? UA_Opt.Flag : 2980046),
                  (window.__captchah5_uaboption.OnlyHost =
                    'undefined' != typeof UA_Opt.OnlyHost ? UA_Opt.OnlyHost : 1),
                  (window.__captchah5_uaboption.MaxMTLog =
                    'undefined' != typeof UA_Opt.MaxMTLog ? UA_Opt.MaxMTLog : 300),
                  (window.__captchah5_uaboption.MinMTDwnLog =
                    'undefined' != typeof UA_Opt.MinMTDwnLog ? UA_Opt.MinMTDwnLog : 30),
                  (window.__captchah5_uaboption.MaxNGPLog =
                    'undefined' != typeof UA_Opt.MaxNGPLog ? UA_Opt.MaxNGPLog : 200),
                  (window.__captchah5_uaboption.sIDs =
                    'undefined' != typeof UA_Opt.sIDs
                      ? UA_Opt.sIDs
                      : ['_n1t|_n1z|nocaptcha|-stage-1']),
                  (window.__captchah5_uaboption.mIDs =
                    'undefined' != typeof UA_Opt.mIDs
                      ? UA_Opt.mIDs
                      : ['nc-canvas', 'click2slide-btn']),
                  (window.__captchah5_uaboption.hook =
                    'undefined' != typeof UA_Opt.hook ? UA_Opt.hook : 1),
                  (window.__captchah5_uaboption.font =
                    'undefined' != typeof UA_Opt.font ? UA_Opt.font : 1),
                  (window.__captchah5_uaboption.api =
                    'undefined' != typeof UA_Opt.api ? UA_Opt.api : 1))
                : ((UA_Opt.SendInterval = 5),
                  (UA_Opt.SendMethod = 8),
                  (UA_Opt.MaxMCLog = 12),
                  (UA_Opt.MaxKSLog = 14),
                  (UA_Opt.MaxMPLog = 5),
                  (UA_Opt.MaxGPLog = 10),
                  (UA_Opt.MaxTCLog = 12),
                  (UA_Opt.GPInterval = 1),
                  (UA_Opt.MPInterval = 4),
                  (UA_Opt.MaxFocusLog = 6),
                  (UA_Opt.isSendError = 1),
                  (UA_Opt.Flag = 2980046),
                  (UA_Opt.OnlyHost = 1),
                  (window.__captchah5_uaboption.SendInterval = 5),
                  (window.__captchah5_uaboption.SendMethod = 8),
                  (window.__captchah5_uaboption.MaxMCLog = 12),
                  (window.__captchah5_uaboption.MaxKSLog = 14),
                  (window.__captchah5_uaboption.MaxMPLog = 5),
                  (window.__captchah5_uaboption.MaxGPLog = 10),
                  (window.__captchah5_uaboption.MaxTCLog = 12),
                  (window.__captchah5_uaboption.GPInterval = 1),
                  (window.__captchah5_uaboption.MPInterval = 4),
                  (window.__captchah5_uaboption.MaxFocusLog = 6),
                  (window.__captchah5_uaboption.isSendError = 1),
                  (window.__captchah5_uaboption.Flag = 2980046),
                  (window.__captchah5_uaboption.OnlyHost = 1),
                  (window.__captchah5_uaboption.MaxMTLog = 300),
                  (window.__captchah5_uaboption.MinMTDwnLog = 30),
                  (window.__captchah5_uaboption.MaxNGPLog = 200),
                  (window.__captchah5_uaboption.sIDs = ['_n1t|_n1z|nocaptcha|-stage-1']),
                  (window.__captchah5_uaboption.mIDs = ['nc-canvas', 'click2slide-btn']),
                  (window.__captchah5_uaboption.hook = 1),
                  (window.__captchah5_uaboption.font = 1),
                  (window.__captchah5_uaboption.api = 1));
          };
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        function(n, e, t) {
          'use strict';
          function i(n) {
            return 'scrape' === n.type;
          }
          var o = t(76),
            r = t(77),
            a = ['on', 'setEnabled', 'reset', 'show', 'hide', 'getState'],
            c = { index: 0, js_type: 'h5', v: t(6).v };
          e.makeNC = function() {
            var n = function s(n) {
              (this.nc_obj = i(n) ? new r.NC2(n, c) : new o.NoCaptcha()), (s.__nc = this.nc_obj);
              var e = this,
                t = this.nc_obj;
              a.forEach(function(n) {
                e[n] = function() {
                  return t[n].apply(t, arguments);
                };
              }),
                n && this.init(n);
            };
            (n.prototype = {
              init: function(n) {
                return this.__initialized
                  ? void (
                      win.console &&
                      win.console.warn(
                        '[nch5] Current NC(' + this.nc_obj.prefix + ') is already initialized!'
                      )
                    )
                  : (this.nc_obj.init(n), void (this.__initialized = 1));
              },
            }),
              t(75);
            var e = t(11);
            return (
              (n.upLang = e.upLang),
              (n.init = function(e) {
                var t;
                return (
                  i(e) ? (t = new r.NC2(e, c)) : ((t = new o.NoCaptcha()), t.init(e)),
                  (n.__nc = t),
                  t
                );
              }),
              a.forEach(function(e) {
                n[e] = function() {
                  var t = n.__nc;
                  return t ? t[e].apply(t, arguments) : void 0;
                };
              }),
              n
            );
          };
        },
        ,
        ,
        ,
        ,
        function(n, e, t) {
          'use strict';
          !(function(n, e) {
            var t = n.createElement('style');
            if ((n.getElementsByTagName('head')[0].appendChild(t), t.styleSheet))
              t.styleSheet.disabled || (t.styleSheet.cssText = e);
            else
              try {
                t.innerHTML = e;
              } catch (i) {
                t.innerText = e;
              }
          })(
            document,
            '@font-face{font-family:\'nc-iconfont\';src:url(\'//at.alicdn.com/t/font_skgl4wg07pgv6lxr.eot\');src:url(\'//at.alicdn.com/t/font_skgl4wg07pgv6lxr.eot?#iefix\') format(\'embedded-opentype\'),url(\'//at.alicdn.com/t/font_skgl4wg07pgv6lxr.woff\') format(\'woff\'),url(\'//at.alicdn.com/t/font_skgl4wg07pgv6lxr.ttf\') format(\'truetype\'),url(\'//at.alicdn.com/t/font_skgl4wg07pgv6lxr.svg#iconfont\') format(\'svg\')}.nc-iconfont{font-family:"nc-iconfont" !important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}._nc .icon-close:before{content:"\\e601"}._nc .icon-notclick:before{content:"\\e60a"}._nc .icon-left-triangle:before{content:"\\e60c"}._nc .icon-checkbox:before{content:"\\e602"}._nc .icon-message:before{content:"\\e603"}._nc .icon-onclick:before{content:"\\e60b"}._nc .icon-refresh:before{content:"\\e604"}._nc .icon-list-check:before{content:"\\e605"}._nc .icon-warn:before{content:"\\e600"}._nc .icon-ok:before{content:"\\e606"}._nc .icon-slide-arrow:before{content:"\\e607"}._nc .icon-load-c:before{content:"\\e608"}._nc .icon-close-white:before{content:"\\e609"}._nc .icon-info:before{content:"\\e60d"}._nc{width:100%;height:100%;touch-action:none;font-size:16px}._nc *{padding:0;margin:0;border:none}._nc .icon{line-height:normal;width:30px;height:30px}._nc .icon-slide-arrow{font-size:30px;color:#dbdbdb}._nc .icon-ok{font-size:30px;color:#7ac23c}._nc .icon-close{font-size:30px;color:#fc5620}._nc .icon-load-c{font-size:30px;color:#7ac23c;padding-top:2px}._nc .icon-onclick{font-size:30px;color:#dddddd}._nc .icon-notclick{font-size:30px;color:#dddddd}._nc .icon-left-triangle{color:#dddddd}._nc .stage{position:relative;padding:0 15px}._nc .stage1{height:55px;position:relative}._nc .stage1 .bg-green{background-color:#78c430}._nc .stage1 .bg-red{background-color:#ff5500}._nc .stage1 .slider{position:absolute;height:52px;box-shadow:0 0 3px #999;background-color:#ddd;left:15px;right:15px}._nc .stage1 .label{display:block;width:100%;color:#aaa}._nc .stage1 .track.mv-back{-webkit-transition:width .5s}._nc .stage1 .button.mv-back{-webkit-transition:left .5s}._nc .stage1 .track{position:absolute;left:0;top:0;height:100%;width:0;overflow:hidden}._nc .stage1 .track div{color:#fff}._nc .stage1 .track div,._nc .stage1 .label{line-height:52px;height:52px;text-align:center;font-size:16px}._nc .stage1 .button{position:absolute;left:0;top:0;width:52px;height:52px;background-color:#fff;cursor:pointer}._nc .stage1 .icon{position:absolute;left:10px;top:0;bottom:0;margin:auto}._nc .stage1 .icon.nc-loading{-webkit-animation:_nc_rotate 1s linear infinite}._nc .stage1 .icon.yes{background-position:-60px 0}._nc .stage1 .icon.no{background-position:-90px 0}@media only screen and (min-device-width:320px) and (max-device-height:568px) and (-webkit-device-pixel-ratio:2){._nc .stage1 .icon{bottom:14px}}@-webkit-keyframes _nc_rotate{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}._nc .stage1 .click2slider{box-shadow:0 0 3px #999;position:relative;border-radius:4px;box-sizing:border-box;height:55px}._nc .stage1 .click2slider .click2slide-btn{width:52px;height:52px;position:absolute}._nc .stage1 .click2slider .click2slider-label{width:100%;line-height:52px;height:52px;text-align:center;font-size:16px;color:#aeaeae}._nc .stage1 .click2slider .click2slider-label .nc-iconfont.icon-left-triangle{position:relative;left:-10px}._nc .stage1 .click2slider .slider-holder{position:relative;width:auto;height:52px;margin-left:40px}._nc .stage1 .click2slider .slider-holder .slider,._nc .stage1 .click2slider .slider-holder .button,._nc .stage1 .click2slider .slider-holder .label{height:43px}._nc .stage1 .click2slider .slider-holder .slider{top:0;bottom:0;margin:auto}._nc .stage1 .click2slider .slider-holder .slider .track.moving{-moz-transition:.5s ease-out;-webkit-transition:.5s ease-out;-o-transition:.5s ease-out;transition:.5s ease-out}._nc .stage1 .click2slider .slider-holder .slider .button.moving{-moz-transition:.5s ease-out;-webkit-transition:.5s ease-out;-o-transition:.5s ease-out;transition:.5s ease-out}._nc .stage1 .click2slider .slider-holder .button{width:43px}._nc .stage1 .click2slider .slider-holder .button .icon{left:6px}._nc .stage1 .click2slider .slider-holder .label{line-height:43px}._nc .stage1 .click2slider .slider-holder .bg-green,._nc .stage1 .click2slider .slider-holder .bg-red{line-height:43px;height:43px}._nc .stage2 .textbox{width:100%;height:52px;position:relative;background-color:#fff;border-radius:6px;border:1px solid #bbb}._nc .stage2 .textbox .input{position:absolute;left:50px;top:6px;background:none;width:140px;height:40px;outline:none;font-size:18px;color:#333}._nc .stage2 .textbox .placeholder{position:absolute;-webkit-user-select:none;pointer-events:none;left:52px;top:14px;font-size:18px;color:#ccc}._nc .stage2 .textbox .code{position:absolute;right:50px;top:12px;border-left:2px solid #ccc}._nc .stage2 .icon{top:0;position:absolute;top:11px;font-size:30px;color:#999}._nc .stage2 .icon.tip{left:10px}._nc .stage2 .icon.clear{display:none;left:122px}._nc .stage2 .icon.refresh{right:11px}@media only screen and (min-device-width:320px) and (max-device-height:568px) and (-webkit-device-pixel-ratio:2){._nc .stage2 .icon{top:4px}}._nc .stage2 .btn-ok,._nc .stage2 .tips{width:100%;height:46px;margin-top:18px;border-radius:5px;color:#fff;font-size:20px;border:none;outline:none;background-color:#3199f4}._nc .stage2 .btn-ok:disabled{background-color:#ccc}._nc .stage2 .tips{background-color:#333;color:#fff;text-align:center;line-height:46px;display:none}._nc .stage3{height:150px}._nc .stage3 .title{font-size:20px;color:#777;width:100%;text-align:center;margin:40px 0 20px 0}._nc .stage3 .menu{position:absolute;width:50%;text-align:center}._nc .stage3 .menu *{display:inline-block}._nc .stage3 .menu .label{position:relative;font-size:16px;height:32px;line-height:32px;color:#666;top:-8px}._nc .stage3 .menu .icon{margin-right:10px;font-size:30px;color:#999}._nc .stage3 .menu.refresh .icon{background-position:-120px 0}._nc .stage3 .menu.feedback{right:0}._nc .stage3 .menu.feedback .icon{background-position:-150px 0}._nc .stage3 .menu.nc-sep{outline:1px solid #ccc;width:0;height:32px;left:50%}._nc .stage1 .label{background:-webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-animation:slidetounlock 3s infinite;-webkit-text-size-adjust:none}._nc .stage1 .label.no-anim{background:none;-webkit-background-clip:inherit;-webkit-text-fill-color:inherit;-webkit-animation:none}._nc .nc-hidden{display:none}@-webkit-keyframes slidetounlock{0%{background-position:-200px 0}100%{background-position:200px 0}}.nc-h5-overlay{position:fixed;z-index:100000;display:none;background:#f0f0f0;top:0;right:0;bottom:0;left:0;font-size:16px}.nc-h5-overlay div.info{display:block;padding:15px 10px;line-height:1.2em}.nc-h5-overlay div.info i.nc-iconfont{color:#f00;width:1.2em;font-size:120%;margin-right:.3em}._nc.nc-h5-overlay .stage2.stage{padding:0}._nc.nc-h5-overlay .stage2.stage div.ope{padding:0 15px}._nc.nc-h5-overlay .stage2 .textbox{border:none;border-radius:0}'
          );
        },
        function(n, e, t) {
          'use strict';
          function i() {
            (this.prefix = ''), (this.inner_trans = {}), (this.event_listeners = {});
          }
          var o = window,
            r = document,
            a = t(48),
            c = t(11),
            s = 0,
            l = t(27),
            u = t(20);
          (i.prototype = {
            init: function(n) {
              (n.token = n.token || u.getNCToken()),
                (n.foreign = n.foreign || '0'),
                (n.umidServer = n.umidServer || 'r'),
                (n.retryTimes = parseInt(n.retryTimes)),
                (n.apimap = n.apimap || {}),
                ('number' != typeof n.retryTimes || isNaN(n.retryTimes)) && (n.retryTimes = 5),
                (this.options = n),
                (this.fsm = t(82).makeFSM(this)),
                (this.net = t(83).makeNet(this.fsm, this)),
                this.net.initialize(),
                s++,
                (this.prefix = this.options.prefix || 'nc_' + s),
                (this.container = r.querySelector(this.options.renderTo)),
                this.fsm.init(),
                n.initHidden && this.hide();
            },
            getState: function() {
              return this.fsm.current;
            },
            has: function(n) {
              var e = this.event_listeners[n];
              return !!e;
            },
            on: function(n, e) {
              l.names.hasOwnProperty(n) &&
                (this.event_listeners[n] = this.event_listeners[n] || []).push(e);
            },
            fire: function(n) {
              var e,
                t,
                i = this.event_listeners[n];
              if (i) for (e = 0, t = i.length; t > e && i[e].call() !== !1; e++);
            },
            setEnabled: function(n) {
              n ? this.slider.enable() : this.slider.disable();
            },
            setTrans: function(n) {
              return n && (this.options.trans = n), this.options.trans;
            },
            getTrans: function() {
              return this.options.trans;
            },
            _reset: function() {
              this.container && (this.container.style.display = 'block'),
                this.options.appkey &&
                  this.options.token &&
                  ((UA_Opt.LogVal = '_n'),
                  a.init(this.options),
                  (UA_Opt.Token = new Date().getTime() + ':' + this.options.token),
                  UA_Opt.reload && UA_Opt.reload());
            },
            reset: function() {
              return this.fsm.can('reset') ? (this.fsm.reset(), !0) : (o.console && void 0, !1);
            },
            show: function() {
              this.container && (this.container.style.display = 'block');
            },
            hide: function() {
              this.container && (this.container.style.display = 'none');
            },
            _TEXT: function(n) {
              return c.trans(this.options.language, n);
            },
          }),
            (e.NoCaptcha = i);
        },
        function(n, e, t) {
          'use strict';
          function i(n, e) {
            if (!(n instanceof e)) throw new TypeError('Cannot call a class as a function');
          }
          var o = (function() {
              function n(n, e) {
                for (var t = 0; t < e.length; t++) {
                  var i = e[t];
                  (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    'value' in i && (i.writable = !0),
                    Object.defineProperty(n, i.key, i);
                }
              }
              return function(e, t, i) {
                return t && n(e.prototype, t), i && n(e, i), e;
              };
            })(),
            r = t(13),
            a = t(17),
            c = t(0),
            s = t(3),
            l = t(2),
            u = [
              { name: 'init', from: 'initially', to: 'loading' },
              { name: 'load', from: 'loading', to: 'ready' },
              { name: 'loaderror', from: ['loading', 'ready'], to: 'load_error' },
              { name: 'continueloading', from: 'load_error', to: 'loading' },
              { name: 'verify', from: ['ready', 'fail'], to: 'verifying' },
              { name: 'timeout', from: 'ready', to: 'actiontimeout' },
              { name: 'verifyfail', from: ['ready', 'verifying'], to: 'fail' },
              { name: 'verifyerror', from: 'verifying', to: 'error' },
              { name: 'verifytwostep', from: 'verifying', to: 'need_two_step_verify' },
              { name: 'verifypass', from: 'verifying', to: 'pass' },
              { name: 'reset', from: ['*'], to: 'reseting' },
              { name: 'resetdone', from: 'reseting', to: 'loading' },
              { name: 'destroy', from: ['*'], to: 'destroyed' },
              { name: 'showtwostep', from: 'need_two_step_verify', to: 'ts_loading' },
              { name: 'ts_load', from: 'ts_loading', to: 'ts_ready' },
              { name: 'ts_verify', from: ['ts_ready', 'ts_fail'], to: 'ts_verifying' },
              { name: 'ts_verifyfail', from: 'ts_verifying', to: 'ts_fail' },
              { name: 'ts_verifyerror', from: 'ts_verifying', to: 'ts_error' },
              { name: 'ts_verifyerror2', from: 'ts_error', to: 'error' },
              { name: 'ts_verifypass', from: 'ts_verifying', to: 'ts_pass' },
              { name: 'ts_passed', from: 'ts_pass', to: 'pass' },
            ],
            f = (function() {
              function n(e, t) {
                i(this, n);
                var o = 'cn';
                e.foreign && (o = 'en'),
                  (this.options = c.mix({}, o, e)),
                  (this.inn_vars = t),
                  t.index++,
                  (this.index = t.index),
                  (this.jsv = t.v),
                  (this.el = document.getElementById(e.renderTo.replace(/^#/, ''))),
                  this.el || a.fail("'renderTo'(" + e.renderTo + ') does not match any node.'),
                  this.makeFSM(),
                  this.initStates(),
                  (this.event_listeners = {}),
                  (this._custom_state = {}),
                  this.fsm.init();
              }
              return (
                o(n, [
                  {
                    key: 'makeFSM',
                    value: function() {
                      var n = this;
                      (this.fsm = r.create({ initial: 'initially', events: u })),
                        (this.fsm.onenterstate = function(e, t, i) {
                          if ('loading' !== i) {
                            var o = n._custom_state[i];
                            Array.isArray(o) &&
                              l.all(
                                c.map(o, function(n) {
                                  return n();
                                })
                              );
                          }
                        });
                    },
                  },
                  {
                    key: 'initStates',
                    value: function() {
                      var n = this;
                      c.map(u, function(e) {
                        t(134)('./' + e.to).init(n);
                      });
                    },
                  },
                  {
                    key: 'on',
                    value: function(n, e) {
                      (this.event_listeners[n] = this.event_listeners[n] || []).push(e);
                    },
                  },
                  {
                    key: 'reg',
                    value: function(n, e) {
                      (this._custom_state[n] = this._custom_state[n] || []),
                        this._custom_state[n].push(e);
                    },
                  },
                  {
                    key: 'fire',
                    value: function(n) {
                      for (
                        var e = (this.event_listeners[n] = this.event_listeners[n] || []), t = 0;
                        t < e.length && e[t].call() !== !1;
                        t++
                      );
                    },
                  },
                  {
                    key: 'reload',
                    value: function() {
                      this.fsm.reset();
                    },
                  },
                  {
                    key: 'reset',
                    value: function() {
                      this.fsm.reset();
                    },
                  },
                  {
                    key: 'show',
                    value: function() {
                      this.el.style.display = 'block';
                    },
                  },
                  {
                    key: 'hide',
                    value: function() {
                      this.el.style.display = 'none';
                    },
                  },
                  {
                    key: 'destroy',
                    value: function() {
                      this.is_destroyed || (this.fsm.destroy(), (this.is_destroyed = !0));
                    },
                  },
                  { key: 'setEnabled', value: function(n) {} },
                  { key: 'getState', value: function() {} },
                  {
                    key: '_log',
                    value: function(n, e, t) {
                      var i = this.options,
                        o =
                          i.token ||
                          UA_Opt.Token ||
                          ('undefined' != typeof umx && umx.getToken ? umx.getToken() : '');
                      s.log({
                        a: i.appkey,
                        t: o,
                        scene: i.scene,
                        ns: '',
                        jsv: this.jsv,
                        usa: navigator.userAgent,
                        p: t,
                        jsType: 'h5',
                        os: c.getOS(),
                        em: e,
                        ec: n,
                      });
                    },
                  },
                ]),
                n
              );
            })();
          e.NC2 = f;
        },
        function(n, e, t) {
          'use strict';
          var i = t(0),
            o = t(11);
          e.makeClickSlider = function(n) {
            function e(e) {
              return n.container.querySelector('.click2slider ' + e);
            }
            function t(n) {
              var t = e('.click2slide-btn .icon');
              t.className = 'icon ' + n;
            }
            function r(n) {
              var t = e('.click2slider-label');
              t.className = 'click2slider-label ' + n;
            }
            function a(e) {
              (w = e),
                c(),
                (p.innerHTML = o.trans(n.options.language, 'LOADING')),
                n.on('ready', function() {
                  t('nc-iconfont icon-notclick'),
                    (p.innerHTML =
                      '<span class="nc-iconfont icon-left-triangle"></span>' +
                      o.trans(n.options.language, 'CLICK_LABEL_READY'));
                }),
                n.on('success', function() {
                  t('nc-iconfont icon-ok');
                }),
                n.on('beforeverify', function() {
                  t('nc-iconfont icon-close');
                });
            }
            function c() {
              h.style.display = 'none';
            }
            function s() {
              k ||
                (t('nc-iconfont icon-onclick'),
                (p.style.display = 'none'),
                (h.style.display = 'block'),
                n.fire('actionstart'),
                l(),
                t('nc-iconfont icon-load-c nc-loading'),
                (k = !0),
                setTimeout(function() {
                  k = !1;
                }, 100));
            }
            function l() {
              var e = _.getBoundingClientRect(),
                t = _.clientWidth - v.clientWidth;
              (y.style.width = e.width + 'px'),
                n.slider.disable(),
                (v.style.left = t + 'px'),
                (m.style.width = t + 'px'),
                i.addClass(v, 'moving'),
                i.addClass(m, 'moving');
            }
            function u() {
              var n = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend',
              };
              for (var e in n) if (void 0 !== v.style[e]) return { end: n[e] };
              return !1;
            }
            function f() {
              g.removeEventListener(b, f), n.fire('actionend'), w && w();
            }
            function d() {
              g.addEventListener('touchstart', s),
                g.addEventListener('click', s),
                v.addEventListener(b, f);
            }
            var p, _, g, h, v, m, y, b;
            (_ = e('.slider-holder .slider')),
              (p = e('.click2slider-label')),
              (g = e('.click2slide-btn')),
              (h = e('.slider-holder')),
              (v = e('.slider .button')),
              (m = e('.slider .track')),
              (y = e('.slider .track div')),
              (b = u().end);
            var k, w;
            return { label: p, setClickBtnIcon: t, init: a, enable: d, setLabelIcon: r };
          };
        },
        function(module, exports, __webpack_require__) {
          'use strict';
          function _classCallCheck(n, e) {
            if (!(n instanceof e)) throw new TypeError('Cannot call a class as a function');
          }
          var _slicedToArray = (function() {
              function n(n, e) {
                var t = [],
                  i = !0,
                  o = !1,
                  r = void 0;
                try {
                  for (
                    var a, c = n[Symbol.iterator]();
                    !(i = (a = c.next()).done) && (t.push(a.value), !e || t.length !== e);
                    i = !0
                  );
                } catch (s) {
                  (o = !0), (r = s);
                } finally {
                  try {
                    !i && c['return'] && c['return']();
                  } finally {
                    if (o) throw r;
                  }
                }
                return t;
              }
              return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return n(e, t);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
              };
            })(),
            _createClass = (function() {
              function n(n, e) {
                for (var t = 0; t < e.length; t++) {
                  var i = e[t];
                  (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    'value' in i && (i.writable = !0),
                    Object.defineProperty(n, i.key, i);
                }
              }
              return function(e, t, i) {
                return t && n(e.prototype, t), i && n(e, i), e;
              };
            })(),
            html = __webpack_require__(81).html,
            kvTpl = __webpack_require__(19),
            util = __webpack_require__(0),
            cfg = __webpack_require__(14),
            URL_MAP = __webpack_require__(12).URL_MAP,
            language = __webpack_require__(15).language,
            replaceLang = __webpack_require__(15).replaceLang,
            upResetIndex = __webpack_require__(15).upResetIndex,
            Promise = __webpack_require__(2),
            Report = __webpack_require__(3),
            doc = document,
            getElementById = function(n) {
              return doc.getElementById(n);
            },
            styleEl = function(n, e, t) {
              return (n.style[e] = t);
            },
            ERR_CODE_API_FAIL = 'SCRAPE_API_FAIL',
            FAIL_PREPARE = 'fail_prepare',
            FAIL_ANALYZE = 'fail_analyze',
            win = window;
          __webpack_require__(26), __webpack_require__(132);
          var obj_w = -1,
            obj_h = -1,
            Scrape = (function() {
              function Scrape(n) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                _classCallCheck(this, Scrape),
                  (this.nc = n),
                  (this.prefix = n.prefix || 'nc_' + n.index + '_'),
                  (this.root = n.el);
                var t = {};
                if (
                  (e.foreign && (t.language = t.language || 'en'),
                  (this.options = util.mix({}, cfg.default_options, t, n.options || {}, e)),
                  (this._last_x = -1),
                  (this._last_y = -1),
                  (this.stroke_size = e.stroke_size || cfg.default_stroke_width),
                  (this.svr_data = {}),
                  (this._t_action = null),
                  (this.is_downgraded = !1),
                  (this._lang = language[this.options.language] || language.cn),
                  this.options.upLang)
                )
                  for (var i in this.options.upLang)
                    this._lang = replaceLang(i, this.options.upLang[i]);
                (this.scrapeStart = !1), (this.showingHow = !1), (this.mousedown = !1), this.reg();
                var o = URL_MAP[this.options.foreign] || URL_MAP[0];
                this.ajaxURL = util.mix(o, this.options.apimap);
                var r = this;
                window.report = function(n) {
                  r.report.call(r, n);
                };
              }
              return (
                _createClass(Scrape, [
                  {
                    key: 'reg',
                    value: function() {
                      var n = this,
                        e = this.nc;
                      e.reg('_on_loading', function() {
                        return n.loading_render();
                      }),
                        e.reg('loading', function() {
                          return n.loading_initGetSize();
                        }),
                        e.reg('verifying', function() {
                          return n.verifyMethod();
                        }),
                        e.reg('load_error', function() {
                          return n.on_load_error();
                        }),
                        e.reg('pass', function() {
                          return n.on_pass();
                        }),
                        e.reg('fail', function() {
                          return n.on_fail();
                        }),
                        e.reg('reseting', function() {
                          return n.on_reseting();
                        }),
                        e.reg('actiontimeout', function() {
                          return n.on_actiontimeout();
                        }),
                        (e.on_leave_loading = function() {
                          return n.on_leave_loading();
                        });
                    },
                  },
                  {
                    key: 'report',
                    value: function(n) {
                      var e = this;
                      Report.log(
                        {
                          a: e.options.appkey,
                          t: e.options.token,
                          ns: UA_VERSION,
                          jsv: e.nc.inn_vars.v,
                          scene: e.options.scene,
                          jsType: e.nc.inn_vars.js_type,
                          usa: navigator.userAgent,
                          os: util.getOS(),
                          p: n || '',
                        },
                        e.ajaxURL.api_report
                      );
                    },
                  },
                  {
                    key: 'loading_initGetSize',
                    value: function() {
                      var n = this,
                        e = this.options.objects;
                      return Promise.all(
                        util.map(e, function(n) {
                          return new Promise(function(e, t) {
                            util.getImgSize(n, function(n, i) {
                              n ? t([0, 0]) : e(i);
                            });
                          });
                        })
                      )
                        .then(function(e) {
                          var t = 0,
                            i = 0;
                          util.map(e, function(n) {
                            (t = Math.max(t, n[0])), (i = Math.max(i, n[1]));
                          }),
                            (n.obj_w = t),
                            (n.obj_h = i);
                        })
                        ['catch'](function(e) {
                          n.nc.fsm.loaderror();
                        });
                    },
                  },
                  {
                    key: 'on_leave_loading',
                    value: function() {
                      this.hideEl('loading');
                    },
                  },
                  {
                    key: 'on_reseting',
                    value: function() {
                      var n = this;
                      return Promise.resolve().then(function() {
                        return (
                          window.__captchah5__uab.resetSA && window.__captchah5__uab.resetSA(),
                          n.loading_render()
                        );
                      });
                    },
                  },
                  {
                    key: 'getParamOl',
                    value: function() {
                      var n = this.el_nc_canvas,
                        e = util.getElementLeft(n),
                        t = util.getElementTop(n);
                      return { x: e, y: t };
                    },
                  },
                  {
                    key: 'loading_sendInitReq',
                    value: function() {
                      var n = this;
                      return new Promise(function(e, t) {
                        var i = n.options,
                          o = n.getParamOl(),
                          r =
                            (window.__captchah5__uab.getUA &&
                              window.__captchah5__uab.getUA(window.__captchah5_uaboption)) ||
                            win._n ||
                            (UA_Opt.LogVal ? win[UA_Opt.LogVal] : '') ||
                            '',
                          a = r.length > 3 ? r.slice(0, 3) : '';
                        util.jsonp(
                          n.ajaxURL.api_prepare,
                          {
                            a: i.appkey,
                            t: i.token,
                            scene: i.scene,
                            jsType: n.nc.inn_vars.js_type,
                            ol: '{"x":' + o.x + ',"y":' + o.y + '}',
                            os: util.getOS(),
                            w: n.size.width,
                            h: n.size.height,
                            ow: n.obj_w,
                            oh: n.obj_h,
                            v: n.nc.inn_vars.v,
                            uav: a,
                          },
                          function(i, o) {
                            if (('ok' === i && (i = ''), i || !o.success))
                              return void t(i || 'data fail');
                            if (!o.result || !o.result.result) return void t('bad data');
                            try {
                              (n._prepare_result = o.result.result),
                                n.parsePrepareData(n._prepare_result);
                            } catch (r) {
                              return void t('prepare data parse fail!');
                            }
                            n.putObjects();
                            var a = n.getEl('inform');
                            (a.style.display = 'block'),
                              (a.innerHTML = n._lang._ggk_start),
                              n.showHow(),
                              (n.scrapeStart = !1),
                              util.addClass(n.root, 'nc-prepared'),
                              util.removeClass(n.root, 'nc-state-load-error');
                            var c = (n.nc.index > 0 ? n.nc.index : 1, n.getEl('container'));
                            if (c && n.options.bg_back_prepared) {
                              var s = util.getElementsByClassName('nc-bg', c)[0];
                              s && (s.style.background = 'url(' + n.options.bg_back_prepared + ')');
                            }
                            e();
                          },
                          1e4
                        );
                      })['catch'](function(e) {
                        (n.nc._err = FAIL_PREPARE), n.nc.fsm.loaderror();
                      });
                    },
                  },
                  {
                    key: 'parsePrepareData',
                    value: function parsePrepareData(result) {
                      try {
                        result = UA_Opt.decryptJSON(result);
                      } catch (e) {
                        throw e;
                      }
                      if (!result.success) throw new Error('decrypt fail2!');
                      result = result.data;
                      var data = result.replace(/&quot;/g, '"');
                      eval('data = ' + data),
                        (this.stroke_size = data.brushWidth),
                        (this.svr_data = data),
                        (this.session_id = data.sessionId);
                    },
                  },
                  {
                    key: 'getEl',
                    value: function(n) {
                      return getElementById(this.prefix + n);
                    },
                  },
                  {
                    key: 'putObjects',
                    value: function() {
                      var n = this,
                        e = this.svr_data,
                        t = e.objectPoints,
                        i = t.points;
                      if (
                        ((this._points = i),
                        !i || !Array.isArray(i) || i.length !== t.objectPointsCount)
                      )
                        throw new Error(
                          'Bad data: objectPoints.length is not equal to objectCounts!'
                        );
                      var o = this.getEl('bg');
                      o.innerHTML = util
                        .map(i, function(e, t) {
                          var i = e.x,
                            o = e.y,
                            r = i - n.obj_w / 2,
                            a = o - n.obj_h / 2,
                            c = n.options.elements,
                            s = c[t % c.length];
                          return (
                            '<img src="' +
                            s +
                            '" class="nc-scrape-icon" style="left:' +
                            r +
                            'px;top:' +
                            a +
                            'px;">'
                          );
                        })
                        .join('\n');
                    },
                  },
                  {
                    key: 'getSize',
                    value: function() {
                      var n = { width: this.options.width, height: this.options.height },
                        e = this.options.hasOwnProperty('width'),
                        t = this.options.hasOwnProperty('height'),
                        i = this.getEl('nc-canvas');
                      return (
                        (this.el_nc_canvas = i),
                        e || (n.width = i.offsetWidth),
                        n.width < cfg.min_width && (n.width = cfg.min_width),
                        styleEl(i, 'width', n.width + 'px'),
                        t || (n.height = i.offsetHeight),
                        n.height < cfg.min_height && (n.height = cfg.min_height),
                        styleEl(i, 'height', n.height + 'px'),
                        n
                      );
                    },
                  },
                  {
                    key: 'render_bg',
                    value: function() {
                      (this.el_bg = this.getEl('bg')),
                        styleEl(this.el_bg, 'width', this.size.width + 'px'),
                        styleEl(this.el_bg, 'height', this.size.height + 'px');
                    },
                  },
                  {
                    key: 'mkGridId',
                    value: function(n, e) {
                      return [this.prefix, 'grid', n, e].join('-');
                    },
                  },
                  {
                    key: 'render_surface_dg',
                    value: function() {
                      var n = this,
                        e = this.getEl('canvas-dg'),
                        t = this.size.width,
                        i = this.size.height;
                      (e.style.width = t + 'px'),
                        (e.style.height = i + 'px'),
                        (e.style.display = 'block');
                      for (
                        var o = cfg.grid_size,
                          r = Math.ceil(t / o),
                          a = Math.ceil(i / o),
                          c = [],
                          s = this.options.bg_back,
                          l = 0;
                        a > l;
                        l++
                      )
                        for (var u = 0; r > u; u++) {
                          var f = o * l,
                            d = o * u,
                            p = {
                              width: o + 'px',
                              height: o + 'px',
                              top: f + 'px',
                              left: d + 'px',
                              'background-image': 'url(' + s + ')',
                              'background-position': '-' + d + 'px -' + f + 'px',
                            },
                            _ = this.mkGridId(u, l),
                            g =
                              '<div id="' +
                              _ +
                              '" class="nc-canvas-dg-grid" style="' +
                              util.obj2style(p) +
                              '"></div>';
                          c.push(g);
                        }
                      e.innerHTML = c.join('');
                      var h = this.getEl('inform');
                      util.on(h, 'touchstart', function(e) {
                        return n.eventDown(e);
                      }),
                        util.on(h, 'mousedown', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(e, 'touchstart', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(document, 'touchend', function(e) {
                          return n.eventUp(e);
                        }),
                        util.on(e, 'touchmove', function(e) {
                          return n.eventMove(e);
                        }),
                        util.on(e, 'mousedown', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(document, 'mouseup', function(e) {
                          return n.eventUp(e);
                        }),
                        util.on(e, 'mousemove', function(e) {
                          return n.eventMove(e);
                        });
                    },
                  },
                  {
                    key: 'render_surface',
                    value: function() {
                      var n = this;
                      this.hideEl('canvas-dg');
                      var e = this.el_canvas,
                        t = this.ctx,
                        i = this.size;
                      (e.width = i.width), (e.height = i.height);
                      var o = this.getEl('cover');
                      (o.style.width = i.width + 'px'), (o.style.height = i.height + 'px');
                      var r = this.getEl('inform');
                      (t.fillStyle = '#ffffff'), t.fillRect(0, 0, i.width, i.height);
                      for (
                        var a = this.nc.index > 0 ? this.nc.index : 1, c = 0;
                        c < util.getElementsByClassName('nc_bg').length;
                        c++
                      ) {
                        var s = util.getElementsByClassName('nc_bg')[c];
                        s &&
                          this.options.bg_back &&
                          c === a - 1 &&
                          (s.style.background = 'url(' + this.options.bg_back + ')');
                      }
                      var l = new Image();
                      (l.src = this.options.bg_front),
                        (l.onload = function() {
                          t.globalCompositeOperation = 'source-over';
                          for (
                            var n = l.naturalWidth
                                ? [l.naturalWidth, l.naturalHeight]
                                : [l.width, l.height],
                              e = _slicedToArray(n, 2),
                              o = e[0],
                              r = e[1],
                              a = Math.ceil(i.width / o),
                              c = Math.ceil(i.height / r),
                              s = 0;
                            c > s;
                            s++
                          )
                            for (var u = 0; a > u; u++) t.drawImage(l, u * o, s * r);
                          t.globalCompositeOperation = 'destination-out';
                        }),
                        (l.onerror = function() {
                          t.globalCompositeOperation = 'destination-out';
                        }),
                        util.on(r, 'touchstart', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(r, 'mousedown', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(e, 'touchstart', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(document, 'touchend', function(e) {
                          return n.eventUp(e);
                        }),
                        util.on(e, 'touchmove', function(e) {
                          return n.eventMove(e);
                        }),
                        util.on(e, 'mousedown', function(e) {
                          return n.eventDown(e);
                        }),
                        util.on(document, 'mouseup', function(e) {
                          return n.eventUp(e);
                        }),
                        util.on(e, 'mousemove', function(e) {
                          return n.eventMove(e);
                        });
                    },
                  },
                  {
                    key: 'getPos',
                    value: function(n) {
                      var e = doc.documentElement.scrollLeft || doc.body.scrollLeft,
                        t = doc.documentElement.scrollTop || doc.body.scrollTop,
                        i = this.options.renderTo,
                        o = getElementById(0 === i.indexOf('#') ? i.slice(1) : i),
                        r = 0,
                        a = 0;
                      'absolute' == o.style.position && ((r = o.offsetLeft), (a = o.offsetTop));
                      var c = (n.clientX + e || n.pageX) - (r + this.offsetX || 0),
                        s = (n.clientY + t || n.pageY) - (a + this.offsetY || 0);
                      return [c, s];
                    },
                  },
                  {
                    key: '_clearTo_dg',
                    value: function(n, e) {
                      var t = Math.floor(n / cfg.grid_size),
                        i = Math.floor(e / cfg.grid_size),
                        o = this.mkGridId(t, i),
                        r = document.getElementById(o);
                      util.addClass(r, 'nc-clean');
                      var a = this._grid_x_count * i + t;
                      this.matrix[a] = 0;
                    },
                  },
                  {
                    key: '_clearTo',
                    value: function(n, e) {
                      if (this.is_downgraded) return this._clearTo_dg(n, e);
                      var t = this.ctx;
                      (t.fillStyle = '#fff'),
                        t.beginPath(),
                        t.arc(n, e, this.stroke_size / 2, 0, 2 * Math.PI),
                        t.fill(),
                        this._last_x >= 0 &&
                          this._last_y >= 0 &&
                          (t.beginPath(),
                          (t.lineWidth = this.stroke_size),
                          t.moveTo(this._last_x, this._last_y),
                          t.lineTo(n, e),
                          t.stroke()),
                        (this._last_x = n),
                        (this._last_y = e);
                    },
                  },
                  {
                    key: '_calcRegion',
                    value: function(n, e, t, i) {
                      for (
                        var o = this.ctx.getImageData(n, e, t, i).data, r = 0, a = 0;
                        a < o.length;
                        a += 4
                      )
                        o[a] && o[a + 1] && o[a + 2] && o[a + 3] && r++;
                      return 1 - r / t / i;
                    },
                  },
                  {
                    key: '_calcRegion_dg',
                    value: function(n, e, t, i) {
                      for (
                        var o = cfg.grid_size,
                          r = Math.floor(n / o),
                          a = Math.floor(e / o),
                          c = Math.floor(t / o),
                          s = Math.floor(i / o),
                          l = 0,
                          u = a;
                        a + s > u;
                        u++
                      )
                        for (var f = r; r + c > f; f++) {
                          var d = this._grid_x_count * u + f;
                          l += this.matrix[d];
                        }
                      return 1 - l / c / s;
                    },
                  },
                  {
                    key: 'calc_dg',
                    value: function() {
                      var n = this,
                        e = void 0,
                        t = void 0,
                        i = this.matrix.reduce(function(n, e) {
                          return n + e;
                        }, 0);
                      e = 1 - i / this._grid_sum;
                      var o = this.is_downgraded ? 0.7 : 0.9,
                        r = (this.obj_w / 2) * o,
                        a = (this.obj_h / 2) * o;
                      return (
                        (t = util.map(this._points, function(e) {
                          var t = e.x,
                            i = e.y;
                          return n._calcRegion_dg(t - r, i - a, n.obj_w, n.obj_h);
                        })),
                        { r_all: e, r_objects: t }
                      );
                    },
                  },
                  {
                    key: 'calc',
                    value: function() {
                      var n = this;
                      if (this.is_downgraded) return this.calc_dg();
                      var e = this.size,
                        t = e.width,
                        i = e.height,
                        o = this._calcRegion(0, 0, t, i),
                        r = this.obj_w / 2,
                        a = this.obj_h / 2,
                        c = util.map(this._points, function(e) {
                          var t = e.x,
                            i = e.y;
                          return n._calcRegion(t - r, i - a, n.obj_w, n.obj_h);
                        });
                      return { r_all: o, r_objects: c };
                    },
                  },
                  {
                    key: 'checkEnd',
                    value: function(n, e) {
                      var t =
                        0 ===
                        e.filter(function(n) {
                          return 0.5 > n;
                        }).length;
                      if (
                        (n > 0.9 || t) &&
                        window.__captchah5__uab.isReadyForSC(window.__captchah5_uaboption.mIDs) &&
                        'ready' === this.nc.fsm.current
                      )
                        this.verify();
                      else if (n > 0.9 && t) {
                        try {
                          UA_Opt.sendSA();
                        } catch (i) {}
                        win._n_bak = win._n;
                        var o = [win._n_bak, util.obj2str(this._prepare_result)];
                        (this.nc._err = '3A'),
                          (this._fail_msg = this._updateSurveyUrl(this._lang._ggk_too_fast, o)),
                          this.verify_fail();
                      }
                    },
                  },
                  {
                    key: 'verify',
                    value: function() {
                      var n = this.nc.fsm;
                      n.can('verify') && this.nc.fsm.verify();
                    },
                  },
                  {
                    key: 'verifyMethod',
                    value: function verifyMethod() {
                      var _this10 = this,
                        options = this.options;
                      return (
                        clearTimeout(this._t_action),
                        new Promise(function(resolve, reject) {
                          try {
                          } catch (e) {
                            reject(e.message);
                          }
                          var trans = options.trans || {};
                          'string' == typeof trans && (trans = eval('0,' + trans));
                          for (var arr = options.elementID || [], i = 0; i < arr.length; i++) {
                            var id = arr[i],
                              el = doc.getElementById(id);
                            el && (trans[id] = el.value);
                          }
                          (win._n_bak = win._n),
                            util.jsonp(
                              _this10.ajaxURL.api_analyze,
                              {
                                a: options.appkey,
                                t: options.token,
                                s: _this10.session_id,
                                n:
                                  (window.__captchah5__uab.getUA &&
                                    window.__captchah5__uab.getUA(window.__captchah5_uaboption)) ||
                                  win._n ||
                                  (UA_Opt.LogVal ? win[UA_Opt.LogVal] : '') ||
                                  '',
                                p: util.obj2str(options.trans),
                                scene: options.scene,
                                jsType: _this10.nc.inn_vars.js_type,
                                lang: options.language,
                                v: _this10.nc.inn_vars.v,
                              },
                              function(n, e) {
                                if (('ok' === n && (n = null), n)) {
                                  _this10.nc._err = _this10.nc._err || FAIL_ANALYZE;
                                  var t = _this10._lang._ggk_net_err;
                                  return (
                                    (t = _this10._updateSurveyUrl(t)),
                                    (_this10._fail_msg = t),
                                    void reject('net fail!')
                                  );
                                }
                                if (e.success && e.result && e.result.success) {
                                  var i = e.result.result;
                                  if (0 === i.code) return _this10.verify_ok(i), void resolve();
                                  _this10.nc._err = _this10.nc._err || '4A';
                                }
                                reject(e.msg);
                              },
                              1e4
                            );
                        })
                          .then(function() {
                            UA_Opt.reload(), window.__captchah5__uab.resetSA();
                          })
                          ['catch'](function(n) {
                            UA_Opt.reload(),
                              window.__captchah5__uab.resetSA(),
                              (_this10.nc._err = _this10.nc._err || '4A'),
                              _this10.verify_fail();
                          })
                      );
                    },
                  },
                  {
                    key: 'verify_ok',
                    value: function(n) {
                      (this.verify_result = n), this.nc.fsm.verifypass();
                    },
                  },
                  {
                    key: 'verify_fail',
                    value: function(n) {
                      this.nc.fsm.verifyfail();
                    },
                  },
                  {
                    key: '_upResetIndex',
                    value: function(n) {
                      return upResetIndex(n, this.nc.index);
                    },
                  },
                  {
                    key: '_mkErrInfo',
                    value: function(n) {
                      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                        t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        i = this.options,
                        o = n,
                        r = [i.appkey, i.token, i.scene],
                        a = '';
                      switch (n) {
                        case FAIL_PREPARE:
                          !t && this.nc._log(FAIL_PREPARE, 'prepare timeout', '{code: 401}'),
                            (o = '2A'),
                            (a = '401');
                          break;
                        case FAIL_ANALYZE:
                          !t && this.nc._log(FAIL_ANALYZE, 'analyze timeout', '{code: 404}'),
                            (o = '2D'),
                            (a = '404');
                          break;
                        case 'TIMEOUT_uab':
                          !t && this.nc._log('TIMEOUT_uab', 'uab.js timeout', '{code: 403}'),
                            (o = '2C'),
                            (a = '403');
                          break;
                        case 'TIMEOUT_um':
                          !t && this.nc._log('TIMEOUT_um', 'um.js timeout', '{code: 402}'),
                            (o = '2B'),
                            (a = '402');
                      }
                      switch (o) {
                        case '3A':
                          (r = r.concat(e)),
                            !t &&
                              this.nc._log(
                                'ERR_SLIDE_TOO_FAST',
                                'too few mp',
                                '{code: 201, str:' + r + '}'
                              ),
                            (a = '201');
                          break;
                        case '4A':
                          (e = [this.session_id, win._n_bak]),
                            (r = r.concat(e)),
                            !t &&
                              this.nc._log(
                                ERR_CODE_API_FAIL + '_analyze',
                                'blocked',
                                '{code: 101, str:' + r + '}'
                              ),
                            (a = '101');
                          break;
                        case '5A':
                          (e = [this.session_id, win._n_bak]),
                            (r = r.concat(e)),
                            !t &&
                              this.nc._log(
                                ERR_CODE_API_FAIL + '_analyze',
                                'blocked',
                                '{code: 301, str:' + r + '}'
                              ),
                            (a = '301');
                      }
                      return (
                        i.failCallback && i.failCallback('{code: ' + a + ', str:' + r + '}'),
                        {
                          type: o,
                          str: r
                            .map(function(n) {
                              return encodeURIComponent(n);
                            })
                            .join(':-o'),
                        }
                      );
                    },
                  },
                  {
                    key: '_updateSurveyUrl',
                    value: function(n, e, t) {
                      n = n.replace(/%TOKEN\b/, this.options.token);
                      var i = this._mkErrInfo(this.nc._err, e, t);
                      return (
                        (n = n.replace(/%TYPE\b/, i.type)),
                        (n = n.replace(/%STR\b/, i.str)),
                        (n = this._upResetIndex(n))
                      );
                    },
                  },
                  {
                    key: 'on_load_error',
                    value: function(n) {
                      var e = this;
                      return new Promise(function(n, t) {
                        util.addClass(e.root, 'nc-state-load-error'),
                          util.removeClass(e.root, 'nc-prepared');
                        var i = function o() {
                          var t = e.getEl('load-error'),
                            i = void 0,
                            r = e.getEl('cover');
                          if (!e.size || !r) return void setTimeout(o, 10);
                          e.showEl('load-error'),
                            (i = e.size ? e.size.height : r.offsetHeight),
                            (t.style.marginTop = (i - 80) / 2 + 'px');
                          var a = e._lang._ggk_net_err;
                          (a = e._updateSurveyUrl(a)),
                            (e.getEl('load-error-msg').innerHTML = a),
                            e.tryToUpdateErrIcon(),
                            n();
                        };
                        i();
                      });
                    },
                  },
                  {
                    key: 'on_pass',
                    value: function() {
                      var n = this;
                      return (
                        clearTimeout(this._t_action),
                        Promise.resolve().then(function() {
                          n.hideEl('canvas-dg');
                          var e = n.getEl('ok');
                          (e.style.marginTop = (n.size.height - 80) / 2 + 'px'),
                            (n.getEl('ok-msg').innerHTML = n._lang._ggk_success);
                          var t = n.options.callback;
                          'function' == typeof t && t(n.verify_result);
                        })
                      );
                    },
                  },
                  {
                    key: 'getErrIcon',
                    value: function(n) {
                      return this.options.obj_error;
                    },
                  },
                  {
                    key: 'tryToUpdateErrIcon',
                    value: function() {
                      var n = this.getEl('fail-icon'),
                        e = this.getEl('load-error-icon');
                      if (((e.src = n.src = this.options.obj_fail), this.nc._err)) {
                        var t = this.getErrIcon(this.nc._err);
                        t && (e.src = n.src = t);
                      }
                      this.nc._err = '';
                    },
                  },
                  {
                    key: 'on_fail',
                    value: function() {
                      var n = this;
                      return (
                        clearTimeout(this._t_action),
                        Promise.resolve().then(function() {
                          n.is_downgraded && n.hideEl('canvas-dg');
                          var e = n.getEl('fail');
                          e.style.marginTop = (n.size.height - 80) / 2 + 'px';
                          var t = n._fail_msg || n._lang._ggk_fail;
                          (t = n._updateSurveyUrl(t, '', !0)),
                            (n.getEl('fail-msg').innerHTML = t),
                            (n._fail_msg = ''),
                            n.tryToUpdateErrIcon();
                          var i = n.options.error;
                          'function' == typeof i && i();
                        })
                      );
                    },
                  },
                  {
                    key: 'actionTimeout',
                    value: function() {
                      this.nc.fsm.timeout();
                    },
                  },
                  {
                    key: 'on_actiontimeout',
                    value: function() {
                      var n = this;
                      return Promise.resolve().then(function() {
                        var e = n.getEl('fail');
                        (e.style.marginTop = (n.size.height - 80) / 2 + 'px'),
                          n.hideEl('canvas-dg'),
                          (n.nc._err = '5A');
                        var t = n._lang._ggk_action_timeout;
                        (t = n._updateSurveyUrl(t)), (n.getEl('fail-msg').innerHTML = t);
                        var i = n.options.error;
                        'function' == typeof i && i();
                      });
                    },
                  },
                  {
                    key: 'eventDown',
                    value: function(n) {
                      try {
                        n.preventDefault();
                      } catch (e) {}
                      if ('ready' == this.nc.fsm.current) {
                        this.scrapeStart ||
                          ((this._last_x = -1), (this._last_y = -1), this.render_surface()),
                          (this.showingHow = !1),
                          (this.scrapeStart = !0),
                          (this.mousedown = !0),
                          (this.getEl('inform').style.display = 'none'),
                          (this.offsetX = this.el_nc_canvas.offsetLeft),
                          (this.offsetY = this.el_nc_canvas.offsetTop);
                        var t = this.getPos(n),
                          i = _slicedToArray(t, 2),
                          o = i[0],
                          r = i[1];
                        this._clearTo(o, r),
                          (this._old_onselectstart = doc.body.onselectstart),
                          (this._old_ondrag = doc.body.ondrag),
                          this.is_downgraded &&
                            (doc.body.onselectstart = doc.body.ondrag = function() {
                              return !1;
                            });
                      }
                    },
                  },
                  {
                    key: 'eventMove',
                    value: function(n) {
                      var e = this;
                      try {
                        n.preventDefault();
                      } catch (t) {}
                      if (this.mousedown) {
                        clearTimeout(this._t_action),
                          'ready' === this.nc.fsm.current &&
                            (this._t_action = setTimeout(function() {
                              e.actionTimeout();
                            }, cfg.action_timeout)),
                          n.changedTouches && (n = n.changedTouches[n.changedTouches.length - 1]);
                        var i = this.getPos(n),
                          o = _slicedToArray(i, 2),
                          r = o[0],
                          a = o[1];
                        this._clearTo(r, a);
                        var c = this.calc(),
                          s = c.r_all,
                          l = c.r_objects;
                        this.checkEnd(s, l);
                      }
                    },
                  },
                  {
                    key: 'eventUp',
                    value: function() {
                      (this.mousedown = !1),
                        (this._last_x = -1),
                        (this._last_y = -1),
                        this.is_downgraded &&
                          ((doc.body.onselectstart = this._old_onselectstart),
                          (doc.body.ondrag = this._old_ondrag)),
                        (this._old_onselectstart = null),
                        (this._old_ondrag = null);
                    },
                  },
                  {
                    key: 'mkMatrix',
                    value: function() {
                      var n = this.size,
                        e = n.width,
                        t = n.height,
                        i = cfg.grid_size,
                        o = Math.ceil(e / i),
                        r = Math.ceil(t / i),
                        a = o * r;
                      (this._grid_x_count = o),
                        (this.matrix = util.fill(new Array(a), 1)),
                        (this._grid_sum = a);
                    },
                  },
                  {
                    key: 'downgrade',
                    value: function() {
                      (this.is_downgraded = !0), this.mkMatrix();
                    },
                  },
                  {
                    key: 'bindEvents',
                    value: function() {
                      var n = this,
                        e = this.getEl('btn-refresh'),
                        t = this.getEl('btn-info');
                      util.on(e, 'touchend', function(e) {
                        try {
                          e.preventDefault();
                        } catch (e) {}
                        n.nc.reset();
                      }),
                        util.on(e, 'mouseup', function(e) {
                          if (n.scrapeStart) {
                            try {
                              e.preventDefault();
                            } catch (e) {}
                            n.nc.reset();
                          }
                        }),
                        util.on(t, 'touchend', function(e) {
                          try {
                            e.preventDefault();
                          } catch (e) {}
                          n.showHow();
                        }),
                        util.on(t, 'mouseup', function(e) {
                          try {
                            e.preventDefault();
                          } catch (e) {}
                          n.showHow();
                        });
                    },
                  },
                  {
                    key: 'showHow',
                    value: function() {
                      if (!this.showingHow && !this.scrapeStart) {
                        var n = this.getEl('show-how'),
                          e = [
                            [20, 6],
                            [19, 7],
                            [18, 10],
                            [17, 13],
                            [15, 15],
                            [13, 18],
                            [11, 24],
                            [8, 27],
                            [6, 32],
                            [5, 36],
                            [3, 41],
                            [2, 44],
                            [1, 47],
                            [1, 49],
                            [0, 55],
                            [0, 58],
                            [0, 64],
                            [0, 67],
                            [0, 68],
                            [0, 68],
                            [1, 68],
                            [3, 68],
                            [5, 68],
                            [6, 68],
                            [8, 67],
                            [10, 65],
                            [12, 63],
                            [14, 61],
                            [16, 59],
                            [18, 56],
                            [22, 53],
                            [26, 48],
                            [31, 43],
                            [36, 37],
                            [41, 31],
                            [45, 27],
                            [49, 24],
                            [58, 17],
                            [61, 14],
                            [64, 12],
                            [67, 9],
                            [69, 8],
                            [70, 7],
                            [72, 6],
                            [73, 6],
                            [72, 7],
                            [71, 9],
                            [70, 11],
                            [67, 15],
                            [66, 20],
                            [63, 26],
                            [62, 30],
                            [61, 35],
                            [60, 40],
                            [59, 43],
                            [58, 45],
                            [58, 49],
                            [57, 51],
                            [57, 52],
                            [57, 54],
                            [57, 55],
                            [57, 56],
                            [57, 57],
                            [58, 57],
                            [62, 57],
                            [65, 55],
                            [78, 47],
                            [84, 43],
                            [89, 38],
                            [96, 33],
                            [101, 28],
                            [105, 25],
                            [108, 22],
                            [112, 19],
                            [115, 17],
                            [118, 15],
                            [120, 13],
                            [122, 12],
                            [125, 10],
                            [128, 9],
                            [129, 8],
                            [131, 7],
                            [132, 7],
                            [133, 7],
                            [133, 10],
                            [133, 15],
                            [132, 24],
                            [131, 29],
                            [129, 35],
                            [128, 39],
                            [128, 42],
                            [127, 45],
                            [127, 48],
                            [127, 49],
                            [127, 51],
                            [127, 52],
                            [127, 52],
                            [128, 52],
                            [131, 50],
                            [135, 46],
                            [141, 42],
                            [149, 37],
                            [156, 32],
                            [162, 26],
                            [167, 22],
                            [172, 19],
                            [175, 16],
                            [177, 14],
                            [180, 12],
                            [183, 11],
                            [185, 9],
                            [189, 8],
                            [191, 6],
                            [193, 4],
                            [199, 1],
                            [201, 0],
                            [203, 0],
                            [204, 0],
                            [204, 2],
                            [204, 5],
                            [204, 11],
                            [204, 15],
                            [201, 21],
                            [200, 26],
                            [200, 32],
                            [199, 36],
                            [199, 40],
                            [199, 44],
                            [199, 46],
                            [199, 47],
                            [199, 48],
                            [200, 48],
                            [201, 48],
                            [204, 47],
                            [206, 46],
                            [209, 44],
                            [211, 43],
                            [215, 39],
                            [218, 36],
                            [222, 33],
                            [226, 30],
                            [228, 28],
                            [231, 24],
                            [234, 21],
                            [237, 19],
                            [239, 17],
                            [241, 16],
                            [242, 15],
                            [243, 14],
                            [244, 12],
                            [245, 11],
                            [246, 10],
                            [247, 9],
                          ],
                          t = 2,
                          i = 0,
                          o = 0,
                          r = e.length;
                        (n.style.display = 'block'), (n.style.left = '0px');
                        var a = this,
                          c = function s() {
                            return a.scrapeStart
                              ? void (n.style.display = 'none')
                              : ((a.showingHow = !0),
                                void (r > i
                                  ? ((n.style.left = e[i][0] + 'px'),
                                    (n.style.top = e[i][1] + 5 + 'px'),
                                    0 == i && a.render_surface(),
                                    a._clearTo(e[i][0] + 20, e[i][1] + 5),
                                    i++,
                                    setTimeout(s, 10))
                                  : (o++,
                                    t > o
                                      ? ((a._last_x = -1),
                                        (a._last_y = -1),
                                        (i = 0),
                                        setTimeout(s, 500))
                                      : ((a._last_x = -1),
                                        (a._last_y = -1),
                                        (n.style.display = 'none'),
                                        a.render_surface(),
                                        (a.showingHow = !1)))));
                          };
                        c();
                      }
                    },
                  },
                  {
                    key: 'showEl',
                    value: function(n) {
                      var e = this.getEl(n);
                      e && (e.style.display = 'block');
                    },
                  },
                  {
                    key: 'hideEl',
                    value: function(n) {
                      var e = this.getEl(n);
                      e && (e.style.display = 'none');
                    },
                  },
                  {
                    key: 'loading_render',
                    value: function() {
                      var n = this;
                      return new Promise(function(e, t) {
                        try {
                          var i = n.nc;
                          if (
                            ((n.root.innerHTML = kvTpl.render(html, {
                              nc: i,
                              prefix: n.prefix,
                              inform: '',
                              loading: n._lang._ggk_loading,
                              obj_ok: n.options.obj_ok,
                              obj_error: n.options.obj_error,
                            })),
                            n.showEl('loading'),
                            n.hideEl('load-error'),
                            (n.getEl('title').innerHTML = n._lang._ggk_guide),
                            n.bindEvents(),
                            (n.size = n.getSize()),
                            (n.getEl('container').style.width = n.size.width + 'px'),
                            n.render_bg(),
                            (n.el_canvas = n.getEl('canvas')),
                            !n.el_canvas.getContext || !(n.ctx = n.el_canvas.getContext('2d')))
                          )
                            return n.downgrade(), n.render_surface_dg(), void e();
                          n.render_surface(), e();
                        } catch (o) {
                          t(o);
                        }
                      });
                    },
                  },
                  {
                    key: 'render',
                    value: function() {
                      var n =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : function() {
                                return 0;
                              },
                        e = this.loading_sendInitReq();
                      e.then(n)['catch'](n);
                    },
                  },
                ]),
                Scrape
              );
            })();
          module.exports = Scrape;
        },
        function(n, e, t) {
          'use strict';
          var i = t(79);
          e.create = function(n, e) {
            return new i(n, e);
          };
        },
        function(n, e, t) {
          'use strict';
          e.html =
            '<div id="{{prefix}}container" class="nc-container nc-scrape"><div id="{{prefix}}for-tmp" class="nc-for-tmp"></div><div id="{{prefix}}toolbar" class="nc-toolbar"><span id="{{prefix}}title" class="nc-title">{{title}}</span> <span class="nc-btns"><i id="{{prefix}}btn-refresh" class="nc_iconfont icon_refresh">&#xe607;</i> <i id="{{prefix}}btn-info" class="nc_iconfont icon_info">&#xe602;</i></span></div><div id="{{prefix}}nc-canvas" class="nc-canvas"><div id="{{prefix}}bg" class="nc-bg"></div><div id="{{prefix}}cover" class="nc-cover"><canvas id="{{prefix}}canvas" class="nc-canvas-node"></canvas><div id="{{prefix}}canvas-dg" class="nc-canvas-dg" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none" onselectstart="return false"></div><div id="{{prefix}}ok" class="nc-verify-ok"><img src="{{obj_ok}}" alt=""><div><i class="nch5_iconfont icon_success">&#xe686;</i><span id="{{prefix}}ok-msg"></span></div></div><div id="{{prefix}}fail" class="nc-verify-fail"><img id="{{prefix}}fail-icon" src="{{obj_error}}" alt=""><div><i class="nch5_iconfont icon_error">&#xe604;</i><span id="{{prefix}}fail-msg"></span></div></div><div id="{{prefix}}loading" class="nc-loading"><div id="nc-loading-circle" class="nc-loading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div><span>{{loading}}</span></div><div id="{{prefix}}inform" class="nc-inform">{{inform}}</div><div id="{{prefix}}load-error" class="nc-load-error"><img id="{{prefix}}load-error-icon" src="{{obj_error}}" alt=""><div><i class="nch5_iconfont icon_error">&#xe604;</i><span id="{{prefix}}load-error-msg">Load Error!</span></div></div></div><div id="{{prefix}}show-how" class="nc-show-how"></div></div></div>';
        },
        function(n, e, t) {
          'use strict';
          var i = t(13).StateMachine;
          e.makeFSM = function(n) {
            var e = i.create({
              initial: 'initially',
              events: [
                { name: 'init', from: 'initially', to: 'loading' },
                { name: 'load', from: 'loading', to: 'ready' },
                { name: 'loaderror', from: 'loading', to: 'load_error' },
                { name: 'continueloading', from: 'load_error', to: 'loading' },
                { name: 'verify', from: ['ready', 'fail'], to: 'verifying' },
                { name: 'verifyfail', from: 'verifying', to: 'fail' },
                { name: 'verifyerror', from: 'verifying', to: 'error' },
                { name: 'verifytwostep', from: 'verifying', to: 'need_two_step_verify' },
                { name: 'verifypass', from: 'verifying', to: 'pass' },
                {
                  name: 'reset',
                  from: [
                    'ready',
                    'verifying',
                    'fail',
                    'error',
                    'pass',
                    'ts_ready',
                    'ts_verifying',
                    'ts_fail',
                    'ts_error',
                    'ts_pass',
                  ],
                  to: 'reseting',
                },
                { name: 'resetdone', from: 'reseting', to: 'ready' },
                { name: 'showtwostep', from: 'need_two_step_verify', to: 'ts_loading' },
                { name: 'ts_load', from: 'ts_loading', to: 'ts_ready' },
                { name: 'ts_verify', from: ['ts_ready', 'ts_fail'], to: 'ts_verifying' },
                { name: 'ts_verifyfail', from: 'ts_verifying', to: 'ts_fail' },
                { name: 'ts_verifyerror', from: 'ts_verifying', to: 'ts_error' },
                { name: 'ts_verifyerror2', from: 'ts_error', to: 'error' },
                { name: 'ts_verifypass', from: 'ts_verifying', to: 'ts_pass' },
                { name: 'ts_passed', from: 'ts_pass', to: 'pass' },
              ],
            });
            return (
              (e.onleavestate = function(n, e, t) {}),
              (e.onenterstate = function(n, e, t) {}),
              t(89).init(e, n),
              t(88).init(e, n),
              t(92).init(e, n),
              t(99).init(e, n),
              t(87).init(e, n),
              t(86).init(e, n),
              t(91).init(e, n),
              t(90).init(e, n),
              t(96).init(e, n),
              t(98).init(e, n),
              t(29).init(e, n),
              t(95).init(e, n),
              t(94).init(e, n),
              t(97).init(e, n),
              t(93).init(e, n),
              t(85).init(e, n),
              e
            );
          };
        },
        function(n, e, t) {
          'use strict';
          var i = window,
            o = document,
            r = t(0),
            a = t(6).v,
            c = t(12).URL_MAP;
          e.makeNet = function(n, e) {
            function t(n, e, t, i) {
              r.jsonp(
                n,
                e,
                function(n, e) {
                  t(n, e);
                },
                i,
                _.retryTimes || 5
              );
            }
            function s() {
              var n = {
                  a: _.appkey,
                  t: _.token,
                  scene: _.scene,
                  lang: _.language,
                  v: 'v1.2.11',
                  href: location.href.split('?')[0],
                  comm: '{}',
                },
                e = {};
              try {
                navigator.connection
                  ? ((e.cntp = encodeURIComponent(navigator.connection.type)),
                    (e.cneftp = encodeURIComponent(navigator.connection.effectiveType)))
                  : (e.cn = 'ns');
              } catch (i) {
                e.cn = 'e_cn';
              }
              try {
                if (navigator.getBattery) {
                  var o = Promise.race([
                    navigator.getBattery().then(function(n) {
                      n ? ((e.btryc = n.charging), (e.btryl = n.level)) : (e.btry = 'ns');
                    }),
                    new Promise(function(n, e) {
                      setTimeout(function() {
                        return e('abort');
                      }, 1e3);
                    }),
                  ]);
                  o.then(function(i) {
                    (n.comm = JSON.stringify(e)),
                      t(
                        h.initialize,
                        n,
                        function(n, e) {
                          'ok' === n && e && e.success && 0 === e.result.code,
                            e && e.result ? e.result : {};
                        },
                        _.timeout || 1e4
                      );
                  })['catch'](function(i) {
                    (e.btry = 'ab'),
                      (n.comm = JSON.stringify(e)),
                      t(
                        h.initialize,
                        n,
                        function(n, e) {
                          'ok' === n && e && e.success && 0 === e.result.code,
                            e && e.result ? e.result : {};
                        },
                        _.timeout || 1e4
                      );
                  });
                } else
                  (e.btry = 'ns'),
                    (n.comm = JSON.stringify(e)),
                    t(
                      h.initialize,
                      n,
                      function(n, e) {
                        'ok' === n && e && e.success && 0 === e.result.code,
                          e && e.result ? e.result : {};
                      },
                      _.timeout || 1e4
                    );
              } catch (i) {
                (e.btry = 'e_btry'),
                  (n.comm = JSON.stringify(e)),
                  t(
                    h.initialize,
                    n,
                    function(n, e) {
                      'ok' === n && e && e.success && 0 === e.result.code,
                        e && e.result ? e.result : {};
                    },
                    _.timeout || 1e4
                  );
              }
            }
            function l(n) {
              for (var e = n.offsetLeft, t = n.offsetParent; null !== t; )
                (e += t.offsetLeft), (t = t.offsetParent);
              return e;
            }
            function u(n) {
              for (var e = n.offsetTop, t = n.offsetParent; null !== t; )
                (e += t.offsetTop), (t = t.offsetParent);
              return e;
            }
            function f(n) {
              return parseInt(
                n.offsetWidth + 'a' + n.offsetHeight + 'a' + l(n) + 'a' + u(n),
                11
              ).toString(16);
            }
            function d(n) {
              var r = _.trans || {};
              'string' == typeof r && (r = JSON.parse(r));
              var c = _.elementID || [];
              c.forEach(function(n) {
                var e = o.getElementById(n);
                e && (r[n] = e.value);
              });
              var s;
              for (s in e.inner_trans) e.inner_trans.hasOwnProperty(s) && (r[s] = e.inner_trans[s]);
              try {
                r.ncSessionID = f(
                  document.getElementById(e.prefix + '-stage-1').getElementsByTagName('div')[0]
                );
              } catch (l) {
                r.ncSessionID = '0';
              }
              try {
                UA_Opt.sendSA();
              } catch (l) {}
              var u = {
                a: _.appkey,
                t: _.token,
                scene: _.scene,
                p: JSON.stringify(r),
                n:
                  (window.__captchah5__uab.getUA &&
                    window.__captchah5__uab.getUA(window.__captchah5_uaboption)) ||
                  i._n ||
                  (UA_Opt.LogVal ? i[UA_Opt.LogVal] : '') ||
                  '',
                v: a,
              };
              t(
                h.analyze,
                u,
                function(t, i) {
                  var o = 'ok' === t && i && i.success && 0 === i.result.code,
                    r = i && i.result ? i.result : {};
                  (e.sid = g = r.csessionid),
                    (e.captcha_type = r.value),
                    n({ pass: o, state: t }, r);
                },
                _.timeout || 1e4
              );
            }
            function p(n, e, o, r) {
              var c = {
                checkcode: JSON.stringify({ answer: n + '', captchaToken: e + '' }),
                csessionid: g,
                a: _.appkey,
                t: _.token,
                n:
                  (window.__captchah5__uab.getUA &&
                    window.__captchah5__uab.getUA(window.__captchah5_uaboption)) ||
                  i._n ||
                  (UA_Opt.LogVal ? i[UA_Opt.LogVal] : '') ||
                  '',
                v: a,
              };
              t(
                h.checkcode,
                c,
                function(n, e) {
                  o(n, e, g);
                },
                r || 1e4
              );
            }
            var _ = e.options,
              g = '',
              h = c[_.foreign] || c[0];
            return (
              (h = r.mix(h, _.apimap)), { initialize: s, postSlide: d, postCaptcha: p, send: t }
            );
          };
        },
        function(n, e, t) {
          'use strict';
          var i = document,
            o = t(0),
            r = t(11);
          e.makeSlider = function(n) {
            function e(e) {
              return n.container.querySelector(e);
            }
            function t(e) {
              if ('ready' == n.fsm.current && !w) {
                (w = !0), d();
                var t = v.getBoundingClientRect();
                (A = t.left), (T = A + t.width - _), (b.style.width = t.width + 'px');
                var o = (e.touches ? e.touches[0] : e).clientX;
                (x = A - o),
                  i.addEventListener('touchmove', c, !0),
                  i.addEventListener('mousemove', c, !0),
                  n.fire('actionstart');
              }
            }
            function a() {
              (w = !1),
                i.removeEventListener('touchmove', c, !0),
                i.removeEventListener('mousemove', c, !0),
                T > X &&
                  (o.addClass(m, 'mv-back'),
                  o.addClass(y, 'mv-back'),
                  (m.style.left = '0'),
                  (y.style.width = g + 'px'),
                  setTimeout(function() {
                    o.delClass(m, 'mv-back'), o.delClass(y, 'mv-back');
                  }, 500));
            }
            function c(e) {
              e.preventDefault(),
                (X = (e.touches ? e.touches[0] : e).clientX + x),
                A > X ? (X = A) : X > T && (X = T);
              var t = X - A;
              (m.style.left = t + 'px'),
                (y.style.width = t + g + 'px'),
                X == T && (a(), n.fire('actionend'), h && h());
            }
            function s() {
              m.addEventListener('touchstart', t),
                m.addEventListener('touchend', a),
                m.addEventListener('mousedown', t),
                m.addEventListener('mouseup', a),
                k.addEventListener('touchstart', t),
                k.addEventListener('touchend', a),
                k.addEventListener('mousedown', t),
                k.addEventListener('mouseup', a);
            }
            function l() {
              m.removeEventListener('touchstart', t),
                m.removeEventListener('touchend', a),
                m.removeEventListener('mousedown', t),
                m.removeEventListener('mouseup', a),
                k.removeEventListener('touchstart', t),
                k.removeEventListener('touchend', a),
                k.removeEventListener('mousedown', t),
                k.removeEventListener('mouseup', a);
            }
            function u(n, t) {
              var i = e('.track div');
              (i.innerHTML = n), (i.className = 'bg-' + (t || 'green'));
            }
            function f(n) {
              var t = e('.slider .icon');
              t.className = 'icon ' + n;
            }
            function d() {
              (_ = m.getBoundingClientRect().width), (g = _ / 2);
            }
            function p(t) {
              (h = t),
                (v = e('.slider')),
                (m = e('.button')),
                (y = e('.track')),
                (b = e('.track div')),
                (k = e('.label')),
                (k.innerHTML = r.trans(n.options.language, 'LOADING'));
              var i = navigator.userAgent;
              i && i.match(/Android/) && o.addClass(k, 'no-anim');
            }
            var _, g, h, v, m, y, b, k, w, x, X, A, T;
            return { init: p, enable: s, disable: l, setTitle: u, setIcon: f };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            (n.onreset = function() {}),
              (n.onbeforereset = function() {
                e._reset(), e.ui.init(), e.slider.enable();
              }),
              (n.onafterreset = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            (n.onentererror = function() {
              e.ui.setActiveStage(3, '00'), e.fire('error'), e.options.error();
            }),
              (n.onleaveerror = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            n.onenterfail = function() {
              function n(n, e, t) {
                for (var i = 0, o = e, r = n.length; r > o; )
                  (i <<= 3), (i += n.charCodeAt(o)), (o += t);
                0 > i && (i = 0 - i);
                for (
                  var a = '0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', c = '';
                  i >= 58;

                ) {
                  var s = i % 58;
                  (c = a[s] + c), (i = (i - s) / 58);
                }
                c += a[new Date().getDate()];
                var l = c.length;
                return l > 6 && (c = c.substr(l - 6, l - 1)), c;
              }
              e.ui.setActiveStage(3, 'error:' + n(e.options.token, 0, 1)), e.fire('fail');
            };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            n.onenterload_error = function() {
              e.ui.setActiveStage(3, '01'), e.options.error('load_error');
            };
          };
        },
        function(n, e, t) {
          'use strict';
          var i = window,
            o = t(28),
            r = t(0),
            a = t(101).makeUI;
          e.init = function(n, e) {
            function t(n) {
              return e._TEXT(n);
            }
            function c(n) {
              return e.container.querySelector(n);
            }
            (n.onenterloading = function() {
              var n = '//g.alicdn.com/mtb/lib-windvane/2.1.1/windvane.js';
              /windvane/i.test(navigator.userAgent) &&
                r.loadScript(n, function() {
                  i.WindVane &&
                    i.WindVane.call('aluWVJSBridge', 'getUmid', {}, function(n) {
                      e.inner_trans.nc_wvumidToken = n.aluUmid;
                    });
                }),
                (e.ui = a(e)),
                e.ui.init(),
                e._reset(),
                o.load(e, function(n) {
                  n ? e.fsm.loaderror() : e.fsm.load();
                });
              var s = c('.label');
              (s.innerHTML = t('LOADING')),
                e.slider.setIcon('nc-loading nc-iconfont icon-load-c'),
                e.fire('init');
            }),
              (n.onleaveloading = function() {
                e.slider.setIcon('nc-iconfont icon-slide-arrow');
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            n.onenterneed_two_step_verify = function(t, i, o, r) {
              e.fire('beforeverify'), n.showtwostep(r);
            };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            function t(n) {
              return e._TEXT(n);
            }
            (n.onenterpass = function(n, i, o, r) {
              e.slider.setTitle(t('CHECK_Y')), e.slider.setIcon('yes nc-iconfont icon-ok');
              var a = e.options;
              (r.sig = r.sig || r.value),
                'function' == typeof a.callback && a.callback(r),
                e.fire('success');
              var c;
              (c = !a.hasOwnProperty('bannerHidden') || a.bannerHidden),
                setTimeout(function() {
                  c && (e.container.style.display = 'none');
                }, 1e3);
            }),
              (n.onleavepass = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            function t(n) {
              return e._TEXT(n);
            }
            function i(n) {
              return e.container.querySelector(n);
            }
            n.onenterready = function() {
              var n = i('.label'),
                o = '//img.alicdn.com/tfs/TB1GhJXQXXXXXa.XFXXXXXXXXXX-75-52.png';
              e.options.isClick ? (n.innerHTML = '') : (n.innerHTML = t('SLIDER_LABEL'));
              var r = e.container.querySelector('.stage2 .textbox'),
                a = r && r.querySelector('input');
              if (
                (r.addEventListener(
                  'click',
                  function() {
                    a && a.focus();
                  },
                  !1
                ),
                e.options.logo)
              ) {
                var c = e.container.querySelector('.slider');
                (c.style.backgroundImage = 'url(' + o + ')'),
                  (c.style.backgroundPosition = '0 50%'),
                  (c.style.backgroundRepeat = 'repeat-x');
              }
              e.fire('ready');
            };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            n.onenterreseting = function() {
              n.resetdone();
            };
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(16);
          e.init = function(n, e) {
            n.onenterts_error = function() {
              i.hide(e.prefix), n.ts_verifyerror2();
            };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            function t(n) {
              var t = document.querySelector('#' + e.prefix + '-stage-2');
              return t.querySelector(n);
            }
            function i() {
              var n = t('.tips');
              (n.style.display = 'block'),
                o > 0 && clearTimeout(o),
                (o = setTimeout(function() {
                  (o = -1), (n.style.display = 'none');
                }, 2e3));
            }
            var o = -1;
            n.onenterts_fail = function() {
              var n = e.options;
              (UA_Opt.Token = new Date().getTime() + ':' + n.token),
                UA_Opt.reload && UA_Opt.reload(),
                e.updateImg(),
                i(),
                e.fire('fail');
            };
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(12).URL_MAP,
            o = t(0),
            r = t(29);
          e.init = function(n, e) {
            function t(n) {
              return e._TEXT(n);
            }
            function a(n) {
              var t = document.querySelector('#' + e.prefix + '-stage-2');
              return t.querySelector(n);
            }
            function c() {
              function i() {
                var n = 0 === h.value.length;
                (k.style.display = n ? 'block' : 'none'),
                  (v.style.display = n ? 'none' : 'block'),
                  (y.disabled = n);
              }
              function c(t) {
                var i = {
                  style: e.captcha_type || 'default',
                  identity: l.appkey,
                  sessionid: e.sid,
                  rnd: Math.random(),
                  token: l.token,
                };
                o.jsonp(
                  u.get_img,
                  i,
                  function(e, i) {
                    var o = 'ok' === e && i && i.success && 0 === i.result.resultCode;
                    o ? t(i) : 'timeout' === e && n.can('verifyerror') && n.verifyerror(i);
                  },
                  l.timeout || 1e4
                );
              }
              function f(t) {
                return (
                  'ts_verifying' !== n.current &&
                  (t && e.fire('beforeverify'),
                  void c(function(n) {
                    (s = n),
                      (_ = s.result.data[0]),
                      r.setCaptchaToken(s.result.captchaToken),
                      (g.src = _),
                      (g.onload = function() {
                        t && e.fire('afterverify');
                      }),
                      p();
                  }))
                );
              }
              function d() {
                f(!0);
              }
              function p() {
                (h.value = ''), h.focus(), i();
              }
              var _,
                g = a('img.code'),
                h = a('.input'),
                v = a('.icon.clear'),
                m = a('.icon.refresh'),
                y = a('.btn-ok'),
                b = a('.tips'),
                k = a('.placeholder');
              (k.innerHTML = t('TEXTBOX_HOLDER')),
                (y.innerHTML = t('BUTTON_OK')),
                (b.innerHTML = t('TIPS_TITLE')),
                (m.onclick = d),
                (g.onclick = d),
                (e.updateImg = f);
              var w = 0,
                x = 10;
              (g.onerror = function() {
                var n = -1 === _.indexOf('?') ? '?' : '&';
                w++,
                  w >= e.options.retryTimes ||
                    w > x ||
                    setTimeout(function() {
                      g.src = _ + n + '__retry=' + w;
                    }, 1e3);
              }),
                f();
            }
            var s,
              l = e.options,
              u = i[l.foreign] || i[0];
            (u = o.mix(u, l.apimap)),
              (n.onenterts_loading = function(i, o, r, a) {
                e.slider.setTitle(t('CHECK_N'), 'red'),
                  e.slider.setIcon('no nc-iconfont icon-close'),
                  e.options.verifycallback && e.options.verifycallback(a),
                  setTimeout(function() {
                    e.ui.setActiveStage(2), c(), n.ts_load();
                  }, 500);
              });
          };
        },
        function(n, e, t) {
          'use strict';
          var i = t(16);
          e.init = function(n, e) {
            (n.onenterts_pass = function(e, t, i, o) {
              (o.sig = o.sig || o.value), n.ts_passed(o);
            }),
              (n.onleavets_pass = function() {
                i.hide(e.prefix), e.ui.setActiveStage(1);
              });
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            n.onenterts_ready = function() {
              e.fire('afterverify');
              var n = e.container.querySelector('.stage2 .textbox'),
                t = n && n.querySelector('input');
              t && t.focus();
            };
          };
        },
        function(n, e, t) {
          'use strict';
          e.init = function(n, e) {
            function t(n) {
              return e._TEXT(n);
            }
            (n.onenterverifying = function() {
              function n() {
                e.net.postSlide(function(n, t) {
                  return (
                    -1 != i && clearTimeout(i),
                    'timeout' === n.state
                      ? void (e.fsm.can('verifyerror') && e.fsm.verifyerror(t))
                      : (n.pass
                          ? e.fsm.can('verifypass') && e.fsm.verifypass(t)
                          : 300 == t.code
                            ? e.fsm.can('verifyfail') && e.fsm.verifyfail(t)
                            : e.fsm.can('verifytwostep') && e.fsm.verifytwostep(t),
                        void (e.options.isClick && e.slider.setIcon('nc-hidden')))
                  );
                });
              }
              e.slider.disable();
              var i = setTimeout(function() {
                (i = -1),
                  e.slider.setTitle(t('LOADING')),
                  e.slider.setIcon('nc-loading nc-iconfont icon-load-c');
              }, 100);
              n();
            }),
              (n.onleaveverifying = function() {});
          };
        },
        function(n, e, t) {
          'use strict';
          var i = '\n<div class="slider">\n    <div class="label"></div>\n    <div class="track">\n        <div class="bg-green"></div>\n    </div>\n    <div class="button">\n        <div class="icon nc-iconfont icon-slide-arrow" id="@prefix@_n1t"></div>\n    </div>\n</div>  \n'.trim(),
            o = '\n<div class = "click2slider">\n  <div class="click2slide-btn">\n    <div class="icon nc-iconfont icon-load-c nc-loading"></div>\n  </div>\n  <div class="click2slider-label"></div>\n  <div class="slider-holder">\n    <div class="slider">\n        <div class="label"></div>\n        <div class="track">\n            <div class="bg-green"></div>\n        </div>\n        <div class="button">\n            <div class="icon nc-iconfont icon-slide-arrow" id="@prefix@_n1t"></div>\n        </div>\n   </div> \n    </div>\n</div>\n'.trim();
          e.make = function(n, e) {
            var t = e ? o : i,
              r = (
                '\n    <div class="_nc">\n    <div id="@prefix@-stage-1" class="stage stage1">\n        ' +
                t +
                '\n    </div>\n    <div id="@prefix@-stage-2" class="stage stage2">\n        <div class="textbox">\n            <input class="input" type="text" maxlength="6" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">\n            <div class="placeholder">\u9a8c\u8bc1\u7801</div>\n            <div class="icon tip nc-iconfont icon-message"></div>\n            <div class="icon clear nc-iconfont icon-close-white"></div>\n            <div class="icon refresh nc-iconfont icon-refresh"></div>\n            <img class="code" width="100" height="30" alt="">\n        </div>\n        <div class="ope">\n            <button class="btn-ok"></button>\n            <div class="tips"></div>\n        </div>\n    </div>\n    <div id="@prefix@-stage-3" class="stage stage3">\n        <div class="title"></div>\n        <span class="menu refresh">\n            <span class="icon nc-iconfont icon-refresh"></span><span class="label"></span>\n        </span>\n        <span class="menu nc-sep"></span>\n        <span class="menu feedback">\n            <span class="icon nc-iconfont icon-message"></span><span class="label"></span>\n        </span>\n    </div>\n    </div>\n    '
              ).trim();
            return r.replace(/\n\s+/g, '\n').replace(/@prefix@/g, n);
          };
        },
        function(n, e, t) {
          'use strict';
          var i = window,
            o = t(16),
            r = t(100),
            a = t(84),
            c = t(78),
            s = t(0);
          e.makeUI = function(n) {
            function e(e) {
              return n._TEXT(e);
            }
            function t(e) {
              return n.container.querySelector(e);
            }
            function l() {
              var e;
              for (e = 1; 3 >= e; e++)
                (g[e] = t('#' + n.prefix + '-stage-' + e)), (g[e].style.display = 'none');
              u(1);
            }
            function u(e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                i = g[h];
              if (
                (i && (i.style.display = 'none'),
                (i = g[e]),
                (i.style.display = 'block'),
                (h = e),
                3 == e && t)
              ) {
                var o = document
                  .getElementById(n.prefix + '-stage-3')
                  .getElementsByTagName('div')[0].innerHTML;
                (o = o + '(' + t + ')'),
                  (document
                    .getElementById(n.prefix + '-stage-3')
                    .getElementsByTagName('div')[0].innerHTML = o);
              }
              2 !== e || v.inline || f();
            }
            function f() {
              o.setTEXT(e), o.show(n.prefix);
            }
            function d() {
              function i() {
                var e = 0 === a.value.length;
                (u.style.display = e ? 'block' : 'none'),
                  'ts_verifying' === n.fsm.current && (e = !0),
                  (s.disabled = e),
                  (c.style.display = e ? 'none' : 'block');
              }
              function o() {
                (a.value = ''), a.focus(), i();
              }
              function r() {
                a.value && n.fsm.ts_verify();
              }
              var a = t('.input'),
                c = t('.icon.clear'),
                s = t('.btn-ok'),
                l = t('.tips'),
                u = t('.placeholder');
              (u.innerHTML = e('TEXTBOX_HOLDER')),
                (s.innerHTML = e('BUTTON_OK')),
                (l.innerHTML = e('TIPS_TITLE')),
                setInterval(i, 500),
                (a.onkeydown = function(n) {
                  13 == n.keyCode ? r() : setTimeout(i, 0);
                }),
                (a.onchange = i),
                (c.onclick = o),
                (s.onclick = r);
            }
            function p() {
              var o = t('.menu.refresh'),
                r = t('.menu.feedback');
              (o.onclick = function() {
                'load_error' == n.getState()
                  ? (n.fsm.continueloading(), n.slider.enable())
                  : n.has('refresh')
                    ? n.fire('refresh')
                    : location.reload();
              }),
                (r.onclick = function() {
                  i.open(e('FEEDBACK_URL'));
                }),
                (t('.stage3 .title').innerHTML = e('ERROR_TITLE')),
                (t('.menu.refresh .label').innerHTML = e('ERROR_RELOAD')),
                (t('.menu.feedback .label').innerHTML = e('ERROR_FEEDBACK'));
            }
            var _ = {},
              g = [],
              h = -1,
              v = n.options;
            return (
              (_.setActiveStage = u),
              (_.init = function() {
                o.hide(n.prefix),
                  (n.container.innerHTML = r.make(n.prefix, v.isClick)),
                  s.addClass(n.container, 'nc-container'),
                  (n.slider = a.makeSlider(n)),
                  n.slider.init(function() {
                    n.fsm.can('verify') && n.fsm.verify();
                  }),
                  n.options.isClick &&
                    ((n.click2slider = c.makeClickSlider(n)),
                    n.click2slider.init(function() {
                      n.fsm.can('verify') && n.fsm.verify();
                    }),
                    n.click2slider.enable()),
                  d(),
                  p(),
                  l();
              }),
              _
            );
          };
        },
        function(n, e, t) {
          'use strict';
          t(103);
          var i = t(80);
          (e.create = function(n) {
            return i.create(n, {});
          }),
            (e.render = function(n, e) {
              n.render(e);
            });
        },
        function(n, e, t) {
          'use strict';
          !(function(n, e) {
            var t = n.createElement('style');
            if ((n.getElementsByTagName('head')[0].appendChild(t), t.styleSheet))
              t.styleSheet.disabled || (t.styleSheet.cssText = e);
            else
              try {
                t.innerHTML = e;
              } catch (i) {
                t.innerText = e;
              }
          })(document, '.nc-wrapper.nc-ggk{font-size:12px}');
        },
        ,
        ,
        ,
        function(n, e, t) {
          'use strict';
          !(function() {
            var n = window;
            if (!n.__nch5) {
              n.UA_Opt = n.UA_Opt || {};
              var e = t(70).makeNC,
                i = e();
              (i.v = t(6).v), (n.__nch5 = i), (n.NoCaptcha = i);
            }
          })();
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        function(n, e, t) {
          (e = n.exports = t(8)()),
            e.push([
              n.i,
              '@font-face {\n  font-family: \'nc_iconfont\';\n  src: url("//at.alicdn.com/t/font_1465353706_4784257.eot");\n  src: url("//at.alicdn.com/t/font_1465353706_4784257.eot?#iefix") format(\'embedded-opentype\'), url("//at.alicdn.com/t/font_1465353706_4784257.woff") format(\'woff\'), url("//at.alicdn.com/t/font_1465353706_4784257.ttf") format(\'truetype\'), url("//at.alicdn.com/t/font_1465353706_4784257.svg#iconfont") format(\'svg\');\n}\n@font-face {\n  font-family: \'nch5_iconfont\'; /* project id 384029 */\n  src: url("//at.alicdn.com/t/font_384029_rhzpmteb25oecdi.eot");\n  src: url("//at.alicdn.com/t/font_384029_rhzpmteb25oecdi.eot?#iefix") format(\'embedded-opentype\'), url("//at.alicdn.com/t/font_384029_rhzpmteb25oecdi.woff") format(\'woff\'), url("//at.alicdn.com/t/font_384029_rhzpmteb25oecdi.ttf") format(\'truetype\'), url("//at.alicdn.com/t/font_384029_rhzpmteb25oecdi.svg#ncpc_iconfont") format(\'svg\');\n}\n.nc_iconfont {\n  font-family: "nc_iconfont";\n  color: hl_color;\n  font-size: 16px;\n  font-style: normal;\n}\n.nch5_iconfont {\n  font-family: "nch5_iconfont";\n  color: hl_color;\n  font-size: 16px;\n  font-style: normal;\n}\n.nc-container.nc-scrape {\n  font-size: 12px;\n  line-height: 20px;\n}\n.nc-container.nc-scrape a {\n  text-decoration: none;\n}\n.nc-container.nc-scrape .nc-toolbar {\n  height: 30px;\n  line-height: 30px;\n  font-size: 14px;\n}\n.nc-container.nc-scrape .nc-toolbar .nc-btns {\n  float: right;\n  height: 30px;\n  overflow: hidden;\n}\n.nc-container.nc-scrape .nc-toolbar .nc-btns i {\n  cursor: pointer;\n  margin-right: 5px;\n}\n.nc-container.nc-scrape .nc-toolbar .nc-btns i.icon_refresh {\n  color: #999;\n}\n.nc-container.nc-scrape .nc-toolbar .nc-btns i.icon_info {\n  color: #e98e0c;\n}\n.nc-container.nc-scrape .nc-canvas {\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: hidden;\n}\n.nc-container.nc-scrape .nc-canvas .nc-bg {\n  position: absolute;\n  background: #ccc url("https://img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png");\n}\n.nc-container.nc-scrape .nc-canvas .nc-bg img.nc-scrape-icon {\n  position: absolute;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover canvas {\n  position: absolute;\n  background-color: transparent;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover .nc-canvas-dg {\n  position: absolute;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover .nc-canvas-dg-grid {\n  position: absolute;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover .nc-canvas-dg-grid.nc-clean {\n  background: transparent !important;\n}\n.nc-container.nc-scrape .nc-canvas .nc-cover .nc-inform,\n.nc-container.nc-scrape .nc-canvas .nc-cover .nc-loading {\n  font-size: 14px;\n  position: absolute;\n  z-index: 1;\n  top: 50%;\n  width: 100%;\n  line-height: 1.3em;\n  text-align: center;\n  margin-top: -0.65em;\n  color: #3c3c3c;\n}\n.nc-container.nc-scrape .nc-canvas .nc-show-how {\n  position: absolute;\n  display: none;\n  background: url("https://img.alicdn.com/tfs/TB1aWq8gTvI8KJjSspjXXcgjXXa-53-49.png") no-repeat;\n  width: 68px;\n  height: 53px;\n  z-index: 10;\n  top: 20px;\n  margin-left: 20px;\n}\n.nc-container.nc-scrape .nc-canvas .nc-tblogin-verify-success {\n  text-align: center;\n  vertical-align: middle;\n  line-height: 31px;\n}\n.nc-container.nc-scrape .nc-canvas .nc-tblogin-verify-success .icon_ok {\n  margin-right: 10px;\n  color: #78c430;\n  position: relative;\n  top: 1px;\n}\n.nc-container.nc-scrape .nc-verify-ok,\n.nc-container.nc-scrape .nc-verify-fail,\n.nc-container.nc-scrape .nc-load-error {\n  display: none;\n  margin: auto;\n  height: 80px;\n  width: 250px;\n  text-align: center;\n  font-size: 14px;\n  color: #3c3c3c;\n  line-height: 20px;\n}\n.nc-container.nc-scrape .nc-verify-ok img,\n.nc-container.nc-scrape .nc-verify-fail img,\n.nc-container.nc-scrape .nc-load-error img {\n  display: block;\n  vertical-align: middle;\n  float: left;\n  margin-right: 10px;\n}\n.nc-container.nc-scrape .nc-verify-ok>div,\n.nc-container.nc-scrape .nc-verify-fail>div,\n.nc-container.nc-scrape .nc-load-error>div {\n  width: 180px;\n  height: 80px;\n  display: table;\n}\n.nc-container.nc-scrape .nc-verify-ok>div .icon_error,\n.nc-container.nc-scrape .nc-verify-fail>div .icon_error,\n.nc-container.nc-scrape .nc-load-error>div .icon_error,\n.nc-container.nc-scrape .nc-verify-ok>div .icon_success,\n.nc-container.nc-scrape .nc-verify-fail>div .icon_success,\n.nc-container.nc-scrape .nc-load-error>div .icon_success {\n  position: relative;\n  top: 18px;\n  margin-right: 5px;\n  color: #f40;\n}\n.nc-container.nc-scrape .nc-verify-ok>div .icon_success,\n.nc-container.nc-scrape .nc-verify-fail>div .icon_success,\n.nc-container.nc-scrape .nc-load-error>div .icon_success {\n  color: #78c430;\n}\n.nc-container.nc-scrape .nc-verify-ok>div>span,\n.nc-container.nc-scrape .nc-verify-fail>div>span,\n.nc-container.nc-scrape .nc-load-error>div>span {\n  display: table-cell;\n  vertical-align: middle;\n  height: 80px;\n  text-align: left;\n}\n.nc-pass .nc-container.nc-scrape .nc-toolbar .nc-btns {\n  visibility: hidden;\n}\n.nc-pass .nc-container.nc-scrape .nc-bg img {\n  display: none;\n}\n.nc-pass .nc-container.nc-scrape .nc-cover canvas,\n.nc-pass .nc-container.nc-scrape .nc-cover .nc-verify-fail {\n  display: none;\n}\n.nc-pass .nc-container.nc-scrape .nc-verify-ok {\n  display: block;\n}\n.nc-pass .nc-container.nc-scrape .nc-canvas .nc-bg {\n  background: #bbf0c6 url("https://img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png");\n}\n.nc-fail .nc-container.nc-scrape .nc-canvas .nc-bg {\n  background: url("https://img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png");\n}\n.nc-fail .nc-container.nc-scrape .nc-canvas .nc-bg img {\n  display: none;\n}\n.nc-fail .nc-container.nc-scrape .nc-cover canvas,\n.nc-fail .nc-container.nc-scrape .nc-cover .nc-verify-ok,\n.nc-fail .nc-container.nc-scrape .nc-cover .nc-canvas-dg {\n  display: none;\n}\n.nc-fail .nc-container.nc-scrape .nc-verify-fail {\n  display: block;\n}\n.nc-state-load-error .nc-container.nc-scrape .nc-load-error {\n  display: block;\n}\n.nc-state-load-error .nc-container.nc-scrape canvas,\n.nc-state-load-error .nc-container.nc-scrape .nc-inform {\n  display: none;\n}\n.nc-prepared .nc-container.nc-scrape .nc-bg {\n  background: #ccc url("https://img.alicdn.com/tfs/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png");\n}\n.nc-container.nc-scrape #nc-loading-circle {\n  margin: 0 10px;\n}\n.nc-container.nc-scrape #nc-loading-circle .sk-circle:before {\n  background-color: #fff;\n}\n',
              '',
            ]);
        },
        ,
        function(n, e, t) {
          var i = t(130);
          'string' == typeof i && (i = [[n.i, i, '']]),
            t(10)(i, {}),
            i.locals && (n.exports = i.locals);
        },
        ,
        function(n, e, t) {
          function i(n) {
            return t(o(n));
          }
          function o(n) {
            var e = r[n];
            if (!(e + 1)) throw new Error("Cannot find module '" + n + "'.");
            return e;
          }
          var r = {
            './actiontimeout': 30,
            './actiontimeout.js': 30,
            './destroyed': 31,
            './destroyed.js': 31,
            './error': 32,
            './error.js': 32,
            './fail': 33,
            './fail.js': 33,
            './initially': 34,
            './initially.js': 34,
            './load_error': 35,
            './load_error.js': 35,
            './loading': 36,
            './loading.js': 36,
            './need_two_step_verify': 37,
            './need_two_step_verify.js': 37,
            './pass': 38,
            './pass.js': 38,
            './ready': 39,
            './ready.js': 39,
            './reseting': 40,
            './reseting.js': 40,
            './ts_error': 41,
            './ts_error.js': 41,
            './ts_fail': 42,
            './ts_fail.js': 42,
            './ts_loading': 43,
            './ts_loading.js': 43,
            './ts_pass': 44,
            './ts_pass.js': 44,
            './ts_ready': 45,
            './ts_ready.js': 45,
            './ts_verifying': 46,
            './ts_verifying.js': 46,
            './verifying': 47,
            './verifying.js': 47,
          };
          (i.keys = function() {
            return Object.keys(r);
          }),
            (i.resolve = o),
            (n.exports = i),
            (i.id = 134);
        },
      ]);
    };
  chkQuerySet(), cond() > GREY_RATIO ? STABLE_ACTION() : NEW_ACTION();
})();
