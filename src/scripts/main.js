import * as functions from "./modules/functions.js";

functions.isWebp();

$(document).ready(function () {
  if ($(".burger-btn")) {
    $(".burger-btn").click(function (event) {
      $(".burger-btn,.burger__menu").toggleClass("show");
    });
  }
});

if (document.getElementById("play-btn")) {
  // document.getElementById("play-btn").onclick = function (event) {
  //   fadeImage(event);
  // };

  // function fadeImage(event) {
  //   document.getElementById("poster-image").style.zIndex = "0";
  //   document.getElementById("video").style.zIndex = "30";
  // }

  const video = document.querySelectorAll(".video__button");

  video.forEach((el) =>
    el.addEventListener("click", (event) => {
      event.currentTarget.parentElement.parentElement.getElementsByTagName(
        "iframe"
      )[0].style.zIndex = "40";
    })
  );
}

if ($(".search")) {
  $(".search").click(function (target) {
    // target.currentTarget.parentElement.id
    $(
      "#" +
        target.currentTarget.parentElement.getElementsByTagName("div")[0].id +
        " " +
        ".swiper-slide-active .product__image"
    ).toggleClass("scale");
  });

  $(".product__image").mouseleave(function () {
    for (let index = 0; index < $(".product__image").length; index++) {
      $(".product__image")[index].classList.remove("scale");
    }
  });
}

const productSwiper = new Swiper(".product__swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const videoSwiper = new Swiper(".video__carousel", {
  slidesPerView: "auto",
  navigation: {
    nextEl: ".video__swiper-button-next",
    prevEl: ".video__swiper-button-prev",
  },
  // effect: "slide",
});

const newsSwiper = new Swiper(".news__carousel", {
  // slidesPerView: 3,
  navigation: {
    nextEl: ".news-next",
    prevEl: ".news-prev",
  },

  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 1.5,
    },
    900: {
      slidesPerView: 2,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});
