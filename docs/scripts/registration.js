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

if ($(".avatar").length > 0) {
  const fileInput = document.getElementById("avatarFile");
  const avatarImg = document.getElementById("avatarImg");

  fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarImg.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
      avatarImg.classList.add("loaded");
    } else {
      avatarImg.src = "img/avatar.png";
      avatarImg.classList.remove("loaded");
    }
  });
}

// localStorage.clear();

if ($("#registration-btn")[0]) {
  $("#registration-btn")[0].addEventListener("click", (event) => {
    const registrationName = $("#name")[0].value;
    const registrationEmail = $("#email")[0].value;
    const registrationPhone = $("#phone")[0].value;

    const registrationCountry = $("#country")[0].value;
    const registrationArea = $("#area")[0].value;

    const registrationCity = $("#city")[0].value;
    const registrationAddress = $("#address")[0].value;

    const registrationPassword = $("#password")[0].value;
    const registrationConfirmPassword = $("#confirm-password")[0].value;
    const registrationIsFOP = $("#FOP")[0].checked;

    const registrationAvatar = $("#avatarFile")[0].files[0];
    // const registrationAvatar = $("#avatarImg")[0].src;
    const registrationAgree = $("#agree")[0].checked;

    if (
      registrationPassword == registrationConfirmPassword &&
      registrationPassword !== "" &&
      registrationConfirmPassword !== ""
    ) {
      $("#registration-errorPass-message").hide();

      if (registrationAgree) {
        $("#registration-errorAgree-message").hide();
        postData(
          "https://strapi-production-5725.up.railway.app/api/auth/local/register",
          {
            username: registrationName,
            email: registrationEmail,
            password: registrationPassword,
            country: registrationCountry,
            phone: registrationPhone,
            area: registrationArea,
            city: registrationCity,
            address: registrationAddress,
            isFOP: registrationIsFOP,
          }
        ).then((data) => {
          if (!data.error) {
            $("#registration-error-message").hide();
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.replace("cabinet.html");

            const jwtFromStorage = checkJwtInLocalStorage();
          } else {
            $("#registration-error-message").text(
              data.error.details.errors
                ? data.error.details.errors[0].message
                : data.error.message
            );
            $("#registration-error-message").show();
          }
        });
      } else {
        $("#registration-errorAgree-message").text(
          "необхідно поготитися з Условиями регистрации"
        );
        $("#registration-errorAgree-message").show();
      }
    } else {
      $("#registration-errorPass-message").text("паролі не співпадають");
      $("#registration-errorPass-message").show();
    }
  });
}

// postData("http://localhost:1337/api/auth/local/register", {
//   username: "Strapi user",
//   email: "user@user.com",
//   password: "test12345",
// }).then((data) => {
//   console.log(data);
// });
