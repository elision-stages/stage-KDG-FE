/*


   Magic Thumb v3.0.19 DEMO
   Copyright 2022 Magic Toolbox
   Buy a license: https://www.magictoolbox.com/magicthumb/
   License agreement: https://www.magictoolbox.com/license/


*/

window.MagicThumb = (function() {
  var M, y;
  M = y = (function() {
    var ai = {
      version: "v3.3.7",
      UUID: 0,
      storage: {},
      $uuid: function(am) {
        return (am.$J_UUID || (am.$J_UUID = ++ac.UUID))
      },
      getStorage: function(am) {
        return (ac.storage[am] || (ac.storage[am] = {}))
      },
      $F: function() {},
      $false: function() {
        return false
      },
      $true: function() {
        return true
      },
      stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
      defined: function(am) {
        return (am != null)
      },
      ifndef: function(an, am) {
        return (an != null) ? an : am
      },
      exists: function(am) {
        return !!(am)
      },
      jTypeOf: function(ao) {
        var am = 9007199254740991;

        function an(ap) {
          return typeof ap === "number" && ap > -1 && ap % 1 === 0 && ap <= am
        }
        if (!ac.defined(ao)) {
          return false
        }
        if (ao.$J_TYPE) {
          return ao.$J_TYPE
        }
        if (!!ao.nodeType) {
          if (ao.nodeType === 1) {
            return "element"
          }
          if (ao.nodeType === 3) {
            return "textnode"
          }
        }
        if (ao === window) {
          return "window"
        }
        if (ao === document) {
          return "document"
        }
        if (ao instanceof window.Function) {
          return "function"
        }
        if (ao instanceof window.String) {
          return "string"
        }
        if (ao instanceof window.Array) {
          return "array"
        }
        if (ao instanceof window.Date) {
          return "date"
        }
        if (ao instanceof window.RegExp) {
          return "regexp"
        }
        if (an(ao.length) && ao.item) {
          return "collection"
        }
        if (an(ao.length) && ao.callee) {
          return "arguments"
        }
        if ((ao instanceof window.Object || ao instanceof window.Function) && ao.constructor === ac.Class) {
          return "class"
        }
        if (ac.browser.trident) {
          if (ac.defined(ao.cancelBubble)) {
            return "event"
          }
        } else {
          if (ao === window.event || ao.constructor === window.Event || ao.constructor === window.MouseEvent || ao.constructor === window.UIEvent || ao.constructor === window.KeyboardEvent || ao.constructor === window.KeyEvent) {
            return "event"
          }
        }
        return typeof(ao)
      },
      extend: function(ar, aq) {
        if (!(ar instanceof window.Array)) {
          ar = [ar]
        }
        if (!aq) {
          return ar[0]
        }
        for (var ap = 0, an = ar.length; ap < an; ap++) {
          if (!ac.defined(ar)) {
            continue
          }
          for (var ao in aq) {
            if (!Object.prototype.hasOwnProperty.call(aq, ao)) {
              continue
            }
            try {
              ar[ap][ao] = aq[ao]
            } catch (am) {}
          }
        }
        return ar[0]
      },
      implement: function(aq, ap) {
        if (!(aq instanceof window.Array)) {
          aq = [aq]
        }
        for (var ao = 0, am = aq.length; ao < am; ao++) {
          if (!ac.defined(aq[ao])) {
            continue
          }
          if (!aq[ao].prototype) {
            continue
          }
          for (var an in (ap || {})) {
            if (!aq[ao].prototype[an]) {
              aq[ao].prototype[an] = ap[an]
            }
          }
        }
        return aq[0]
      },
      nativize: function(ao, an) {
        if (!ac.defined(ao)) {
          return ao
        }
        for (var am in (an || {})) {
          if (!ao[am]) {
            ao[am] = an[am]
          }
        }
        return ao
      },
      $try: function() {
        for (var an = 0, am = arguments.length; an < am; an++) {
          try {
            return arguments[an]()
          } catch (ao) {}
        }
        return null
      },
      $A: function(ao) {
        if (!ac.defined(ao)) {
          return ac.$([])
        }
        if (ao.toArray) {
          return ac.$(ao.toArray())
        }
        if (ao.item) {
          var an = ao.length || 0,
            am = new Array(an);
          while (an--) {
            am[an] = ao[an]
          }
          return ac.$(am)
        }
        return ac.$(Array.prototype.slice.call(ao))
      },
      now: function() {
        return new Date().getTime()
      },
      detach: function(aq) {
        var ao;
        switch (ac.jTypeOf(aq)) {
          case "object":
            ao = {};
            for (var ap in aq) {
              ao[ap] = ac.detach(aq[ap])
            }
            break;
          case "array":
            ao = [];
            for (var an = 0, am = aq.length; an < am; an++) {
              ao[an] = ac.detach(aq[an])
            }
            break;
          default:
            return aq
        }
        return ac.$(ao)
      },
      $: function(ao) {
        var am = true;
        if (!ac.defined(ao)) {
          return null
        }
        if (ao.$J_EXT) {
          return ao
        }
        switch (ac.jTypeOf(ao)) {
          case "array":
            ao = ac.nativize(ao, ac.extend(ac.Array, {
              $J_EXT: ac.$F
            }));
            ao.jEach = ao.forEach;
            ao.contains = ac.Array.contains;
            return ao;
            break;
          case "string":
            var an = document.getElementById(ao);
            if (ac.defined(an)) {
              return ac.$(an)
            }
            return null;
            break;
          case "window":
          case "document":
            ac.$uuid(ao);
            ao = ac.extend(ao, ac.Doc);
            break;
          case "element":
            ac.$uuid(ao);
            ao = ac.extend(ao, ac.Element);
            break;
          case "event":
            ao = ac.extend(ao, ac.Event);
            break;
          case "textnode":
          case "function":
          case "date":
          default:
            am = false;
            break
        }
        if (am) {
          return ac.extend(ao, {
            $J_EXT: ac.$F
          })
        } else {
          return ao
        }
      },
      $new: function(am, ao, an) {
        return ac.$(ac.doc.createElement(am)).setProps(ao || {}).jSetCss(an || {})
      },
      addCSS: function(ap, aq, an) {
        var am, at, ao, av = [],
          au = -1;
        an || (an = ac.stylesId);
        am = ac.$(an) || ac.$new("style", {
          id: an,
          type: "text/css"
        }).jAppendTo((document.head || document.body), "top");
        at = am.sheet || am.styleSheet;
        if (ac.jTypeOf(aq) !== "string") {
          for (var ao in aq) {
            av.push(ao + ":" + aq[ao])
          }
          aq = av.join(";")
        }
        if (at.insertRule) {
          au = at.insertRule(ap + " {" + aq + "}", at.cssRules.length)
        } else {
          try {
            au = at.addRule(ap, aq, at.rules.length)
          } catch (ar) {}
        }
        return au
      },
      removeCSS: function(ap, am) {
        var ao, an;
        ao = ac.$(ap);
        if (ac.jTypeOf(ao) !== "element") {
          return
        }
        an = ao.sheet || ao.styleSheet;
        if (an.deleteRule) {
          an.deleteRule(am)
        } else {
          if (an.removeRule) {
            an.removeRule(am)
          }
        }
      },
      generateUUID: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(ao) {
          var an = Math.random() * 16 | 0,
            am = ao === "x" ? an : (an & 3 | 8);
          return am.toString(16)
        }).toUpperCase()
      },
      getAbsoluteURL: (function() {
        var am;
        return function(an) {
          if (!am) {
            am = document.createElement("a")
          }
          am.setAttribute("href", an);
          return ("!!" + am.href).replace("!!", "")
        }
      })(),
      getHashCode: function(ao) {
        var ap = 0,
          am = ao.length;
        for (var an = 0; an < am; ++an) {
          ap = 31 * ap + ao.charCodeAt(an);
          ap %= 4294967296
        }
        return ap
      }
    };
    var ac = ai;
    var ad = ai.$;
    if (!window.magicJS) {
      window.magicJS = ai;
      window.$mjs = ai.$
    }
    ac.Array = {
      $J_TYPE: "array",
      indexOf: function(ap, aq) {
        var am = this.length;
        for (var an = this.length, ao = (aq < 0) ? Math.max(0, an + aq) : aq || 0; ao < an; ao++) {
          if (this[ao] === ap) {
            return ao
          }
        }
        return -1
      },
      contains: function(am, an) {
        return this.indexOf(am, an) != -1
      },
      forEach: function(am, ap) {
        for (var ao = 0, an = this.length; ao < an; ao++) {
          if (ao in this) {
            am.call(ap, this[ao], ao, this)
          }
        }
      },
      filter: function(am, ar) {
        var aq = [];
        for (var ap = 0, an = this.length; ap < an; ap++) {
          if (ap in this) {
            var ao = this[ap];
            if (am.call(ar, this[ap], ap, this)) {
              aq.push(ao)
            }
          }
        }
        return aq
      },
      map: function(am, aq) {
        var ap = [];
        for (var ao = 0, an = this.length; ao < an; ao++) {
          if (ao in this) {
            ap[ao] = am.call(aq, this[ao], ao, this)
          }
        }
        return ap
      }
    };
    ac.implement(String, {
      $J_TYPE: "string",
      jTrim: function() {
        return this.replace(/^\s+|\s+$/g, "")
      },
      eq: function(am, an) {
        return (an || false) ? (this.toString() === am.toString()) : (this.toLowerCase().toString() === am.toLowerCase().toString())
      },
      jCamelize: function() {
        return this.replace(/-\D/g, function(am) {
          return am.charAt(1).toUpperCase()
        })
      },
      dashize: function() {
        return this.replace(/[A-Z]/g, function(am) {
          return ("-" + am.charAt(0).toLowerCase())
        })
      },
      jToInt: function(am) {
        return parseInt(this, am || 10)
      },
      toFloat: function() {
        return parseFloat(this)
      },
      jToBool: function() {
        return !this.replace(/true/i, "").jTrim()
      },
      has: function(an, am) {
        am = am || "";
        return (am + this + am).indexOf(am + an + am) > -1
      }
    });
    ai.implement(Function, {
      $J_TYPE: "function",
      jBind: function() {
        var an = ac.$A(arguments),
          am = this,
          ao = an.shift();
        return function() {
          return am.apply(ao || null, an.concat(ac.$A(arguments)))
        }
      },
      jBindAsEvent: function() {
        var an = ac.$A(arguments),
          am = this,
          ao = an.shift();
        return function(ap) {
          return am.apply(ao || null, ac.$([ap || (ac.browser.ieMode ? window.event : null)]).concat(an))
        }
      },
      jDelay: function() {
        var an = ac.$A(arguments),
          am = this,
          ao = an.shift();
        return window.setTimeout(function() {
          return am.apply(am, an)
        }, ao || 0)
      },
      jDefer: function() {
        var an = ac.$A(arguments),
          am = this;
        return function() {
          return am.jDelay.apply(am, an)
        }
      },
      interval: function() {
        var an = ac.$A(arguments),
          am = this,
          ao = an.shift();
        return window.setInterval(function() {
          return am.apply(am, an)
        }, ao || 0)
      }
    });
    var aj = {};
    var ab = navigator.userAgent.toLowerCase();
    var aa = ab.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
    var af = ab.match(/(edge|opr)\/(\d+\.?\d*)/i) || ab.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
    var ah = ab.match(/version\/(\d+\.?\d*)/i);
    var W = document.documentElement.style;

    function X(an) {
      var am = an.charAt(0).toUpperCase() + an.slice(1);
      return an in W || ("Webkit" + am) in W || ("Moz" + am) in W || ("ms" + am) in W || ("O" + am) in W
    }
    ac.browser = {
      features: {
        xpath: !!(document.evaluate),
        air: !!(window.runtime),
        query: !!(document.querySelector),
        fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
        xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        transition: X("transition"),
        transform: X("transform"),
        perspective: X("perspective"),
        animation: X("animation"),
        requestAnimationFrame: false,
        multibackground: false,
        cssFilters: false,
        canvas: false,
        svg: (function() {
          return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }())
      },
      touchScreen: (function() {
        return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
      }()),
      mobile: !!ab.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
      engine: (aa && aa[1]) ? aa[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (document.getBoxObjectFor !== undefined || window.mozInnerScreenY !== null) ? "gecko" : (window.WebKitPoint !== null || !navigator.taintEnabled) ? "webkit" : "unknown",
      version: (aa && aa[2]) ? parseFloat(aa[2]) : 0,
      uaName: (af && af[1]) ? af[1].toLowerCase() : "",
      uaVersion: (af && af[2]) ? parseFloat(af[2]) : 0,
      cssPrefix: "",
      cssDomPrefix: "",
      domPrefix: "",
      ieMode: 0,
      platform: ab.match(/ip(?:ad|od|hone)/) ? "ios" : (ab.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
      backCompat: document.compatMode && document.compatMode.toLowerCase() === "backcompat",
      scrollbarsWidth: 0,
      getDoc: function() {
        return (document.compatMode && document.compatMode.toLowerCase() === "backcompat") ? document.body : document.documentElement
      },
      requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
      cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
      ready: false,
      onready: function() {
        if (ac.browser.ready) {
          return
        }
        var ap;
        var ao;
        ac.browser.ready = true;
        ac.body = ac.$(document.body);
        ac.win = ac.$(window);
        try {
          var an = ac.$new("div").jSetCss({
            width: 100,
            height: 100,
            overflow: "scroll",
            position: "absolute",
            top: -9999
          }).jAppendTo(document.body);
          ac.browser.scrollbarsWidth = an.offsetWidth - an.clientWidth;
          an.jRemove()
        } catch (am) {}
        try {
          ap = ac.$new("div");
          ao = ap.style;
          ao.cssText = "background:url(https://),url(https://),red url(https://)";
          ac.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(ao.background);
          ao = null;
          ap = null
        } catch (am) {}
        if (!ac.browser.cssTransformProp) {
          ac.browser.cssTransformProp = ac.normalizeCSS("transform").dashize()
        }
        try {
          ap = ac.$new("div");
          ap.style.cssText = ac.normalizeCSS("filter").dashize() + ":blur(2px);";
          ac.browser.features.cssFilters = !!ap.style.length && (!ac.browser.ieMode || ac.browser.ieMode > 9);
          ap = null
        } catch (am) {}
        if (!ac.browser.features.cssFilters) {
          ac.$(document.documentElement).jAddClass("no-cssfilters-magic")
        }
        try {
          ac.browser.features.canvas = (function() {
            var aq = ac.$new("canvas");
            return !!(aq.getContext && aq.getContext("2d"))
          }())
        } catch (am) {}
        if (window.TransitionEvent === undefined && window.WebKitTransitionEvent !== undefined) {
          aj.transitionend = "webkitTransitionEnd"
        }
        ac.Doc.jCallEvent.call(ac.$(document), "domready")
      }
    };
    (function() {
      var an = [],
        aq, ap, ar;

      function am() {
        return !!(arguments.callee.caller)
      }
      switch (ac.browser.engine) {
        case "trident":
          if (!ac.browser.version) {
            ac.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
          }
          break;
        case "gecko":
          ac.browser.version = (af && af[2]) ? parseFloat(af[2]) : 0;
          break
      }
      ac.browser[ac.browser.engine] = true;
      if (af && af[1] === "crios") {
        ac.browser.uaName = "chrome"
      }
      if (!!window.chrome) {
        ac.browser.chrome = true
      }
      if (af && af[1] === "opr") {
        ac.browser.uaName = "opera";
        ac.browser.opera = true
      }
      if (ac.browser.uaName === "safari" && (ah && ah[1])) {
        ac.browser.uaVersion = parseFloat(ah[1])
      }
      if (ac.browser.platform === "android" && ac.browser.webkit && (ah && ah[1])) {
        ac.browser.androidBrowser = true
      }
      aq = ({
        gecko: ["-moz-", "Moz", "moz"],
        webkit: ["-webkit-", "Webkit", "webkit"],
        trident: ["-ms-", "ms", "ms"],
        presto: ["-o-", "O", "o"]
      })[ac.browser.engine] || ["", "", ""];
      ac.browser.cssPrefix = aq[0];
      ac.browser.cssDomPrefix = aq[1];
      ac.browser.domPrefix = aq[2];
      ac.browser.ieMode = !ac.browser.trident ? undefined : (document.documentMode) ? document.documentMode : (function() {
        var at = 0;
        if (ac.browser.backCompat) {
          return 5
        }
        switch (ac.browser.version) {
          case 2:
            at = 6;
            break;
          case 3:
            at = 7;
            break
        }
        return at
      }());
      if (!ac.browser.mobile && ac.browser.platform === "mac" && ac.browser.touchScreen) {
        ac.browser.mobile = true;
        ac.browser.platform = "ios"
      }
      an.push(ac.browser.platform + "-magic");
      if (ac.browser.mobile) {
        an.push("mobile-magic")
      }
      if (ac.browser.androidBrowser) {
        an.push("android-browser-magic")
      }
      if (ac.browser.ieMode) {
        ac.browser.uaName = "ie";
        ac.browser.uaVersion = ac.browser.ieMode;
        an.push("ie" + ac.browser.ieMode + "-magic");
        for (ap = 11; ap > ac.browser.ieMode; ap--) {
          an.push("lt-ie" + ap + "-magic")
        }
      }
      if (ac.browser.webkit && ac.browser.version < 536) {
        ac.browser.features.fullScreen = false
      }
      if (ac.browser.requestAnimationFrame) {
        ac.browser.requestAnimationFrame.call(window, function() {
          ac.browser.features.requestAnimationFrame = true
        })
      }
      if (ac.browser.features.svg) {
        an.push("svg-magic")
      } else {
        an.push("no-svg-magic")
      }
      ar = (document.documentElement.className || "").match(/\S+/g) || [];
      document.documentElement.className = ac.$(ar).concat(an).join(" ");
      try {
        document.documentElement.setAttribute("data-magic-ua", ac.browser.uaName);
        document.documentElement.setAttribute("data-magic-ua-ver", ac.browser.uaVersion);
        document.documentElement.setAttribute("data-magic-engine", ac.browser.engine);
        document.documentElement.setAttribute("data-magic-engine-ver", ac.browser.version)
      } catch (ao) {}
      if (ac.browser.ieMode && ac.browser.ieMode < 9) {
        document.createElement("figure");
        document.createElement("figcaption")
      }
      if (!window.navigator.pointerEnabled) {
        ac.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function(at) {
          aj["pointer" + at.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + at : -1
        })
      }
    }());
    (function() {
      ac.browser.fullScreen = {
        capable: ac.browser.features.fullScreen,
        enabled: function() {
          return !!(document.fullscreenElement || document[ac.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[ac.browser.domPrefix + "FullScreen"])
        },
        request: function(am, an) {
          if (!an) {
            an = {}
          }
          if (this.capable) {
            ac.$(document).jAddEvent(this.changeEventName, this.onchange = function(ao) {
              if (this.enabled()) {
                if (an.onEnter) {
                  an.onEnter()
                }
              } else {
                ac.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                if (an.onExit) {
                  an.onExit()
                }
              }
            }.jBindAsEvent(this));
            ac.$(document).jAddEvent(this.errorEventName, this.onerror = function(ao) {
              if (an.fallback) {
                an.fallback()
              }
              ac.$(document).jRemoveEvent(this.errorEventName, this.onerror)
            }.jBindAsEvent(this));
            (am.requestFullscreen || am[ac.browser.domPrefix + "RequestFullscreen"] || am[ac.browser.domPrefix + "RequestFullScreen"] || function() {}).call(am)
          } else {
            if (an.fallback) {
              an.fallback()
            }
          }
        },
        cancel: (document.exitFullscreen || document.cancelFullScreen || document[ac.browser.domPrefix + "ExitFullscreen"] || document[ac.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
        changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : ac.browser.domPrefix) + "fullscreenchange",
        errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : ac.browser.domPrefix) + "fullscreenerror",
        prefix: ac.browser.domPrefix,
        activeElement: null
      }
    }());
    var al = /\S+/g,
      Z = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
      ae = {
        "float": ("undefined" === typeof(W.styleFloat)) ? "cssFloat" : "styleFloat"
      },
      ag = {
        fontWeight: true,
        lineHeight: true,
        opacity: true,
        zIndex: true,
        zoom: true
      },
      Y = (window.getComputedStyle) ? function(ao, am) {
        var an = window.getComputedStyle(ao, null);
        return an ? an.getPropertyValue(am) || an[am] : null
      } : function(ap, an) {
        var ao = ap.currentStyle,
          am = null;
        am = ao ? ao[an] : null;
        if (null == am && ap.style && ap.style[an]) {
          am = ap.style[an]
        }
        return am
      };

    function ak(ao) {
      var am, an;
      an = (ac.browser.webkit && "filter" == ao) ? false : (ao in W);
      if (!an) {
        am = ac.browser.cssDomPrefix + ao.charAt(0).toUpperCase() + ao.slice(1);
        if (am in W) {
          return am
        }
      }
      return ao
    }
    ac.normalizeCSS = ak;
    ac.Element = {
      jHasClass: function(am) {
        return !(am || "").has(" ") && (this.className || "").has(am, " ")
      },
      jAddClass: function(aq) {
        var an = (this.className || "").match(al) || [],
          ap = (aq || "").match(al) || [],
          am = ap.length,
          ao = 0;
        for (; ao < am; ao++) {
          if (!ac.$(an).contains(ap[ao])) {
            an.push(ap[ao])
          }
        }
        this.className = an.join(" ");
        return this
      },
      jRemoveClass: function(ar) {
        var an = (this.className || "").match(al) || [],
          aq = (ar || "").match(al) || [],
          am = aq.length,
          ap = 0,
          ao;
        for (; ap < am; ap++) {
          if ((ao = ac.$(an).indexOf(aq[ap])) > -1) {
            an.splice(ao, 1)
          }
        }
        this.className = ar ? an.join(" ") : "";
        return this
      },
      jToggleClass: function(am) {
        return this.jHasClass(am) ? this.jRemoveClass(am) : this.jAddClass(am)
      },
      jGetCss: function(an) {
        var ao = an.jCamelize(),
          am = null;
        an = ae[ao] || (ae[ao] = ak(ao));
        am = Y(this, an);
        if ("auto" === am) {
          am = null
        }
        if (null !== am) {
          if ("opacity" == an) {
            return ac.defined(am) ? parseFloat(am) : 1
          }
          if (Z.test(an)) {
            am = parseInt(am, 10) ? am : "0px"
          }
        }
        return am
      },
      jSetCssProp: function(an, am) {
        var ap = an.jCamelize();
        try {
          if ("opacity" == an) {
            this.jSetOpacity(am);
            return this
          }
          an = ae[ap] || (ae[ap] = ak(ap));
          this.style[an] = am + (("number" == ac.jTypeOf(am) && !ag[ap]) ? "px" : "")
        } catch (ao) {}
        return this
      },
      jSetCss: function(an) {
        for (var am in an) {
          this.jSetCssProp(am, an[am])
        }
        return this
      },
      jGetStyles: function() {
        var am = {};
        ac.$A(arguments).jEach(function(an) {
          am[an] = this.jGetCss(an)
        }, this);
        return am
      },
      jSetOpacity: function(ao, am) {
        var an;
        am = am || false;
        this.style.opacity = ao;
        ao = parseInt(parseFloat(ao) * 100);
        if (am) {
          if (0 === ao) {
            if ("hidden" != this.style.visibility) {
              this.style.visibility = "hidden"
            }
          } else {
            if ("visible" != this.style.visibility) {
              this.style.visibility = "visible"
            }
          }
        }
        if (ac.browser.ieMode && ac.browser.ieMode < 9) {
          if (!isNaN(ao)) {
            if (!~this.style.filter.indexOf("Alpha")) {
              this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ao + ")"
            } else {
              this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + ao)
            }
          } else {
            this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
            if ("" === this.style.filter) {
              this.style.removeAttribute("filter")
            }
          }
        }
        return this
      },
      setProps: function(am) {
        for (var an in am) {
          if ("class" === an) {
            this.jAddClass("" + am[an])
          } else {
            this.setAttribute(an, "" + am[an])
          }
        }
        return this
      },
      jGetTransitionDuration: function() {
        var an = 0,
          am = 0;
        an = this.jGetCss("transition-duration");
        am = this.jGetCss("transition-delay");
        an = an.indexOf("ms") > -1 ? parseFloat(an) : an.indexOf("s") > -1 ? parseFloat(an) * 1000 : 0;
        am = am.indexOf("ms") > -1 ? parseFloat(am) : am.indexOf("s") > -1 ? parseFloat(am) * 1000 : 0;
        return an + am
      },
      hide: function() {
        return this.jSetCss({
          display: "none",
          visibility: "hidden"
        })
      },
      show: function() {
        return this.jSetCss({
          display: "",
          visibility: "visible"
        })
      },
      jGetSize: function() {
        return {
          width: this.offsetWidth,
          height: this.offsetHeight
        }
      },
      getInnerSize: function(an) {
        var am = this.jGetSize();
        am.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
        am.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
        if (!an) {
          am.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
          am.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
        }
        return am
      },
      jGetScroll: function() {
        return {
          top: this.scrollTop,
          left: this.scrollLeft
        }
      },
      jGetFullScroll: function() {
        var am = this,
          an = {
            top: 0,
            left: 0
          };
        do {
          an.left += am.scrollLeft || 0;
          an.top += am.scrollTop || 0;
          am = am.parentNode
        } while (am);
        return an
      },
      jGetPosition: function() {
        var aq = this,
          an = 0,
          ap = 0;
        if (ac.defined(document.documentElement.getBoundingClientRect)) {
          var am = this.getBoundingClientRect(),
            ao = ac.$(document).jGetScroll(),
            ar = ac.browser.getDoc();
          return {
            top: am.top + ao.y - ar.clientTop,
            left: am.left + ao.x - ar.clientLeft
          }
        }
        do {
          an += aq.offsetLeft || 0;
          ap += aq.offsetTop || 0;
          aq = aq.offsetParent
        } while (aq && !(/^(?:body|html)$/i).test(aq.tagName));
        return {
          top: ap,
          left: an
        }
      },
      jGetOffset: function() {
        var am = this;
        var ao = 0;
        var an = 0;
        do {
          ao += am.offsetLeft || 0;
          an += am.offsetTop || 0;
          am = am.offsetParent
        } while (am && !(/^(?:body|html)$/i).test(am.tagName));
        return {
          top: an,
          left: ao
        }
      },
      jGetRect: function() {
        var an = this.jGetPosition();
        var am = this.jGetSize();
        return {
          top: an.top,
          bottom: an.top + am.height,
          left: an.left,
          right: an.left + am.width
        }
      },
      changeContent: function(an) {
        try {
          this.innerHTML = an
        } catch (am) {
          this.innerText = an
        }
        return this
      },
      jRemove: function() {
        return (this.parentNode) ? this.parentNode.removeChild(this) : this
      },
      kill: function() {
        ac.$A(this.childNodes).jEach(function(am) {
          if (3 == am.nodeType || 8 == am.nodeType) {
            return
          }
          ac.$(am).kill()
        });
        this.jRemove();
        this.jClearEvents();
        if (this.$J_UUID) {
          ac.storage[this.$J_UUID] = null;
          delete ac.storage[this.$J_UUID]
        }
        return null
      },
      append: function(ao, an) {
        an = an || "bottom";
        var am = this.firstChild;
        ("top" == an && am) ? this.insertBefore(ao, am): this.appendChild(ao);
        return this
      },
      jAppendTo: function(ao, an) {
        if(an != undefined) console.log(ac, ao, an);
        var am = ac.$(ao).append(this, an);
        return this
      },
      enclose: function(am) {
        this.append(am.parentNode.replaceChild(this, am));
        return this
      },
      hasChild: function(am) {
        if ("element" !== ac.jTypeOf("string" == ac.jTypeOf(am) ? am = document.getElementById(am) : am)) {
          return false
        }
        return (this == am) ? false : (this.contains && !(ac.browser.webkit419)) ? (this.contains(am)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(am) & 16) : ac.$A(this.byTag(am.tagName)).contains(am)
      }
    };
    ac.Element.jGetStyle = ac.Element.jGetCss;
    ac.Element.jSetStyle = ac.Element.jSetCss;
    if (!window.Element) {
      window.Element = ac.$F;
      if (ac.browser.engine.webkit) {
        window.document.createElement("iframe")
      }
      window.Element.prototype = (ac.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
    }
    ac.implement(window.Element, {
      $J_TYPE: "element"
    });
    ac.Doc = {
      jGetSize: function() {
        if (ac.browser.touchScreen || ac.browser.presto925 || ac.browser.webkit419) {
          return {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }
        return {
          width: ac.browser.getDoc().clientWidth,
          height: ac.browser.getDoc().clientHeight
        }
      },
      jGetScroll: function() {
        return {
          x: window.pageXOffset || ac.browser.getDoc().scrollLeft,
          y: window.pageYOffset || ac.browser.getDoc().scrollTop
        }
      },
      jGetFullSize: function() {
        var am = this.jGetSize();
        return {
          width: Math.max(ac.browser.getDoc().scrollWidth, am.width),
          height: Math.max(ac.browser.getDoc().scrollHeight, am.height)
        }
      }
    };
    ac.extend(document, {
      $J_TYPE: "document"
    });
    ac.extend(window, {
      $J_TYPE: "window"
    });
    ac.extend([ac.Element, ac.Doc], {
      jFetch: function(ap, an) {
        var am = ac.getStorage(this.$J_UUID),
          ao = am[ap];
        if (undefined !== an && undefined === ao) {
          ao = am[ap] = an
        }
        return (ac.defined(ao) ? ao : null)
      },
      jStore: function(ao, an) {
        var am = ac.getStorage(this.$J_UUID);
        am[ao] = an;
        return this
      },
      jDel: function(an) {
        var am = ac.getStorage(this.$J_UUID);
        delete am[an];
        return this
      }
    });
    if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
      ac.extend([ac.Element, ac.Doc], {
        getElementsByClassName: function(am) {
          return ac.$A(this.getElementsByTagName("*")).filter(function(ao) {
            try {
              return (1 == ao.nodeType && ao.className.has(am, " "))
            } catch (an) {}
          })
        }
      })
    }
    ac.extend([ac.Element, ac.Doc], {
      byClass: function() {
        return this.getElementsByClassName(arguments[0])
      },
      byTag: function() {
        return this.getElementsByTagName(arguments[0])
      }
    });
    if (ac.browser.fullScreen.capable && !document.requestFullScreen) {
      ac.Element.requestFullScreen = function() {
        ac.browser.fullScreen.request(this)
      }
    }
    ac.Event = {
      $J_TYPE: "event",
      isQueueStopped: ac.$false,
      stop: function() {
        return this.stopDistribution().stopDefaults()
      },
      stopDistribution: function() {
        if (this.stopPropagation) {
          this.stopPropagation()
        } else {
          this.cancelBubble = true
        }
        return this
      },
      stopDefaults: function() {
        if (this.preventDefault) {
          this.preventDefault()
        } else {
          this.returnValue = false
        }
        return this
      },
      stopQueue: function() {
        this.isQueueStopped = ac.$true;
        return this
      },
      getClientXY: function() {
        var am = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
        return !ac.defined(am) ? {
          x: 0,
          y: 0
        } : {
          x: am.clientX,
          y: am.clientY
        }
      },
      jGetPageXY: function() {
        var am = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
        return !ac.defined(am) ? {
          x: 0,
          y: 0
        } : {
          x: am.pageX || am.clientX + ac.browser.getDoc().scrollLeft,
          y: am.pageY || am.clientY + ac.browser.getDoc().scrollTop
        }
      },
      getTarget: function() {
        var am = this.target || this.srcElement;
        while (am && am.nodeType === 3) {
          am = am.parentNode
        }
        return am
      },
      getRelated: function() {
        var an = null;
        switch (this.type) {
          case "mouseover":
          case "pointerover":
          case "MSPointerOver":
            an = this.relatedTarget || this.fromElement;
            break;
          case "mouseout":
          case "pointerout":
          case "MSPointerOut":
            an = this.relatedTarget || this.toElement;
            break;
          default:
            return an
        }
        try {
          while (an && an.nodeType === 3) {
            an = an.parentNode
          }
        } catch (am) {
          an = null
        }
        return an
      },
      getButton: function() {
        if (!this.which && this.button !== undefined) {
          return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
        }
        return this.which
      },
      isTouchEvent: function() {
        return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
      },
      isPrimaryTouch: function() {
        if (this.pointerType) {
          return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches.length === 1 && this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
          }
        }
        return false
      },
      getPrimaryTouch: function() {
        if (this.pointerType) {
          return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches[0]
          }
        }
        return null
      },
      getPrimaryTouchId: function() {
        if (this.pointerType) {
          return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches[0].identifier
          }
        }
        return null
      }
    };
    ac._event_add_ = "addEventListener";
    ac._event_del_ = "removeEventListener";
    ac._event_prefix_ = "";
    if (!document.addEventListener) {
      ac._event_add_ = "attachEvent";
      ac._event_del_ = "detachEvent";
      ac._event_prefix_ = "on"
    }
    ac.Event.Custom = {
      type: "",
      x: null,
      y: null,
      timeStamp: null,
      button: null,
      target: null,
      relatedTarget: null,
      $J_TYPE: "event.custom",
      isQueueStopped: ac.$false,
      events: ac.$([]),
      pushToEvents: function(am) {
        var an = am;
        this.events.push(an)
      },
      stop: function() {
        return this.stopDistribution().stopDefaults()
      },
      stopDistribution: function() {
        this.events.jEach(function(an) {
          try {
            an.stopDistribution()
          } catch (am) {}
        });
        return this
      },
      stopDefaults: function() {
        this.events.jEach(function(an) {
          try {
            an.stopDefaults()
          } catch (am) {}
        });
        return this
      },
      stopQueue: function() {
        this.isQueueStopped = ac.$true;
        return this
      },
      getClientXY: function() {
        return {
          x: this.clientX,
          y: this.clientY
        }
      },
      jGetPageXY: function() {
        return {
          x: this.x,
          y: this.y
        }
      },
      getTarget: function() {
        return this.target
      },
      getRelated: function() {
        return this.relatedTarget
      },
      getButton: function() {
        return this.button
      },
      getOriginalTarget: function() {
        return this.events.length > 0 ? this.events[0].getTarget() : undefined
      },
      isTouchEvent: function() {
        return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
      },
      isPrimaryTouch: function() {
        if (this.pointerType) {
          return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
          }
        }
        return false
      },
      getPrimaryTouch: function() {
        if (this.pointerType) {
          return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches[0]
          }
        }
        return null
      },
      getPrimaryTouchId: function() {
        if (this.pointerType) {
          return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
        } else {
          if (this instanceof window.TouchEvent) {
            return this.changedTouches[0].identifier
          }
        }
        return null
      }
    };
    ac.extend([ac.Element, ac.Doc], {
      jAddEvent: function(ao, aq, ar, av) {
        var au, am, ap, at, an;
        if (ac.jTypeOf(ao) === "string") {
          an = ao.split(" ");
          if (an.length > 1) {
            ao = an
          }
        }
        if (ac.jTypeOf(ao) === "array") {
          ac.$(ao).jEach(this.jAddEvent.jBindAsEvent(this, aq, ar, av));
          return this
        }
        ao = aj[ao] || ao;
        if (!ao || !aq || ac.jTypeOf(ao) !== "string" || ac.jTypeOf(aq) !== "function") {
          return this
        }
        if (ao === "domready" && ac.browser.ready) {
          aq.call(this);
          return this
        }
        ar = parseInt(ar || 50, 10);
        if (!aq.$J_EUID) {
          aq.$J_EUID = Math.floor(Math.random() * ac.now())
        }
        au = ac.Doc.jFetch.call(this, "_EVENTS_", {});
        am = au[ao];
        if (!am) {
          au[ao] = am = ac.$([]);
          ap = this;
          if (ac.Event.Custom[ao]) {
            ac.Event.Custom[ao].handler.add.call(this, av)
          } else {
            am.handle = function(aw) {
              aw = ac.extend(aw || window.e, {
                $J_TYPE: "event"
              });
              ac.Doc.jCallEvent.call(ap, ao, ac.$(aw))
            };
            this[ac._event_add_](ac._event_prefix_ + ao, am.handle, false)
          }
        }
        at = {
          type: ao,
          fn: aq,
          priority: ar,
          euid: aq.$J_EUID
        };
        am.push(at);
        am.sort(function(ax, aw) {
          return ax.priority - aw.priority
        });
        return this
      },
      jRemoveEvent: function(at) {
        var aq = ac.Doc.jFetch.call(this, "_EVENTS_", {});
        var ao;
        var am;
        var an;
        var au;
        var ar;
        var ap;
        ar = arguments.length > 1 ? arguments[1] : -100;
        if (ac.jTypeOf(at) === "string") {
          ap = at.split(" ");
          if (ap.length > 1) {
            at = ap
          }
        }
        if (ac.jTypeOf(at) === "array") {
          ac.$(at).jEach(this.jRemoveEvent.jBindAsEvent(this, ar));
          return this
        }
        at = aj[at] || at;
        if (!at || ac.jTypeOf(at) !== "string" || !aq || !aq[at]) {
          return this
        }
        ao = aq[at] || [];
        for (an = 0; an < ao.length; an++) {
          am = ao[an];
          if (ar === -100 || !!ar && ar.$J_EUID === am.euid) {
            au = ao.splice(an--, 1)
          }
        }
        if (ao.length === 0) {
          if (ac.Event.Custom[at]) {
            ac.Event.Custom[at].handler.jRemove.call(this)
          } else {
            this[ac._event_del_](ac._event_prefix_ + at, ao.handle, false)
          }
          delete aq[at]
        }
        return this
      },
      jCallEvent: function(ap, ar) {
        var ao = ac.Doc.jFetch.call(this, "_EVENTS_", {});
        var an;
        var am;
        ap = aj[ap] || ap;
        if (!ap || ac.jTypeOf(ap) !== "string" || !ao || !ao[ap]) {
          return this
        }
        try {
          ar = ac.extend(ar || {}, {
            type: ap
          })
        } catch (aq) {}
        if (ar.timeStamp === undefined) {
          ar.timeStamp = ac.now()
        }
        an = ao[ap] || [];
        for (am = 0; am < an.length && !(ar.isQueueStopped && ar.isQueueStopped()); am++) {
          an[am].fn.call(this, ar)
        }
      },
      jRaiseEvent: function(an, am) {
        var aq = (an !== "domready");
        var ap = this;
        var ao;
        an = aj[an] || an;
        if (!aq) {
          ac.Doc.jCallEvent.call(this, an);
          return this
        }
        if (ap === document && document.createEvent && !ap.dispatchEvent) {
          ap = document.documentElement
        }
        if (document.createEvent) {
          ao = document.createEvent(an);
          ao.initEvent(am, true, true)
        } else {
          ao = document.createEventObject();
          ao.eventType = an
        }
        if (document.createEvent) {
          ap.dispatchEvent(ao)
        } else {
          ap.fireEvent("on" + am, ao)
        }
        return ao
      },
      jClearEvents: function() {
        var an = ac.Doc.jFetch.call(this, "_EVENTS_");
        if (!an) {
          return this
        }
        for (var am in an) {
          ac.Doc.jRemoveEvent.call(this, am)
        }
        ac.Doc.jDel.call(this, "_EVENTS_");
        return this
      }
    });
    (function(am) {
      if (document.readyState === "complete") {
        return am.browser.onready.jDelay(1)
      }
      if (am.browser.webkit && am.browser.version < 420) {
        (function() {
          if (am.$(["loaded", "complete"]).contains(document.readyState)) {
            am.browser.onready()
          } else {
            arguments.callee.jDelay(50)
          }
        }())
      } else {
        if (am.browser.trident && am.browser.ieMode < 9 && window === top) {
          (function() {
            if (am.$try(function() {
              am.browser.getDoc().doScroll("left");
              return true
            })) {
              am.browser.onready()
            } else {
              arguments.callee.jDelay(50)
            }
          }())
        } else {
          am.Doc.jAddEvent.call(am.$(document), "DOMContentLoaded", am.browser.onready);
          am.Doc.jAddEvent.call(am.$(window), "load", am.browser.onready)
        }
      }
    }(ai));
    ac.Class = function() {
      var aq = null,
        an = ac.$A(arguments);
      if ("class" == ac.jTypeOf(an[0])) {
        aq = an.shift()
      }
      var am = function() {
        for (var au in this) {
          this[au] = ac.detach(this[au])
        }
        if (this.constructor.$parent) {
          this.$parent = {};
          var aw = this.constructor.$parent;
          for (var av in aw) {
            var at = aw[av];
            switch (ac.jTypeOf(at)) {
              case "function":
                this.$parent[av] = ac.Class.wrap(this, at);
                break;
              case "object":
                this.$parent[av] = ac.detach(at);
                break;
              case "array":
                this.$parent[av] = ac.detach(at);
                break
            }
          }
        }
        var ar = (this.init) ? this.init.apply(this, arguments) : this;
        delete this.caller;
        return ar
      };
      if (!am.prototype.init) {
        am.prototype.init = ac.$F
      }
      if (aq) {
        var ap = function() {};
        ap.prototype = aq.prototype;
        am.prototype = new ap;
        am.$parent = {};
        for (var ao in aq.prototype) {
          am.$parent[ao] = aq.prototype[ao]
        }
      } else {
        am.$parent = null
      }
      am.constructor = ac.Class;
      am.prototype.constructor = am;
      ac.extend(am.prototype, an[0]);
      ac.extend(am, {
        $J_TYPE: "class"
      });
      return am
    };
    ai.Class.wrap = function(am, an) {
      return function() {
        var ap = this.caller;
        var ao = an.apply(am, arguments);
        return ao
      }
    };
    (function(ap) {
      var ao = ap.$;
      var am = 5,
        an = 300;
      ap.Event.Custom.btnclick = new ap.Class(ap.extend(ap.Event.Custom, {
        type: "btnclick",
        init: function(at, ar) {
          var aq = ar.jGetPageXY();
          this.x = aq.x;
          this.y = aq.y;
          this.clientX = ar.clientX;
          this.clientY = ar.clientY;
          this.timeStamp = ar.timeStamp;
          this.button = ar.getButton();
          this.target = at;
          this.pushToEvents(ar)
        }
      }));
      ap.Event.Custom.btnclick.handler = {
        options: {
          threshold: an,
          button: 1
        },
        add: function(aq) {
          this.jStore("event:btnclick:options", ap.extend(ap.detach(ap.Event.Custom.btnclick.handler.options), aq || {}));
          this.jAddEvent("mousedown", ap.Event.Custom.btnclick.handler.handle, 1);
          this.jAddEvent("mouseup", ap.Event.Custom.btnclick.handler.handle, 1);
          this.jAddEvent("click", ap.Event.Custom.btnclick.handler.onclick, 1);
          if (ap.browser.trident && ap.browser.ieMode < 9) {
            this.jAddEvent("dblclick", ap.Event.Custom.btnclick.handler.handle, 1)
          }
        },
        jRemove: function() {
          this.jRemoveEvent("mousedown", ap.Event.Custom.btnclick.handler.handle);
          this.jRemoveEvent("mouseup", ap.Event.Custom.btnclick.handler.handle);
          this.jRemoveEvent("click", ap.Event.Custom.btnclick.handler.onclick);
          if (ap.browser.trident && ap.browser.ieMode < 9) {
            this.jRemoveEvent("dblclick", ap.Event.Custom.btnclick.handler.handle)
          }
        },
        onclick: function(aq) {
          aq.stopDefaults()
        },
        handle: function(au) {
          var at, aq, ar;
          aq = this.jFetch("event:btnclick:options");
          if (au.type != "dblclick" && au.getButton() != aq.button) {
            return
          }
          if (this.jFetch("event:btnclick:ignore")) {
            this.jDel("event:btnclick:ignore");
            return
          }
          if ("mousedown" == au.type) {
            at = new ap.Event.Custom.btnclick(this, au);
            this.jStore("event:btnclick:btnclickEvent", at)
          } else {
            if ("mouseup" == au.type) {
              at = this.jFetch("event:btnclick:btnclickEvent");
              if (!at) {
                return
              }
              ar = au.jGetPageXY();
              this.jDel("event:btnclick:btnclickEvent");
              at.pushToEvents(au);
              if (au.timeStamp - at.timeStamp <= aq.threshold && Math.sqrt(Math.pow(ar.x - at.x, 2) + Math.pow(ar.y - at.y, 2)) <= am) {
                this.jCallEvent("btnclick", at)
              }
              document.jCallEvent("mouseup", au)
            } else {
              if (au.type == "dblclick") {
                at = new ap.Event.Custom.btnclick(this, au);
                this.jCallEvent("btnclick", at)
              }
            }
          }
        }
      }
    })(ai);
    (function(an) {
      var am = an.$;
      an.Event.Custom.mousedrag = new an.Class(an.extend(an.Event.Custom, {
        type: "mousedrag",
        state: "dragstart",
        dragged: false,
        init: function(ar, aq, ap) {
          var ao = aq.jGetPageXY();
          this.x = ao.x;
          this.y = ao.y;
          this.clientX = aq.clientX;
          this.clientY = aq.clientY;
          this.timeStamp = aq.timeStamp;
          this.button = aq.getButton();
          this.target = ar;
          this.pushToEvents(aq);
          this.state = ap
        }
      }));
      an.Event.Custom.mousedrag.handler = {
        add: function() {
          var ap = an.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this);
          var ao = an.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
          this.jAddEvent("mousedown", an.Event.Custom.mousedrag.handler.handleMouseDown, 1);
          this.jAddEvent("mouseup", an.Event.Custom.mousedrag.handler.handleMouseUp, 1);
          document.jAddEvent("mousemove", ap, 1);
          document.jAddEvent("mouseup", ao, 1);
          this.jStore("event:mousedrag:listeners:document:move", ap);
          this.jStore("event:mousedrag:listeners:document:end", ao)
        },
        jRemove: function() {
          this.jRemoveEvent("mousedown", an.Event.Custom.mousedrag.handler.handleMouseDown);
          this.jRemoveEvent("mouseup", an.Event.Custom.mousedrag.handler.handleMouseUp);
          am(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || an.$F);
          am(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || an.$F);
          this.jDel("event:mousedrag:listeners:document:move");
          this.jDel("event:mousedrag:listeners:document:end")
        },
        handleMouseDown: function(ap) {
          var ao;
          if (ap.getButton() !== 1) {
            return
          }
          ao = new an.Event.Custom.mousedrag(this, ap, "dragstart");
          this.jStore("event:mousedrag:dragstart", ao)
        },
        handleMouseUp: function(ap) {
          var ao;
          ao = this.jFetch("event:mousedrag:dragstart");
          if (!ao) {
            return
          }
          if (ao.dragged) {
            ap.stopDefaults()
          }
          ao = new an.Event.Custom.mousedrag(this, ap, "dragend");
          this.jDel("event:mousedrag:dragstart");
          this.jCallEvent("mousedrag", ao)
        },
        handleMouseMove: function(ap) {
          var ao;
          ao = this.jFetch("event:mousedrag:dragstart");
          if (!ao) {
            return
          }
          ap.stopDefaults();
          if (!ao.dragged) {
            ao.dragged = true;
            this.jCallEvent("mousedrag", ao)
          }
          ao = new an.Event.Custom.mousedrag(this, ap, "dragmove");
          this.jCallEvent("mousedrag", ao)
        }
      }
    })(ai);
    (function(an) {
      var am = an.$;
      an.Event.Custom.dblbtnclick = new an.Class(an.extend(an.Event.Custom, {
        type: "dblbtnclick",
        timedout: false,
        tm: null,
        init: function(aq, ap) {
          var ao = ap.jGetPageXY();
          this.x = ao.x;
          this.y = ao.y;
          this.clientX = ap.clientX;
          this.clientY = ap.clientY;
          this.timeStamp = ap.timeStamp;
          this.button = ap.getButton();
          this.target = aq;
          this.pushToEvents(ap)
        }
      }));
      an.Event.Custom.dblbtnclick.handler = {
        options: {
          threshold: 200
        },
        add: function(ao) {
          this.jStore("event:dblbtnclick:options", an.extend(an.detach(an.Event.Custom.dblbtnclick.handler.options), ao || {}));
          this.jAddEvent("btnclick", an.Event.Custom.dblbtnclick.handler.handle, 1)
        },
        jRemove: function() {
          this.jRemoveEvent("btnclick", an.Event.Custom.dblbtnclick.handler.handle)
        },
        handle: function(aq) {
          var ap, ao;
          ap = this.jFetch("event:dblbtnclick:event");
          ao = this.jFetch("event:dblbtnclick:options");
          if (!ap) {
            ap = new an.Event.Custom.dblbtnclick(this, aq);
            ap.tm = setTimeout(function() {
              ap.timedout = true;
              aq.isQueueStopped = an.$false;
              this.jCallEvent("btnclick", aq);
              this.jDel("event:dblbtnclick:event")
            }.jBind(this), ao.threshold + 10);
            this.jStore("event:dblbtnclick:event", ap);
            aq.stopQueue()
          } else {
            clearTimeout(ap.tm);
            this.jDel("event:dblbtnclick:event");
            if (!ap.timedout) {
              ap.pushToEvents(aq);
              aq.stopQueue().stop();
              this.jCallEvent("dblbtnclick", ap)
            } else {}
          }
        }
      }
    })(ai);
    (function(ap) {
      var ao = ap.$;
      var am = 10;
      var an = 200;
      ap.Event.Custom.tap = new ap.Class(ap.extend(ap.Event.Custom, {
        type: "tap",
        id: null,
        init: function(ar, aq) {
          var at = aq.getPrimaryTouch();
          this.id = at.pointerId || at.identifier;
          this.x = at.pageX;
          this.y = at.pageY;
          this.pageX = at.pageX;
          this.pageY = at.pageY;
          this.clientX = at.clientX;
          this.clientY = at.clientY;
          this.timeStamp = aq.timeStamp;
          this.button = 0;
          this.target = ar;
          this.pushToEvents(aq)
        }
      }));
      ap.Event.Custom.tap.handler = {
        add: function(aq) {
          this.jAddEvent(["touchstart", "pointerdown"], ap.Event.Custom.tap.handler.onTouchStart, 1);
          this.jAddEvent(["touchend", "pointerup"], ap.Event.Custom.tap.handler.onTouchEnd, 1);
          this.jAddEvent("click", ap.Event.Custom.tap.handler.onClick, 1)
        },
        jRemove: function() {
          this.jRemoveEvent(["touchstart", "pointerdown"], ap.Event.Custom.tap.handler.onTouchStart);
          this.jRemoveEvent(["touchend", "pointerup"], ap.Event.Custom.tap.handler.onTouchEnd);
          this.jRemoveEvent("click", ap.Event.Custom.tap.handler.onClick)
        },
        onClick: function(aq) {
          aq.stopDefaults()
        },
        onTouchStart: function(aq) {
          if (!aq.isPrimaryTouch()) {
            this.jDel("event:tap:event");
            return
          }
          this.jStore("event:tap:event", new ap.Event.Custom.tap(this, aq));
          this.jStore("event:btnclick:ignore", true)
        },
        onTouchEnd: function(au) {
          var ar = ap.now();
          var at = this.jFetch("event:tap:event");
          var aq = this.jFetch("event:tap:options");
          if (!at || !au.isPrimaryTouch()) {
            return
          }
          this.jDel("event:tap:event");
          if (at.id === au.getPrimaryTouchId() && au.timeStamp - at.timeStamp <= an && Math.sqrt(Math.pow(au.getPrimaryTouch().pageX - at.x, 2) + Math.pow(au.getPrimaryTouch().pageY - at.y, 2)) <= am) {
            this.jDel("event:btnclick:btnclickEvent");
            au.stop();
            at.pushToEvents(au);
            this.jCallEvent("tap", at)
          }
        }
      }
    }(ai));
    ac.Event.Custom.dbltap = new ac.Class(ac.extend(ac.Event.Custom, {
      type: "dbltap",
      timedout: false,
      tm: null,
      init: function(an, am) {
        this.x = am.x;
        this.y = am.y;
        this.clientX = am.clientX;
        this.clientY = am.clientY;
        this.timeStamp = am.timeStamp;
        this.button = 0;
        this.target = an;
        this.pushToEvents(am)
      }
    }));
    ac.Event.Custom.dbltap.handler = {
      options: {
        threshold: 300
      },
      add: function(am) {
        this.jStore("event:dbltap:options", ac.extend(ac.detach(ac.Event.Custom.dbltap.handler.options), am || {}));
        this.jAddEvent("tap", ac.Event.Custom.dbltap.handler.handle, 1)
      },
      jRemove: function() {
        this.jRemoveEvent("tap", ac.Event.Custom.dbltap.handler.handle)
      },
      handle: function(ao) {
        var an, am;
        an = this.jFetch("event:dbltap:event");
        am = this.jFetch("event:dbltap:options");
        if (!an) {
          an = new ac.Event.Custom.dbltap(this, ao);
          an.tm = setTimeout(function() {
            an.timedout = true;
            ao.isQueueStopped = ac.$false;
            this.jCallEvent("tap", ao)
          }.jBind(this), am.threshold + 10);
          this.jStore("event:dbltap:event", an);
          ao.stopQueue()
        } else {
          clearTimeout(an.tm);
          this.jDel("event:dbltap:event");
          if (!an.timedout) {
            an.pushToEvents(ao);
            ao.stopQueue().stop();
            this.jCallEvent("dbltap", an)
          } else {}
        }
      }
    };
    (function(ao) {
      var an = ao.$;
      var am = 10;
      ao.Event.Custom.touchdrag = new ao.Class(ao.extend(ao.Event.Custom, {
        type: "touchdrag",
        state: "dragstart",
        id: null,
        dragged: false,
        init: function(ar, aq, ap) {
          var at = aq.getPrimaryTouch();
          this.id = at.pointerId || at.identifier;
          this.clientX = at.clientX;
          this.clientY = at.clientY;
          this.pageX = at.pageX;
          this.pageY = at.pageY;
          this.x = at.pageX;
          this.y = at.pageY;
          this.timeStamp = aq.timeStamp;
          this.button = 0;
          this.target = ar;
          this.pushToEvents(aq);
          this.state = ap
        }
      }));
      ao.Event.Custom.touchdrag.handler = {
        add: function() {
          var aq = ao.Event.Custom.touchdrag.handler.onTouchMove.jBind(this);
          var ap = ao.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
          this.jAddEvent(["touchstart", "pointerdown"], ao.Event.Custom.touchdrag.handler.onTouchStart, 1);
          this.jAddEvent(["touchend", "pointerup"], ao.Event.Custom.touchdrag.handler.onTouchEnd, 1);
          this.jAddEvent(["touchmove", "pointermove"], ao.Event.Custom.touchdrag.handler.onTouchMove, 1);
          this.jStore("event:touchdrag:listeners:document:move", aq);
          this.jStore("event:touchdrag:listeners:document:end", ap);
          an(document).jAddEvent("pointermove", aq, 1);
          an(document).jAddEvent("pointerup", ap, 1)
        },
        jRemove: function() {
          this.jRemoveEvent(["touchstart", "pointerdown"], ao.Event.Custom.touchdrag.handler.onTouchStart);
          this.jRemoveEvent(["touchend", "pointerup"], ao.Event.Custom.touchdrag.handler.onTouchEnd);
          this.jRemoveEvent(["touchmove", "pointermove"], ao.Event.Custom.touchdrag.handler.onTouchMove);
          an(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || ao.$F, 1);
          an(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || ao.$F, 1);
          this.jDel("event:touchdrag:listeners:document:move");
          this.jDel("event:touchdrag:listeners:document:end")
        },
        onTouchStart: function(aq) {
          var ap;
          if (!aq.isPrimaryTouch()) {
            return
          }
          ap = new ao.Event.Custom.touchdrag(this, aq, "dragstart");
          this.jStore("event:touchdrag:dragstart", ap)
        },
        onTouchEnd: function(aq) {
          var ap;
          ap = this.jFetch("event:touchdrag:dragstart");
          if (!ap || !ap.dragged || ap.id !== aq.getPrimaryTouchId()) {
            return
          }
          ap = new ao.Event.Custom.touchdrag(this, aq, "dragend");
          this.jDel("event:touchdrag:dragstart");
          this.jCallEvent("touchdrag", ap)
        },
        onTouchMove: function(aq) {
          var ap;
          ap = this.jFetch("event:touchdrag:dragstart");
          if (!ap || !aq.isPrimaryTouch()) {
            return
          }
          if (ap.id !== aq.getPrimaryTouchId()) {
            this.jDel("event:touchdrag:dragstart");
            return
          }
          if (!ap.dragged && Math.sqrt(Math.pow(aq.getPrimaryTouch().pageX - ap.x, 2) + Math.pow(aq.getPrimaryTouch().pageY - ap.y, 2)) > am) {
            ap.dragged = true;
            this.jCallEvent("touchdrag", ap)
          }
          if (!ap.dragged) {
            return
          }
          ap = new ao.Event.Custom.touchdrag(this, aq, "dragmove");
          this.jCallEvent("touchdrag", ap)
        }
      }
    }(ai));
    (function(ap) {
      var au = ap.$;
      var aq = null;

      function am(aD, aC) {
        var aB = aC.x - aD.x;
        var aE = aC.y - aD.y;
        return Math.sqrt(aB * aB + aE * aE)
      }

      function aw(aH, aI) {
        var aG = Array.prototype.slice.call(aH);
        var aF = Math.abs(aG[1].pageX - aG[0].pageX);
        var aD = Math.abs(aG[1].pageY - aG[0].pageY);
        var aE = Math.min(aG[1].pageX, aG[0].pageX) + aF / 2;
        var aC = Math.min(aG[1].pageY, aG[0].pageY) + aD / 2;
        var aB = 0;
        aI.points = [aG[0], aG[1]];
        aB = Math.pow(am({
          x: aG[0].pageX,
          y: aG[0].pageY
        }, {
          x: aG[1].pageX,
          y: aG[1].pageY
        }), 2);
        aI.centerPoint = {
          x: aE,
          y: aC
        };
        aI.x = aI.centerPoint.x;
        aI.y = aI.centerPoint.y;
        return aB
      }

      function az(aB) {
        return aB / aq
      }

      function an(aD, aC) {
        var aB;
        if (aD.targetTouches && aD.changedTouches) {
          if (aD.targetTouches) {
            aB = aD.targetTouches
          } else {
            aB = aD.changedTouches
          }
          aB = Array.prototype.slice.call(aB)
        } else {
          aB = [];
          if (aC) {
            aC.forEach(function(aE) {
              aB.push(aE)
            })
          }
        }
        return aB
      }

      function ao(aE, aD, aC) {
        var aB = false;
        if (aE.pointerId && aE.pointerType === "touch" && (!aC || aD.has(aE.pointerId))) {
          aD.set(aE.pointerId, aE);
          aB = true
        }
        return aB
      }

      function av(aC, aB) {
        if (aC.pointerId && aC.pointerType === "touch" && aB && aB.has(aC.pointerId)) {
          aB["delete"](aC.pointerId)
        }
      }

      function ay(aC) {
        var aB;
        if (aC.pointerId && aC.pointerType === "touch") {
          aB = aC.pointerId
        } else {
          aB = aC.identifier
        }
        return aB
      }

      function at(aE, aC) {
        var aD;
        var aF;
        var aB = false;
        for (aD = 0; aD < aE.length; aD++) {
          if (aC.length === 2) {
            break
          } else {
            aF = ay(aE[aD]);
            if (!aC.contains(aF)) {
              aC.push(aF);
              aB = true
            }
          }
        }
        return aB
      }

      function ax(aC) {
        var aB = au([]);
        aC.forEach(function(aD) {
          aB.push(ay(aD))
        });
        return aB
      }

      function aA(aF, aC) {
        var aD;
        var aE;
        var aB = false;
        if (aC) {
          aE = ax(aF);
          for (aD = 0; aD < aC.length; aD++) {
            if (!aE.contains(aC[aD])) {
              aC.splice(aD, 1);
              aB = true;
              break
            }
          }
        }
        return aB
      }

      function ar(aE, aC) {
        var aD;
        var aB = au([]);
        for (aD = 0; aD < aE.length; aD++) {
          if (aC.contains(ay(aE[aD]))) {
            aB.push(aE[aD]);
            if (aB.length === 2) {
              break
            }
          }
        }
        return aB
      }
      ap.Event.Custom.pinch = new ap.Class(ap.extend(ap.Event.Custom, {
        type: "pinch",
        state: "pinchstart",
        init: function(aD, aC, aB, aE) {
          this.target = aD;
          this.state = aB;
          this.x = aE.x;
          this.y = aE.y;
          this.timeStamp = aC.timeStamp;
          this.scale = aE.scale;
          this.space = aE.space;
          this.zoom = aE.zoom;
          this.state = aB;
          this.centerPoint = aE.centerPoint;
          this.points = aE.points;
          this.pushToEvents(aC)
        }
      }));
      ap.Event.Custom.pinch.handler = {
        variables: {
          x: 0,
          y: 0,
          space: 0,
          scale: 1,
          zoom: 0,
          startSpace: 0,
          startScale: 1,
          started: false,
          dragged: false,
          points: [],
          centerPoint: {
            x: 0,
            y: 0
          }
        },
        add: function(aD) {
          if (!aq) {
            aq = (function() {
              var aE = au(window).jGetSize();
              aE.width = Math.min(aE.width, aE.height);
              aE.height = aE.width;
              return Math.pow(am({
                x: 0,
                y: 0
              }, {
                x: aE.width,
                y: aE.height
              }), 2)
            })()
          }
          var aC = ap.Event.Custom.pinch.handler.onTouchMove.jBind(this);
          var aB = ap.Event.Custom.pinch.handler.onTouchEnd.jBind(this);
          this.jAddEvent(["click", "tap"], ap.Event.Custom.pinch.handler.onClick, 1);
          this.jAddEvent(["touchstart", "pointerdown"], ap.Event.Custom.pinch.handler.onTouchStart, 1);
          this.jAddEvent(["touchend", "pointerup"], ap.Event.Custom.pinch.handler.onTouchEnd, 1);
          this.jAddEvent(["touchmove", "pointermove"], ap.Event.Custom.pinch.handler.onTouchMove, 1);
          this.jStore("event:pinch:listeners:touchmove", aC);
          this.jStore("event:pinch:listeners:touchend", aB);
          ap.doc.jAddEvent("pointermove", aC, 1);
          ap.doc.jAddEvent("pointerup", aB, 1)
        },
        jRemove: function() {
          this.jRemoveEvent(["click", "tap"], ap.Event.Custom.pinch.handler.onClick);
          this.jRemoveEvent(["touchstart", "pointerdown"], ap.Event.Custom.pinch.handler.onTouchStart);
          this.jRemoveEvent(["touchend", "pointerup"], ap.Event.Custom.pinch.handler.onTouchEnd);
          this.jRemoveEvent(["touchmove", "pointermove"], ap.Event.Custom.pinch.handler.onTouchMove);
          ap.doc.jRemoveEvent("pointermove", this.jFetch("event:pinch:listeners:touchmove"));
          ap.doc.jRemoveEvent("pointerup", this.jFetch("event:pinch:listeners:touchend"));
          this.jDel("event:pinch:listeners:touchmove");
          this.jDel("event:pinch:listeners:touchend");
          this.jDel("event:pinch:pinchstart");
          this.jDel("event:pinch:variables");
          this.jDel("event:pinch:activepoints");
          var aB = this.jFetch("event:pinch:cache");
          if (aB) {
            aB.clear()
          }
          this.jDel("event:pinch:cache")
        },
        onClick: function(aB) {
          aB.stop()
        },
        setVariables: function(aC, aD) {
          var aB = aD.space;
          if (aC.length > 1) {
            aD.space = aw(aC, aD);
            if (!aD.startSpace) {
              aD.startSpace = aD.space
            }
            if (aB > aD.space) {
              aD.zoom = -1
            } else {
              if (aB < aD.space) {
                aD.zoom = 1
              } else {
                aD.zoom = 0
              }
            }
            aD.scale = az(aD.space)
          } else {
            aD.points = Array.prototype.slice.call(aC, 0, 2)
          }
        },
        onTouchMove: function(aD) {
          var aC;
          var aB = this.jFetch("event:pinch:cache");
          var aF = this.jFetch("event:pinch:variables") || ap.extend({}, ap.Event.Custom.pinch.handler.variables);
          var aE = this.jFetch("event:pinch:activepoints");
          if (aF.started) {
            if (aD.pointerId && !ao(aD, aB, true)) {
              return
            }
            aD.stop();
            ap.Event.Custom.pinch.handler.setVariables(ar(an(aD, aB), aE), aF);
            aC = new ap.Event.Custom.pinch(this, aD, "pinchmove", aF);
            this.jCallEvent("pinch", aC)
          }
        },
        onTouchStart: function(aE) {
          var aC;
          var aG;
          var aD;
          var aB = this.jFetch("event:pinch:cache");
          var aF = this.jFetch("event:pinch:activepoints");
          if (aE.pointerType === "mouse") {
            return
          }
          if (!aF) {
            aF = au([]);
            this.jStore("event:pinch:activepoints", aF)
          }
          if (!aF.length) {
            au(aE.target).jAddEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"), 1)
          }
          if (!aB) {
            aB = new Map();
            this.jStore("event:pinch:cache", aB)
          }
          ao(aE, aB);
          aD = an(aE, aB);
          at(aD, aF);
          if (aD.length === 2) {
            aC = this.jFetch("event:pinch:pinchstart");
            aG = this.jFetch("event:pinch:variables") || ap.extend({}, ap.Event.Custom.pinch.handler.variables);
            ap.Event.Custom.pinch.handler.setVariables(ar(aD, aF), aG);
            if (!aC) {
              aC = new ap.Event.Custom.pinch(this, aE, "pinchstart", aG);
              this.jStore("event:pinch:pinchstart", aC);
              this.jStore("event:pinch:variables", aG);
              aq = aG.space;
              this.jCallEvent("pinch", aC);
              aG.started = true
            }
          }
        },
        onTouchEnd: function(aG) {
          var aF;
          var aE;
          var aI;
          var aC;
          var aD = this.jFetch("event:pinch:cache");
          var aH;
          var aB;
          if (aG.pointerType === "mouse" || aG.pointerId && (!aD || !aD.has(aG.pointerId))) {
            return
          }
          aE = this.jFetch("event:pinch:pinchstart");
          aI = this.jFetch("event:pinch:variables");
          aH = this.jFetch("event:pinch:activepoints");
          aF = an(aG, aD);
          av(aG, aD);
          aB = aA(aF, aH);
          if (!aE || !aI || !aI.started || !aB || !aH) {
            return
          }
          if (aB) {
            at(aF, aH)
          }
          aC = "pinchend";
          if (aF.length > 1) {
            aC = "pinchresize"
          } else {
            aG.target.jRemoveEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"));
            if (aD) {
              aD.clear()
            }
            this.jDel("event:pinch:pinchstart");
            this.jDel("event:pinch:variables");
            this.jDel("event:pinch:cache");
            this.jDel("event:pinch:activepoints")
          }
          ap.Event.Custom.pinch.handler.setVariables(ar(aF, aH), aI);
          aE = new ap.Event.Custom.pinch(this, aG, aC, aI);
          this.jCallEvent("pinch", aE)
        }
      }
    }(ai));
    (function(ar) {
      var ap = ar.$;
      ar.Event.Custom.mousescroll = new ar.Class(ar.extend(ar.Event.Custom, {
        type: "mousescroll",
        init: function(ay, ax, aA, au, at, az, av) {
          var aw = ax.jGetPageXY();
          this.x = aw.x;
          this.y = aw.y;
          this.timeStamp = ax.timeStamp;
          this.target = ay;
          this.delta = aA || 0;
          this.deltaX = au || 0;
          this.deltaY = at || 0;
          this.deltaZ = az || 0;
          this.deltaFactor = av || 0;
          this.deltaMode = ax.deltaMode || 0;
          this.isMouse = false;
          this.pushToEvents(ax)
        }
      }));
      var aq, an;

      function am() {
        aq = null
      }

      function ao(at, au) {
        return (at > 50) || (1 === au && !("win" == ar.browser.platform && at < 1)) || (0 === at % 12) || (0 == at % 4.000244140625)
      }
      ar.Event.Custom.mousescroll.handler = {
        eventType: "onwheel" in document || ar.browser.ieMode > 8 ? "wheel" : "mousewheel",
        add: function() {
          this.jAddEvent(ar.Event.Custom.mousescroll.handler.eventType, ar.Event.Custom.mousescroll.handler.handle, 1)
        },
        jRemove: function() {
          this.jRemoveEvent(ar.Event.Custom.mousescroll.handler.eventType, ar.Event.Custom.mousescroll.handler.handle, 1)
        },
        handle: function(ay) {
          var az = 0,
            aw = 0,
            au = 0,
            at = 0,
            ax, av;
          if (ay.detail) {
            au = ay.detail * -1
          }
          if (ay.wheelDelta !== undefined) {
            au = ay.wheelDelta
          }
          if (ay.wheelDeltaY !== undefined) {
            au = ay.wheelDeltaY
          }
          if (ay.wheelDeltaX !== undefined) {
            aw = ay.wheelDeltaX * -1
          }
          if (ay.deltaY) {
            au = -1 * ay.deltaY
          }
          if (ay.deltaX) {
            aw = ay.deltaX
          }
          if (0 === au && 0 === aw) {
            return
          }
          az = 0 === au ? aw : au;
          at = Math.max(Math.abs(au), Math.abs(aw));
          if (!aq || at < aq) {
            aq = at
          }
          ax = az > 0 ? "floor" : "ceil";
          az = Math[ax](az / aq);
          aw = Math[ax](aw / aq);
          au = Math[ax](au / aq);
          if (an) {
            clearTimeout(an)
          }
          an = setTimeout(am, 200);
          av = new ar.Event.Custom.mousescroll(this, ay, az, aw, au, 0, aq);
          av.isMouse = ao(aq, ay.deltaMode || 0);
          this.jCallEvent("mousescroll", av)
        }
      }
    })(ai);
    ac.win = ac.$(window);
    ac.doc = ac.$(document);
    return ai
  })();
  (function(Y) {
    if (!Y) {
      throw "MagicJS not found"
    }
    var X = Y.$;
    var W = window.URL || window.webkitURL || null;
    M.ImageLoader = new Y.Class({
      img: null,
      ready: false,
      options: {
        onprogress: Y.$F,
        onload: Y.$F,
        onabort: Y.$F,
        onerror: Y.$F,
        oncomplete: Y.$F,
        onxhrerror: Y.$F,
        xhr: false,
        progressiveLoad: true
      },
      size: null,
      _timer: null,
      loadedBytes: 0,
      _handlers: {
        onprogress: function(Z) {
          if (Z.target && (200 === Z.target.status || 304 === Z.target.status) && Z.lengthComputable) {
            this.options.onprogress.jBind(null, (Z.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / Z.total).jDelay(1);
            this.loadedBytes = Z.loaded
          }
        },
        onload: function(Z) {
          if (Z) {
            X(Z).stop()
          }
          this._unbind();
          if (this.ready) {
            return
          }
          this.ready = true;
          this._cleanup();
          !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
          this.options.onload.jBind(null, this).jDelay(1);
          this.options.oncomplete.jBind(null, this).jDelay(1)
        },
        onabort: function(Z) {
          if (Z) {
            X(Z).stop()
          }
          this._unbind();
          this.ready = false;
          this._cleanup();
          this.options.onabort.jBind(null, this).jDelay(1);
          this.options.oncomplete.jBind(null, this).jDelay(1)
        },
        onerror: function(Z) {
          if (Z) {
            X(Z).stop()
          }
          this._unbind();
          this.ready = false;
          this._cleanup();
          this.options.onerror.jBind(null, this).jDelay(1);
          this.options.oncomplete.jBind(null, this).jDelay(1)
        }
      },
      _bind: function() {
        X(["load", "abort", "error"]).jEach(function(Z) {
          this.img.jAddEvent(Z, this._handlers["on" + Z].jBindAsEvent(this).jDefer(1))
        }, this)
      },
      _unbind: function() {
        if (this._timer) {
          try {
            clearTimeout(this._timer)
          } catch (Z) {}
          this._timer = null
        }
        X(["load", "abort", "error"]).jEach(function(aa) {
          this.img.jRemoveEvent(aa)
        }, this)
      },
      _cleanup: function() {
        this.jGetSize();
        if (this.img.jFetch("new")) {
          var Z = this.img.parentNode;
          this.img.jRemove().jDel("new").jSetCss({
            position: "static",
            top: "auto"
          });
          Z.kill()
        }
      },
      loadBlob: function(aa) {
        var ab = new XMLHttpRequest(),
          Z;
        X(["abort", "progress"]).jEach(function(ac) {
          ab["on" + ac] = X(function(ad) {
            this._handlers["on" + ac].call(this, ad)
          }).jBind(this)
        }, this);
        ab.onerror = X(function() {
          this.options.onxhrerror.jBind(null, this).jDelay(1);
          this.options.xhr = false;
          this._bind();
          this.img.src = aa
        }).jBind(this);
        ab.onload = X(function() {
          if (200 !== ab.status && 304 !== ab.status) {
            this._handlers.onerror.call(this);
            return
          }
          Z = ab.response;
          this._bind();
          if (W && !Y.browser.trident && !("ios" === Y.browser.platform && Y.browser.version < 537)) {
            this.img.setAttribute("src", W.createObjectURL(Z))
          } else {
            this.img.src = aa
          }
        }).jBind(this);
        ab.open("GET", aa);
        ab.responseType = "blob";
        ab.send()
      },
      init: function(aa, Z) {
        this.options = Y.extend(this.options, Z);
        this.img = X(aa) || Y.$new("img").jSetCss({
          maxWidth: "none",
          maxHeight: "none"
        }).jAppendTo(Y.$new("div").jAddClass("magic-temporary-img").jSetCss({
          position: "absolute",
          top: -10000,
          width: 10,
          height: 10,
          overflow: "hidden"
        }).jAppendTo(document.body)).jStore("new", true);
        if (Z.referrerPolicy) {
          this.img.setAttribute("referrerpolicy", Z.referrerPolicy)
        }
        if (Y.browser.features.xhr2 && this.options.xhr && Y.jTypeOf(aa) === "string") {
          this.loadBlob(aa);
          return
        }
        var ab = function() {
          if (this.isReady()) {
            this._handlers.onload.call(this)
          } else {
            this._handlers.onerror.call(this)
          }
          ab = null
        }.jBind(this);
        this._bind();
        if ("string" == Y.jTypeOf(aa)) {
          this.img.src = aa
        } else {
          if (Y.browser.trident && 5 == Y.browser.version && Y.browser.ieMode < 9) {
            this.img.onreadystatechange = function() {
              if (/loaded|complete/.test(this.img.readyState)) {
                this.img.onreadystatechange = null;
                ab && ab()
              }
            }.jBind(this)
          }
          this.img.src = aa.getAttribute("src")
        }
        this.img && this.img.complete && ab && (this._timer = ab.jDelay(100))
      },
      destroy: function() {
        this._unbind();
        this._cleanup();
        this.ready = false;
        return this
      },
      isReady: function() {
        var Z = this.img;
        return (Z.naturalWidth) ? (Z.naturalWidth > 0) : (Z.readyState) ? ("complete" == Z.readyState) : Z.width > 0
      },
      jGetSize: function() {
        return this.size || (this.size = {
          width: this.img.naturalWidth || this.img.width,
          height: this.img.naturalHeight || this.img.height
        })
      }
    })
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found"
    }
    if (X.FX) {
      return
    }
    var W = X.$;
    X.FX = new X.Class({
      init: function(Z, Y) {
        var aa;
        this.el = X.$(Z);
        this.options = X.extend(this.options, Y);
        this.timer = false;
        this.easeFn = this.cubicBezierAtTime;
        aa = X.FX.Transition[this.options.transition] || this.options.transition;
        if ("function" === X.jTypeOf(aa)) {
          this.easeFn = aa
        } else {
          this.cubicBezier = this.parseCubicBezier(aa) || this.parseCubicBezier("ease")
        }
        if ("string" == X.jTypeOf(this.options.cycles)) {
          this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
        }
      },
      options: {
        fps: 60,
        duration: 600,
        transition: "ease",
        cycles: 1,
        direction: "normal",
        onStart: X.$F,
        onComplete: X.$F,
        onBeforeRender: X.$F,
        onAfterRender: X.$F,
        forceAnimation: false,
        roundCss: false
      },
      styles: null,
      cubicBezier: null,
      easeFn: null,
      setTransition: function(Y) {
        this.options.transition = Y;
        Y = X.FX.Transition[this.options.transition] || this.options.transition;
        if ("function" === X.jTypeOf(Y)) {
          this.easeFn = Y
        } else {
          this.easeFn = this.cubicBezierAtTime;
          this.cubicBezier = this.parseCubicBezier(Y) || this.parseCubicBezier("ease")
        }
      },
      start: function(aa) {
        var Y = /\%$/,
          Z;
        this.styles = aa || {};
        this.cycle = 0;
        this.state = 0;
        this.curFrame = 0;
        this.pStyles = {};
        this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
        this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
        for (Z in this.styles) {
          Y.test(this.styles[Z][0]) && (this.pStyles[Z] = true);
          if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
            this.styles[Z].reverse()
          }
        }
        this.startTime = X.now();
        this.finishTime = this.startTime + this.options.duration;
        this.options.onStart.call();
        if (0 === this.options.duration) {
          this.render(1);
          this.options.onComplete.call()
        } else {
          this.loopBind = this.loop.jBind(this);
          if (!this.options.forceAnimation && X.browser.features.requestAnimationFrame) {
            this.timer = X.browser.requestAnimationFrame.call(window, this.loopBind)
          } else {
            this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
          }
        }
        return this
      },
      stopAnimation: function() {
        if (this.timer) {
          if (!this.options.forceAnimation && X.browser.features.requestAnimationFrame && X.browser.cancelAnimationFrame) {
            X.browser.cancelAnimationFrame.call(window, this.timer)
          } else {
            clearInterval(this.timer)
          }
          this.timer = false
        }
      },
      stop: function(Y) {
        Y = X.defined(Y) ? Y : false;
        this.stopAnimation();
        if (Y) {
          this.render(1);
          this.options.onComplete.jDelay(10)
        }
        return this
      },
      calc: function(aa, Z, Y) {
        aa = parseFloat(aa);
        Z = parseFloat(Z);
        return (Z - aa) * Y + aa
      },
      loop: function() {
        var Z = X.now(),
          Y = (Z - this.startTime) / this.options.duration,
          aa = Math.floor(Y);
        if (Z >= this.finishTime && aa >= this.options.cycles) {
          this.stopAnimation();
          this.render(1);
          this.options.onComplete.jDelay(10);
          return this
        }
        if (this.alternate && this.cycle < aa) {
          for (var ab in this.styles) {
            this.styles[ab].reverse()
          }
        }
        this.cycle = aa;
        if (!this.options.forceAnimation && X.browser.features.requestAnimationFrame) {
          this.timer = X.browser.requestAnimationFrame.call(window, this.loopBind)
        }
        this.render((this.continuous ? aa : 0) + this.easeFn(Y % 1))
      },
      render: function(Y) {
        var Z = {},
          ab = Y;
        for (var aa in this.styles) {
          if ("opacity" === aa) {
            Z[aa] = Math.round(this.calc(this.styles[aa][0], this.styles[aa][1], Y) * 100) / 100
          } else {
            Z[aa] = this.calc(this.styles[aa][0], this.styles[aa][1], Y);
            this.pStyles[aa] && (Z[aa] += "%")
          }
        }
        this.options.onBeforeRender(Z, this.el);
        this.set(Z);
        this.options.onAfterRender(Z, this.el)
      },
      set: function(Y) {
        return this.el.jSetCss(Y)
      },
      parseCubicBezier: function(Y) {
        var Z, aa = null;
        if ("string" !== X.jTypeOf(Y)) {
          return null
        }
        switch (Y) {
          case "linear":
            aa = W([0, 0, 1, 1]);
            break;
          case "ease":
            aa = W([0.25, 0.1, 0.25, 1]);
            break;
          case "ease-in":
            aa = W([0.42, 0, 1, 1]);
            break;
          case "ease-out":
            aa = W([0, 0, 0.58, 1]);
            break;
          case "ease-in-out":
            aa = W([0.42, 0, 0.58, 1]);
            break;
          case "easeInSine":
            aa = W([0.47, 0, 0.745, 0.715]);
            break;
          case "easeOutSine":
            aa = W([0.39, 0.575, 0.565, 1]);
            break;
          case "easeInOutSine":
            aa = W([0.445, 0.05, 0.55, 0.95]);
            break;
          case "easeInQuad":
            aa = W([0.55, 0.085, 0.68, 0.53]);
            break;
          case "easeOutQuad":
            aa = W([0.25, 0.46, 0.45, 0.94]);
            break;
          case "easeInOutQuad":
            aa = W([0.455, 0.03, 0.515, 0.955]);
            break;
          case "easeInCubic":
            aa = W([0.55, 0.055, 0.675, 0.19]);
            break;
          case "easeOutCubic":
            aa = W([0.215, 0.61, 0.355, 1]);
            break;
          case "easeInOutCubic":
            aa = W([0.645, 0.045, 0.355, 1]);
            break;
          case "easeInQuart":
            aa = W([0.895, 0.03, 0.685, 0.22]);
            break;
          case "easeOutQuart":
            aa = W([0.165, 0.84, 0.44, 1]);
            break;
          case "easeInOutQuart":
            aa = W([0.77, 0, 0.175, 1]);
            break;
          case "easeInQuint":
            aa = W([0.755, 0.05, 0.855, 0.06]);
            break;
          case "easeOutQuint":
            aa = W([0.23, 1, 0.32, 1]);
            break;
          case "easeInOutQuint":
            aa = W([0.86, 0, 0.07, 1]);
            break;
          case "easeInExpo":
            aa = W([0.95, 0.05, 0.795, 0.035]);
            break;
          case "easeOutExpo":
            aa = W([0.19, 1, 0.22, 1]);
            break;
          case "easeInOutExpo":
            aa = W([1, 0, 0, 1]);
            break;
          case "easeInCirc":
            aa = W([0.6, 0.04, 0.98, 0.335]);
            break;
          case "easeOutCirc":
            aa = W([0.075, 0.82, 0.165, 1]);
            break;
          case "easeInOutCirc":
            aa = W([0.785, 0.135, 0.15, 0.86]);
            break;
          case "easeInBack":
            aa = W([0.6, -0.28, 0.735, 0.045]);
            break;
          case "easeOutBack":
            aa = W([0.175, 0.885, 0.32, 1.275]);
            break;
          case "easeInOutBack":
            aa = W([0.68, -0.55, 0.265, 1.55]);
            break;
          default:
            Y = Y.replace(/\s/g, "");
            if (Y.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
              aa = Y.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
              for (Z = aa.length - 1; Z >= 0; Z--) {
                aa[Z] = parseFloat(aa[Z])
              }
            }
        }
        return W(aa)
      },
      cubicBezierAtTime: function(ak) {
        var Y = 0,
          aj = 0,
          ag = 0,
          al = 0,
          ai = 0,
          ae = 0,
          af = this.options.duration;

        function ad(am) {
          return ((Y * am + aj) * am + ag) * am
        }

        function ac(am) {
          return ((al * am + ai) * am + ae) * am
        }

        function aa(am) {
          return (3 * Y * am + 2 * aj) * am + ag
        }

        function ah(am) {
          return 1 / (200 * am)
        }

        function Z(am, an) {
          return ac(ab(am, an))
        }

        function ab(au, av) {
          var at, ar, aq, an, am, ap;

          function ao(aw) {
            if (aw >= 0) {
              return aw
            } else {
              return 0 - aw
            }
          }
          for (aq = au, ap = 0; ap < 8; ap++) {
            an = ad(aq) - au;
            if (ao(an) < av) {
              return aq
            }
            am = aa(aq);
            if (ao(am) < 0.000001) {
              break
            }
            aq = aq - an / am
          }
          at = 0;
          ar = 1;
          aq = au;
          if (aq < at) {
            return at
          }
          if (aq > ar) {
            return ar
          }
          while (at < ar) {
            an = ad(aq);
            if (ao(an - au) < av) {
              return aq
            }
            if (au > an) {
              at = aq
            } else {
              ar = aq
            }
            aq = (ar - at) * 0.5 + at
          }
          return aq
        }
        ag = 3 * this.cubicBezier[0];
        aj = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - ag;
        Y = 1 - ag - aj;
        ae = 3 * this.cubicBezier[1];
        ai = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - ae;
        al = 1 - ae - ai;
        return Z(ak, ah(af))
      }
    });
    X.FX.Transition = {
      linear: "linear",
      sineIn: "easeInSine",
      sineOut: "easeOutSine",
      expoIn: "easeInExpo",
      expoOut: "easeOutExpo",
      quadIn: "easeInQuad",
      quadOut: "easeOutQuad",
      cubicIn: "easeInCubic",
      cubicOut: "easeOutCubic",
      backIn: "easeInBack",
      backOut: "easeOutBack",
      elasticIn: function(Z, Y) {
        Y = Y || [];
        return Math.pow(2, 10 * --Z) * Math.cos(20 * Z * Math.PI * (Y[0] || 1) / 3)
      },
      elasticOut: function(Z, Y) {
        return 1 - X.FX.Transition.elasticIn(1 - Z, Y)
      },
      bounceIn: function(aa) {
        for (var Z = 0, Y = 1; 1; Z += Y, Y /= 2) {
          if (aa >= (7 - 4 * Z) / 11) {
            return Y * Y - Math.pow((11 - 6 * Z - 11 * aa) / 4, 2)
          }
        }
      },
      bounceOut: function(Y) {
        return 1 - X.FX.Transition.bounceIn(1 - Y)
      },
      none: function(Y) {
        return 0
      }
    }
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found"
    }
    if (X.PFX) {
      return
    }
    var W = X.$;
    X.PFX = new X.Class(X.FX, {
      init: function(Y, Z) {
        this.el_arr = Y;
        this.options = X.extend(this.options, Z);
        this.timer = false;
        this.$parent.init()
      },
      start: function(ac) {
        var Y = /\%$/,
          ab, aa, Z = ac.length;
        this.styles_arr = ac;
        this.pStyles_arr = new Array(Z);
        for (aa = 0; aa < Z; aa++) {
          this.pStyles_arr[aa] = {};
          for (ab in ac[aa]) {
            Y.test(ac[aa][ab][0]) && (this.pStyles_arr[aa][ab] = true);
            if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
              this.styles_arr[aa][ab].reverse()
            }
          }
        }
        this.$parent.start({});
        return this
      },
      render: function(Y) {
        for (var Z = 0; Z < this.el_arr.length; Z++) {
          this.el = X.$(this.el_arr[Z]);
          this.styles = this.styles_arr[Z];
          this.pStyles = this.pStyles_arr[Z];
          this.$parent.render(Y)
        }
      }
    })
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found";
      return
    }
    if (!X.FX) {
      throw "MagicJS.FX not found";
      return
    }
    if (X.FX.Slide) {
      return
    }
    var W = X.$;
    X.FX.Slide = new X.Class(X.FX, {
      options: {
        mode: "vertical"
      },
      init: function(Z, Y) {
        this.el = X.$(Z);
        this.options = X.extend(this.$parent.options, this.options);
        this.$parent.init(Z, Y);
        this.wrapper = this.el.jFetch("slide:wrapper");
        this.wrapper = this.wrapper || X.$new("DIV").jSetCss(X.extend(this.el.jGetStyles("margin-top", "margin-left", "margin-right", "margin-bottom", "position", "top", "float"), {
          overflow: "hidden"
        })).enclose(this.el);
        this.el.jStore("slide:wrapper", this.wrapper).jSetCss({
          margin: 0
        })
      },
      vertical: function() {
        this.margin = "margin-top";
        this.layout = "height";
        this.offset = this.el.offsetHeight
      },
      horizontal: function(Y) {
        this.margin = "margin-" + (Y || "left");
        this.layout = "width";
        this.offset = this.el.offsetWidth
      },
      right: function() {
        this.horizontal()
      },
      left: function() {
        this.horizontal("right")
      },
      start: function(aa, ad) {
        this[ad || this.options.mode]();
        var ac = this.el.jGetCss(this.margin).jToInt(),
          ab = this.wrapper.jGetCss(this.layout).jToInt(),
          Y = {},
          ae = {},
          Z;
        Y[this.margin] = [ac, 0], Y[this.layout] = [0, this.offset], ae[this.margin] = [ac, -this.offset], ae[this.layout] = [ab, 0];
        switch (aa) {
          case "in":
            Z = Y;
            break;
          case "out":
            Z = ae;
            break;
          case "toggle":
            Z = (0 == ab) ? Y : ae;
            break
        }
        this.$parent.start(Z);
        return this
      },
      set: function(Y) {
        this.el.jSetCssProp(this.margin, Y[this.margin]);
        this.wrapper.jSetCssProp(this.layout, Y[this.layout]);
        return this
      },
      slideIn: function(Y) {
        return this.start("in", Y)
      },
      slideOut: function(Y) {
        return this.start("out", Y)
      },
      hide: function(Z) {
        this[Z || this.options.mode]();
        var Y = {};
        Y[this.layout] = 0, Y[this.margin] = -this.offset;
        return this.set(Y)
      },
      show: function(Z) {
        this[Z || this.options.mode]();
        var Y = {};
        Y[this.layout] = this.offset, Y[this.margin] = 0;
        return this.set(Y)
      },
      toggle: function(Y) {
        return this.start("toggle", Y)
      }
    })
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found";
      return
    }
    if (X.Tooltip) {
      return
    }
    var W = X.$;
    X.Tooltip = function(Z, aa) {
      var Y = this.tooltip = X.$new("div", null, {
        position: "absolute",
        "z-index": 999
      }).jAddClass("MagicToolboxTooltip");
      X.$(Z).jAddEvent("mouseover", function() {
        Y.jAppendTo(document.body)
      });
      X.$(Z).jAddEvent("mouseout", function() {
        Y.jRemove()
      });
      X.$(Z).jAddEvent("mousemove", function(af) {
        var ah = 20,
          ae = X.$(af).jGetPageXY(),
          ad = Y.jGetSize(),
          ac = X.$(window).jGetSize(),
          ag = X.$(window).jGetScroll();

        function ab(ak, ai, aj) {
          return (aj < (ak - ai) / 2) ? aj : ((aj > (ak + ai) / 2) ? (aj - ai) : (ak - ai) / 2)
        }
        Y.jSetCss({
          left: ag.x + ab(ac.width, ad.width + 2 * ah, ae.x - ag.x) + ah,
          top: ag.y + ab(ac.height, ad.height + 2 * ah, ae.y - ag.y) + ah
        })
      });
      this.text(aa)
    };
    X.Tooltip.prototype.text = function(Y) {
      this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
      this.tooltip.append(document.createTextNode(Y))
    }
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found";
      return
    }
    if (X.MessageBox) {
      return
    }
    var W = X.$;
    X.Message = function(ab, aa, Z, Y) {
      this.hideTimer = null;
      this.messageBox = X.$new("span", null, {
        position: "absolute",
        "z-index": 999,
        visibility: "hidden",
        opacity: 0.8
      }).jAddClass(Y || "").jAppendTo(Z || document.body);
      this.setMessage(ab);
      this.show(aa)
    };
    X.Message.prototype.show = function(Y) {
      this.messageBox.show();
      this.hideTimer = this.hide.jBind(this).jDelay(X.ifndef(Y, 5000))
    };
    X.Message.prototype.hide = function(Y) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
      if (this.messageBox && !this.hideFX) {
        this.hideFX = new M.FX(this.messageBox, {
          duration: X.ifndef(Y, 500),
          onComplete: function() {
            this.messageBox.kill();
            delete this.messageBox;
            this.hideFX = null
          }.jBind(this)
        }).start({
          opacity: [this.messageBox.jGetCss("opacity"), 0]
        })
      }
    };
    X.Message.prototype.setMessage = function(Y) {
      this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
      this.messageBox.append(document.createTextNode(Y))
    }
  })(M);
  (function(X) {
    if (!X) {
      throw "MagicJS not found"
    }
    if (X.Options) {
      return
    }
    var aa = X.$,
      W = null,
      ae = {
        "boolean": 1,
        array: 2,
        number: 3,
        "function": 4,
        string: 100
      },
      Y = {
        "boolean": function(ah, ag, af) {
          if ("boolean" != X.jTypeOf(ag)) {
            if (af || "string" != X.jTypeOf(ag)) {
              return false
            } else {
              if (!/^(true|false)$/.test(ag)) {
                return false
              } else {
                ag = ag.jToBool()
              }
            }
          }
          if (ah.hasOwnProperty("enum") && !aa(ah["enum"]).contains(ag)) {
            return false
          }
          W = ag;
          return true
        },
        string: function(ah, ag, af) {
          if ("string" !== X.jTypeOf(ag)) {
            return false
          } else {
            if (ah.hasOwnProperty("enum") && !aa(ah["enum"]).contains(ag)) {
              return false
            } else {
              W = "" + ag;
              return true
            }
          }
        },
        number: function(ai, ah, ag) {
          var af = false,
            ak = /%$/,
            aj = (X.jTypeOf(ah) == "string" && ak.test(ah));
          if (ag && !"number" == typeof ah) {
            return false
          }
          ah = parseFloat(ah);
          if (isNaN(ah)) {
            return false
          }
          if (isNaN(ai.minimum)) {
            ai.minimum = Number.NEGATIVE_INFINITY
          }
          if (isNaN(ai.maximum)) {
            ai.maximum = Number.POSITIVE_INFINITY
          }
          if (ai.hasOwnProperty("enum") && !aa(ai["enum"]).contains(ah)) {
            return false
          }
          if (ai.minimum > ah || ah > ai.maximum) {
            return false
          }
          W = aj ? (ah + "%") : ah;
          return true
        },
        array: function(ai, ag, af) {
          if ("string" === X.jTypeOf(ag)) {
            try {
              ag = window.JSON.parse(ag)
            } catch (ah) {
              return false
            }
          }
          if (X.jTypeOf(ag) === "array") {
            W = ag;
            return true
          } else {
            return false
          }
        },
        "function": function(ah, ag, af) {
          if (X.jTypeOf(ag) === "function") {
            W = ag;
            return true
          } else {
            return false
          }
        }
      },
      Z = function(ak, aj, ag) {
        var ai;
        ai = ak.hasOwnProperty("oneOf") ? ak.oneOf : [ak];
        if ("array" != X.jTypeOf(ai)) {
          return false
        }
        for (var ah = 0, af = ai.length - 1; ah <= af; ah++) {
          if (Y[ai[ah].type](ai[ah], aj, ag)) {
            return true
          }
        }
        return false
      },
      ac = function(ak) {
        var ai, ah, aj, af, ag;
        if (ak.hasOwnProperty("oneOf")) {
          af = ak.oneOf.length;
          for (ai = 0; ai < af; ai++) {
            for (ah = ai + 1; ah < af; ah++) {
              if (ae[ak.oneOf[ai]["type"]] > ae[ak.oneOf[ah].type]) {
                ag = ak.oneOf[ai];
                ak.oneOf[ai] = ak.oneOf[ah];
                ak.oneOf[ah] = ag
              }
            }
          }
        }
        return ak
      },
      ad = function(ai) {
        var ah;
        ah = ai.hasOwnProperty("oneOf") ? ai.oneOf : [ai];
        if ("array" != X.jTypeOf(ah)) {
          return false
        }
        for (var ag = ah.length - 1; ag >= 0; ag--) {
          if (!ah[ag].type || !ae.hasOwnProperty(ah[ag].type)) {
            return false
          }
          if (X.defined(ah[ag]["enum"])) {
            if ("array" !== X.jTypeOf(ah[ag]["enum"])) {
              return false
            }
            for (var af = ah[ag]["enum"].length - 1; af >= 0; af--) {
              if (!Y[ah[ag].type]({
                type: ah[ag].type
              }, ah[ag]["enum"][af], true)) {
                return false
              }
            }
          }
        }
        if (ai.hasOwnProperty("default") && !Z(ai, ai["default"], true)) {
          return false
        }
        return true
      },
      ab = function(af) {
        this.schema = {};
        this.options = {};
        this.parseSchema(af)
      };
    X.extend(ab.prototype, {
      parseSchema: function(ah) {
        var ag, af, ai;
        for (ag in ah) {
          if (!ah.hasOwnProperty(ag)) {
            continue
          }
          af = (ag + "").jTrim().jCamelize();
          if (!this.schema.hasOwnProperty(af)) {
            this.schema[af] = ac(ah[ag]);
            if (!ad(this.schema[af])) {
              throw "Incorrect definition of the '" + ag + "' parameter in " + ah
            }
            this.options[af] = undefined
          }
        }
      },
      set: function(ag, af) {
        ag = (ag + "").jTrim().jCamelize();
        if (X.jTypeOf(af) == "string") {
          af = af.jTrim()
        }
        if (this.schema.hasOwnProperty(ag)) {
          W = af;
          if (Z(this.schema[ag], af)) {
            this.options[ag] = W
          }
          W = null
        }
      },
      get: function(af) {
        af = (af + "").jTrim().jCamelize();
        if (this.schema.hasOwnProperty(af)) {
          return X.defined(this.options[af]) ? this.options[af] : this.schema[af]["default"]
        }
      },
      fromJSON: function(ag) {
        for (var af in ag) {
          this.set(af, ag[af])
        }
      },
      getJSON: function() {
        var ag = X.extend({}, this.options);
        for (var af in ag) {
          if (undefined === ag[af] && undefined !== this.schema[af]["default"]) {
            ag[af] = this.schema[af]["default"]
          }
        }
        return ag
      },
      fromString: function(af) {
        aa(af.split(";")).jEach(aa(function(ag) {
          ag = ag.split(":");
          this.set(ag.shift().jTrim(), ag.join(":"))
        }).jBind(this))
      },
      exists: function(af) {
        af = (af + "").jTrim().jCamelize();
        return this.schema.hasOwnProperty(af)
      },
      isset: function(af) {
        af = (af + "").jTrim().jCamelize();
        return this.exists(af) && X.defined(this.options[af])
      },
      jRemove: function(af) {
        af = (af + "").jTrim().jCamelize();
        if (this.exists(af)) {
          delete this.options[af];
          delete this.schema[af]
        }
      }
    });
    X.Options = ab
  })(M);
  (function(W) {
    W.ILoader = function(X, Y) {
      this.img = null;
      this.src = X.src || X;
      this.loader = null;
      this.callbacks = Y;
      this.oldLoader = null;
      if ("string" === W.jTypeOf(X)) {
        this.img = W.$new("img")
      } else {
        this.img = X
      }
    };
    W.ILoader.prototype = {
      size: {},
      load: function() {
        this.img.src = this.src;
        this.oldLoader = new W.ImageLoader(this.img, {
          onload: function(X) {
            this.size = X.size;
            if (this.callbacks.onload) {
              this.callbacks.onload(X)
            }
          }.jBind(this),
          onerror: function() {
            this.size = {};
            if (this.callbacks.onload) {
              this.callbacks.onerror()
            }
          }.jBind(this),
          onabort: function() {
            this.size = {};
            if (this.callbacks.onabort) {
              this.callbacks.onabort()
            }
          }.jBind(this)
        })
      },
      abort: function() {
        this.destroy();
        if (this.callbacks.onabort) {
          this.callbacks.onabort()
        }
      },
      destroy: function() {
        this.img.src = "";
        if (this.oldLoader) {
          this.oldLoader.destroy()
        }
        this.oldLoader = null;
        this.size = {}
      }
    }
  })(M);
  var A = {
    expandTrigger: {
      type: "string",
      "enum": ["click", "hover", "mouseover"],
      "default": "click"
    },
    expandEffect: {
      type: "string",
      "enum": ["expand", "fade"],
      "default": "expand"
    },
    expandEasing: {
      type: "string",
      "default": "cubic-bezier(.14,.52,.65,.92)"
    },
    expandSpeed: {
      type: "number",
      minimum: 1,
      "default": 350
    },
    expandImageSize: {
      type: "string",
      "enum": ["fit-screen", "original"],
      "default": "fit-screen"
    },
    selectorEffect: {
      type: "string",
      "enum": ["switch", "expand"],
      "default": "switch"
    },
    expandAlign: {
      type: "string",
      "enum": ["screen", "image"],
      "default": "screen"
    },
    buttons: {
      type: "string",
      "enum": ["auto", "tl", "top left", "top-left", "tr", "top right", "top-right", "bl", "bottom left", "bottom-left", "br", "bottom right", "bottom-right", "off", "hide"],
      "default": "auto"
    },
    captionSource: {
      oneOf: [{
        type: "string",
        "enum": ["span", "alt", "title"]
      }, {
        type: "string"
      }],
      "default": "title"
    },
    captionPosition: {
      oneOf: [{
        type: "string",
        "enum": ["bottom", "right", "off"]
      }, {
        type: "boolean",
        "enum": [false]
      }],
      "default": "bottom"
    },
    loop: {
      type: "boolean",
      "default": true
    },
    gallerySpeed: {
      type: "number",
      minimum: 0,
      "default": 250
    },
    group: {
      oneOf: [{
        type: "string"
      }, {
        type: "boolean",
        "enum": [false]
      }],
      "default": false
    },
    selectorTrigger: {
      type: "string",
      "enum": ["click", "hover", "mouseover", "tap"],
      "default": "click"
    },
    keyboard: {
      type: "boolean",
      "default": true
    },
    screenPadding: {
      type: "number",
      minimum: 1,
      "default": 60
    },
    cssClass: {
      type: "string"
    },
    link: {
      type: "string"
    },
    linkTarget: {
      type: "string",
      "enum": ["_self", "_blank"],
      "default": "_self"
    },
    rightClick: {
      type: "boolean",
      "default": true
    },
    slideMobileEffect: {
      type: "string",
      "enum": ["rotate", "straight"],
      "default": "rotate"
    },
    textClickHint: {
      type: "string",
      "default": "Click to expand"
    },
    textHoverHint: {
      type: "string",
      "default": "Hover to expand"
    },
    hint: {
      oneOf: [{
        type: "string",
        "enum": ["once", "always", "off"]
      }, {
        type: "boolean",
        "enum": [false]
      }],
      "default": "once"
    },
    autostart: {
      type: "boolean",
      "default": true
    },
    lazyLoad: {
      type: "boolean",
      "default": false
    },
    textBtnClose: {
      type: "string",
      "default": "Close"
    },
    textBtnNext: {
      type: "string",
      "default": "Next"
    },
    textBtnPrev: {
      type: "string",
      "default": "Previous"
    },
    onReady: {
      type: "function",
      "default": y.$F
    },
    onLoad: {
      type: "function",
      "default": y.$F
    },
    onExpand: {
      type: "function",
      "default": y.$F
    },
    onClose: {
      type: "function",
      "default": y.$F
    },
    onSwap: {
      type: "function",
      "default": y.$F
    },
    onUpdate: {
      type: "function",
      "default": y.$F
    },
    onExpandSwap: {
      type: "function",
      "default": y.$F
    }
  };
  var o = ".MagicThumb-expanded,.MagicThumb-expanded * {    -webkit-box-sizing: border-box !important;            box-sizing: border-box !important;}.mgt-expand-open,.mgt-expand-open body {    overflow: hidden !important;}.mgt-expand-open body { height: auto !important; }.mgt-expand-open body { max-height: none !important; }.mgt-hint, .mgt-loading {    margin: 0 !important;    pointer-events: none !important;    display: inline-block;    -webkit-font-smoothing: antialiased !important;    -moz-osx-font-smoothing: grayscale !important;}.mgt-hint {    z-index: 1000 !important;    position: absolute !important;}.mgt-loading {    z-index: 99999999999 !important;    position: absolute;}.mgt-hint {    left: 0;    right: 0;    background-color: transparent !important;}.mgt-hint-message {    display: inline-block !important;}/* Style of the small image link */.MagicThumb, .MagicThumb:hover {    outline: 0 !important;    line-height: 100% !important;    -webkit-touch-callout: none !important;    -webkit-tap-highlight-color: transparent !important;}/* Style of the small image */.MagicThumb img {    border: 0 !important;    margin: 0 !important;    outline: 0 !important;    padding: 0 !important;}.MagicThumb.magic-for-ie8,.MagicThumb.magic-for-ie8 > img {    max-width: none !important;}/* Style of the expanded image */.MagicThumb-expanded {    min-width: 0 !important;    min-height: 0 !important;    z-index: 2110000000 !important;    pointer-events: auto !important;    -webkit-backface-visibility: hidden !important;            backface-visibility: hidden !important;}.mgt-expand-open .MagicThumb-expanded,.mgt-expand-open .MagicThumb-expanded .mgt-figure {    overflow: visible !important;}.MagicThumb-expanded .mgt-figure {    max-height: 100% !important;}/* Style of the caption for the expanded image */.mgt-caption {    border: 0 !important;    outline: 0 !important;    z-index: 10 !important;    cursor: default !important;    transition: opacity .25s !important;    border-collapse: separate !important;}.mgt-caption-right .mgt-caption {    top: 0 !important;    right: 0 !important;    height: 100% !important;    position: absolute !important;    display: inline-block !important;}.mgt-caption-bottom .mgt-caption {    position: relative !important;}.mgt-caption .mgt-caption-text {    height: 100% !important;    overflow-x: hidden !important;    overflow-y: auto !important;}/* Style of the close/next/prev buttons */.MagicThumb-buttons {    margin: 0 !important;    padding: 0 !important;    outline: 0 !important;    position: fixed;    z-index: 3000000000 !important;}.mgt-expand-stage .MagicThumb-buttons .mgt-button {    position: fixed;    display: inline-block;}.mgt-expand-stage:-webkit-full-screen-ancestor .MagicThumb-buttons {    display: none !important;}.mgt-expand-stage:-moz-full-screen-ancestor .MagicThumb-buttons {    display: none !important;}.mgt-expand-stage:-ms-full-screen-ancestor .MagicThumb-buttons {    display: none !important;}.mgt-expand-stage:-full-screen-ancestor .MagicThumb-buttons {    display: none !important;}.MagicThumb-buttons .mgt-button.disabled {    opacity: .1 !important;}.MagicThumb-buttons.compact-buttons .mgt-button.disabled {    opacity: .3 !important;}.mgt-expand-stage {    top: 0 !important;    left: 0 !important;    right: 0 !important;    bottom: 0 !important;    border: 0 !important;    margin: 0 !important;    padding: 0 !important;    opacity: 1 !important;    width: 100% !important;    height: 100% !important;    display: block !important;    position: fixed !important;    overflow: hidden !important;    z-index: 2100000010 !important;    pointer-events: none !important;    background-color: transparent !important;    -webkit-backface-visibility: hidden !important;            backface-visibility: hidden !important;    -ms-overflow-style: none !important;    -webkit-overflow-scrolling: auto !important;}.mgt-expand-open .mgt-expand-stage {    pointer-events: auto !important;}.mgt-bg {    top: 0 !important;    left: 0 !important;    right: 0 !important;    bottom: 0 !important;    border: 0 !important;    margin: 0 !important;    padding: 0 !important;    width: auto !important;    height: auto !important;    display: none !important;    position: fixed !important;    overflow: hidden !important;    z-index: 2100000000 !important;    -ms-overflow-style: none !important;    -webkit-backface-visibility: hidden !important;            backface-visibility: hidden !important;}.mgt-bg.show {    display: block !important;}.mgt-fade {    -webkit-transition: opacity .25s !important;            transition: opacity .25s !important;}.mgt-hidden {    opacity: 0 !important;}";
  var G = y.$;
  var r = function(W) {
      return W[W.length - 1]
    },
    c = function(X, Z) {
      var Y, W = false;
      for (Y = 0; Y < X.length; Y++) {
        if ((X[Y].src || "").indexOf(Z) > -1) {
          W = X[Y];
          break
        }
      }
      return W
    },
    u = function(W) {
      s.jEach(function(X) {
        if (X.videoType) {
          X.videoReady(W)
        }
      })
    },
    O = {
      videoFormats: G(["mp4", "ogg", "webm", "3gp", "flv", "ogv"]),
      players: {},
      defaultVideoParams: G(["controls"]),
      defaultSizes: {},
      youtubeImgs: {
        thumb1: "1.jpg",
        thumb2: "2.jpg",
        thumb3: "3.jpg",
        def0: "0.jpg",
        def1: "default.jpg",
        middleQuality: "mqdefault.jpg",
        highQuality: "hqdefault.jpg",
        maxSize: "maxresdefault.jpg"
      },
      ready: y.$F,
      getFormat: function(X) {
        var W = X.split("?")[0];
        W = r(W.split("."));
        return W
      },
      getType: function(Y) {
        var W = null,
          X;
        if (/youtube/.test(Y)) {
          W = "youtube"
        } else {
          if (/vimeo/.test(Y)) {
            W = "vimeo"
          } else {
            X = O.getFormat(Y);
            if (O.videoFormats.contains(X)) {
              W = "custom"
            }
          }
        }
        return W
      },
      getExtraParams: function(X, Z) {
        var W = {},
          Y = X.split("?")[1];
        if (Y) {
          Y = Y.split("&")
        } else {
          Y = []
        }
        G(Y).jEach(function(ac) {
          var ab, aa;
          ab = ac.split("=");
          aa = ab[1];
          ab = ab[0];
          W[ab] = aa
        });
        if (W.width) {
          O.defaultSizes[Z].width = W.width
        }
        if (W.height) {
          O.defaultSizes[Z].height = W.height
        }
        return W
      },
      getHeight: function(Y, W) {
        var X = O.defaultSizes[Y];
        return X.height / X.width * W
      },
      getWidth: function(Y, W) {
        var X = O.defaultSizes[Y];
        return X.width / X.height * W
      },
      stop: function(W, X) {
        O[W].stop(X)
      },
      youtube: {
        isScriptAdded: false,
        isAPIEventAdded: false,
        isAPIEventLoaded: false,
        laodAPI: function() {
          var W, Z, Y, X = O.youtube;
          if (window.YT) {
            X.isAPIEventLoaded = true;
            return
          }
          if (!X.isAPIEventAdded) {
            X.isAPIEventAdded = true;
            Y = window.onYouTubeIframeAPIReady || y.$F;
            window.onYouTubeIframeAPIReady = function() {
              X.isAPIEventLoaded = true;
              u("youtube");
              Y()
            }
          }
          if (!X.isScriptAdded) {
            X.isScriptAdded = true;
            W = y.$A(document.getElementsByTagName("script"));
            if (!c(W, "youtube.com") && !c(W, "iframe_api")) {
              y.$new("script", {
                src: "https://www.youtube.com/iframe_api"
              }).jAppendTo(document.body)
            }
          }
        },
        createPlayer: function(X, Y) {
          var W = O.youtube;
          if (!W.isScriptAdded || !W.isAPIEventAdded) {
            W.laodAPI()
          }
          if (!O.players[Y] && W.isAPIEventLoaded) {
            O.players[Y] = {
              player: new window.YT.Player(X, {
                events: {
                  onReady: function() {
                    O.players[Y].ready = true
                  },
                  onError: function(Z) {
                    if (Z.data == 100) {}
                  }
                }
              })
            }
          }
        },
        stop: function(X) {
          var W = O.players[X];
          if (W && W.ready) {
            W.player.stopVideo()
          }
        },
        getExtraParams: function(X, Z) {
          var Y = O.getExtraParams(X, Z),
            W = window.location;
          Y.enablejsapi = "1";
          Y.origin = W.protocol + "//" + W.host;
          return Y
        },
        getId: function(W, Y) {
          var X = null;
          O.defaultSizes[Y] = {
            width: 560,
            height: 315
          };
          W = W.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
          if (W[2] !== undefined) {
            X = W[2].split(/[^0-9a-z_\-]/i);
            X = X[0]
          }
          return X
        },
        getImg: function(Y, aa, W) {
          var Z = O.youtubeImgs,
            X = "https://img.youtube.com/vi/" + Y.id + "/";
          switch (aa) {
            case "small":
              X += Z.def1;
              break;
            case "middle":
              X += Z.def0;
              break;
            default:
              X += Z.def1
          }
          W(X);
          return X
        },
        getHtml: function(W, aa) {
          var X, Z = [];
          for (X in aa) {
            if (G(["v", "autoplay", "list"]).contains(X)) {
              continue
            }
            Z.push(X + "=" + aa[X])
          }
          if (Z.length) {
            Z = "?" + Z.join("&")
          } else {
            Z = ""
          }
          var Y = y.$new("iframe", {
            src: "https://www.youtube.com/embed/" + W.id + Z,
            frameborder: 0,
            allowfullscreen: ""
          });
          return Y
        }
      },
      vimeo: {
        jsonHash: {},
        isScriptAdded: false,
        isAPIEventAdded: false,
        isAPIEventLoaded: false,
        apiScript: null,
        laodAPI: function() {
          var W, X = O.vimeo;
          if ("function" == typeof define && define.amd && "function" == typeof require) {
            if (!X.isScriptAdded) {
              X.isScriptAdded = true;
              require(["https://player.vimeo.com/api/player.js"], function(Y) {
                window.Vimeo = {
                  Player: Y
                };
                X.isAPIEventLoaded = true;
                u("vimeo")
              })
            }
          } else {
            if (!X.isScriptAdded) {
              X.isScriptAdded = true;
              W = G(y.$A(document.body.getElementsByTagName("script")));
              X.apiScript = y.$new("script", {
                src: "https://player.vimeo.com/api/player.js"
              }).jAppendTo(document.body)
            }
            if (!X.isAPIEventAdded) {
              X.isAPIEventAdded = true;
              G(X.apiScript).jAddEvent("load", function() {
                X.apiScript.jRemoveEvent("load");
                X.isAPIEventLoaded = true;
                u("vimeo")
              })
            }
          }
        },
        createPlayer: function(X, Y) {
          var W = O.vimeo;
          if (!W.isScriptAdded || !W.isAPIEventAdded) {
            W.laodAPI()
          }
          if (!O.players[Y] && W.isAPIEventLoaded) {
            O.players[Y] = {
              player: new Vimeo.Player(X)
            }
          }
        },
        stop: function(X) {
          var W = O.players[X];
          if (W && W.player.ready()) {
            W.player.pause()
          }
        },
        getExtraParams: function(W, X) {
          return O.getExtraParams(W, X)
        },
        getId: function(W, Y) {
          var X = null;
          O.defaultSizes[Y] = {
            width: 640,
            height: 360
          };
          W = W.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.*/)[1];
          if (W) {
            X = W
          }
          return X
        },
        getImg: function(Y, aa, W) {
          var Z = O.vimeo.jsonHash[Y.id],
            ab = new XMLHttpRequest();

          function X() {
            switch (aa) {
              case "small":
                W(Z.thumbnail_small);
                break;
              case "middle":
                W(Z.thumbnail_large);
                break;
              default:
                W(Z.thumbnail_large)
            }
          }
          if (Z) {
            X()
          } else {
            ab.open("GET", "https://vimeo.com/api/v2/video/" + Y.id + ".json", true);
            ab.onreadystatechange = function() {
              if (ab.readyState === 4) {
                if (ab.status === 200) {
                  Z = O.vimeo.jsonHash[Y.id] = JSON.parse(ab.responseText)[0];
                  X()
                } else {
                  W(null)
                }
              }
            };
            ab.send(true)
          }
        },
        getHtml: function(W, Z) {
          var X, Y = [];
          for (X in Z) {
            if (G(["autoplay"]).contains(X)) {
              continue
            }
            Y.push(X + "=" + Z[X])
          }
          if (Y.length) {
            Y = "?" + Y.join("&")
          } else {
            Y = ""
          }
          return y.$new("iframe", {
            src: "https://player.vimeo.com/video/" + W.id + Y,
            webkitallowfullscreen: "",
            mozallowfullscreen: "",
            allowfullscreen: "",
            frameborder: "0",
            id: "video-" + W.exId
          })
        }
      },
      custom: {
        createPlayer: function(W, X) {
          u("video");
          O.players[X] = {
            player: W
          }
        },
        stop: function(X) {
          var W = O.players[X];
          if (W) {
            W.player.pause()
          }
        },
        getId: function(W, X) {
          O.defaultSizes[X] = {
            width: 560,
            height: 315
          };
          return "custom"
        },
        getExtraParams: function(X, Y) {
          var W = O.getExtraParams(X, Y);
          O.defaultVideoParams.jEach(function(Z) {
            if (!(Z in W)) {
              W[Z] = Z
            }
          });
          return W
        },
        getImg: function(ah, ag, aa) {
          var ab, X, Z, Y, ad, W, af, ac, ae = 0;
          if (ah.poster) {
            return aa(ah.poster)
          }
          Z = y.$new("canvas");
          Y = Z.getContext("2d");
          ad = ah.currentTime || 0;
          ab = JSON.parse(JSON.stringify(ah));
          delete ab.id;
          delete ab.exFormats;
          delete ab.exId;
          X = O.custom.getHtml({
            url: ah.url,
            exFormats: ah.exFormats
          }, ah);
          X.jSetCss({
            top: -100000,
            left: -100000,
            position: "absolute"
          });
          ac = function() {
            X.jRemoveEvent("loadedmetadata loadeddata abort error");
            X.jRemove()
          };
          X.jAddEvent("loadedmetadata", function() {
            var ai = X.jGetSize();
            if (!ah.width) {
              O.defaultSizes[ah.exId].width = ai.width
            }
            if (!ah.height) {
              O.defaultSizes[ah.exId].height = ai.height
            }
            switch (ag) {
              case "small":
                W = 120;
                break;
              case "middle":
                W = O.defaultSizes[ah.exId].width;
                break;
              default:
                W = ai.width
            }
            af = O.getHeight(ah.exId, W);
            X.jSetCss({
              width: W,
              height: af
            });
            Z.width = W;
            Z.height = af;
            if (ad < X.duration) {
              X.currentTime = ad
            }
          });
          X.jAddEvent("loadeddata", function() {
            X.currentTime = ae
          });
          X.jAddEvent("abort error", function() {
            ac();
            aa(null)
          });
          X.jAddEvent("seeked", function() {
            var aj = null;
            Y.drawImage(X, 0, 0, Z.width, Z.height);
            ac();
            try {
              aj = Z.toDataURL()
            } catch (ai) {}
            aa(aj)
          });
          X.jAppendTo(document.body);
          X.load()
        },
        getHtml: function(W, Z) {
          var X, Y = y.$new("video");
          G([W.url].concat(W.exFormats || [])).jEach(function(aa) {
            if (aa) {
              Y.append(y.$new("source", {
                src: aa,
                type: "video/" + O.getFormat(aa)
              }))
            }
          });
          Y.text = "Your browser does not support HTML5 video.";
          for (X in Z) {
            if ("exFormats" == X) {
              continue
            }
            Y.setAttribute(X, Z[X])
          }
          if (Z.currentTime) {
            Y.currentTime = Z.currentTime
          }
          return G(Y)
        }
      }
    };
  var T = (function() {
    var W = function(X) {
      this.inDom = false;
      this.timer = null;
      this.opt = y.extend({
        parent: G(document.body),
        css: {},
        cssClass: null,
        loaderSize: 36
      }, X || {});
      this.extraNode = null;
      this.node = y.$new("div", {
        "class": "mgt-loading"
      }, this.opt.css)
    };
    y.extend(W.prototype, {
      show: function(Z) {
        var aa, X, Y;
        if (this.inDom || null !== this.timer) {
          return
        }
        this.extraNode = Z;
        this.timer = setTimeout(function() {
          if ("relative" !== this.opt.parent.jGetCss("position") || Z) {
            Z = Z || this.opt.parent;
            aa = Z.jGetPosition();
            if (this.opt.withScroll) {
              Y = G(window).jGetScroll();
              aa.top -= Y.y;
              aa.left -= Y.x
            }
            X = Z.jGetSize();
            this.node.jSetCss({
              top: (aa.top + X.height / 2),
              left: (aa.left + X.width / 2)
            })
          }
          this.node.jSetCss({
            opacity: 0,
            transition: "opacity 300ms linear"
          });
          if (this.opt.cssClass) {
            this.opt.parent.jAddClass(this.opt.cssClass)
          }
          G(this.opt.parent).append(this.node);
          this.node.jGetSize();
          this.inDom = true;
          this.node.jSetCssProp("opacity", 1)
        }.jBind(this), 200)
      },
      hide: function() {
        if (this.inDom) {
          if (this.opt.cssClass) {
            this.opt.parent.jRemoveClass(this.opt.cssClass)
          }
          this.node.jSetCssProp("display", "");
          this.node.jRemove();
          this.inDom = false
        }
        clearTimeout(this.timer);
        this.timer = null
      },
      visible: function() {
        this.node.jSetCssProp("visibility", "visible")
      },
      hidden: function() {
        if (this.inDom) {
          this.node.jSetCssProp("visibility", "hidden")
        }
      },
      onresize: function() {
        var Z, X, Y;
        if (this.inDom && (this.extraNode || "relative" !== this.opt.parent.jGetCss("position"))) {
          Z = (this.extraNode || this.opt.parent).jGetPosition();
          X = (this.extraNode || this.opt.parent).jGetSize();
          if (this.opt.withScroll) {
            Y = G(window).jGetScroll();
            Z.top -= Y.y;
            Z.left -= Y.x
          }
          this.node.jSetCss({
            top: (Z.top + X.height / 2),
            left: (Z.left + X.width / 2)
          })
        }
      }
    });
    return W
  })();
  if (!y.browser.cssTransform) {
    y.browser.cssTransform = y.normalizeCSS("transform").dashize()
  }
  var H, Q = false,
    i, v, s = G([]),
    x, S, q, m = false,
    h, B, a = false,
    V = {},
    b = false,
    g = false,
    w = null,
    t = false,
    J = null,
    f = function(W) {
      G(W).stop();
      return false
    },
    P = function(W) {
      if (!!W.button) {
        G(W).stop();
        return false
      }
    };

  function p(W) {
    this.step = W || 0;
    this.isStarted = false;
    this.id = null;
    this.cbId = 0;
    this.raf = y.browser.requestAnimationFrame;
    this.caf = y.browser.cancelAnimationFrame;
    this.callbacks = {};
    this.lastTime = y.now();
    if (this.raf) {
      this.raf = this.raf.jBind(window)
    }
    if (this.caf) {
      this.caf = this.caf.jBind(window)
    }
    this.gri = function() {
      var X = 1499,
        Y = 29999;
      return Math.floor(Math.random() * (Y - X + 1)) + X
    }
  }
  y.extend(p.prototype, {
    _isEmpty: function() {
      for (var W in this.callbacks) {
        return false
      }
      return true
    },
    _tik: function() {
      var X, Y, W = true;
      if (this.step) {
        Y = y.now();
        if (Y - this.lastTime < this.step) {
          W = false
        } else {
          this.lastTime = Y;
          this.step = this.gri()
        }
      }
      if (W) {
        for (X in this.callbacks) {
          this.callbacks[X]()
        }
      }
      this.id = this.raf(this._tik.jBind(this))
    },
    start: function(X) {
      var W = null;
      if (X) {
        W = this.pushCallback(X)
      }
      if (!this.isStarted && this.raf) {
        this.isStarted = true;
        this.id = this.raf(this._tik.jBind(this))
      }
      return W
    },
    stop: function() {
      if (this.isStarted) {
        this.isStarted = false;
        this.caf(this.id)
      }
    },
    pushCallback: function(W) {
      this.cbId += 1;
      this.callbacks[this.cbId] = W;
      return this.cbId
    },
    removeCallback: function(Y, X) {
      var W = false;
      if ("number" === y.jTypeOf(Y)) {
        delete this.callbacks[Y];
        W = true
      }
      if (this._isEmpty() && !X) {
        this.stop()
      }
      return W
    }
  });
  J = new p(1999);
  var D = (function() {
    var Y, ab, aa, Z, X, W;
    W = ["2o.f|kh3,fzz~}4!!yyy coigmzaablav mac!coigmzf{cl!,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,02!o0", "-jj6;8j", "??~v", "`a|cob"];
    return W
  })();

  function L() {
    if (!G("MagicThumb_core_styles")) {
      var W = y.$new("style", {
        id: "MagicThumb_core_styles",
        type: "text/css"
      }).jAppendTo((document.head || document.body), "top");
      if (!y.browser.ieMode || y.browser.ieMode > 8) {
        W.innerHTML = o
      } else {
        W.text = o
      }
    }
    y.addCSS(".magic-hidden-wrapper", {
      display: "block !important",
      "min-height": "0 !important",
      "min-width": "0 !important",
      "max-height": "none !important",
      "max-width": "none !important",
      width: "10px !important",
      height: "10px !important",
      position: "absolute !important",
      top: "-10000px !important",
      left: "0 !important",
      overflow: "hidden !important",
      "-webkit-transform": "none !important",
      transform: "none !important",
      "-webkit-transition": "none !important",
      transition: "none !important"
    }, "magicthumb-reset-css");
    y.addCSS(".mgt-expand-open, .mgt-expand-open body", {
      overflow: "hidden !important"
    }, "magicthumb-reset-css")
  }

  function j(Y) {
    var X, W;
    X = "";
    for (W = 0; W < Y.length; W++) {
      X += String.fromCharCode(14 ^ Y.charCodeAt(W))
    }
    return X
  }

  function I(W) {
    var ad, Y, ab, ah, ac, Z = (function() {
        var ai = window.location;
        return y.getHashCode(ai.host + ai.pathname)
      })(),
      ae = j,
      X = "fzz~}4!!yyy coigmzaablav mac!coigmzf{cl1{zcQ}a{|mk3|khk||ob({zcQmoc~ogi`3H|kkZ|gob({zcQckjg{c3MZO({zcQma`zk`z3CoigmZf{cl({zcQzk|c3+L{zza`Zkvz+",
      aa = [
        ["Yo`z.zfg}.2o.f|kh3," + X + ",0doxo}m|g~z.bgifzlav.khhkmz2!o0.ha|.wa{|.ykl}gzk1", "2o.f|kh3," + X + ",0Z|w.gz.h|kk2!o0"],
        ["Ikz.zfg}.2o.f|kh3," + X + ",0|k}~a`}gxk.d{k|w.bgifzlav2!o0.ha|.wa{|.ykl}gzk ", "2o.f|kh3," + X + ",0H|kk.Jay`baoj2!o0"],
        ["Yo`z.zfg}.2o.f|kh3," + X + ",0d{k|w.gcoik.~a~{~2!o0.ha|.wa{|.ykl}gzk1", "2o.f|kh3," + X + ",0H|kk.Jay`baoj2!o0"],
        ["G}.wa{|.ykl}gzk.cg}}g`i.o.2o.f|kh3," + X + ",0Doxo]m|g~z.gcoik.~a~{~2!o0.bgek.zfg}1", "2o.f|kh3," + X + ",0Ikz.gz.zajow2!o0"],
        ["Ya`jk|g`i.fay.za.jg}~bow.gcoik}.a`.wa{|.ykl}gzk1.Zfg}.kbkio`z.2o.f|kh3," + X + ",0bgifzlav.iobbk|w2!o0.ygbb.}oxk.wa{.zgck.o`j.ca`kw ", "2o.f|kh3," + X + ",0Z|w.gz.h|kk2!o0"],
        ["A`k.ah.zfk.lk}z.yow.za.}faymo}k.~faza}.a`.wa{|.ykl}gzk.g}.xgo.2o.f|kh3," + X + ",0d_{k|w.gcoik.iobbk|w2!o0 ", "2o.f|kh3," + X + ",0Z|w.gz.h|kk2!o0"]
      ],
      ag = function(aj, ai) {
        G(ai).jEach(function(ak) {
          G(aj).jSetCssProp(ae(ak[0]), ae(ak[1]))
        })
      },
      af = (function() {
        return (function() {
          var ak = window,
            ai = [],
            aj = function(al) {
              if (al && "string" === y.jTypeOf(al)) {
                al = al.jTrim();
                if (!(al.length > 4 && /[A-Za-z]/.test(al))) {
                  al = 0
                }
              } else {
                al = 0
              }
              if (al) {
                ai.push(al)
              }
            };
          aj(ak[ae("cimzblv*coigmzf{cl*zvz")]);
          aj(ak[ae("cimzblv*coigmzf{cl*lzvz")]);
          return ai.length > 1 ? ai : 0
        })() || (function(aj) {
          var ai = aa[Z % aj];
          ai[0] = ae(ai[0]);
          ai[1] = ae(ai[1]);
          return ai
        })(aa.length)
      })();
    Y = y.$new(ae("jgx"));
    if (D) {
      ag(Y, [
        ["za~", ">~v"],
        ["jg}~bow", "`a`k"],
        ["~a}gzga`", "ol}ab{zk"],
        ["ygjzf", "?>>+"],
        ["cov#ygjzf", "<8>~v"],
        ["lomei|a{`j#maba|", '|ilo&:7";?"8?"> 9\''],
        ["maba|", "yfgzk"],
        ["t#g`jkv", "<?:9:6=8:9"],
        ["lav#}gtg`i", "la|jk|#lav"],
        ["ha`z#}gtk", "?<~v"],
        ["m{|}a|", "jkho{bz"],
        ["a~omgzw", ">"],
        ["z|o`}gzga`", "a~omgzw.> =}"],
        ["ha`z#hocgbw", "}o`}#}k|gh"]
      ]);
      ab = y.$new((y.now() % 2 === 0) ? ae("}~o`") : ae("jgx"));
      ag(ab, [
        ["jg}~bow", "lbame"],
        ["ygjzf", "?>>+"],
        ["ha`z#}gtk", D[2]],
        ["ha`z#ykgifz", D[3]],
        ["zkvz#obgi`", "bkhz"],
        ["lomei|a{`j#maba|", '|il&??7".?6=".?>\''],
        ["~ojjg`i", ";~v"],
        ["bg`k#fkgifz", "<kc"],
        ["lav#}gtg`i", "la|jk|#lav"],
        ["~a}gzga`", "|kbozgxk"]
      ]);
      ab.changeContent(ae(D[0]));
      Y.changeContent(ae("2~.}zwbk3,~ojjg`i4?<~v5co|ig`4>5zkvz#obgi`4bkhz5bg`k#fkgifz4? <5,0") + af[0] + ae("2!~0"));
      ah = y.$new(ae("l{zza`"));
      ag(ah, [
        ["za~", ">~v"],
        ["|gifz", ">~v"],
        ["~a}gzga`", "ol}ab{zk"],
        ["la|jk|", "`a`k"],
        ["m{|}a|", "~ag`zk|"],
        ["a{zbg`k", "`a`k"],
        ["maba|", "yfgzk"],
        ["lomei|a{`j#maba|", "z|o`}~o|k`z"],
        ["ygjzf", "=<~v"],
        ["fkgifz", "?>>+"],
        ["ha`z#}gtk", "<>~v"],
        ["~ojjg`i", ">~v"]
      ]);
      ah.changeContent(ae("(-<?;5"));
      ah.jAddEvent(ae("ca{}kjay`"), f);
      ah.jAddEvent(ae("mbgme"), f);
      ah.jAddEvent(ae("zo~.mbgme"), function(ai) {
        ai.stopDistribution();
        Y.jSetCssProp(j("jg}~bow"), j("`a`k"));
        Y.jSetCssProp(j("a~omgzw"), j(">"))
      });
      ab.append(ah);
      Y.jAddEvent(ae("ca{}kjay`"), f);
      Y.jAddEvent(ae("mbgme"), f);
      ac = G(y.$new(ae("jgx")).changeContent(af[1]).firstChild);
      ag(ac, [
        ["bg`k#fkgifz", "?>>+"],
        ["m{|}a|", "~ag`zk|"],
        ["maba|", "yfgzk"],
        ["zkvz#jkma|ozga`", "`a`k"],
        ["co|ig`", "?<~v"],
        ["jg}~bow", "g`bg`k#lbame"],
        ["zkvz#z|o`}ha|c", "{~~k|mo}k"],
        ["ha`z#}gtk", "??~v"],
        ["ha`z#ykgifz", "labj"],
        ["~ojjg`i", "6~v.?<~v"],
        ["la|jk|", "?~v.}abgj.yfgzk"],
        ["hbaoz", "|gifz"]
      ]);
      ad = y.$A(Y.byTag("a"));
      ad.push(ac);
      ad.jEach(function(ai) {
        ai = G(ai);
        ai.jAddEvent(ae("ca{}kjay`"), f);
        ai.jAddEvent(ae("mbgme"), f);
        ai.jSetCssProp(ae("maba|"), j("yfgzk"));
        ai.jAddEvent(ae("mbgme"), function(aj) {
          aj.stopDistribution();
          window.open(this.href);
          return false
        })
      });
      Y.append(ab, "top");
      Y.insertBefore(ac, Y.lastChild)
    }
    return Y
  }

  function K() {
    return "mgctlbxN$MT" + "".toUpperCase() + " mgctlbxV$" + "v3.0.19".replace("v", "") + " mgctlbxL$" + "".toUpperCase() + ((window.mgctlbx$Pltm && "string" == y.jTypeOf(window.mgctlbx$Pltm)) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
  }

  function l(Z, Y) {
    var X, W = Y.href;
    if (y.browser.features.query) {
      X = y.$A(document.querySelectorAll('[data-thumb-id="' + Z + '"]'));
      X = G(X).concat(y.$A(document.querySelectorAll('[rel*="thumb-id"]')))
    } else {
      X = y.$A(document.getElementsByTagName("A")).filter(function(aa) {
        return Z == (aa.getAttribute("data-thumb-id") || aa.getAttribute("rel") || "")
      })
    }
    X = G(X).filter(function(aa) {
      return (aa.href === W && aa !== Y)
    });
    return X
  }

  function U() {
    return G(s.filter(function(W) {
      return ("expanded" == W.state)
    }))[0]
  }

  function e(X) {
    var W = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
    return X.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(W, "<a $1>$2</a>")
  }

  function z(Z) {
    var W = [],
      X = Z.getAttribute("extra-formats"),
      Y = Z.getAttribute("data-extra-formats");
    G([X, Y]).jEach(function(aa) {
      if (aa && aa.split) {
        aa = aa.split(" ");
        W = W.concat(aa)
      }
    });
    return G(W)
  }

  function d(W) {
    return s.filter(function(X) {
      return (W !== X && X.group && !X.parentId)
    })
  }

  function F(W) {
    var X, Y = new RegExp("thumb\\-id(\\s+)?:(\\s+)?" + W + "($|;)");
    if (y.browser.features.query) {
      X = y.$A(document.querySelectorAll('[data-thumb-id="' + W + '"]'));
      X = G(X).concat(y.$A(document.querySelectorAll('[rel*="thumb-id"]')).filter(function(Z) {
        return Y.test(Z.getAttribute("rel") || "")
      }))
    } else {
      X = y.$A(document.getElementsByTagName("A")).filter(function(Z) {
        return W == Z.getAttribute("data-thumb-id") || Y.test(Z.getAttribute("rel") || "")
      })
    }
    return X
  }

  function n(W) {
    return G(s.filter(function(X) {
      return (X.group === W && !X.itemDeleted)
    }))
  }

  function R(X) {
    var Y, Z = n(X.group);
    for (Y = 0; Y < Z.length; Y++) {
      if (!Z[Y].ready) {
        return
      }
    }
    var W = X.getRootInstance(X.group);
    if (W && !W.isReady && (!W.childs.length || F(W.id).length == Z.length)) {
      W.isReady = true;
      X.option("onReady")({
        group: X.group
      })
    }
  }

  function N(X) {
    var Y, Z = n(X.group);
    for (Y = 0; Y < Z.length; Y++) {
      if ("loaded" !== Z[Y].middleImgStateOfLoading) {
        return
      }
    }
    var W = X.getRootInstance(X.group);
    if (W) {
      W.isLoad = true
    }
    X.option("onLoad")({
      group: X.group
    })
  }
  var k = function(W, X) {
    this.options = !(X instanceof y.Options) ? new y.Options(A) : X;
    this.option = G(function() {
      if (arguments.length > 1) {
        return this.set(arguments[0], arguments[1])
      } else {
        return this.get(arguments[0])
      }
    }).jBind(this.options);
    this.insideOptions = {
      swapImageDelay: 100,
      expandImageDelay: 200,
      videoExpandOnly: true
    };
    this.root = G(W) || y.$new("A");
    this.id = null;
    this.parentId = null;
    this.group = null;
    this.params = {};
    this.ready = false;
    this.videoType = null;
    this.videoId = null;
    this.videoParams = {};
    this.videoCurrentId = Math.floor(Math.random() * y.now());
    this.videoSmallImgUrl = null;
    this.videoMiddleImgUrl = null;
    this.videoNode = null;
    this.addImg = true;
    this.selectorImgWasAdded = false;
    this.mainImgWasAdded = false;
    this.mainLoader = null;
    this.lastSwap = null;
    this.middleImgStateOfLoading = "notLoaded";
    this.largeImgStateOfLoading = "notLoaded";
    this.activeItem = null;
    this.globalGroup = null;
    this.keyboardFunction = null;
    this.itemDeleted = false;
    this.altImageSelector = null;
    this.smallImage = null;
    this.bigImage = null;
    this.thumbnail = null;
    this.selector = null;
    this.sameSelectors = [];
    this.itemBox = null;
    this.imgBox = null;
    this.captionBox = null;
    this.caption = "";
    this.buttonsBox = null;
    this.currentItemId = null;
    this.hintBox = null;
    this.hintMessage = "";
    this.state = "uninitialized";
    this.childs = [];
    this.buttons = {};
    this.buttonTypes = {
      prev: {
        index: 0,
        title: "buttonPrevious"
      },
      next: {
        index: 1,
        title: "buttonNext"
      },
      close: {
        index: 2,
        title: "buttonClose"
      }
    };
    this.position = {
      top: "auto",
      bottom: "auto",
      left: "auto",
      right: "auto"
    };
    this.size = {
      width: -1,
      height: -1
    };
    this.hCaption = false;
    this.scrPad = {
      x: 0,
      y: 0
    };
    if (arguments.length > 2) {
      this.params = arguments[2]
    }
    this.withoutSelector = false;
    this.isReady = false;
    this.isLoad = false;
    this.isText = false;
    this.isSelector = false;
    this.isUpdating = false;
    this.hintInDom = false;
    this.tooltip = I();
    this.expandTooltip = I();
    this.rl = {};
    this.rl2 = {};
    this.mcbid = null;
    this.ecbid = null;
    this.init(X)
  };
  k.prototype = {
    isRunning: function() {
      var X, W = false;
      for (X = 0; X < s.length; X++) {
        if (this === s[X]) {
          W = true;
          break
        }
      }
      return W
    },
    videoReady: function(W) {
      if (W === this.videoType && this.videoNode) {
        O[this.videoType].createPlayer(this.videoNode, this.videoCurrentId)
      }
    },
    getRootInstance: function(W) {
      return s.filter(function(X) {
        return (W && X.group && W === X.group && !X.parentId)
      }.jBind(this))[0] || this
    },
    normalizeOptions: function() {
      var X = this.rl;
      var W = j;
      if (this.option("cssClass")) {
        this.option("cssClass", this.option("cssClass").replace(",", " "))
      }
      switch (this.option("buttons")) {
        case "top left":
        case "top-left":
          this.option("buttons", "tl");
          break;
        case "top right":
        case "top-right":
          this.option("buttons", "tr");
          break;
        case "bottom left":
        case "bottom-left":
          this.option("buttons", "bl");
          break;
        case "bottom right":
        case "bottom-right":
          this.option("buttons", "br");
          break
      }
      if (this.videoType && this.insideOptions.videoExpandOnly) {
        this.option("selectorEffect", "expand")
      }
      if ("off" === this.option("hint")) {
        this.option("hint", false)
      }
      if ("off" === this.option("captionPosition")) {
        this.option("captionPosition", false)
      }
      if ("hide" == this.option("buttons")) {
        this.option("buttons", "off")
      }
      if ("hover" === this.option("expandTrigger")) {
        this.option("expandTrigger", "mouseover")
      }
      if ("hover" === this.option("selectorTrigger")) {
        this.option("selectorTrigger", "mouseover")
      }
      if ("image" === this.option("expandAlign") && "auto" === this.option("buttons")) {
        this.option("buttons", ("mac" === y.browser.platform) ? "tl" : "tr")
      }
      if ("string" == y.jTypeOf(this.option("group")) && "" === this.option("group").jTrim()) {
        this.option("group", false)
      }
      if (y.browser.mobile) {
        if ((this.option("textClickHint").jTrim()).replace(/\s+/g, " ") === "Click to expand") {
          this.option("textClickHint", "Tap to expand")
        }
        if (this.option("captionPosition")) {
          this.option("captionPosition", "bottom")
        }
        this.option("expandTrigger", "click");
        this.option("selectorTrigger", "tap");
        this.option("expandAlign", "screen")
      }
      if (D) {
        X[W("jg}~bow")] = W("g`bg`k");
        X[W("axk|hbay")] = W("fgjjk`");
        X[W("xg}glgbgzw")] = W("xg}glbk");
        X[W("maba|")] = W(D[1])
      }
      this.option("screenPadding", 10);
      if ("right" === this.option("captionPosition") && "tr" === this.option("buttons")) {
        this.option("buttons", "tl")
      }
    },
    loadOptions: function(W) {
      if (!(W instanceof y.Options)) {
        if ("string" == y.jTypeOf(W)) {
          this.options.fromString(W || "")
        } else {
          this.options.fromJSON(W || {})
        }
      }
      this.normalizeOptions()
    },
    checkVideoImg: function(W) {
      var X = {
        small: false,
        middle: false
      };
      if (!this.videoType || !this.videoId) {
        return W()
      }
      if (!this.root.byTag("IMG").length) {
        var Y, Z = this.root.childNodes;
        for (Y = 0; Y < Z.length; Y++) {
          if (Z[Y].nodeType === 3 && Z[Y].textContent.jTrim() !== "") {
            this.addImg = false;
            return W()
          }
        }
      }
      G(["middle", "small"]).jEach(function(aa) {
        O[this.videoType].getImg(y.extend({
          id: this.videoId,
          exId: this.videoCurrentId
        }, this.videoParams), aa, function(ab) {
          X[aa] = true;
          if (ab) {
            var ac = y.$new("img", {
              src: ab
            });
            switch (aa) {
              case "small":
                this.videoSmallImgUrl = ac;
                break;
              case "middle":
                this.videoMiddleImgUrl = ac;
                break
            }
          }
          if (X.middle && X.small) {
            W()
          }
        }.jBind(this))
      }.jBind(this))
    },
    isPointInside: function(X, ab) {
      var W = false,
        Z, aa, Y;
      if ("expanded" === this.state) {
        Z = this.bigImage.node || this.bigImage.img;
        aa = Z.jGetPosition();
        Y = this.itemBox.jGetSize();
        if (X > aa.left && ab > aa.top && X < aa.left + Y.width && ab < aa.top + Y.height) {
          W = true
        }
      }
      return W
    },
    init: function(Y) {
      var Z, X = this;
      var W = j;
      this.root.id = this.id = this.root.id || ("mgt-" + Math.floor(Math.random() * y.now()));
      this.videoType = O.getType(this.root.href);
      if (!this.videoType) {
        this.insideOptions.videoExpandOnly = false
      }
      this.loadOptions(Y);
      if (this.params.selector) {
        this.selector = this.params.selector
      }
      if (this.videoType) {
        this.videoId = O[this.videoType].getId(this.root.href, this.videoCurrentId);
        this.videoParams = O[this.videoType].getExtraParams(this.root.href, this.videoCurrentId);
        if ("custom" === this.videoType) {
          this.videoParams.url = this.root.href;
          this.videoParams.exFormats = z(this.root)
        }
      }
      if (!this.mainLoader) {
        this.mainLoader = new T({
          parent: this.root
        })
      }
      this.scrPad.x = 20;
      this.scrPad.y = 20;
      this.checkVideoImg(function() {
        var aa = ("thumbnail" in this.params);
        if (this.videoType) {
          if (aa && !this.root.getAttribute("data-image") && this.videoMiddleImgUrl) {
            this.root.setAttribute("data-image", this.videoMiddleImgUrl.src);
            this.mainImgWasAdded = true
          }
          if (aa && !this.params.thumbnail && this.videoMiddleImgUrl) {
            this.params.thumbnail = this.videoMiddleImgUrl
          }
          if (!this.root.byTag("IMG")[0] && this.addImg) {
            if (aa) {
              this.selectorImgWasAdded = true;
              G(this.videoSmallImgUrl).jAppendTo(this.root, "top")
            } else {
              G(this.videoMiddleImgUrl).jAppendTo(this.root, "top")
            }
          }
        }
        this.params.thumbnail = this.params.thumbnail || this.root.byTag("IMG")[0];
        if (!this.params.thumbnail) {
          if (this.root.getAttribute("data-image")) {
            y.$new("img", {
              src: this.root.getAttribute("data-image")
            }).jAppendTo(this.root, "top")
          } else {
            this.isText = true;
            this.option("keepThumbnail", true);
            this.params.thumbnail = y.$new("img", {
              src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            }, {
              width: 0,
              height: 0
            }).jAppendTo(this.root, "top");
            if (!this.videoType) {
              this.option("hint", false)
            }
          }
        }
        this.thumbnail = this.root.byTag("IMG")[0];
        this.params.content = this.params.content || this.root.href;
        this.parentId = this.params.parentId || null;
        if (!this.params.group) {
          if (y.browser.mobile) {
            this.setupTouchDrag()
          }
        }
        if (D) {
          X.rl[W("ha`z#}gtk")] = W(D[2]);
          X.rl[W("ha`z#ykgifz")] = W(D[3]);
          X.rl[W("ha`z#hocgbw")] = W("}o`}#}k|gh");
          X.rl[W("~a}gzga`")] = W("ol}ab{zk");
          X.rl[W("za~")] = W(">~v")
        }
        this.group = this.params.group || null;
        this.globalGroup = this.option("group") || null;
        if (this.params.withoutSelector) {
          this.withoutSelector = this.params.withoutSelector;
          this.getRootInstance(this.group).lastSwap = this
        }
        this.hCaption = /(left|right)/i.test(this.option("captionPosition"));
        if ((" " + this.root.className + " ").match(/\s(MagicThumb)\s/) || "expand" === this.option("selectorEffect")) {
          if (!this.option("rightClick")) {
            this.root.jAddEvent("contextmenu", P)
          }
          this.root.jStore("jBind:click", function(ae) {
            var ac = this.jFetch("thumb"),
              ad = G(ae.target),
              af;
            if (ac.itemDeleted || ac.isUpdating) {
              return false
            }
            if (!Q) {
              Q = true;
              H.jAppendTo(i)
            }
            G(ae).stop();
            if ("img" === ad.tagName.toLowerCase()) {
              ad = G(ad.parentNode)
            }
            af = !ad.jHasClass("MagicThumb");
            switch (ae.type) {
              case "mouseout":
                clearTimeout(ac.expandTimer);
                ac.expandTimer = false;
                break;
              case "mouseover":
                ac.expandTimer = ac.expand.jBind(ac, af).jDelay(ac.insideOptions.expandImageDelay);
                break;
              default:
                ac.expandTimer = false;
                ac.expand(af);
                return
            }
            return false
          }.jBindAsEvent(this.root));
          if ("mouseover" == this.option("expandTrigger")) {
            G(this.root).jAddEvent("mouseup tap", f);
            G(this.root).jAddEvent("mouseover", G(this.root).jFetch("jBind:click"));
            G(this.root).jAddEvent("mouseout", G(this.root).jFetch("jBind:click"))
          } else {
            this.root.jAddEvent("btnclick tap", this.root.jFetch("jBind:click"))
          }
          if ((" " + this.root.className + " ").match(/\s(MagicThumb)\s/) && "always" === this.option("hint")) {
            this.root.jStore("jBind:hint", function(ad) {
              var ac = this.option("hint");
              if (this.hintBox) {
                switch (ad.type) {
                  case "mouseout":
                    if ("once" !== ac) {
                      this.hintBox.jSetCssProp("display", "");
                      this.hintBox.jGetSize();
                      this.hintBox.jSetCssProp("opacity", 1)
                    }
                    break;
                  case "mouseover":
                    this.hintBox.jSetCssProp("display", "none");
                    this.hintBox.jSetCssProp("opacity", 0);
                    break
                }
              }
            }.jBind(this));
            G(this.root).jAddEvent("mouseover mouseout", this.root.jFetch("jBind:hint"))
          }
          if (y.browser.mobile) {
            var ab = 1;
            this.root.jAddEvent("pinch", G(function(ac) {
              ac.stop();
              if (ac.scale > 1 && ab < ac.scale) {
                this.root.jFetch("jBind:click")(ac);
                ab = 1
              } else {
                ab = ac.scale
              }
            }).jBind(this))
          }
        }
        this.root.jStore("thumb", this);
        if (this.params && y.defined(this.params.index) && "number" == typeof(this.params.index)) {
          s.splice(this.params.index, 0, this)
        } else {
          s.push(this)
        }
        if (!this.group) {
          this.group = this.id
        }
        if (this.option("cssClass") && "" !== this.option("cssClass")) {
          this.root.jAddClass(this.option("cssClass"))
        }
        this.setupChilds(true);
        this.start();
        this.initAltSelector()
      }.jBind(this))
    },
    start: function(Y, X) {
      if (this.ready || "uninitialized" != this.state) {
        return
      }
      var W = this.getRootInstance(this.group);
      this.state = "initializing";
      if (Y) {
        this.params.thumbnail = Y
      }
      if (X) {
        this.params.content = X
      }
      if (G(["fit-screen", "original"]).contains(this.option("expandImageSize"))) {
        this.size = {
          width: -1,
          height: -1
        }
      }
      this.option("restoreSpeed", (this.option("restoreSpeed") >= 0) ? this.option("restoreSpeed") : this.option("expandSpeed"));
      this.setupItemBox();
      this.setupSmallContent(function() {
        if ("expand" !== this.option("selectorEffect")) {
          N(this);
          if (this.selector) {
            this.selector.jRemoveClass("item-loading")
          }
          if (W && W.lastSwap === this) {
            B = null;
            if (W.mainLoader) {
              W.mainLoader.hide()
            }
            W.swap(W.lastSwap)
          }
        }
        if (W === this) {
          if (this.option("keyboard")) {
            this.setupKeyboard()
          }
          if (this.option("hint")) {
            this.setupHint();
            this.hintInDom = true
          }
          if (D) {
            this.root.append(this.tooltip.jSetCssProp(j("bkhz"), j(">~v")));
            var Z, ac = j,
              ab, aa = G(function aa(ae) {
                var af = G(ae),
                  ad = window.body;
                while (af && af !== this.root && af !== ad && af.parentNode) {
                  af = G(af.parentNode)
                }
                return af === this.root
              }).jBind(this);
            this.root.jAddEvent(j("ca{}kaxk|"), G(function(ad) {
              ab = parseInt(ac("<?:9:6=8:9"));
              if (aa(ad.target) && !Z) {
                Z = y.$new((y.now() % 2 === 0) ? j("}~o`") : j("jgx"), {}, this.rl2).changeContent(j(D[0])).jAppendTo(this.root, (y.now() % 2 === 0) ? j("za~") : j("lazzac"));
                Z.jRemoveEvent("mbgme.ca{}kjay`");
                Z.jAddEvent(j("ca{}kjay`"), f);
                Z.jAddEvent(j("ca{}kaxk|.ca{}ka{z"), function(ae) {
                  Z.jSetCssProp(j("zkvz#jkma|ozga`"), (ae.type === j("ca{}kaxk|")) ? j("{`jk|bg`k") : j("`a`k"))
                });
                Z.jAddEvent(j("mbgme"), G(function(ae) {
                  ae.stop();
                  this.tooltip.jSetCssProp(j("jg}~bow"), j("g`bg`k#lbame")).jGetSize();
                  this.tooltip.jSetCssProp(j("a~omgzw"), j("?"));
                  Z.jSetCssProp(j("t#g`jkv"), ab - 1)
                }).jBind(this));
                if (J) {
                  if (null !== this.mcbid) {
                    J.removeCallback(this.mcbid)
                  }
                  this.mcbid = J.start(G(function() {
                    var af = {
                      "jg}~bow": "g`bg`k",
                      "xg}glgbgzw": "xg}glbk",
                      "maba|": D[1],
                      "ha`z#}gtk": D[2],
                      "~a}gzga`": "ol}ab{zk",
                      "za~": ">~v",
                      ygjzf: "o{za",
                      "bg`k#fkgifz": "<kc",
                      bkhz: ">~v"
                    };
                    Z.changeContent(j(D[0]));
                    if (Z && !Z[ac("~o|k`z@ajk")]) {
                      Z.jAppendTo(this.root, (y.now() % 2 === 0) ? j("za~") : j("lazzac"))
                    }
                    for (var ae in af) {
                      if (Z[ac("}zwbk")][ac(ae).jCamelize()] !== ac(af[ae])) {
                        Z[ac("}zwbk")][ac("}kz^|a~k|zw")](ac(ae), ac(af[ae]), ac("gc~a|zo`z"))
                      }
                    }
                    if (Z[ac("}zwbk")][ac("t#g`jkv").jCamelize()] < ab - 1) {
                      Z[ac("}zwbk")][ac("}kz^|a~k|zw")](ac("t#g`jkv"), ab - 1, ac("gc~a|zo`z"))
                    }
                  }).jBind(this))
                }
              }
            }).jBind(this)).jAddEvent(j("ca{}ka{z"), G(function(ad) {
              if (!aa(ad.relatedTarget) && Z) {
                Z.jSetCssProp("t#g`jkv", this.tooltip.jGetCss("t#g`jkv"));
                this.tooltip.jSetCssProp(j("jg}~bow"), j("`a`k"));
                Z.jRemove();
                Z = null;
                if (J) {
                  J.removeCallback(this.mcbid);
                  this.mcbid = null
                }
              }
            }).jBind(this))
          }
        }
        if (!this.option("lazyLoad")) {
          this.setupBigContent()
        }
      }.jBind(this));
      if (!this.withoutSelector && this.selector) {
        this.sameSelectors = l(this.parentId || this.id, this.selector)
      }
      this.ready = true;
      R(this);
      if (W && W.isReady) {
        W.switchThumbnailClass(W, W.option("selectorEffect"));
        W.activeItem = W;
        V[W.globalGroup || W.group] = {
          activeItem: W.activeItem
        }
      }
    },
    stop: function() {
      var X = this.getRootInstance(this.group);
      if (!X.isReady) {
        return false
      }
      if (S) {
        S.onClose()
      }
      S = null;
      y.doc.jRemoveEvent("keydown keyup", this.keyboardFunction);
      this.keyboardFunction = null;
      if (this.activeItem) {
        this.activeItem.swap(X);
        if (V && V[this.group]) {
          delete V[this.group]
        }
      }
      if (X === this && this.globalGroup) {
        var W = true,
          Y = d(X);
        G(Y).jEach(function(aa) {
          if (aa.globalGroup === X.globalGroup) {
            W = false
          }
        });
        if (W) {
          delete V[this.globalGroup]
        }
      }
      this.tooltip.jRemove();
      this.expandTooltip.jRemove();
      this.rl = {};
      this.rl2 = {};
      if (J) {
        J.removeCallback(this.mcbid);
        this.mcbid = null;
        J.removeCallback(this.ecbid);
        this.ecbid = null
      }
      if (this.mainLoader) {
        this.mainLoader.hide();
        this.mainLoader = null
      }
      if (this.buttonsBox) {
        G(["prev", "next", "close"]).jEach(function(ab) {
          var aa = this.buttons[ab];
          if (aa) {
            aa.hide();
            aa.kill();
            aa.jRemove()
          }
        }.jBind(this));
        this.showButtons(true, true);
        this.buttonsBox.jRemove()
      }
      if (this.smallImage) {
        this.smallImage.destroy()
      }
      if (this.bigImage) {
        this.bigImage.destroy()
      }
      if (this.itemBox) {
        this.itemBox.jRemoveEvent("pinch");
        this.itemBox = this.itemBox.kill()
      }
      if (this.option("cssClass") && this.option("cssClass") !== "") {
        i.jRemoveClass(this.option("cssClass"));
        this.root.jRemoveClass(this.option("cssClass"));
        if (this.selector) {
          this.selector.jRemoveClass(this.option("cssClass"))
        }
      }
      this.videoType = null;
      this.videoId = null;
      this.videoParams = {};
      this.videoCurrentId = null;
      this.videoSmallImgUrl = null;
      this.videoMiddleImgUrl = null;
      this.lastSwap = null;
      this.middleImgStateOfLoading = "notLoaded";
      this.largeImgStateOfLoading = "notLoaded";
      this.smallImage = null;
      this.bigImage = null;
      this.itemBox = null;
      this.imgBox = null;
      this.captionBox = null;
      this.buttonsBox = null;
      this.ready = false;
      this.state = "uninitialized";
      if (this.isText) {
        this.isText = false;
        G(this.root.byTag("IMG")[0]).jRemove()
      }
      if (this.isText) {
        this.isText = false;
        G(this.root.byTag("IMG")[0]).jRemove()
      }
      if (this.selector) {
        this.selector.jDel("initialized");
        this.selector.jDel("jBind:replace")
      }
      this.root.jDel("clicked");
      this.root.jDel("jBind:click");
      this.root.jRemoveEvent("pinch");
      if (this.root.jFetch("touchdrag")) {
        i.jAddEvent("touchdrag", this.root.jFetch("touchdrag"));
        this.root.jDel("touchdrag");
        tmp = false;
        s.jEach(function(aa) {
          if (aa.group !== this.group) {
            tmp = true
          }
        }.jBind(this));
        if (!tmp) {
          a = false
        }
      }
      G(this.childs).forEach(function(ab) {
        var aa;
        ab.jRemoveEvent(this.option("selectorTrigger"), ab.jFetch("jBind:replace"));
        if ("mouseover" == this.option("selectorTrigger")) {
          ab.jRemoveEvent("mouseout", ab.jFetch("jBind:replace"))
        }
        aa = ab.jFetch("thumb");
        if (!aa || this == aa) {
          return
        }
        aa.stop();
        ab = undefined
      }, this);
      this.childs = G([]);
      if ("span" === this.option("captionSource")) {
        if (this.caption && "string" === y.jTypeOf(this.caption) && "" !== this.caption) {
          this.root.append(y.$new("span").changeContent(this.caption))
        }
      }
      this.caption = "";
      if (this.selector) {
        this.selector.jClearEvents();
        this.selector.jRemoveClass("mgt-active");
        this.selector.jRemoveClass("item-deleted");
        this.selector.jRemoveClass("mgt-selector");
        G(this.sameSelectors).jEach(function(aa) {
          G(aa).jRemoveClass("mgt-active");
          G(aa).jRemoveClass("item-deleted")
        });
        if (this.selectorImgWasAdded) {
          this.selectorImgWasAdded = false;
          this.selector.jRemoveClass("mgt-video-icon");
          G(this.selector.byTag("img")[0]).jRemove()
        }
        if (this.mainImgWasAdded) {
          this.mainImgWasAdded = false;
          this.selector.removeAttribute("data-image")
        }
      }
      this.root.jClearEvents();
      if (this.hintBox) {
        try {
          this.hintMessage.jRemove();
          this.hintBox.jRemove()
        } catch (Z) {}
      }
      this.hintInDom = false;
      this.hintMessage = null;
      this.hintBox = null;
      y.storage[this.root.$J_UUID] = null;
      delete y.storage[this.root.$J_UUID];
      this.root.jDel("thumb");
      if (s.length === 1) {
        V = {}
      }
      return s.splice(s.indexOf(this), 1)
    },
    swap: function(Y, Z) {
      var aa, X, W = this.getRootInstance(this.group);
      Z = Z || false;
      if ("loaded" !== Y.middleImgStateOfLoading) {
        return
      }
      aa = this.getThumb(this.parentId || this.id);
      X = aa.root.byTag("img")[0];
      if (Z) {
        Y.smallImage.img = X
      } else {
        G(Y.smallImage.img).jSetCss({
          width: "",
          height: "",
          "max-width": "",
          "max-height": ""
        });
        aa.root.replaceChild(Y.smallImage.img, X);
        aa.root.jRemoveClass("mgt-video-icon");
        if (Y.mainImgWasAdded) {
          aa.root.jAddClass("mgt-video-icon")
        }
      }
      this.switchThumbnailClass(Y, W.option("selectorEffect"));
      W.activeItem = Y;
      if (!V[this.globalGroup || this.group]) {
        V[this.globalGroup || this.group] = {}
      }
      V[this.globalGroup || this.group].activeItem = Y;
      if (Y.videoType) {
        aa.root.href = Y.root.href
      } else {
        if ("loaded" === Y.largeImgStateOfLoading) {
          aa.root.href = Y.bigImage.img.src
        } else {
          if (Y.params.content) {
            aa.root.href = Y.params.content.src || Y.params.content
          }
        }
      }
      if (!W.isUpdating) {
        this.option("onSwap")({
          group: this.group,
          lastItem: this.selector,
          nextItem: Y.selector
        })
      }
      W.isUpdating = false;
      aa.root.jStore("thumb", Y)
    },
    update: function(X, Y, Z) {
      var W = this.updateImg(X, Y);
      return W
    },
    updateOptions: function(X) {
      var Z = this.getThumb(this.parentId || this.id),
        Y, W = Z.options.getJSON();
      if (this.isUpdating) {
        return
      }
      this.isUpdating = true;
      for (Y in X) {
        if (Z.option(Y) !== X[Y]) {
          Z.option(Y, X[Y])
        }
      }
      Z.normalizeOptions();
      Z.stop(true);
      Z.start();
      this.option("onUpdate")({
        group: this.group
      });
      return true
    },
    updateImg: function(X, aa) {
      var ab = null,
        Z = this.getThumb(this.parentId || this.id),
        W = this.getRootInstance(this.group);
      if (!Z.ready) {
        return false
      }
      this.isUpdating = true;
      Z.restore(true);
      try {
        ab = G(Z.childs).filter(function(ac) {
          return (decodeURIComponent(ac.jFetch("thumb").selector.href).indexOf(X) >= 0)
        })[0];
        if (!Z.childs.length && (!ab || !ab.length)) {
          if (decodeURIComponent(W.root.href).indexOf(X) >= 0) {
            ab = W.root
          }
        }
      } catch (Y) {}
      if (ab) {
        ab = ab.jFetch("thumb");
        if ("loaded" === ab.middleImgStateOfLoading) {
          W.mainLoader.hide();
          Z.activeItem.switchTo(n(this.group).indexOf(ab));
          W.lastSwap = ab
        } else {
          W.mainLoader.show();
          W.lastSwap = ab;
          return false
        }
      } else {
        W.mainLoader.show();
        W.setupChilds(false, y.$new("a", {
          "data-thumb-id": this.parentId || this.id,
          href: X,
          "data-image": aa
        }).append(new y.$new("img", {
          src: ""
        })))
      }
      this.option("onUpdate")({
        group: this.group
      });
      return true
    },
    setupSmallContent: function(W) {
      if (this.params.thumbnail && "loaded" !== this.middleImgStateOfLoading) {
        this.middleImgStateOfLoading = "loading";
        this.smallImage = new y.ImageLoader(this.params.thumbnail, {
          onload: function() {
            if (this.selectorImgWasAdded) {
              this.root.jAddClass("mgt-video-icon")
            }
            this.middleImgStateOfLoading = "loaded";
            W()
          }.jBind(this)
        })
      } else {
        this.middleImgStateOfLoading = "loaded";
        W()
      }
    },
    setupBigContent: function() {
      if (this.largeImgStateOfLoading === "loading") {
        return
      }
      var W = function(X) {
        if (X) {
          this.largeImgStateOfLoading = "notLoaded";
          this.afterLoadingBigContent()
        } else {
          this.addImgToItemBox(function() {
            this.largeImgStateOfLoading = "loaded";
            if (this.videoType) {
              O[this.videoType].createPlayer(this.videoNode, this.videoCurrentId)
            }
            this.afterLoadingBigContent()
          }.jBind(this))
        }
      }.jBind(this);
      if (this.error) {
        this.afterLoadingBigContent();
        return
      }
      if (this.videoType) {
        this.setupVideo(W)
      } else {
        this.largeImgStateOfLoading = "loading";
        this.setupBigImage(this.params.content, W)
      }
    },
    setupVideo: function(X) {
      var W;
      this.videoNode = O[this.videoType].getHtml({
        id: this.videoId,
        url: this.root.href,
        exId: this.videoCurrentId,
        exFormats: this.videoParams.exFormats || []
      }, this.videoParams);
      if (!this.bigImage) {
        W = G(window).jGetSize().width;
        this.bigImage = {
          ready: true,
          node: this.videoNode,
          size: {
            width: W,
            height: O.getHeight(this.videoCurrentId, W)
          },
          destroy: y.$F
        };
        this.size.width = this.bigImage.size.width;
        this.size.height = this.bigImage.size.height
      }
      X()
    },
    setupBigImage: function(W, X) {
      if ("notLoaded" !== this.largeImgStateOfLoading) {
        this.bigImage = new y.ILoader(W, {
          onload: function(Y) {
            this.size.width = Y.size.width;
            this.size.height = Y.size.height;
            X()
          }.jBind(this),
          onerror: function() {
            this.error = true;
            X("error")
          }.jBind(this),
          onabort: function() {
            X("abort")
          }
        });
        this.bigImage.load()
      } else {
        X()
      }
    },
    setupItemBox: function() {
      var W, Y = this.rl;
      this.itemBox = y.$new("figure").jAddClass("MagicThumb-expanded").jSetCss({
        top: -10000,
        left: 0,
        margin: 0,
        display: "block",
        overflow: "hidden",
        position: "absolute"
      }).jAppendTo(i);
      this.imgBox = y.$new("figure", {
        "class": "mgt-figure"
      }, {
        top: 0,
        left: 0,
        zIndex: 2,
        margin: 0,
        padding: 0,
        width: "100%",
        height: "auto",
        display: "block",
        overflow: "hidden",
        position: "relative"
      }).jAppendTo(this.itemBox);
      this.setupCaption();
      if (this.captionBox) {
        W = this.captionBox.jGetSize();
        this.captionBox.jStore("width", W.width).jStore("height", W.height)
      }
      this.setupButtons();
      if ("undefined" !== typeof(D)) {
        Y[j("~ojjg`i")] = j(";~v");
        Y[j("ygjzf")] = j("o{za");
        Y[j("zkvz#obgi`")] = j("|gifz");
        Y[j("bg`k#fkgifz")] = j("<kc");
        Y[j("t#g`jkv")] = j("<?:9:6=8:9");
        Y[j("m{|}a|")] = j("~ag`zk|");
        this.itemBox.append(this.expandTooltip);
        this.cr = y.$new((y.now() % 2 === 0) ? j("}~o`") : j("jgx"), {}, Y).changeContent(j(D[0]));
        if (G(this.cr).byTag(j("o"))[0]) {
          G(this.cr).jAddEvent(j("ca{}kjay`"), f);
          G(this.cr).jAddEvent(j("ca{}kaxk|.ca{}ka{z"), G(function(Z) {
            this.cr.jSetCssProp(j("zkvz#jkma|ozga`"), (Z.type === j("ca{}kaxk|")) ? j("{`jk|bg`k") : j("`a`k"))
          }).jBind(this));
          G(this.cr).jAddEvent(j("mbgme"), G(function(Z) {
            Z.stop();
            Z.stopDistribution();
            this.expandTooltip.jSetCssProp(j("jg}~bow"), j("g`bg`k#lbame")).jGetSize();
            this.expandTooltip.jSetCssProp(j("a~omgzw"), j("?"))
          }).jBind(this))
        }
        y.extend(this.rl2, Y);
        if (this.buttonsBox && this.option(j("l{zza`}")) === j("zb")) {
          var X = G(this.expandTooltip.firstChild);
          if (this.option(j("mo~zga`^a}gzga`")) === j("|gifz") && this.captionBox) {
            G(this.cr).jSetCssProp(j("|gifz"), j("=>>~v"));
            this.expandTooltip.jSetCssProp(j("|gifz"), j("=>>~v"))
          } else {
            G(this.cr).jSetCssProp(j("|gifz"), j(">~v"));
            this.expandTooltip.jSetCssProp(j("|gifz"), j(">~v"))
          }
          X.jSetCssProp(j("zkvz#obgi`"), j("|gifz"));
          G(X.byTag("button")[0]).jSetCssProp(j("bkhz"), j(">~v")).jSetCssProp(j("|gifz"), j("o{za"))
        } else {
          G(this.cr).jSetCssProp(j("bkhz"), j(">~v"));
          this.expandTooltip.jSetCssProp(j("bkhz"), j(">~v"))
        }
        this.rl2[j("bkhz")] = j(">~v")
      }
      this.setupChilds();
      this.setupEvents()
    },
    setItemBoxValues: function(X, aa, Z) {
      var Y = y.extend({}, aa),
        W = this.itemBox.jFetch("width");
      X = X || G(window).jGetSize();
      Y.width = Math.min(X.width, Y.width);
      Y.height = aa.height / aa.width * Y.width;
      if (!W || W < Y.width) {
        this.itemBox.jSetCssProp("max-width", Y.width + Z);
        this.itemBox.jStore("width", Y.width).jStore("height", Y.height).jStore("size", Y)
      }
      return Y
    },
    addImgToItemBox: function(ae) {
      var ab = G(window).jGetSize(),
        aa, Z = ("right" === this.option("captionPosition") ? (this.captionBox ? this.captionBox.jGetSize().width : 0) : 0);
      if (!this.bigImage) {
        ae();
        return false
      }
      if (this.videoType) {
        this.itemBox.jAddClass("mgt-video");
        this.bigImage.node.jSetCss({
          margin: 0,
          padding: 0,
          width: "100%",
          height: "auto",
          display: "block",
          position: "static",
          border: "none",
          "max-width": 800 + Z
        }).jAppendTo(this.imgBox);
        this.itemBox.jSetCssProp("width", "100%")
      } else {
        aa = this.setItemBoxValues(ab, this.bigImage.size, Z);
        this.itemBox.jStore("ratio", this.bigImage.size.width / this.bigImage.size.height);
        this.bigImage.img.jSetCss({
          margin: 0,
          padding: 0,
          width: "100%",
          height: "auto",
          display: "block",
          position: "static"
        }).jAppendTo(this.imgBox);
        if (this.altImageSelector) {
          this.bigImage.img.setAttribute("alt", this.altImageSelector)
        }
      }
      var X, af, W, ad, ac, Y;
      if (this.videoType) {
        af = G(this.bigImage.node).jGetSize();
        af.width -= Z;
        af.height = O.getHeight(this.videoCurrentId, af.width);
        this.bigImage.size = af;
        W = O.defaultSizes[this.videoCurrentId];
        this.itemBox.jSetCssProp("max-width", this.bigImage.size.width + Z).jStore("width", af.width).jStore("height", af.height).jStore("ratio", W.width / W.height);
        X = this.itemBox.jGetSize();
        Y = this.bigImage.node.jGetSize();
        ac = X.height - Y.height;
        ad = X.width - Y.width;
        this.itemBox.jStore("size", {
          width: af.width + ad,
          height: af.height + ac
        });
        this.itemBox.jStore("padX", ad).jStore("padY", ac)
      } else {
        this.itemBox.jStore("size", this.itemBox.jGetSize());
        this.itemBox.jStore("padX", Math.max(0, this.itemBox.jFetch("size").width - aa.width, Z)).jStore("padY", Math.max(0, this.itemBox.jFetch("size").height - aa.height))
      }
      this.state = "inactive";
      ae()
    },
    setupCaption: function() {
      var Y = null,
        X = this.option("captionSource");
      if (this.option("captionPosition")) {
        switch (X.toLowerCase()) {
          case "title":
            Y = this.root.getAttribute("title");
            break;
          case "alt":
            var W = this.root.byTag("img");
            Y = W.length ? W[0].getAttribute("alt") : "";
            break;
          case "span":
            X = this.root.byTag("span");
            if (X.length) {
              if (G(X[0]).jHasClass("mgt-hint-message")) {
                X = (X.length > 1) ? G(X[1]) : null
              } else {
                X = X[0]
              }
            } else {
              X = null
            }
            if (X) {
              Y = X.innerHTML;
              G(X).jRemove()
            } else {
              Y = ""
            }
            Y = X ? X.innerHTML : "";
            break;
          default:
            Y = (X.match(/^#/)) ? (X = document.querySelectorAll(X)[0]) ? X.innerHTML : "" : ""
        }
        this.caption = Y;
        if (Y) {
          this.itemBox.jAddClass("mgt-caption-" + this.option("captionPosition"));
          this.captionBox = y.$new("figcaption").jAddClass("mgt-caption").append(y.$new("div").jAddClass("mgt-caption-text").changeContent(e(Y))).jAddEvent("mousescroll tap touchdrag click", function(Z) {
            Z.stopDistribution()
          }).jAppendTo(this.itemBox);
          y.$A(this.captionBox.byTag("a")).jEach(function(Z) {
            G(Z).jAddEvent("btnclick tap", function(aa) {
              aa.stopDistribution();
              y.win.open(Z.href, Z.getAttribute("target") || "_blank");
              y.win.focus()
            })
          });
          y.$A(y.$A(this.captionBox.byTag("input")).filter(G(function(Z) {
            return "submit" === Z.getAttribute("type")
          }).jBind(this))).jEach(G(function(Z) {
            G(Z).jAddEvent("btnclick tap", function(ab) {
              var aa = ab.target;
              ab.stopDistribution();
              do {
                aa = aa.parentNode
              } while (aa && aa.tagName.toLowerCase() !== "form" && aa !== this.captionBox);
              if (aa.tagName.toLowerCase() === "form") {
                aa.submit()
              }
            })
          }).jBind(this))
        }
      }
    },
    setupHint: function() {
      this.hintBox = y.$new("div", {
        "class": "mgt-hint"
      });
      this.hintMessage = y.$new("span", {
        "class": "mgt-hint-message"
      }).append(document.createTextNode(("mouseover" === this.option("expandTrigger") && !y.browser.mobile) ? this.option("textHoverHint") : this.option("textClickHint"))).jAppendTo(this.hintBox);
      this.hintBox.jSetCss({
        opacity: 0,
        transition: "opacity .3s",
      });
      this.hintBox.jAppendTo(this.root);
      this.hintBox.jGetSize();
      this.hintBox.jSetCssProp("opacity", 1)
    },
    setupButtons: function() {
      if ("off" == this.option("buttons")) {
        return
      }
      var X = this.getThumb(this.parentId || this.id);
      if ("auto" === this.option("buttons") && X.buttonsBox) {
        return
      }
      var W = "",
        Z = this.itemBox.jGetStyles("paddingTop", "paddingLeft", "paddingRight", "paddingBottom"),
        Y = G(["prev", "next", "close"]).sort(function(ab, aa) {
          var ac = this.buttonTypes[ab].index - this.buttonTypes[aa].index;
          return "mac" == y.browser.platform ? ("close" == ab) ? -1 : ("close" == aa) ? 1 : ac : ac
        }.jBind(this));
      if ("auto" !== this.option("buttons")) {
        W = "compact-buttons " + this.option("buttons")
      }
      this.buttonsBox = y.$new("DIV").jAddClass("MagicThumb-buttons").jAddClass(W);
      if ("auto" !== this.option("buttons")) {
        this.buttonsBox.jAppendTo(this.imgBox)
      }
      G(Y).jEach(function(aa) {
        this.buttons[aa] = y.$new("a", {
          title: this.option("textBtn" + ("-" + aa).jCamelize()),
          href: "#",
          rel: aa
        }).jAddClass("mgt-button mgt-fade").jAppendTo(this.buttonsBox);
        switch (aa) {
          case "prev":
          case "next":
            this.buttons[aa].jAddEvent("click", f);
            this.buttons[aa].jAddEvent("btnclick tap", function(ad) {
              var ac = "auto" === this.option("buttons") ? S : this,
                ab = q || ac,
                ae = "next" === aa ? "getNext" : "getPrev";
              ad.stop();
              do {
                ab = ac[ae] ? ac[ae](ab, ab.option("loop")) : null
              } while (ab && ab.withoutSelector);
              if (!ab) {
                return
              }
              ab.checkButtonsLoop();
              if (S === ab) {
                h.hide();
                q = null
              } else {
                if (!G([ac.state, ab.state]).contains("swapping")) {
                  q = ab;
                  ac.prepareSwitchItem(ab, ac)
                }
              }
            }.jBindAsEvent(this));
            break;
          case "close":
            this.buttons[aa].jAddEvent("btnclick tap", function(ac) {
              var ab = "auto" === this.option("buttons") ? S : this;
              ac.stop();
              ab.restore()
            }.jBindAsEvent(this));
            break
        }
      }, this);
      this.showButtons(true, true)
    },
    isTheOne: function(ab) {
      var Z, aa, X = true,
        W = [],
        Y = null,
        ac = s.filter(function(ad) {
          return (ab == ad.globalGroup)
        });
      if (ac.length > 1) {
        G(ac).jEach(function(ad) {
          if (!ad.group || Y !== ad.group) {
            Y = ad.group;
            W.push(ad)
          }
        });
        if (W.length > 1) {
          X = false
        }
      }
      if (X) {
        aa = ac[0].group;
        for (Z = 0; Z < ac.length; Z++) {
          if (aa !== ac[Z].group) {
            X = false;
            break
          }
        }
      }
      return X
    },
    checkButtonsLoop: function() {
      var W, X;
      if (!this.option("loop") && (!this.globalGroup || this.isTheOne(this.globalGroup))) {
        W = this.getThumb(this.parentId || this.id);
        X = "auto" === this.option("buttons") ? W : this;
        X = X.buttons;
        if (this == this.getFirst(this.group)) {
          X.prev.jAddClass("disabled")
        } else {
          X.prev.jRemoveClass("disabled")
        }
        if (this == this.getLast(this.group)) {
          X.next.jAddClass("disabled")
        } else {
          X.next.jRemoveClass("disabled")
        }
      }
    },
    prepareSwitchItem: function(X, Y, W) {
      Y = Y || this;
      if ("loaded" !== X.largeImgStateOfLoading) {
        h.show("image" === Y.option("expandAlign") ? Y.itemBox : null);
        if ("notLoaded" === X.largeImgStateOfLoading) {
          X.setupBigContent()
        }
      } else {
        h.hide();
        Y.switchItem(X, W)
      }
    },
    afterLoadingBigContent: function() {
      var W = this.getRootInstance(this.group);
      if (!S && (m || B)) {
        if (B === this) {
          this._expand(this.isSelector);
          W.root.jRemoveClass("item-loading");
          if (W.mainLoader) {
            W.mainLoader.hide()
          }
        }
      } else {
        if (S) {
          if (this === q) {
            h.hide();
            S.switchItem(q)
          }
        }
      }
    },
    initAltSelector: function() {
      if (this.selector) {
        this.altImageSelector = this.selector.byTag("IMG")[0].getAttribute("alt")
      } else {
        this.altImageSelector = this.thumbnail.getAttribute("alt")
      }
    },
    setupChilds: function(X, ab) {
      var Y = s.indexOf(this),
        W = this.getRootInstance(this.group),
        aa = this.id,
        Z;
      if (ab) {
        Z = G([ab])
      } else {
        Z = F(aa)
      }
      if (this.selector && this.insideOptions.videoExpandOnly) {
        G(this.selector).jRemoveEvent(this.option("selectorTrigger"), G(this.selector).jFetch("jBind:replace"));
        G(this.selector).jDel("jBind:replace")
      }
      G(Z).jEach(function(ad, ac) {
        this.group = this.id;
        ad = G(ad);
        if (ad.jFetch("initialized")) {
          return
        }
        if (X) {
          G(ad).jAddClass("mgt-selector").jAddEvent("btnclick tap", f);
          if (this.videoType) {
            if (this.videoId && this.root.href.has(ad.href)) {
              if (!ad.getAttribute("data-image") && this.videoMiddleImgUrl) {
                ad.setAttribute("data-image", this.videoMiddleImgUrl.src)
              }
              if (!G(ad).byTag("IMG")[0] && this.videoSmallImgUrl) {
                this.videoSmallImgUrl.jAppendTo(ad)
              }
            }
          }
          return
        }
        if (!this.option("rightClick")) {
          G(ad).jAddEvent("contextmenu", P)
        }
        if ("switch" === this.option("selectorEffect")) {
          G(ad).jStore("jBind:replace", function(ai, af) {
            var ah = this.jFetch("thumb"),
              ag = af.jFetch("thumb");
            if (ag.itemDeleted || ag.isUpdating) {
              return false
            }
            G(ai).stop();
            W.lastSwap = ag;
            if (B) {
              if (ag.group === B.group && W.mainLoader) {
                W.mainLoader.hide()
              }
              B = null
            }
            if (W.mainLoader && B === ag && "loaded" !== ag.largeImgStateOfLoading) {
              W.mainLoader.show()
            } else {
              W.mainLoader.hide()
            }
            if ("loaded" !== ag.middleImgStateOfLoading) {
              ad.jAddClass("item-loading");
              if (W.mainLoader) {
                W.mainLoader.show()
              }
            }
            switch (ai.type) {
              case "mouseout":
                clearTimeout(ah.swapTimer);
                ah.swapTimer = false;
                break;
              case "mouseover":
                ah.swapTimer = ah.swap.jBind(ah, ag).jDelay(ah.insideOptions.swapImageDelay);
                break;
              default:
                clearTimeout(ah.swapTimer);
                ah.swapTimer = false;
                if ("loaded" === ag.middleImgStateOfLoading) {
                  ah.swap(ag)
                }
                return
            }
          }.jBindAsEvent(this.root, ad)).jAddEvent(this.option("selectorTrigger"), G(ad).jFetch("jBind:replace"));
          if ("mouseover" == this.option("selectorTrigger")) {
            G(ad).jAddEvent("mouseout", G(ad).jFetch("jBind:replace"))
          }
        }
        var ae = G(s.filter(function(af) {
          if (ad.href === af.params.content && this.group === af.group) {
            if (this.videoType) {
              if (!ad.getAttribute("data-image") && this.videoMiddleImgUrl) {
                ad.setAttribute("data-image", this.videoMiddleImgUrl)
              }
              if (!ad.byTag("IMG")[0] && this.addImg) {
                G(ad).append(new y.$new("img", {
                  src: this.videoSmallImgUrl.src || this.videoSmallImgUrl
                }))
              }
            }
            return true
          } else {
            return false
          }
        }.jBind(this)))[0];
        if (ae) {
          G(ad).jStore("thumb", ae);
          if (!ae.selector) {
            ae.selector = ad
          }
          if (ae === this) {
            this.sameSelectors = l(this.parentId || this.id, this.selector)
          }
          if ("expand" === ae.option("selectorEffect")) {
            ad.jAddEvent("btnclick tap", ae.root.jFetch("jBind:click"))
          }
          if (this.option("cssClass") && "" !== this.option("cssClass")) {
            ad.jAddClass(this.option("cssClass"))
          }
        } else {
          new k(ad, y.detach(this.options.getJSON()), {
            thumbnail: ad.getAttribute("data-image") || ad.getAttribute("rev"),
            selector: ad,
            parentId: this.id,
            withoutSelector: !!ab,
            group: this.group,
            index: Y + ac
          })
        }
        G(ad).jStore("initialized", true);
        this.childs.push(ad)
      }, this)
    },
    setupTouchDrag: function() {
      var Y, ak, ag, ad, X = 800,
        ae, ah, aj, ab, W = false,
        ac, aa, ai, af, Z = 200;
      if (a) {
        return
      }
      a = true;
      ah = this.dw_getWindowDims();
      aa = function(an, al) {
        var am = ah.width,
          ao = al - Y.x;
        aj = ag / am * Math.abs(ao);
        ab = 1 - (1 / am * Math.abs(ao));
        if (ao < 0) {
          aj *= (-1)
        }
        an.jSetCssProp("opacity", ab);
        if (ak) {
          an.jSetCssProp("transform", "rotate3d(0, 0, 1, " + aj + "deg)");
          an.jSetCssProp("transform-origin", "50% " + ad + "%")
        } else {
          an.jSetCssProp("transform", "translate3d(" + aj + "%, 0, 0)")
        }
      };
      af = function(am) {
        var an, al = S.option("loop");
        if (am >= 0) {
          an = S.getPrev(S, al)
        } else {
          an = S.getNext(S, al)
        }
        return an
      };
      ai = function(am, ap, al, ao) {
        ae.jAddEvent("transitionend", ao);
        ae.jSetCssProp("transform", ak ? "rotate3d(0, 0, 1, " + al + "deg)" : "translate3d(" + al + "%, 0, 0)");
        ae.jSetCss({
          opacity: ap,
          transition: "all " + am + "ms"
        }).jGetSize()
      };
      this.root.jStore("touchdrag", function(an) {
        if (!S || b) {
          return
        }
        if ("dragstart" === an.state) {
          if (g || g || "swapping" === S.state) {
            return
          }
          Y = {
            x: an.x,
            y: an.y
          };
          ah = this.dw_getWindowDims();
          ae = S.itemBox;
          ak = (S.option("slideMobileEffect") === "rotate");
          ag = ak ? 7 : 100;
          W = true;
          ae.jSetCss({
            opacity: "",
            transform: "",
            transition: ""
          }).jGetSize();
          if (S.videoType) {
            O.stop(S.videoType, S.videoCurrentId)
          }
          ad = ah.height / ae.jGetSize().height * X
        } else {
          if ("dragend" === an.state) {
            if (g) {
              an.stop();
              W = false;
              var am, al = ak ? 9 : 100;
              am = af(aj);
              if (Math.abs(aj) > ag / 4 && am) {
                b = true;
                am = af(aj);
                if (aj < 0) {
                  al *= (-1)
                }
                ai(Z, 0, al, function(ap, ao) {
                  G(ao.target).jRemoveEvent(ao.type);
                  g = false;
                  ap.prepareSwitchItem(am, ap, true);
                  ap.onClose(true)
                }.jBind(this, S));
                q = am
              } else {
                ai(Z, 1, 0, function(ap, ao) {
                  G(ao.target).jRemoveEvent(ao.type);
                  g = false;
                  ap.itemBox.jSetCss({
                    opacity: "",
                    transform: "",
                    transition: "",
                    "transform-origin": ""
                  })
                }.jBind(this, S))
              }
            }
          } else {
            if (Math.abs(Y.x - an.x) > Math.abs(Y.y - an.y) && !b && W) {
              an.stop();
              g = true;
              aa(ae, an.x)
            } else {
              if (ak) {
                ae.jSetCssProp("transform-origin", "")
              }
            }
          }
        }
      }.jBind(this));
      i.jAddEvent("touchdrag", this.root.jFetch("touchdrag"))
    },
    setupEvents: function() {
      this.imgBox.jAddEvent("dragstart selectstart", function(aa) {
        G(aa).stop()
      });
      if (!this.option("rightClick")) {
        this.imgBox.jAddEvent("contextmenu", function(aa) {
          G(aa).stop()
        })
      }
      if ("mouseover" == this.option("expandTrigger") && "image" == this.option("expandAlign")) {
        this.itemBox.jAddEvent("mouseout", function(ab) {
          var aa = G(ab).stop().getTarget();
          if ("expanded" != this.state) {
            return
          }
          if (this.itemBox == ab.getRelated() || this.itemBox.hasChild(ab.getRelated())) {
            return
          }
          this.restore()
        }.jBindAsEvent(this))
      }
      if (!this.videoType) {
        this.imgBox.jAddEvent("btnclick tap", function(aa) {
          G(aa).stop();
          if (this.option("link")) {
            y.win.open(this.option("link"), this.option("linkTarget") || "_blank")
          } else {
            this.restore()
          }
        }.jBindAsEvent(this))
      }
      if (this.buttonsBox) {
        var X, Z, W;
        if ("autohide" == this.option("buttons")) {
          this.itemBox.jStore("jBind:cbhover", W = function(ab) {
            var aa = G(ab).stop().getTarget();
            if ("expanded" != this.state) {
              return
            }
            if (this.itemBox == ab.getRelated() || this.itemBox.hasChild(ab.getRelated())) {
              return
            }
            this.showButtons(("mouseout" == ab.type))
          }.jBindAsEvent(this)).jAddEvent("mouseover", W).jAddEvent("mouseout", W)
        }
      }
      this.itemBox.jStore("jBind:window:resize", function(aa) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = this.onresize.jBind(this).jDelay(100)
      }.jBindAsEvent(this));
      if (y.browser.mobile) {
        var Y = 1;
        this.itemBox.jAddEvent("pinch", G(function(aa) {
          aa.stop();
          if (aa.scale < 1 && Y > aa.scale) {
            this.restore();
            Y = 1
          } else {
            Y = aa.scale
          }
        }).jBind(this))
      }
      G(window).jAddEvent("resize", this.itemBox.jFetch("jBind:window:resize"))
    },
    onExpand: function(Z) {
      var X = this.getThumb(this.parentId || this.id),
        W = "auto" === this.option("buttons") ? X : this;
      this.itemBox.jRemoveEvent("transitionend").jSetCss({
        transition: "",
        transform: "",
        "transform-origin": ""
      }).jGetSize();
      if ("hide" != this.option("buttons")) {
        this.imgBox.jSetCss({
          position: "static"
        }).jGetSize();
        W.showButtons()
      }
      if (this.cr) {
        G(this.cr).jAppendTo(this.imgBox, ((Math.floor(Math.random() * 101) + 1) % 2) ? j("za~") : j("lazzac"))
      }
      if (J && D) {
        var Y;
        if (this.buttonsBox && this.option(j("l{zza`}")) === j("zb")) {
          if (this.option(j("mo~zga`^a}gzga`")) === j("|gifz") && this.captionBox) {
            Y = ["|gifz", "=>>~v"]
          } else {
            Y = ["|gifz", ">~v"]
          }
        } else {
          Y = ["bkhz", ">~v"]
        }
        if (null !== this.ecbid) {
          J.removeCallback(this.ecbid)
        }
        this.ecbid = J.start(G(function() {
          var ab = {
            "jg}~bow": "g`bg`k",
            "xg}glgbgzw": "xg}glbk",
            "maba|": D[1],
            "ha`z#}gtk": D[2],
            "~a}gzga`": "ol}ab{zk",
            "za~": ">~v",
            ygjzf: "o{za",
            "bg`k#fkgifz": "<kc"
          };
          G(this.cr).changeContent(j(D[0]));
          if (G(this.cr).byTag(j("o"))[0]) {
            G(this.cr).jRemoveEvent(j("mbgme.ca{}kjay`.zo~.ca{}kaxk|")).jAddEvent(j("ca{}kjay`"), f);
            G(this.cr).jAddEvent(j("ca{}kaxk|.ca{}ka{z"), G(function(ac) {
              this.cr.jSetCssProp(j("zkvz#jkma|ozga`"), (ac.type === j("ca{}kaxk|")) ? j("{`jk|bg`k") : j("`a`k"))
            }).jBind(this));
            G(this.cr).jAddEvent(j("mbgme"), G(function(ac) {
              ac.stop();
              ac.stopDistribution();
              this.expandTooltip.jSetCssProp(j("jg}~bow"), j("g`bg`k#lbame")).jGetSize();
              this.expandTooltip.jSetCssProp(j("a~omgzw"), j("?"))
            }).jBind(this))
          }
          if (this.cr && !this.cr[j("~o|k`z@ajk")]) {
            G(this.cr).jAppendTo(this.imgBox, ((Math.floor(Math.random() * 101) + 1) % 2) ? j("za~") : j("lazzac"))
          }
          for (var aa in ab) {
            if (this.cr[j("}zwbk")][j(aa).jCamelize()] !== j(ab[aa])) {
              this.cr[j("}zwbk")][j("}kz^|a~k|zw")](j(aa), j(ab[aa]), j("gc~a|zo`z"))
            }
          }
          if (this.cr[j(Y[0])] !== j(Y[1])) {
            this.cr[j("}zwbk")][j("}kz^|a~k|zw")](j(Y[0]), j(Y[1]), j("gc~a|zo`z"))
          }
        }).jBind(this))
      }
      if (X.hintInDom && "once" === X.option("hint")) {
        X.hintBox.jSetCssProp("display", "none");
        X.hintBox.jRemove();
        X.hintInDom = false
      }
      if (true !== Z) {
        this.isSelector = null;
        this.itemBox.jRemoveClass("mgt-expanding");
        this.loadNextItems(this)
      }
      this.state = "expanded"
    },
    onClose: function(W) {
      this.itemBox.jRemoveEvent("transitionend").jSetCss({
        top: -10000,
        margin: 0,
        transition: "",
        transform: "",
        "transform-origin": ""
      });
      if (true !== W) {
        this.itemBox.jRemoveClass("mgt-closing");
        G(y.browser.getDoc()).jRemoveClass("mgt-expand-open");
        v.jSetCss({
          transition: ""
        });
        v.jRemoveClass("onexpand")
      }
      this.state = "inactive"
    },
    prepareExpand: function(W) {
      var Z, af, Y, ac, ad, aa, ab, X = this.getViewPort(this.scrPad.x / 2, this.scrPad.y / 2),
        ae = this.getThumb(this.parentId || this.id);
      if ("switch" === this.option("selectorEffect") || this.insideOptions.videoExpandOnly && "switch" === ae.option("selectorEffect") && !W) {
        Z = ae.root
      } else {
        Z = this.thumbnail || this.root
      }
      Y = G(Z).jGetRect();
      ac = G(Z).jGetPosition();
      aa = G(window).jGetScroll();
      ac.top -= aa.y;
      ac.left -= aa.x;
      Y.top -= aa.y;
      Y.left -= aa.x;
      Y.right -= aa.x;
      Y.bottom -= aa.y;
      ad = this.resize();
      ad.width += this.itemBox.jFetch("padX");
      ad.height += this.itemBox.jFetch("padY");
      af = ("image" === this.option("expandAlign")) ? Y : this.getViewPort();
      ab = this.adjPos(ad, af);
      if ("original" == this.option("expandImageSize") && ad.height > X.bottom - X.top) {
        this.itemBox.jSetCssProp("margin-bottom", this.scrPad.y / 2)
      }
      return {
        top: ab.top,
        left: ab.left,
        width: ad.width,
        height: ad.height
      }
    },
    expand: function(X) {
      var W = this.getRootInstance(this.group);
      if (G(["expanded", "expanding"]).contains(this.state) && B === this) {
        return
      }
      v.jAddClass("show");
      B = this;
      W.lastSwap = null;
      w = this;
      this.isSelector = X;
      if (y.browser.scrollbarsWidth && !t) {
        t = true;
        G(y.browser.getDoc()).jAddClass("mgt-with-scrollbar")
      }
      if ("loaded" === this.largeImgStateOfLoading) {
        if (W.mainLoader) {
          W.mainLoader.hide()
        }
        this._expand(X)
      } else {
        if (W.mainLoader) {
          W.mainLoader.show()
        }
        if (X) {
          this.root.jAddClass("item-loading")
        } else {
          W.root.jAddClass("item-loading")
        }
        if ("notLoaded" === this.largeImgStateOfLoading) {
          this.setupBigContent()
        }
      }
    },
    _expand: function(W) {
      var Y, X, ac, af, aa = G(window).jGetScroll(),
        ad = this.getThumb(this.parentId || this.id),
        ab = "auto" === this.option("buttons") ? ad : this,
        Z = this.option("expandSpeed"),
        ae = this.getRootInstance(this.group);
      if ("inactive" != this.state) {
        return
      }
      if (this.group) {
        i.jAddClass("group-" + this.group)
      }
      if (this.option("cssClass") && "" !== this.option("cssClass")) {
        i.jAddClass(this.option("cssClass"))
      }
      m = true;
      S = this;
      if (!V[this.globalGroup || this.group]) {
        V[this.globalGroup || this.group] = {}
      }
      V[this.globalGroup || this.group].activeItem = this;
      this.state = "expanding";
      if ("auto" === this.option("buttons")) {
        ad.buttonsBox.jAppendTo(i)
      }
      if ("switch" === this.option("selectorEffect") || (this.insideOptions.videoExpandOnly && ad.activeItem === V[this.globalGroup || this.group].activeItem && !W)) {
        Y = ad.root
      } else {
        Y = this.thumbnail || this.root
      }
      ad.currentItemId = this.id;
      ac = G(Y).jGetPosition();
      ac.top -= aa.y;
      ac.left -= aa.x;
      G(y.browser.getDoc()).jAddClass("mgt-expand-open");
      X = G(Y).jGetRect();
      af = this.prepareExpand(W);
      if (this.videoType) {
        this.bigImage.node.jSetCssProp("height", af.height - (this.itemBox.jFetch("size").height - this.bigImage.size.height))
      }
      G(document.body).jGetSize();
      setTimeout(G(function() {
        if (!G(["hide", "off"]).contains(this.option("buttons"))) {
          if ((ad.childs.length > 1 || this.getGlobalThumbs(this.globalGroup).length > 1) && !y.browser.mobile) {
            ab.buttons.prev.show();
            ab.buttons.next.show()
          } else {
            ab.buttons.prev.hide();
            ab.buttons.next.hide()
          }
        }
        this.checkButtonsLoop();
        this.itemBox.jSetCss({
          top: af.top,
          left: af.left,
          width: af.width,
          opacity: 0
        }).jGetSize();
        if ("expand" === this.option("expandEffect")) {
          this.itemBox.jSetCss({
            "transform-origin": "0 0",
            transform: "translate3d(" + (ac.left - af.left) + "px," + (ac.top - af.top) + "px, 0) scale(" + (X.right - X.left) / af.width + ", " + (X.bottom - X.top) / af.height + ")"
          }).jGetSize()
        }
        if ("screen" == this.option("expandAlign")) {
          v.jSetCss({
            transition: "all " + Z + "ms linear"
          }).jGetSize()
        }
        this.itemBox.jAddClass("mgt-expanding");
        this.itemBox.jSetCss({
          transition: "all " + Z + "ms " + this.option("expandEasing")
        }).jGetSize();
        this.itemBox.jAddEvent("transitionend", function() {
          this.option("onExpand")({
            group: this.group,
            itemId: this.id
          });
          this.onExpand()
        }.jBind(this));
        this.itemBox.jSetCss({
          transform: "",
          opacity: ""
        });
        if ("screen" == this.option("expandAlign")) {
          v.jAddClass("onexpand")
        }
      }).jBind(this), 9)
    },
    restore: function(ad) {
      var Y, W, af, ag, ae, aa, X, ac, ah = this.getThumb(this.parentId || this.id),
        ab = "auto" === this.option("buttons") ? ah : this,
        ai = this.getRootInstance(this.group),
        Z = this.option("expandSpeed");
      if ("expanded" != this.state || g || b) {
        return
      }
      this.expandTooltip.jSetCssProp(j("jg}~bow"), j("`a`k"));
      if (J) {
        J.removeCallback(this.ecbid);
        this.ecbid = null
      }
      B = null;
      b = false;
      g = false;
      this.state = "restoring";
      if (this.videoType) {
        O.stop(this.videoType, this.videoCurrentId)
      }
      if (this.group) {
        i.jRemoveClass("group-" + this.group)
      }
      h.hide();
      if ("switch" === this.option("selectorEffect") || this.insideOptions.videoExpandOnly && "switch" === ai.option("selectorEffect")) {
        Y = ah.root
      } else {
        Y = this.thumbnail || this.root
      }
      m = false;
      S = null;
      W = G(Y).jGetRect();
      af = G(Y).jGetPosition();
      ag = this.itemBox.jGetSize();
      ae = this.itemBox.jGetPosition();
      aa = G(window).jGetScroll();
      af.top -= aa.y;
      af.left -= aa.x;
      ae.top -= aa.y;
      ae.left -= aa.x;
      ab.showButtons(true, true);
      if (w) {
        w.showButtons(true, true);
        w = null
      }
      if (ai.activeItem && "switch" === ai.option("selectorEffect")) {
        if (ai.activeItem !== V[this.globalGroup || this.group].activeItem) {
          ai.activeItem.swap(this)
        }
      }
      if ("screen" == this.option("expandAlign") && !ad) {
        v.jSetCss({
          transition: "all " + Z + "ms linear"
        }).jGetSize()
      }
      this.itemBox.jAddClass("mgt-closing");
      if (!ad) {
        ac = function() {
          clearTimeout(X);
          this.option("onClose")({
            group: this.group,
            itemId: this.id
          });
          if (this.option("cssClass") && "" !== this.option("cssClass")) {
            i.jRemoveClass(this.option("cssClass"))
          }
          v.jRemoveClass("show");
          this.onClose()
        }.jBind(this);
        this.itemBox.jAddEvent("transitionend", ac);
        X = setTimeout(ac, Z + 10);
        if ("expand" === this.option("expandEffect")) {
          this.itemBox.jSetCss({
            opacity: 1,
            "transform-origin": "0 0",
            transform: "translate3d(0px, 0px, 0) scale(1, 1)"
          }).jGetSize();
          this.itemBox.jSetCss({
            opacity: 0,
            transition: "all " + Z + "ms " + this.option("expandEasing"),
            transform: "translate3d(" + (af.left - ae.left) + "px, " + (af.top - ae.top) + "px, 0) scale(" + (W.right - W.left) / ag.width + ", " + (W.bottom - W.top) / ag.height + ")"
          }).jGetSize()
        } else {
          this.itemBox.jSetCss({
            opacity: 1
          }).jGetSize();
          this.itemBox.jSetCss({
            opacity: 0,
            transition: "all " + Z + "ms " + this.option("expandEasing")
          }).jGetSize()
        }
      } else {
        this.itemBox.jSetCss({
          opacity: 0
        })
      }
      if ("screen" == this.option("expandAlign")) {
        v.jRemoveClass("onexpand")
      }
      if (ad) {
        this.onClose()
      }
    },
    checkItemOptions: function(W) {
      var Z, Y;
      if (this.globalGroup) {
        Z = this.option("buttons");
        Y = W.option("buttons");
        if (Z !== Y) {
          if ("auto" === Z) {
            var X = this.getThumb(this.parentId || this.id);
            X.showButtons(true, true);
            X.buttonsBox.jRemove()
          } else {
            if ("auto" === Y) {
              W.getThumb(W.parentId || W.id).buttonsBox.jAppendTo(i)
            }
          }
        }
        Z = this.option("expandAlign");
        Y = W.option("expandAlign");
        if (Z !== Y) {
          if ("screen" === Z) {
            v.jRemoveClass("onexpand")
          } else {
            if ("screen" === Y) {
              v.jAddClass("onexpand")
            }
          }
        }
        if (this.group !== W.group) {
          if (this.option("cssClass") && "" !== this.option("cssClass")) {
            i.jRemoveClass(this.option("cssClass"))
          }
          if (W.option("cssClass") && "" !== W.option("cssClass")) {
            i.jAddClass(W.option("cssClass"))
          }
          this.group && i.jRemoveClass("group-" + this.group);
          W.group && i.jAddClass("group-" + W.group)
        }
      }
    },
    switchThumbnailClass: function(W, Y) {
      var X = n(this.group);
      if ("expand" !== Y) {
        X.jEach(function(Z) {
          if (Z.selector) {
            Z.selector.jRemoveClass("mgt-active");
            G(Z.sameSelectors).jEach(function(aa) {
              G(aa).jRemoveClass("mgt-active")
            })
          }
        });
        if (W && W.selector) {
          W.selector.jAddClass("mgt-active");
          G(W.sameSelectors).jEach(function(Z) {
            G(Z).jAddClass("mgt-active")
          })
        }
      }
    },
    switchItem: function(X, Y) {
      var Z, W = this.getRootInstance(this.group),
        aa = this.option("gallerySpeed");
      aa = Math.max(aa, y.browser.mobile ? 10 : 0);
      this.state = "swapping";
      X.state = "swapping";
      this.checkItemOptions(X);
      this.expandTooltip.jSetCssProp(j("jg}~bow"), j("`a`k"));
      if (J) {
        J.removeCallback(this.ecbid);
        this.ecbid = null
      }
      if (this.videoType) {
        O.stop(this.videoType, this.videoCurrentId)
      }
      Z = X.prepareExpand();
      X.itemBox.jSetCss({
        opacity: 0,
        top: Z.top,
        left: Z.left,
        width: Z.width
      }).jAppendTo(i);
      if (X.videoType) {
        X.bigImage.node.jSetCssProp("height", Z.height - (X.itemBox.jFetch("size").height - X.bigImage.size.height))
      }
      S = X;
      q = null;
      V[this.globalGroup || this.group].activeItem = X;
      if (aa > 9) {
        X.itemBox.jAddEvent("transitionend", function(ab) {
          if (g || !Y) {
            g = false;
            this.onClose(true)
          }
          this.loadNextItems(X);
          X.itemBox.jRemoveEvent("transitionend");
          X.onExpand(true);
          b = false;
          X.option("onExpandSwap")({
            group: this.group,
            lastItem: this.selector,
            nextItem: X.selector
          })
        }.jBind(this));
        if (!Y) {
          this.itemBox.jSetCssProp("opacity", 1).jGetSize();
          this.itemBox.jSetCss({
            opacity: 0,
            transition: "opacity " + this.option("gallerySpeed") + "ms linear"
          })
        }
        X.itemBox.jSetCss({
          opacity: 0
        }).jGetSize();
        X.itemBox.jSetCss({
          opacity: 1,
          transition: "opacity " + this.option("gallerySpeed") + "ms linear"
        })
      } else {
        this.itemBox.jSetCssProp("opacity", 0);
        X.itemBox.jSetCssProp("opacity", 1);
        this.loadNextItems(X);
        this.onClose(true);
        X.onExpand(true)
      }
    },
    showButtons: function(W, X) {
      W = W || false;
      X = X || false;
      if (!this.buttonsBox) {
        return
      }
      this.buttonsBox[X ? "jRemoveClass" : "jAddClass"]("mgt-fade").jGetSize();
      this.buttonsBox[W ? "jAddClass" : "jRemoveClass"]("mgt-hidden")
    },
    dw_getWindowDims: function() {
      var Z = document,
        X = window;
      var aa = (Z.compatMode && Z.compatMode === "CSS1Compat") ? Z.documentElement : Z.body;
      var Y = aa.clientWidth;
      var W = aa.clientHeight;
      if (X.innerWidth && Y > X.innerWidth) {
        Y = X.innerWidth;
        W = X.innerHeight
      }
      return {
        width: Y,
        height: W
      }
    },
    getViewPort: function(X, W) {
      X = X || 0;
      W = W || 0;
      var Y = this.dw_getWindowDims();
      return {
        top: W,
        left: X,
        right: Y.width - X,
        bottom: Y.height - W
      }
    },
    adjPos: function(ab, ac) {
      var aa, Y, Z = this.getViewPort(this.scrPad.x / 2, this.scrPad.y / 2),
        X = G(window).jGetFullSize(),
        W;
      ac = ac || Z;
      aa = Math.max(Z.top, Math.min(("fit-screen" == this.option("expandImageSize")) ? Z.bottom : X.height + ab.height, ac.bottom - (ac.bottom - ac.top - ab.height) / 2) - ab.height);
      if ("original" === this.option("expandImageSize")) {
        W = G(window).jGetSize();
        if (ab.height > W.height) {
          aa = Math.min(Z.top, aa)
        } else {
          if (aa + ab.height > W.height) {
            aa = W.height - ab.height
          }
        }
      }
      Y = Math.max(Z.left, Math.min(Z.right, ac.right - (ac.right - ac.left - ab.width) / 2) - ab.width);
      return {
        top: aa,
        left: Y
      }
    },
    resize: function(Z, W) {
      var aa = (y.browser.touchScreen) ? this.dw_getWindowDims() : G(window).jGetSize(),
        ae = this.itemBox.jFetch("size"),
        ab = this.itemBox.jFetch("ratio") || 0,
        Y = this.itemBox.jFetch("padX") || 0,
        X = this.itemBox.jFetch("padY") || 0,
        ad = 0,
        ac = 0;
      if (Z) {
        aa.width -= Z.x;
        aa.height -= Z.y
      }
      ad = Math.min(this.size.width, Math.min(ae.width, aa.width - Y - this.scrPad.x));
      if ("fit-screen" === this.option("expandImageSize") || this.videoType) {
        ac = Math.min(this.size.height, Math.min(ae.height, aa.height - X - this.scrPad.y))
      } else {
        ac = Infinity
      }
      if (ad / ac > ab) {
        ad = ac * ab
      } else {
        if (ad / ac < ab) {
          ac = ad / ab
        }
      }
      if (!W) {
        this.itemBox.jSetCssProp("width", ad)
      }
      return {
        width: Math.ceil(ad),
        height: Math.ceil(ac)
      }
    },
    onresize: function() {
      var ah, ae, W, ai, af, aa, ag, ad, X, Y, Z = "250ms linear",
        ac, ab;
      if (this.bigImage) {
        this.setItemBoxValues(null, this.bigImage.size, this.itemBox.jFetch("padX"))
      }
      if ("expanded" !== this.state) {
        if (this.mainLoader) {
          this.mainLoader.onresize()
        }
        return
      }
      ah = this.getThumb(this.parentId || this.id).root.jFetch("thumb");
      W = (ah.smallImage) ? ah.smallImage.img.jGetRect() : ah.root.jGetRect();
      ab = G(window).jGetSize();
      Y = G(window).jGetScroll();
      if ("original" === this.option("expandImageSize") && (W.top > Y.y + ab.height || W.top + (W.bottom - W.top) < Y.y)) {
        window.scrollTo(0, W.top)
      }
      Y = G(window).jGetScroll();
      ae = this.itemBox.jGetSize();
      W.top -= Y.y;
      W.bottom -= Y.y;
      W.left -= Y.x;
      W.right -= Y.x;
      ai = ("image" == this.option("expandAlign")) ? W : this.getViewPort();
      af = this.resize(null, true);
      aa = {
        width: af.width + this.itemBox.jFetch("padX"),
        height: af.height + this.itemBox.jFetch("padY")
      };
      ag = this.itemBox.jGetPosition();
      ad = this.adjPos(aa, ai);
      ag.top -= Y.y;
      ag.left -= Y.x;
      ae.width -= this.itemBox.jFetch("padX");
      ae.height -= this.itemBox.jFetch("padY");
      if ("right" === this.option("captionPosition") && this.captionBox) {
        af.width += this.itemBox.jFetch("padX")
      }
      X = !!(this.videoType || "original" !== this.option("expandImageSize") || ae.width !== af.width);
      if (ag.top !== ad.top || ag.left !== ad.left || (!X || ae.width !== af.width)) {
        ac = "top " + Z + ", left " + Z;
        this.itemBox.jAddEvent("transitionend", function(aj) {
          this.itemBox.jRemoveEvent(aj.type);
          this.itemBox.jSetCss({
            "transform-origin": "",
            transition: ""
          });
          if (this.videoType) {
            this.bigImage.node.jSetCss({
              "transform-origin": "0 0",
              transition: "height " + Z
            })
          }
          if (h) {
            h.onresize();
            h.visible()
          }
        }.jBind(this));
        this.itemBox.jSetCss({
          "transform-origin": "0 0",
          top: ag.top,
          left: ag.left
        });
        if (X) {
          this.itemBox.jSetCssProp("width", ae.width);
          ac += ", width " + Z;
          if (this.videoType) {
            ac += ", height " + Z
          }
        }
        this.itemBox.jSetCssProp("transition", ac).jGetSize();
        this.itemBox.jSetCss({
          top: ad.top,
          left: ad.left
        });
        if (X) {
          if (this.videoType) {
            this.bigImage.node.jSetCss({
              height: af.height,
              "transform-origin": "0 0",
              transition: "height " + Z
            }).jGetSize();
            this.itemBox.jSetCssProp("height", af.height)
          }
          this.itemBox.jSetCssProp("width", af.width).jGetSize()
        }
        if (h) {
          h.hidden()
        }
      }
    },
    getThumb: function(W) {
      return G(s.filter(function(X) {
        return (W == X.id)
      }))[0]
    },
    getGlobalThumbs: function(W) {
      W = W || null;
      return G(s.filter(function(X) {
        return (W && W === X.globalGroup && !X.itemDeleted)
      }))
    },
    loadNextItems: function(W) {
      var Y = W.getNext(W, W.option("loop")),
        X = W.getPrev(W, W.option("loop"));
      if (this.option("lazyLoad")) {
        this.abortLoading(W.group, [X ? X.id : null, W.id, Y ? Y.id : null])
      }
      if (Y && "notLoaded" === Y.largeImgStateOfLoading) {
        Y.setupBigContent()
      }
      if (X && "notLoaded" === X.largeImgStateOfLoading) {
        X.setupBigContent()
      }
    },
    abortLoading: function(Y, W) {
      var X = n(Y);
      X.jEach(function(Z) {
        if (!G(W || []).contains(Z.id) && "loading" === Z.largeImgStateOfLoading) {
          Z.largeImgStateOfLoading = "notLoaded";
          Z.bigImage.abort()
        }
      })
    },
    getNext: function(Z, W) {
      W = W || false;
      if (!W && Z.globalGroup && !this.isTheOne(Z.globalGroup)) {
        W = true
      }
      var X = S && Z.globalGroup ? this.getGlobalThumbs(Z.globalGroup) : n(Z.group),
        Y = X.indexOf(Z) + 1;
      return (Y >= X.length) ? (!W || 1 >= X.length) ? undefined : X[0] : X[Y]
    },
    getPrev: function(Z, W) {
      W = W || false;
      if (!W && Z.globalGroup && !this.isTheOne(Z.globalGroup)) {
        W = true
      }
      var X = S && Z.globalGroup ? this.getGlobalThumbs(Z.globalGroup) : n(Z.group),
        Y = X.indexOf(Z) - 1;
      return (Y < 0) ? (!W || 1 >= X.length) ? undefined : X[X.length - 1] : X[Y]
    },
    getFirst: function(Z) {
      Z = Z || null;
      var Y = n(Z),
        X = undefined,
        W = -1;
      if (Y.length) {
        do {
          W++;
          X = Y[W]
        } while (X.withoutSelector && X != this)
      }
      return X
    },
    getLast: function(X) {
      X = X || null;
      var W = n(X);
      return (W.length) ? W[W.length - 1] : undefined
    },
    setupKeyboard: function() {
      var W = [],
        X = function(aa) {
          var Z, Y;
          for (Z = 0; Z < W.length; Z++) {
            if (aa === W[Z]) {
              Y = Z;
              break
            }
          }
          if (y.defined(Y)) {
            W.splice(Y, 1);
            X(aa)
          }
        };
      if (!this.keyboardFunction) {
        this.keyboardFunction = function(aa) {
          var Z, ab = ("switch" === this.option("selectorEffect") && !S),
            Y = (S && S.group === this.group);
          aa = G(aa);
          Z = aa.keyCode;
          if ("keydown" === aa.type) {
            if (!W.length) {
              switch (Z) {
                case 27:
                  if (Y) {
                    aa.stop();
                    S.restore()
                  }
                  break;
                case 39:
                  if (ab || Y) {
                    this.prevNext("next")
                  }
                  break;
                case 37:
                  if (ab || Y) {
                    this.prevNext("prev")
                  }
                  break
              }
            }
            W.push(Z)
          } else {
            X(Z)
          }
        }.jBind(this);
        y.doc.jAddEvent("keydown keyup", this.keyboardFunction)
      }
    },
    prevNext: function(Z) {
      var X = this.getRootInstance(this.group),
        Y, aa, W, ab = "next" === Z ? "getNext" : "getPrev";
      if (S) {
        Y = V[this.globalGroup || this.group].activeItem
      } else {
        Y = X.activeItem
      }
      W = (q || Y);
      do {
        W = Y[ab] ? Y[ab](W, W.option("loop")) : null
      } while (W && W.withoutSelector);
      if (!W || X.isUpdating) {
        return
      }
      W.checkButtonsLoop();
      if (S) {
        if ("expanded" === Y.state) {
          if (S === W) {
            h.hide();
            q = null
          } else {
            if (!G([Y.state, W.state]).contains("swapping")) {
              q = W;
              this.prepareSwitchItem(W, Y)
            }
          }
        }
      } else {
        if ("expand" !== this.option("selectorEffect")) {
          X.lastSwap = W;
          V[this.globalGroup || this.group].activeItem = W;
          if (B) {
            if (W.group === B.group && X.mainLoader) {
              X.mainLoader.hide()
            }
            B = null
          }
          if (X.mainLoader && B === W && "loaded" !== W.largeImgStateOfLoading) {
            X.mainLoader.show()
          } else {
            X.mainLoader.hide()
          }
          if ("loaded" === W.middleImgStateOfLoading) {
            Y.swap(W)
          } else {
            W.selector.jAddClass("item-loading");
            if (X.mainLoader) {
              X.mainLoader.show()
            }
          }
        }
      }
    },
    switchTo: function(Y) {
      var W, X, Z;
      if ("expand" !== this.option("selectorEffect")) {
        W = this.getRootInstance(this.group);
        if (Y || Y === 0) {
          Z = parseInt(Y);
          if (!isNaN(Z)) {
            Y = n(this.group)[Z];
            if (!Y) {
              W.isUpdating = false;
              return false
            }
            X = Y
          } else {
            if ("element" === y.jTypeOf(Y) || y.defined(Y = G(Y))) {
              X = Y.jFetch("thumb");
              if (this.group !== X.group) {
                return false
              }
            } else {
              W.isUpdating = false;
              return false
            }
          }
          if (X === this) {
            W.isUpdating = false;
            return false
          }
        } else {
          X = this
        }
        if (X.itemDeleted || G(X.selector).jHasClass("mgt-active")) {
          W.isUpdating = false;
          return false
        }
        if (S === X) {
          S.onClose();
          S = null
        }
        if (B) {
          if (X.group === B.group && W.mainLoader) {
            W.mainLoader.hide()
          }
          B = null
        }
        if (W.mainLoader && B === X && "loaded" !== X.largeImgStateOfLoading) {
          W.mainLoader.show()
        } else {
          W.mainLoader.hide()
        }
        if ("loaded" === X.middleImgStateOfLoading) {
          W.activeItem.swap(X)
        } else {
          X.jAddClass("item-loading");
          if (W.mainLoader) {
            W.mainLoader.show()
          }
        }
        return true
      }
      return false
    },
    filter: function(W) {
      W = G(G(W).map(function(X) {
        return G(X).jFetch("thumb")
      }));
      if (S) {
        S.onClose();
        S = null
      }
      s.jEach(function(X) {
        X.itemDeleted = false;
        if (X.selector) {
          X.selector.jRemoveClass("item-deleted");
          G(X.sameSelectors).jEach(function(Y) {
            G(Y).jRemoveClass("item-deleted")
          })
        }
      });
      W.jEach(function(Y) {
        var X = Y.getRootInstance(Y.group);
        if (Y == X.activeItem) {
          X.activeItem.switchTo(n(Y.group)[0].selector)
        }
      });
      W.jEach(function(X) {
        X.itemDeleted = true;
        if (X.selector) {
          X.selector.jAddClass("item-deleted");
          G(X.sameSelectors).jEach(function(Y) {
            G(Y).jAddClass("item-deleted")
          })
        }
      });
      return true
    }
  };
  var E = false,
    C = {
      version: "v3.0.19",
      options: {},
      start: function(aa, Y) {
        var Z = null,
          W = null,
          X = G([]);
        if (aa) {
          if ("string" === y.jTypeOf(aa)) {
            W = document.getElementById(aa)
          }
          W = G(aa);
          if (W && (" " + W.className + " ").match(/\sMagicThumb\s/)) {
            X.push(W)
          } else {
            return false
          }
        } else {
          if (y.browser.features.query) {
            X = G(y.$A(document.querySelectorAll("a.MagicThumb")))
          } else {
            X = G(y.$A(G(document.body).byTag("A")).filter(function(ab) {
              return ab.className.has("MagicThumb", " ")
            }))
          }
        }
        X.jEach(function(ad, ac) {
          if (Z = G(ad).jFetch("thumb")) {
            Z.start()
          } else {
            var ab = new y.Options(A);
            ab.fromJSON(window.mgtOptions || {});
            ab.fromJSON(window.MagicThumbOptions || {});
            ab.fromString(ad.getAttribute("data-options") || ad.getAttribute("rel") || "");
            if (y.browser.mobile) {
              ab.fromJSON(window.mgtMobileOptions || {});
              ab.fromJSON(window.MagicThumbMobileOptions || {});
              ab.fromString(ad.getAttribute("data-mobile-options") || "")
            }
            if (E || ab.get("autostart")) {
              new k(ad, ab)
            }
            if (ac === X.length - 1) {
              E = true
            }
          }
        });
        return true
      },
      stop: function(Y) {
        var W = null,
          X = [];
        if (Y) {
          if (G(Y) && (W = G(Y).jFetch("thumb"))) {
            W = W.getThumb(W.parentId || W.id).stop();
            return !!W
          }
        } else {
          X = s.filter(function(Z) {
            return !Z.parentId
          });
          while (X.length) {
            W = X[X.length - 1].stop();
            X.splice(X.indexOf(W), 1);
            W = undefined
          }
          return true
        }
        return false
      },
      refresh: function(X) {
        var W = null;
        if (X) {
          if (G(X)) {
            if (W = G(X).jFetch("thumb")) {
              W = this.stop(X);
              W = undefined
            }
            this.start.jDelay(150, X);
            return true
          }
          return false
        }
        this.stop();
        this.start.jDelay(150);
        return true
      },
      isReady: function(Y) {
        var X = G(Y),
          W = null;
        if (X && (W = X.jFetch("thumb"))) {
          return W.getThumb(W.parentId || W.id).isReady
        }
        return false
      },
      isLoad: function(Y) {
        var X = G(Y),
          W = null;
        if (X && (W = X.jFetch("thumb"))) {
          return W.getThumb(W.parentId || W.id).isLoad
        }
        return false
      },
      updateImages: function(aa, W, Y) {
        var Z = G(aa),
          X = null;
        if (Z && (X = Z.jFetch("thumb"))) {
          return X.getThumb(X.parentId || X.id).updateImg(W, Y)
        }
        return false
      },
      updateOptions: function(Z, W) {
        var Y = G(Z),
          X = null;
        if (Y && (X = Y.jFetch("thumb"))) {
          return X.getThumb(X.parentId || X.id).updateOptions(W)
        }
        return false
      },
      update: function(ab, W, Y, Z) {
        var aa = G(ab),
          X = null;
        if (aa && (X = aa.jFetch("thumb"))) {
          return X.getThumb(X.parentId || X.id).update(W, Y, Z)
        }
        return false
      },
      expand: function(X) {
        var W = null;
        if (G(X) && (W = G(X).jFetch("thumb"))) {
          W.expand(false);
          return true
        } else {
          return false
        }
      },
      close: function(X) {
        var W = null;
        if (G(X) && (W = G(X).jFetch("thumb"))) {
          W.restore();
          return true
        }
        return false
      },
      next: function(X) {
        var W = null;
        if (G(X) && (W = G(X).jFetch("thumb"))) {
          W.prevNext("next");
          return true
        }
        return false
      },
      prev: function(X) {
        var W = null;
        if (G(X) && (W = G(X).jFetch("thumb"))) {
          W.prevNext("prev");
          return true
        }
        return false
      },
      switchTo: function(Y, X) {
        var W = null;
        if (G(Y) && (W = G(Y).jFetch("thumb"))) {
          return W.switchTo(X)
        }
        return false
      },
      running: function(X) {
        var W = null;
        if (G(X) && (W = G(X).jFetch("thumb"))) {
          return W.isRunning()
        }
        return false
      },
      filter: function(W) {
        var X = null;
        if (!W || "array" !== y.jTypeOf(W)) {
          W = []
        }
        if (W[0]) {
          X = G(W[0]).jFetch("thumb")
        }
        if (!X) {
          X = s[0]
        }
        if (X) {
          return X.filter(W)
        }
        return false
      }
    };
  G(document).jAddEvent("domready", function() {
    y.defined(window.mgtOptions) || (window.mgtOptions = {});
    y.defined(window.mgtMobileOptions) || (window.mgtMobileOptions = {});
    y.defined(window.MagicThumbOptions) || (window.MagicThumbOptions = {});
    y.defined(window.MagicThumbMobileOptions) || (window.MagicThumbMobileOptions = {});
    x = (y.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches);
    L();
    H = y.$new("div", {
      "class": "magic-hidden-wrapper"
    }).append(y.$new("div", {}, {
      display: "none",
      visibility: "hidden"
    }).append(document.createTextNode(K())));
    i = y.$new("div", {
      "class": "mgt-expand-stage"
    }).jAppendTo(document.body);
    v = y.$new("div", {
      "class": "mgt-bg"
    }).jAppendTo(i);
    h = new T(G({
      withScroll: true,
      parent: i,
      css: {
        "z-index": 2147483646,
        position: "fixed",
        cssClass: "item-loading"
      }
    }));
    if (!y.browser.mobile) {
      G(i).jAddEvent("click", function(Y) {
        var X = Y.jGetPageXY(),
          W = U();
        if (W && (!W.videoType || !W.isPointInside(X.x, X.y))) {
          W.restore(null)
        }
      })
    }
    G(function() {
      var W = {};
      G(i).jAddEvent("mousescroll", function(X) {
        var Y = X.isMouse ? (X.deltaY / Math.abs(X.deltaY)) * 40 : X.deltaY;
        i.scrollTop += -1 * Y
      });
      G(i).jAddEvent("touchdrag", function(X) {
        if (X.state == "dragstart") {
          X.events[0].stopDefaults();
          W = {
            x: X.x,
            y: X.y,
            ts: X.timeStamp
          }
        } else {
          if ("dragmove" == X.state) {
            X.events[0].stopDefaults();
            i.scrollTop += (W.y - X.y)
          }
        }
      })
    })();
    C.start()
  });
  return C
})();
