if ($(".video__carousel").length > 0) {
  const videoSwiper = new Swiper(".video__carousel", {
    // slidesPerView: "auto",

    navigation: {
      nextEl: ".video__swiper-button-next",
      prevEl: ".video__swiper-button-prev",
    },
    // effect: "slide",
  });
}

(function (window) {
  "use strict";

  window.code = window.code || {};

  window.code.lightweightYoutubePlayer = function () {
    var dataYoutubeVideos = "[data-youtube]";

    var youtubeVideos = [...document.querySelectorAll(dataYoutubeVideos)];

    function init() {
      youtubeVideos.forEach(function (element) {
        bindYoutubeVideoEvent(element);
      });
    }

    function bindYoutubeVideoEvent(element) {
      var button = element.querySelector("[data-youtube-button]");

      button.addEventListener("click", createIframe);
    }

    function createIframe(event) {
      var url = event.target.dataset.youtubeButton;
      var youtubePlaceholder = event.target.parentNode;

      var htmlString =
        '<div class="video__youtube"> <iframe class="video__iframe" src="' +
        url +
        '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

      youtubePlaceholder.style.display = "none";
      youtubePlaceholder.insertAdjacentHTML("beforebegin", htmlString);
      youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
    }

    return {
      init: init,
    };
  };
})(window);

function ready() {
  var lightweightYoutubePlayer = new code.lightweightYoutubePlayer();

  if (document.readyState != "loading") {
    page.init();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      lightweightYoutubePlayer.init
    );
  }
}

ready();
