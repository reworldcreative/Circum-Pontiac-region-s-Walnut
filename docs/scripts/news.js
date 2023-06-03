const newsSwiper = new Swiper(".news__carousel", {
  // slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".news-next",
    prevEl: ".news-prev",
  },

  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 1.5,
    },
    900: {
      slidesPerView: 2,
    },
    1300: {
      slidesPerView: 3,
    },
  },
});
