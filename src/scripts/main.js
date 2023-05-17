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
  document.getElementById("play-btn").onclick = function (event) {
    fadeImage(event);
  };

  function fadeImage(event) {
    document.getElementById("poster-image").style.zIndex = "0";
    document.getElementById("video").style.zIndex = "30";
  }
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
