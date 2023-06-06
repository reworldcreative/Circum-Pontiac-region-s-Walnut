document.addEventListener("DOMContentLoaded", function (event) {
  if (jwtFromStorage) {
    window.location.replace("cabinet.html");
  }
});

if ($("#loginButton").length > 0) {
  $("#loginButton")[0].addEventListener("click", (event) => {
    postData("http://localhost:1337/api/auth/local", {
      identifier: $("#emailAddress")[0].value,
      password: $("#Password")[0].value,
    }).then((data) => {
      if (!data.error) {
        localStorage.setItem("jwt", data.jwt);
        window.location.replace("cabinet.html");
        const jwtFromStorage = checkJwtInLocalStorage();
      } else {
        $("#error-message").text("Невірні дані");
        $("#error-message").show();
      }
    });
  });
}

function checkJwtInLocalStorage() {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    return jwt;
  }
  return null; // JWT не знайдено
}

//   email: "user@user.com",
//   password: "test12345",
