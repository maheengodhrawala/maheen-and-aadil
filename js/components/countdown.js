/**
 * Wedding Countdown Timer Component
 * Counts down to January 16, 2027 at 16:00:00 local time.
 */
(function () {
  "use strict";

  function initCountdown() {
    var container = document.getElementById("countdownContainer");
    var elDays = document.getElementById("days");
    var elHours = document.getElementById("hours");
    var elMins = document.getElementById("minutes");
    var elSecs = document.getElementById("seconds");

    if (!container || !elDays || !elHours || !elMins || !elSecs) {
      return;
    }

    var eventDate = new Date(2027, 0, 16, 16, 0, 0);
    var prev = { days: null, hours: null, minutes: null, seconds: null };
    var revealed = false;
    var timerId = null;

    function flip(el, newVal) {
      if (el.textContent === newVal) return;
      el.classList.add("flip-out");
      setTimeout(function () {
        el.classList.remove("flip-out");
        el.classList.add("flip-in");
        el.textContent = newVal;
        void el.offsetHeight;
        el.classList.remove("flip-in");
      }, 520);
    }

    function tick() {
      var now = new Date();
      var dist = eventDate - now;

      if (dist < 0) {
        container.textContent = "See you there!";
        if (timerId !== null) {
          clearInterval(timerId);
          timerId = null;
        }
        return;
      }

      var d = String(Math.floor(dist / 86400000));
      var h = String(Math.floor((dist % 86400000) / 3600000)).padStart(2, "0");
      var m = String(Math.floor((dist % 3600000) / 60000)).padStart(2, "0");
      var s = String(Math.floor((dist % 60000) / 1000)).padStart(2, "0");

      if (d !== prev.days) {
        flip(elDays, d);
        prev.days = d;
      }
      if (h !== prev.hours) {
        flip(elHours, h);
        prev.hours = h;
      }
      if (m !== prev.minutes) {
        flip(elMins, m);
        prev.minutes = m;
      }
      if (s !== prev.seconds) {
        flip(elSecs, s);
        prev.seconds = s;
      }
    }

    function doReveal() {
      if (revealed) return;
      revealed = true;
      container
        .querySelectorAll(".number, .label, .separator")
        .forEach(function (el) {
          el.classList.add("revealed");
        });
    }

    tick();
    timerId = setInterval(tick, 1000);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries[0] && entries[0].isIntersecting) {
            doReveal();
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(container);
    } else {
      doReveal();
    }

    setTimeout(function () {
      var r = container.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        doReveal();
      }
    }, 200);
  }

  window.WeddingCountdown = { init: initCountdown };
})();
