document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("jwt")) {
    const accessToken = localStorage.getItem("jwt");
    const [header, payload, signature] = accessToken.split(".");
    const decodedPayload = window.atob(payload);
    const payloadObject = JSON.parse(decodedPayload);

    getProducts(payloadObject.id);
  }
});

async function getProducts(id) {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    console.log("JWT не знайдено");
    return;
  }

  try {
    const response = await fetch(
      `https://strapi-production-5725.up.railway.app/api/users/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const tbody = $(".cabinet-table")[0];

      data.orders.forEach((rowData) => {
        const publishedAt = rowData.publishedAt;
        const date = new Date(publishedAt);
        function formatDate(date) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
          }.${year}`;
        }
        const publishedDate = formatDate(date);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="cabinet-table__text">${rowData.id}</td>
          <td class="cabinet-table__text">${publishedDate}</td>
          <td class="cabinet-table__text">${rowData.items.length}</td>
          <td class="cabinet-table__text">${rowData.statys}</td>
          <td class="cabinet-table__text">${rowData.totalPrice} грн.</td>
          <td>
            <div class="cabinet-table__buttons">
              <button class="cabinet-table__button detaile-button"><img src="img/eye.svg" alt="eye icon"></button>
              <button class="cabinet-table__button"><img src="img/copy.svg" alt="copy icon"></button>
            </div>
          </td>
        `;

        tbody.appendChild(row);
      });
    } else {
      console.log("Помилка запиту:", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}
