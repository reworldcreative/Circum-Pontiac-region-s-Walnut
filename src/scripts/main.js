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
