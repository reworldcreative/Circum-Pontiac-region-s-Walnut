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
