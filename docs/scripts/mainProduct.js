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
