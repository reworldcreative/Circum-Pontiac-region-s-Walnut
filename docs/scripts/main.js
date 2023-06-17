// import {isWebp} from "./modules/functions.js";
// functions.isWebp();

// import { counter } from "./counter.js";
const jwtFromStorage = localStorage.getItem("jwt");
var pathToServer = "https://strapi-production-5725.up.railway.app";
// var pathToServer = "http://localhost:1337";

function isWebp() {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector("html").classList.add("webp");
    } else {
      document.querySelector("html").classList.add("no-webp");
    }

    // let className = support === true ? 'webp' : 'no-webp';
    // document.documentElement.classList.add(className);
  });
}

isWebp();

function updatePrice() {
  $(".basket__pop-up").each(function () {
    var totalPrice = 0;
    var $priceAmounts = $(this).find(".price-amount");

    $priceAmounts.each(function () {
      var price =
        parseInt(
          $(this).children(".basket__text").text().replace(" грн.", "")
        ) || 0;
      totalPrice += price;
    });

    var $priceNumber = $(this).find(".price__number");
    $priceNumber.text(totalPrice);
  });
}

function counter() {
  var price;

  function minusClick() {
    price = $(this.parentElement.parentElement)
      .siblings(".price")
      .children(".price-number")
      .text();
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    $(this.parentElement.parentElement)
      .siblings(".price-amount")
      .children(".basket__text")
      .text(price * $input.val() + "грн.");
    updatePrice();
    return false;
  }

  function plusClick() {
    price = $(this.parentElement.parentElement)
      .siblings(".price")
      .children(".price-number")
      .text();
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    $(this.parentElement.parentElement)
      .siblings(".price-amount")
      .children(".basket__text")
      .text(price * $input.val() + "грн.");
    updatePrice();
    return false;
  }

  $(".number-counter .minus").each(function () {
    $(this).click(minusClick);
  });

  $(".number-counter .plus").each(function () {
    $(this).click(plusClick);
  });
}
// localStorage.clear();
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

  var savedBasketPopupHTML = localStorage.getItem("basketPopupHTML");

  if (savedBasketPopupHTML) {
    var existingBasketPopup = document.querySelector(".basket__pop-up");
    existingBasketPopup.innerHTML = savedBasketPopupHTML;

    Array.from($(".basket__count")).forEach((element) => {
      var basketPopUp = $(".basket__pop-up");
      var basketCount = $(".basket__count");
      $(basketCount[0]).text(basketPopUp[0].childElementCount - 1);
    });

    Array.from($(".close-btn")).forEach((element) => {
      element.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.parentElement.remove();
        updatePrice();
      });
    });
  }

  var savedBasketData = localStorage.getItem("basketData");
  if (savedBasketData) {
    var basketData = JSON.parse(savedBasketData);
    var basketListItems = document.querySelectorAll(".basket__list");

    basketListItems.forEach(function (item, index) {
      var quantityInput = item.querySelector(".number-counter input");
      quantityInput.value = basketData[index].quantity;
    });
  }

  counter();
});

function countTotal() {
  if ($("$total-price")) {
    $("$total-price").text();
  }
}

if ($(".basket")) {
  Array.from($(".basket")).forEach((element) => {
    element.addEventListener("click", (event) => {
      updatePrice();
      // $(".basket__pop-up")[0].classList.toggle("show");
      Array.from($(".basket__pop-up")).forEach((element) => {
        element.classList.toggle("show");
      });
    });
  });

  Array.from($(".close-btn")).forEach((element) => {
    element.addEventListener("click", (event) => {
      event.target.parentElement.parentElement.parentElement.remove();
      updatePrice();
    });
  });
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return await response.json();
}

function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

// Завантаження стилів після першого відображення сторінки
window.addEventListener("load", function () {
  loadCSS("https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css");
  loadCSS(
    "https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@400;500;600;700;800;900&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,600&family=Roboto:wght@400;500;700;900&display=swap"
  );
});
