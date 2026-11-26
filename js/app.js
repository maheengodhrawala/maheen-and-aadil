/**
 * Main Application Entry Point
 * Coordinates Tilda Zero Block artboards, interactive components, and analytics.
 */
(function () {
  "use strict";

  var ZERO_BLOCK_RECORDS = [
    "4227041103",
    "2487446093",
    "2487446103",
    "2487446153",
    "2487446163",
    "2487446183",
    "2487446223",
    "2487446253"
  ];

  function initArtboards() {
    if (typeof window.t_onReady !== "function" || typeof window.t_onFuncLoad !== "function") {
      return;
    }

    window.t_onReady(function () {
      window.t_onFuncLoad("t396_init", function () {
        ZERO_BLOCK_RECORDS.forEach(function (recId) {
          try {
            window.t396_init(recId);
          } catch (err) {
            // Continue initializing remaining artboards if one fails
          }
        });
      });
    });
  }

  function initTildaStat() {
    if (!window.mainTracker) {
      window.mainTracker = "tilda";
    }
    window.tildastatcookie = "no";

    setTimeout(function () {
      var firstScript = document.getElementsByTagName("script")[0];
      if (!firstScript || !firstScript.parentNode) return;

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.key = "aed5bb11e83b8f0989507efd8c6904b3";
      script.id = "tildastatscript";
      script.src = "https://static.tildacdn.net/js/tilda-stat-1.0.min.js";
      firstScript.parentNode.insertBefore(script, firstScript);
    }, 2000);
  }

  function bootstrap() {
    initArtboards();

    if (window.WeddingOverlay && typeof window.WeddingOverlay.init === "function") {
      window.WeddingOverlay.init();
    }
    if (window.WeddingCountdown && typeof window.WeddingCountdown.init === "function") {
      window.WeddingCountdown.init();
    }
    if (window.WeddingRsvp && typeof window.WeddingRsvp.init === "function") {
      window.WeddingRsvp.init();
    }

    initTildaStat();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
