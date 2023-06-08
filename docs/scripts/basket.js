document.addEventListener("DOMContentLoaded", function () {
  var savedBasketData = localStorage.getItem("basketData");
  var deliveryValue = localStorage.getItem("deliveryValue");
  var paymentValue = localStorage.getItem("paymentValue");

  if (savedBasketData) {
    var basketData = JSON.parse(savedBasketData);

    var tableBody = document.querySelector(".order-table tbody");
    tableBody.innerHTML = `<th>
    <div class="order-table__header">
      <p class="order-table__caption">Товар</p>
      <img src="img/down-arrow.svg" alt="down arrow">
    </div>
  </th>
  <th>
    <div class="order-table__header">
      <p class="order-table__caption">Кол - во</p>
      <img src="img/down-arrow.svg" alt="down arrow">
    </div>
  </th>
  <th>
    <div class="order-table__header">
      <p class="order-table__caption">Цена за товар</p>
      <img src="img/down-arrow.svg" alt="down arrow">
    </div>
  </th>
  <th>
    <div class="order-table__header">
      <p class="order-table__caption">Итоговая стоимость</p>
      <img src="img/down-arrow.svg" alt="down arrow">
    </div>
  </th>`;

    basketData.forEach(function (item) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <td class="order-table__text">${item.name}</td>
        <td class="order-table__text">
          <div class="number-counter">
            <span class="minus">&lt;</span>
            <input type="text" value="${item.quantity}">
            <span class="plus">&gt;</span>
          </div>
        </td>
        <td class="order-table__text order-price">${item.priceNumber} грн.</td>
        <td class="order-table__text order-total">${item.price} грн.</td>
      `;
      tableBody.appendChild(row);
    });

    function uppdateTotalPrice() {
      var orderTableText = document.querySelectorAll(".order-total");
      var totalPrice = 0;

      orderTableText.forEach(function (element) {
        var priceText = element.textContent.trim();
        var price = parseFloat(priceText.replace(" грн.", ""));

        totalPrice += price;
      });
      var priceNumberElements = $(".price__number");

      priceNumberElements.each(function () {
        $(this).text(totalPrice.toFixed(2));
      });
    }

    uppdateTotalPrice();

    $(".number-counter .minus").click(function () {
      var countElement = $(this).siblings("input");
      var priceElement = $(this).closest("tr").find(".order-price");
      var totalElement = $(this).closest("tr").find(".order-total");

      var count = parseInt(countElement.val());
      var price = parseInt(priceElement.text());
      count = count > 1 ? count - 1 : 1;
      var total = count * price;

      countElement.val(count);
      totalElement.text(total + " грн.");
      uppdateTotalPrice();
    });

    $(".number-counter .plus").click(function () {
      var countElement = $(this).siblings("input");
      var priceElement = $(this).closest("tr").find(".order-price");
      var totalElement = $(this).closest("tr").find(".order-total");

      var count = parseInt(countElement.val());
      var price = parseInt(priceElement.text());

      var total = (count + 1) * price;

      totalElement.text(total + " грн.");
      uppdateTotalPrice();
    });
  }

  if (localStorage.getItem("jwt") !== null) {
    // JWT присутній
    const accessToken = localStorage.getItem("jwt");
    // const [header, payload, signature] = accessToken.split(".");
    // const decodedPayload = window.atob(payload);
    // const payloadObject = JSON.parse(decodedPayload);
    $(".order").css("display", "none");
    $("#order-btn").click(function () {
      const userJSON = localStorage.getItem("user");
      if (userJSON) {
        const user = JSON.parse(userJSON);
        const userEmail = user.email;
        const userName = user.username;
        const userId = user.id;
        const orderTotalPrice = $(
          ".order-table__bottom .second .price__number"
        )[0].textContent;
        const rows = document.querySelectorAll("tbody tr:not(:first-child)");
        const products = [];
        rows.forEach((row) => {
          const name = row.querySelector(
            ".order-table__text:first-child"
          ).textContent;
          const quantity = parseInt(
            row.querySelector("input[type='text']").value
          );
          const price = parseFloat(
            row.querySelector(".order-price").textContent
          );
          const totalPrice = parseFloat(
            row.querySelector(".order-total").textContent
          );

          const product = {
            name,
            quantity,
            price,
            totalPrice,
          };

          products.push(product);
        });

        if (rows.length > 0 ? true : false) {
          var requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              data: {
                customerEmail: userEmail,
                customerName: userName,
                totalPrice: orderTotalPrice,
                items: products,
                payment: paymentValue,
                delivery: deliveryValue,
                user: userId,
              },
            }),
          };
          fetch("http://localhost:1337/api/orders", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                $("#backet-succes").css("display", "block");
                $(".table__container").css("display", "none");
                localStorage.removeItem("basketData");
                localStorage.removeItem("basketPopupHTML");
                var basketPopup = document.querySelector(".basket__pop-up");
                basketPopup.innerHTML = `<div class="second" id="total-price">
        <div class="price">
            <p class="price__caption">Всего</p>
            <p class="price__number">0</p>
            <p class="price__currency">грн.</p>
        </div>
        <a href="basket.html" style="text-decoration: none;" class="action-btn" aria-lable="go to backet" aria-description="go to backet" type="button">Перейти в корзину</a>
        </div>`;
                $(".basket__count").text("0");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        console.log("Об'єкт користувача не знайдено в localStorage.");
      }
    });
  } else {
    $(".order").css("display", "block");
  }
});
