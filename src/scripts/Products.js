// fetch("http://localhost:1337/api/products")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// https://fakestoreapi.com/products?limit=5

let globalData;

async function getProducts() {
  fetch("http://localhost:1337/api/products?populate=image")
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
        <p class="product__article">00` +
        element.id +
        `</p>
        <p class="product__discription"> ` +
        element.attributes.name +
        `</p>
    </div>

    <div class="product__info">
        <div class="weight">
            <img class="weight__icon" src="img/food-scale-tool.svg" alt="weight icon">
            <p class="weight__number">Масса: <span class="weight__number_accent"> ` +
        element.attributes.weight +
        `</span></p>
        </div>
        <div class="package">
            <img class="package__icon" src="img/package-icon.svg" alt="weight icon">
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

        <button class="action-btn" aria-lable="buy" aria-description="buy product">Купить</button>
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
            "http://localhost:1337" +
            element.attributes.url +
            `" alt="product image">`;
          item
            .querySelector(".product__carousel .swiper-wrapper")
            .appendChild(carouselItem);
        }
      });
    });

    initSlider();
  }
}

function createProductPage(element) {
  const productItem = document.getElementById("mainProduct");
  if (productItem) {
    productItem.replaceChildren();

    const product = document.createElement("article");
    product.classList.add("mainProduct__wrap");
    product.innerHTML =
      `<div class="product__carousel">
        <div class="swiper product__swiper">
            <button class="search" aria-label="scale image">
                <img src="./img/magnifying-glass.svg" alt="search icon">
            </button>
            <div class="swiper-wrapper">

            </div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
    <div class="mainProduct__discription">
                    <div class="mainProduct__type-wrap">
                        <p class="mainProduct__type">` +
      element.attributes.category +
      `</p>
                        <p class="mainProduct__article">Арт: 00` +
      element.id +
      `</p>
                    </div>

                    <h2 class="mainProduct__name">` +
      element.attributes.name +
      `</h2>
      <div class="mainProduct__infoList">
                        <div class="mainProduct-infoItem">
    <h3 class="mainProduct-infoItem__caption">Состав:</h3>
    <p class="mainProduct-infoItem__text">` +
      element.attributes.consist +
      `</p>
</div>

                        <div class="mainProduct-infoItem">
    <h3 class="mainProduct-infoItem__caption">Масса нетто:</h3>
    <p class="mainProduct-infoItem__text">` +
      element.attributes.weight +
      `г.</p>
</div>

                        <div class="mainProduct-infoItem">
    <h3 class="mainProduct-infoItem__caption">Энергетическая ценность:</h3>
    <p class="mainProduct-infoItem__text">` +
      element.attributes.calorie +
      ` Ккал.</p>
</div>

                        <div class="mainProduct-infoItem">
    <h3 class="mainProduct-infoItem__caption">Срок годности:</h3>
    <p class="mainProduct-infoItem__text">` +
      element.attributes.term +
      ` месяцев, с даты расфасовки (указана на упаковке)</p>
</div>
                    </div>
                    <div class="mainProduct__alert">
                    <div class="alert__icon">
                        <img src="img/exclamation point.svg" alt="exclamation point icon">
                    </div>

                    <p class="alert__text">` +
      element.attributes.keeping +
      `</p>
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

                        <button class="action-btn" aria-lable="order" aria-description="order product">Заказать</button>
                    </div>
                    </div>
    `;

    productItem.appendChild(product);

    element.attributes.image.data.forEach((element) => {
      const carouselItem = document.createElement("div");
      if (carouselItem) {
        carouselItem.classList.add("swiper-slide");
        carouselItem.innerHTML =
          `<img class="product__image" src="` +
          "http://localhost:1337" +
          element.attributes.url +
          `" alt="product image">`;
        productItem
          .querySelector(".product__carousel .swiper-wrapper")
          .appendChild(carouselItem);
      }
    });
    initSlider();
  }
}

getProducts();

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
    createProductPage(globalData.data[0]);
  } else {
    setTimeout(longPollCallback, 500);
  }
};
setTimeout(longPollCallback, 500);
