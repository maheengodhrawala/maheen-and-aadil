/**
 * Dual-Location Switcher Component (Nikkah & Dinner)
 * Switches venue title, address, architectural illustration, and Google Map embed
 * while preserving the exact original Location section layout.
 */
(function () {
  "use strict";

  var VENUES = {
    nikkah: {
      name: "Sarkhej Roza Dargah",
      address: "Address: Makarba Ta.City, Ahmedabad",
      image:
        "https://static.tildacdn.net/tild3637-3939-4864-a263-333836383139/ChatGPT_Image_May_25.png",
      mapSrc:
        "https://maps.google.com/maps?q=22.9957866,72.5052793+(Sarkhej+Roza+Dargah)&z=17&output=embed"
    },
    dinner: {
      name: "Gandhi Hall",
      address: "Address: Sarkhej Road, Ahmedabad",
      image: "assets/images/reception-hall.svg",
      mapSrc:
        "https://maps.google.com/maps?q=22.9917875,72.5186578+(Gandhi+Community+Hall)&z=17&output=embed"
    }
  };

  function initLocationSwitcher() {
    var tabs = document.querySelectorAll(".location-tab-btn");
    var nameEl = document.querySelector(
      '#rec2487446153 .tn-elem[data-elem-id="1772804808869"] .tn-atom'
    );
    var addrEl = document.querySelector(
      '#rec2487446153 .tn-elem[data-elem-id="1772813480591000001"] .tn-atom'
    );
    var imgEl = document.querySelector(
      '#rec2487446153 .tn-elem[data-elem-id="1782312310182000001"] img'
    );
    var mapFrame = document.querySelector("#rec2487446163 iframe");

    if (!tabs.length || !nameEl || !addrEl || !imgEl || !mapFrame) {
      return;
    }

    function selectVenue(key) {
      var venue = VENUES[key];
      if (!venue) return;

      tabs.forEach(function (btn) {
        var active = btn.getAttribute("data-venue") === key;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });

      nameEl.textContent = venue.name;
      addrEl.textContent = venue.address;

      imgEl.style.display = "";
      imgEl.setAttribute("data-original", venue.image);
      imgEl.src = venue.image;

      if (mapFrame.getAttribute("src") !== venue.mapSrc) {
        mapFrame.setAttribute("src", venue.mapSrc);
      }
    }

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectVenue(btn.getAttribute("data-venue"));
      });
    });
  }

  window.WeddingLocation = { init: initLocationSwitcher };
})();
