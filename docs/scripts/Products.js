// fetch("http://localhost:1337/api/products")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// https://fakestoreapi.com/products?limit=5

let globalData;
let filter = "";
// var path = "http://localhost:1337/api/products?populate=image";
var path = pathToServer + "/api/products?populate=image";

// локальний - глобальний
//http://localhost:1337  =  https://strapi-production-5725.up.railway.app

//зростання цін
// http://localhost:1337/api/products?populate=image&sort=currentPrice

//спадання цін
// http://localhost:1337/api/products?populate=image&sort=currentPrice%3Adesc

//вибір за смаком
// http://localhost:1337/api/products?populate=image&filters[taste][$eqi]=sweet

async function getProducts(path) {
  fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      globalData = data;
    });
}

function createProductList(globalData) {
  const productList = document.getElementById("product-list");
  if (productList) {
    productList.replaceChildren();

    globalData.data.forEach((element) => {
      const item = document.createElement("li");
      item.classList.add("productions__item");
      item.innerHTML =
        `<article class="product">
<div class="badge ` +
        element.attributes.badge +
        ` aria-label="Promotion: discount on goods">
    <p class="badge__text">` +
        element.attributes.badgeText +
        `</p>
</div>

<div class="product__carousel">
    <div class="swiper product__swiper">
        <button class="search" aria-label="scale image">
            <img src="img/magnifying-glass.svg" alt="search icon">
        </button>
        <div class="swiper-wrapper">
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</div>

<div class="product__content">
    <div class="product__text">
        <h3 class="product__title">` +
        element.attributes.category +
        `</h3>
        <p class="product__article">Арт: ` +
        element.id +
        `</p>
        <a class="product-link" href="productPage.html` +
        "?id" +
        element.id +
        '"' +
        `>
        <p class="product__discription"> ` +
        element.attributes.name +
        `</p>
        </a>
    </div>

    <div class="product__info">
        <div class="weight">
            <img class="weight__icon" src="img/food-scale-tool.svg" alt="weight icon" style="
            width: 18px; height: 32px;">
            <p class="weight__number">Масса: <span class="weight__number_accent"> ` +
        element.attributes.weight +
        `</span></p>
        </div>
        <div class="package">
            <img class="package__icon" src="img/package-icon.svg" alt="weight icon" style="
            width: 12px; height: 34px;">
            <p class="package__type">Упаковка <span class="package__type_accent">` +
        element.attributes.packageType +
        `</span></p>
        </div>
    </div>

    <div class="product__price">
        <div class="price">
            <p class="price__number"><span class="price__number_text">Цена:</span><span
                    class="price__number_accent price__number_from">` +
        (element.attributes.from ? "от" : "") +
        `</span> <span
                    class="price__number_current">` +
        element.attributes.currentPrice +
        ` </span><span
                    class="price__number_accent">` +
        element.attributes.currency +
        `</span>
                <span class="price__number_total">` +
        (element.attributes.price ? element.attributes.price : "") +
        ` <span class="price__number_muted">` +
        (element.attributes.price ? element.attributes.currency : "") +
        `</span></span>
            </p>
        </div>

        <button class="action-btn" aria-label="buy" aria-description="buy product">Купить</button>
    </div>
</div>
</article>`;
      productList.appendChild(item);

      element.attributes.image.data.forEach((element) => {
        const carouselItem = document.createElement("div");
        if (carouselItem) {
          carouselItem.classList.add("swiper-slide");
          carouselItem.innerHTML =
            `<img class="product__image" src="` +
            pathToServer +
            // "https://strapi-production-5725.up.railway.app" +
            element.attributes.url +
            `" alt="product image" style="width: auto; height: 240px;">`;
          item
            .querySelector(".product__carousel .swiper-wrapper")
            .appendChild(carouselItem);
        }
      });
    });

    initSlider();
    addProducts();
  }
}

getProducts(path);
var basketData = [];
function addProducts() {
  Array.from($(".product .action-btn")).forEach((element) => {
    element.addEventListener("click", (event) => {
      var price;
      var productName;
      var weight;
      price = $(event.target.parentElement)
        .children(".price")
        .children(".price__number")
        .children(".price__number_current")
        .text();
      productName = $(event.target.parentElement)
        .siblings(".product__text")
        .children(".product-link")
        .children(".product__discription")
        .text();
      weight = $(event.target.parentElement)
        .siblings(".product__info")
        .children(".weight")
        .children(".weight__number")
        .children(".weight__number_accent")
        .text();

      const basket = $(".basket__pop-up");

      function createBasketElement(parent) {
        const item = document.createElement("ul");
        item.classList.add("basket__list");
        item.innerHTML =
          `
              <li class="basket__name">
                  <p class="basket__text">` +
          productName +
          " " +
          weight +
          ` </p>
              </li>
              <li>
                  <div class="number-counter">
                      <span class="minus">&lt;</span>
                      <input type="text" value="1">
                      <span class="plus">&gt;</span>
                  </div>
              </li>
  
              <li class="price visibility-hidden">
                  <p class="price-number">` +
          price +
          `</p>
              </li>
  
              <li class="price-amount">
                  <p class="basket__text">` +
          price +
          ` грн.</p>
              </li>
  
              <li>
                  <button class="close-btn" aria-label="delete element"><span class="close-btn__icon" aria-hidden="true">X</span></button>
              </li>
        `;
        parent.insertBefore(item, parent.firstChild);

        var numberCounter = item.querySelector(".number-counter");
        var input = numberCounter.querySelector("input");

        function minusClick() {
          var count = parseInt(input.value) - 1;
          count = count < 1 ? 1 : count;
          input.value = count;
          updatePriceAmount(count);
          updatePrice();

          var basketPopup = document.querySelector(".basket__pop-up");
          localStorage.setItem("basketPopupHTML", basketPopup.innerHTML);

          var basketListItems = basketPopup.querySelectorAll(".basket__list");
          var basketData = [];

          basketListItems.forEach(function (item) {
            var name = item
              .querySelector(".basket__name .basket__text")
              .textContent.trim();
            var quantity = parseInt(
              item.querySelector(".number-counter input").value
            );
            var price = parseFloat(
              item
                .querySelector(".price-amount .basket__text")
                .textContent.trim()
            );
            var priceNumber = parseFloat(
              item.querySelector(".price .price-number").textContent.trim()
            );

            basketData.push({
              name: name,
              quantity: quantity,
              price: price,
              priceNumber: priceNumber,
            });
          });

          localStorage.setItem("basketData", JSON.stringify(basketData));
        }

        function plusClick() {
          var count = parseInt(input.value) + 1;
          input.value = count;
          updatePriceAmount(count);
          updatePrice();

          var basketPopup = document.querySelector(".basket__pop-up");
          localStorage.setItem("basketPopupHTML", basketPopup.innerHTML);

          var basketListItems = basketPopup.querySelectorAll(".basket__list");
          var basketData = [];
          basketListItems.forEach(function (item) {
            var name = item
              .querySelector(".basket__name .basket__text")
              .textContent.trim();
            var quantity = parseInt(
              item.querySelector(".number-counter input").value
            );
            var price = parseFloat(
              item
                .querySelector(".price-amount .basket__text")
                .textContent.trim()
            );
            var priceNumber = parseFloat(
              item.querySelector(".price .price-number").textContent.trim()
            );

            basketData.push({
              name: name,
              quantity: quantity,
              price: price,
              priceNumber: priceNumber,
            });
          });

          localStorage.setItem("basketData", JSON.stringify(basketData));
        }

        var minusButton = numberCounter.querySelector(".minus");
        var plusButton = numberCounter.querySelector(".plus");
        function updatePriceAmount(count) {
          var price = parseInt(item.querySelector(".price-number").textContent);
          var amountElement = item.querySelector(".price-amount .basket__text");
          amountElement.textContent = price * count + " грн.";
        }
        minusButton.addEventListener("click", minusClick);
        plusButton.addEventListener("click", plusClick);
        updatePrice();

        $(".close-btn").on("click", function () {
          var index = $(this).closest(".basket__list").index();
          $(this)
            .closest(".basket__pop-up")
            .find(".basket__list")
            .eq(index)
            .remove();

          var basketPopUp = $(".basket__pop-up");
          var basketCount = $(".basket__count");
          $(basketCount[0]).text(basketPopUp[0].childElementCount - 1);

          var basketPopup = document.querySelector(".basket__pop-up");
          localStorage.setItem("basketPopupHTML", basketPopup.innerHTML);
        });

        Array.from($(".basket__count")).forEach((element) => {
          var basketPopUp = $(".basket__pop-up");
          var basketCount = $(".basket__count");
          $(basketCount[0]).text(basketPopUp[0].childElementCount - 1);
        });
      }

      Array.from(basket).forEach((element) => {
        createBasketElement(element);
      });

      var basketPopup = document.querySelector(".basket__pop-up");

      localStorage.setItem("basketPopupHTML", basketPopup.innerHTML);

      var name = $(".basket__name .basket__text")[0].textContent.trim();
      var quantity = parseInt($(".number-counter input")[0].value);
      var price = parseFloat(
        $(".price-amount .basket__text")[0].textContent.trim()
      );
      var priceNumber = parseFloat(
        $(".price .price-number")[0].textContent.trim()
      );

      basketData.push({
        name: name,
        quantity: quantity,
        price: price,
        priceNumber: priceNumber,
      });

      localStorage.setItem("basketData", JSON.stringify(basketData));
    });
  });
}

addProducts();

function initSlider() {
  const productSwiper = new Swiper(".product__swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  });

  if ($(".product__image")) {
    $(".product__image").mouseleave(function () {
      for (let index = 0; index < $(".product__image").length; index++) {
        $(".product__image")[index].classList.remove("scale");
      }
    });
  }
}

const longPollCallback = () => {
  if (globalData) {
    // console.log(globalData);
    createProductList(globalData);
    // createProductPage(globalData.data[0]);
  } else {
    setTimeout(longPollCallback, 500);
  }
};
setTimeout(longPollCallback, 500);

const productSwiper = new Swiper(".product__swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
});

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

if ($(".cost").length > 0) {
  $(".cost")[0].addEventListener("click", (event) => {
    $(".cost-down")[0].classList.toggle("active");
    $(".cost-up")[0].classList.toggle("active");
    if ($(".cost-down")[0].classList.contains("active")) {
      // path =
      //   "http://localhost:1337/api/products?populate=image&sort=currentPrice%3Adesc";
      filter = filter.replace("&sort=currentPrice", "");
      filter = filter + "&sort=currentPrice%3Adesc";
    } else if ($(".cost-up")[0].classList.contains("active")) {
      // path =
      //   "http://localhost:1337/api/products?populate=image&sort=currentPrice";
      filter = filter.replace("&sort=currentPrice%3Adesc", "");
      filter = filter + "&sort=currentPrice";
    }

    path = pathToServer + "/api/products?populate=image" + filter;
    getProducts(path);
    setTimeout(() => {
      longPollCallback();
    }, 500);
  });
}

if ($(".clear-button").length > 0) {
  $(".clear-button")[0].addEventListener("click", (event) => {
    $(".taste").val("");
    $(".mass").val("");
    $(".cost-down")[0].classList.remove("active");
    $(".cost-up")[0].classList.add("active");

    path = pathToServer + "/api/products?populate=image";
    getProducts(path);
    setTimeout(() => {
      longPollCallback();
    }, 500);
  });
}

if ($("#applySort").length > 0) {
  $("#applySort")[0].addEventListener("click", (event) => {
    // if ($("#tasteSelect")[0].value) {
    //   path =
    //     "http://localhost:1337/api/products?populate=image&filters[taste][$eqi]=" +
    //     $("#tasteSelect")[0].value;
    // }

    if ($("#tasteSelect")[0].value) {
      filter = "&filters[taste][$eqi]=" + $("#tasteSelect")[0].value;
    }

    if ($("#massSelect")[0].value == 1) {
      // path =
      //   "http://localhost:1337/api/products?populate=image&filters[weight][$lt]=40";
      filter = filter + "&filters[weight][$lt]=40";
    } else if ($("#massSelect")[0].value == 2) {
      // path =
      //   "http://localhost:1337/api/products?populate=image&filters[weight][$gte]=40";
      filter = filter + "&filters[weight][$gte]=40";
    }

    path = pathToServer + "/api/products?populate=image" + filter;
    getProducts(path);
    setTimeout(() => {
      longPollCallback();
    }, 500);
  });
}
