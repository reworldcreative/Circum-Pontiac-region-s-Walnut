import * as functions from "./modules/functions.js";

functions.isWebp();

$(document).ready(function () {
  if ($(".burger-btn")) {
    $(".burger-btn").click(function (event) {
      $(".burger-btn,.burger__menu").toggleClass("show");
    });
  }

  if ($(".menu__list")) {
    $(".menu__list")[0]
      .querySelectorAll(".menu__item")
      .forEach((el) => {
        el.classList.remove("active");
      });
    const pageNmae = location.href.split("/").pop().split(".").shift();
    if ($(".menu__list #" + pageNmae)[0]) {
      $(".menu__list #" + pageNmae)[0].classList.add("active");
    }
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

// window.addEventListener("load", (event) => {
//   console.log("page is fully loaded");
// });

if ($(".search")) {
  $(document).on("click", ".search", function (target) {
    // $(".search").click(function (target) {
    // target.currentTarget.parentElement.id
    $(
      "#" +
        target.currentTarget.parentElement.getElementsByTagName("div")[0].id +
        " " +
        ".swiper-slide-active .product__image"
    ).toggleClass("scale");
  });

  if ($(".product__image")) {
    $(".product__image").mouseleave(function () {
      for (let index = 0; index < $(".product__image").length; index++) {
        $(".product__image")[index].classList.remove("scale");
      }
    });
  }
}

if ($(".tabs-navigation__item")) {
  $(".tabs-navigation__item").click(function (el) {
    console.log(el.currentTarget.getAttribute("name"));

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabs__item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabs-navigation__item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(
      el.currentTarget.getAttribute("name")
    ).style.display = "flex";

    el.currentTarget.className += " active";
  });
}

if ($(".pay-tabs-navigation__item")) {
  $(".pay-tabs-navigation__item").click(function (el) {
    console.log(el.currentTarget.getAttribute("name"));

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("pay-tabs__item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("pay-tabs-navigation__item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(
      el.currentTarget.getAttribute("name")
    ).style.display = "flex";

    el.currentTarget.className += " active";
  });
}

if ($(".mainProduct-Info__item")) {
  $(".mainProduct-Info__item").click(function (el) {
    console.log(el.currentTarget.getAttribute("name"));

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab__item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("mainProduct-Info__item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(
      el.currentTarget.getAttribute("name")
    ).style.display = "flex";

    el.currentTarget.className += " active";
  });
}

if (document.getElementById("legalPerson")) {
  document.getElementById("legalPerson").addEventListener("click", (event) => {
    // console.log($(".naturalPerson__dop")[0]);
    $(".naturalPerson__dop")[0].style.display = "none";
    $(".legalPerson__dop")[0].style.display = "block";
  });
}

if (document.getElementById("naturalPerson")) {
  document
    .getElementById("naturalPerson")
    .addEventListener("click", (event) => {
      // console.log($(".naturalPerson__dop")[0]);
      $(".naturalPerson__dop")[0].style.display = "block";
      $(".legalPerson__dop")[0].style.display = "none";
    });
}

if ($("#FOP-radio")[0]) {
  $("#FOP-radio")[0].addEventListener("change", (event) => {
    $(".legalPerson__dop_legal")[0].style.display = "none";
    $(".legalPerson__dop_FOP")[0].style.display = "block";
  });
}

if ($("#legalPerson-radio")[0]) {
  $("#legalPerson-radio")[0].addEventListener("change", (event) => {
    $(".legalPerson__dop_FOP")[0].style.display = "none";
    $(".legalPerson__dop_legal")[0].style.display = "block";
  });
}

const videoSwiper = new Swiper(".video__carousel", {
  // slidesPerView: "auto",

  navigation: {
    nextEl: ".video__swiper-button-next",
    prevEl: ".video__swiper-button-prev",
  },
  // effect: "slide",
});

const newsSwiper = new Swiper(".news__carousel", {
  // slidesPerView: 3,
  spaceBetween: 30,
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

const productSwiper = new Swiper(".product__swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
});
