document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("jwt")) {
    const accessToken = localStorage.getItem("jwt");
    const [header, payload, signature] = accessToken.split(".");
    const decodedPayload = window.atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    // console.log(payloadObject.id);
    var uspath = pathToServer + "/api/users/" + payloadObject.id;
    async function getUser(path) {
      fetch(path)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          $("#name")[0].value = data.username;
          $("#email")[0].value = data.email;
          $("#phone")[0].phone = data.phone;
          var url = pathToServer + data.avatarLink;
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                $(".avata-img")[0].src = pathToServer + data.avatarLink;
                //   console.log('Файл існує!');
              } else {
                //   console.log('Файл не існує.');
              }
            }
          };
        });
    }
    getUser(uspath);

    var buttons = $('button[aria-lable="save"]');
    Array.from(buttons).forEach(function (button) {
      button.addEventListener("click", function () {
        const userId = payloadObject.id;
        const updatedUserData = {
          username: $("#name")[0].value,
          email: $("#email")[0].value,
          phone: $("#phone")[0].value,
        };

        const apiUrl = pathToServer + `/api/users/${userId}`;

        fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        })
          .then((response) => response.json())
          .then((updatedUser) => {
            console.log("Користувача оновлено:", updatedUser);
          })
          .catch((error) => {
            console.error(
              "Сталася помилка під час оновлення користувача:",
              error
            );
          });
      });
    });
  }
});
