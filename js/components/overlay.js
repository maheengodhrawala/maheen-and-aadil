/**
 * Opening Envelope Overlay, Video Transition & Background Music Controller
 * Preserves original interaction sequence and Samsung/Android audio unlock fix.
 */
(function () {
  "use strict";

  function initOverlay() {
    var overlay = document.getElementById("weiOverlay");
    var videoWrap = document.getElementById("weiVideoWrap");
    var video = document.getElementById("weiVideo");
    var audio = document.getElementById("weiAudio");
    var audioBtn = document.getElementById("weiAudioBtn");
    var iconPause = document.getElementById("weiIconPause");
    var iconPlay = document.getElementById("weiIconPlay");

    if (!overlay || !videoWrap || !video || !audio || !audioBtn) {
      return;
    }

    var done = false;
    var audioUnlocked = false;
    var sequenceEnded = false;

    // Non-muted audio.play() is not reliably accepted from a touchstart
    // gesture on Samsung Internet / Android Chrome. Prime audio silently
    // on first touch so it is unlocked for this session, then start on click.
    function unlockAudio() {
      if (audioUnlocked) return;
      audioUnlocked = true;
      try {
        var p = audio.play();
        if (p && typeof p.then === "function") {
          p.then(function () {
            audio.pause();
            audio.currentTime = 0;
          }).catch(function () {});
        } else {
          audio.pause();
        }
      } catch (err) {
        // Ignore autoplay prime restriction errors
      }
    }

    function startVideo() {
      if (done) return;
      done = true;

      // Fade out envelope
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(function () {
        overlay.style.display = "none";
      }, 600);

      // Show and play video
      videoWrap.classList.add("wei-video-in");
      try {
        video.playbackRate = 1.6;
        var vp = video.play();
        if (vp && typeof vp.catch === "function") vp.catch(function () {});
      } catch (err) {
        // Fallback if video playback fails
        endSequence();
      }

      // Start music simultaneously
      audio.volume = 1;
      try {
        var ap = audio.play();
        if (ap && typeof ap.catch === "function") ap.catch(function () {});
      } catch (err) {
        // Ignore autoplay restriction errors
      }
    }

    function endSequence() {
      if (sequenceEnded) return;
      sequenceEnded = true;

      // Fade out video
      videoWrap.classList.remove("wei-video-in");
      videoWrap.classList.add("wei-video-out");
      setTimeout(function () {
        videoWrap.style.display = "none";
      }, 600);

      // Show floating audio button
      audioBtn.style.visibility = "visible";
      audioBtn.style.opacity = "1";
    }

    function toggleAudio() {
      if (audio.paused) {
        var p = audio.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
        if (iconPlay) iconPlay.style.display = "none";
        if (iconPause) iconPause.style.display = "block";
        audioBtn.setAttribute("aria-pressed", "true");
      } else {
        audio.pause();
        if (iconPlay) iconPlay.style.display = "block";
        if (iconPause) iconPause.style.display = "none";
        audioBtn.setAttribute("aria-pressed", "false");
      }
    }

    // Accessibility attributes
    overlay.setAttribute("role", "button");
    overlay.setAttribute("tabindex", "0");
    overlay.setAttribute("aria-label", "Tap to open invitation");
    audioBtn.setAttribute("role", "button");
    audioBtn.setAttribute("tabindex", "0");
    audioBtn.setAttribute("aria-label", "Toggle background music");
    audioBtn.setAttribute("aria-pressed", "true");

    overlay.addEventListener("touchstart", unlockAudio, { passive: true });
    overlay.addEventListener("click", startVideo);
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startVideo();
      }
    });

    // Fade video 0.8s before end (with ended fallback)
    video.addEventListener("timeupdate", function () {
      if (
        video.duration &&
        video.currentTime >= video.duration - 0.8 &&
        !video.dataset.fading
      ) {
        video.dataset.fading = "1";
        endSequence();
      }
    });
    video.addEventListener("ended", endSequence);

    audioBtn.addEventListener("click", toggleAudio);
    audioBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleAudio();
      }
    });

    video.load();
  }

  window.WeddingOverlay = { init: initOverlay };
})();
