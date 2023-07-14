const modalsSeatError = document.querySelector('.modalsSeatError');
const span1 = document.querySelector(".close1");

span1.addEventListener("click", function () {
    modalsSeatError.style.display = "none";
});

// var numTicket = $("#num-ticket")[0].innerText.slice(18, 19);

// $(".seat-btn").clik(function () {
//     if (numTicket == 6) {
//         // modalsSeatError.style.display = "block";
//         alert("You've reached maximum number of tickets that can be booked at a time.");
//     }
//     else {
//         modalsSeatError.style.display = "none";
//     }
// });