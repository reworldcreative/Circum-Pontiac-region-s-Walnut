if ($(".pay-tabs-navigation__item")) {
  $(".pay-tabs-navigation__item").click(function (el) {
    console.log(el.currentTarget.getAttribute("name"));

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("pay-tabs__item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("pay-tabs-navigation__item");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(
      el.currentTarget.getAttribute("name")
    ).style.display = "flex";

    el.currentTarget.className += " active";
  });
}
