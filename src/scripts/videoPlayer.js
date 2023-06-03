if (document.getElementById("play-btn")) {
  const video = document.querySelectorAll(".video__button");

  video.forEach((el) =>
    el.addEventListener("click", (event) => {
      event.currentTarget.parentElement.parentElement.getElementsByTagName(
        "iframe"
      )[0].style.zIndex = "40";
    })
  );
}
