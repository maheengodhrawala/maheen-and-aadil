/**
 * RSVP Popup Modal & Form Persistence Component
 * Initializes Tilda popup #rec2487446233, variant radiobuttons,
 * and preserves the email localStorage handler from the original site.
 */
(function () {
  "use strict";

  var POPUP_RECORD_ID = "2487446233";
  var RADIO_FIELD_ID = "1778524967946";

  function initRsvp() {
    if (typeof window.t_onReady !== "function" || typeof window.t_onFuncLoad !== "function") {
      return;
    }

    window.t_onReady(function () {
      window.t_onFuncLoad("t_loadJsFile", function () {
        window.t_loadJsFile(
          "https://static.tildacdn.net/js/tilda-variant-select-1.0.min.js",
          function () {
            window.t_onFuncLoad("t_input_radiobuttons_init", function () {
              try {
                window.t_input_radiobuttons_init(POPUP_RECORD_ID, RADIO_FIELD_ID);
              } catch (err) {
                // Radiobutton init fallback
              }
            });
          }
        );
      });

      window.t_onFuncLoad("t702_initPopup", function () {
        window.t702_initPopup(POPUP_RECORD_ID);
      });
    });

    // Save email to localStorage on form submit (recovered from original /custom.css script)
    var form = document.querySelector("#rec2487446233 form, form");
    if (form) {
      form.addEventListener("submit", function () {
        var emailInput = form.querySelector("input[name='email']");
        if (emailInput && emailInput.value) {
          try {
            window.localStorage.setItem("user_email", emailInput.value.trim());
          } catch (err) {
            // Ignore storage errors in restricted browsing modes
          }
        }
      });
    }
  }

  window.WeddingRsvp = { init: initRsvp };
})();
