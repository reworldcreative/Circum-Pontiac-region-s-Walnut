import * as functions from "./modules/functions.js";

functions.isWebp();

$(document).ready(function () {
  if ($(".burger-btn")) {
    $(".burger-btn").click(function (event) {
      $(".burger-btn,.burger__menu").toggleClass("show");
    });
  }
});

// fetch("http://localhost:1337/api/products")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// https://fakestoreapi.com/products?limit=5

// async function getProducts() {
//   const productList = document.getElementById("product-list");
//   const item = document.createElement("li");
//   item.classList.add("productions__item");
//   fetch("http://localhost:1337/api/products?populate=image")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.data[0].attributes);

//       item.innerHTML =
//         `<article class="product">
// <div class="badge ` +
//         data.data[0].attributes.badge +
//         ` aria-label="Promotion: discount on goods">
//     <p class="badge__text">` +
//         data.data[0].attributes.badgeText +
//         `</p>
// </div>

// <div class="product__carousel">
//     <div class="swiper product__swiper">
//         <button class="search" aria-label="scale image">
//             <img src="img/magnifying-glass.svg" alt="search icon">
//         </button>
//         <div class="swiper-wrapper">
//             <div class="swiper-slide">
//                 <img class="product__image" src="` +
//         "http://localhost:1337" +
//         data.data[0].attributes.image.data[0].attributes.url +
//         `" alt="product image">
//             </div>
//             <div class="swiper-slide">
//                 <img class="product__image" src="` +
//         "http://localhost:1337" +
//         data.data[0].attributes.image.data[1].attributes.url +
//         `" alt="walnut image">
//             </div>
//         </div>

//         <div class="swiper-button-prev"></div>
//         <div class="swiper-button-next"></div>
//     </div>
// </div>

// <div class="product__content">
//     <div class="product__text">
//         <h3 class="product__title">` +
//         data.data[0].attributes.category +
//         `</h3>
//         <p class="product__article">0091</p>
//         <p class="product__discription"> ` +
//         data.data[0].attributes.name +
//         `</p>
//     </div>

//     <div class="product__info">
//         <div class="weight">
//             <img class="weight__icon" src="img/food-scale-tool.svg" alt="weight icon">
//             <p class="weight__number">Масса: <span class="weight__number_accent"> ` +
//         data.data[0].attributes.weight +
//         `</span></p>
//         </div>
//         <div class="package">
//             <img class="package__icon" src="img/package-icon.svg" alt="weight icon">
//             <p class="package__type">Упаковка <span class="package__type_accent">` +
//         data.data[0].attributes.packageType +
//         `</span></p>
//         </div>
//     </div>

//     <div class="product__price">
//         <div class="price">
//             <p class="price__number"><span class="price__number_text">Цена:</span><span
//                     class="price__number_accent price__number_from">` +
//         (data.data[0].attributes.from ? "от" : "") +
//         `</span> <span
//                     class="price__number_current">` +
//         data.data[0].attributes.currentPrice +
//         ` </span><span
//                     class="price__number_accent">` +
//         data.data[0].attributes.currency +
//         `</span>
//                 <span class="price__number_total">` +
//         data.data[0].attributes.price +
//         ` <span
//                         class="price__number_muted">` +
//         data.data[0].attributes.currency +
//         `</span></span>
//             </p>
//         </div>

//         <button class="action-btn" aria-lable="buy" aria-description="buy product">Купить</button>
//     </div>
// </div>
// </article>`;
//       productList.appendChild(item);
//     });
// }

// getProducts();

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

  $(".product__image").mouseleave(function () {
    for (let index = 0; index < $(".product__image").length; index++) {
      $(".product__image")[index].classList.remove("scale");
    }
  });
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

const productSwiper = new Swiper(".product__swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
});

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

// const video = document.querySelectorAll(".video-carousel");
// const slidesCount =
//   $(".video-carousel").find(".video-carousel__slide").length - 1;
// let currentSlide = 0;
// video.forEach((el) =>
//   el
//     .getElementsByClassName("video-carousel__button-next")[0]
//     .addEventListener("click", (event) => {
//       currentSlide++;
//       currentSlide = currentSlide > slidesCount ? 0 : currentSlide++;
//       console.log(currentSlide);
//     })
// );

// video.forEach((el) =>
//   el
//     .getElementsByClassName("video-carousel__button-prev")[0]
//     .addEventListener("click", (event) => {
//       currentSlide--;
//       currentSlide = currentSlide < 0 ? slidesCount : currentSlide--;
//       console.log(currentSlide);
//     })
// );
