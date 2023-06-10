if ($(".mainProduct-Info__item")) {
  $(".mainProduct-Info__item").click(function (el) {
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

var path =
  "https://strapi-production-5725.up.railway.app/api/products?populate=image";
async function getProducts(path) {
  fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      globalData = data;
    });
}

const productID = location.href.split("/").pop().split("?").pop().slice(2);

const CallbackPage = () => {
  if (globalData) {
    createProductPage(globalData.data[productID - 1]);
  } else {
    setTimeout(CallbackPage, 500);
  }
};
setTimeout(CallbackPage, 500);

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
                        <p class="mainProduct__article">Арт:` +
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
          "https://strapi-production-5725.up.railway.app" +
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
