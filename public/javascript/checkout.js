// Close button
const span1 = document.querySelector(".close1");
const modals = document.querySelector(".modal");

span1.addEventListener("click", function () {
    modals.style.display = "none";
});

const topUpModals = document.querySelector(".topUpModals")
const span2 = document.querySelector(".close2");

span2.addEventListener("click", function () {
    topUpModals.style.display = "none";
});

// Top up Button
const topup = document.querySelector(".topUpButton");

topup.addEventListener("click", function () {
    modals.style.display = "none";
    topUpModals.style.display = "block";
});

// Input Nominal

const topUpNominal = document.getElementById("topUpNominal");

var rp = false
var first = topUpNominal.value == "" ? true : false;
var countNum = 0
topUpNominal.addEventListener("keydown", function (event) {
    let key = event.key;
    let code = event.code;
    var first = topUpNominal.value == "" ? true : false;
    if (first) {
        if (code < 49 || code > 57) {
            event.preventDefault();
        }
        else if (key == "Backspace") {

        } else {
            event.preventDefault();
            topUpNominal.value += "Rp" + key;
        }
    } else {
        if (code < 48 || code > 57) {
            event.preventDefault();
        } else if (key == "Backspace") {

        } else {
            event.preventDefault();
            topUpNominal.value += key;
        }
    }
});








