document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("jwt") !== null) {
    const accessToken = localStorage.getItem("jwt");

    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      const userEmail = user.email;
      const userName = user.username;
      //   const userId = user.id;
      const userPhone = user.phone;
      const userAddress = user.address;

      $("#name")[0].value = userName;
      $("#email")[0].value = userEmail;
      $("#phone")[0].value = userPhone;
      $("#address")[0].value = userAddress;
    }
  }
  $("#order-delivery")[0].addEventListener("click", (event) => {
    window.location.assign("basket.html");

    const delivery = document.getElementsByName("Post");
    var deliveryValue;
    for (var i = 0; i < delivery.length; i++) {
      if (delivery[i].checked) {
        deliveryValue = delivery[i].value;
        break;
      }
    }

    const payment = document.getElementsByName("payment");
    var paymentValue;
    for (var i = 0; i < payment.length; i++) {
      if (payment[i].checked) {
        paymentValue = payment[i].value;
        break;
      }
    }

    localStorage.setItem("deliveryValue", deliveryValue);
    localStorage.setItem("paymentValue", paymentValue);
  });
});
