const options = $(".option-tab li a");
const profileSection = $(".profile-information-section");
const ticketSection = $(".ticket-information-section");
const innerButtonSection = $(".inner-right-button-section");

for (let i = 0; i < options.length; i++) {
    $(options[i]).click(function () {
        for (let j = 0; j < options.length; j++) {
            $(options[j]).removeClass("active");
        }
        $(this).addClass("active");

        // options[0] is profile
        if (options[0].classList.contains("active")) {
            profileSection.removeClass("hide");
            innerButtonSection.removeClass("hide");
            ticketSection.addClass("hide");
        }

        // options[1] is ticket
        else if (options[1].classList.contains("active")) {
            profileSection.addClass("hide");
            innerButtonSection.addClass("hide");
            ticketSection.removeClass("hide");
        }
    })
}

const editProfileButton = $(".edit-profile-button");

editProfileButton.click(function () {
    $(".username-value").toggleClass("hide");
    $(".username-input").toggleClass("hide");
    $(".phone-value").toggleClass("hide");
    $(".phone-input").toggleClass("hide");
    $(".phone-row").toggleClass("margin-bottom-20px");
    $(".phone-format-text").toggleClass("hide");
    $(".age-value").toggleClass("hide");
    $(".age-input").toggleClass("hide");
    $(".edit-profile-button").toggleClass("hide");
    $(".top-up-button").toggleClass("hide");
    $(".update-button").toggleClass("hide");
    $(".cancel-button").toggleClass("hide");
    $(".withdraw-button").toggleClass("hide");

})

const cancelButton = $(".cancel-button");

cancelButton.click(function () {
    $(".username-value").toggleClass("hide");
    $(".username-input").toggleClass("hide");
    $(".phone-value").toggleClass("hide");
    $(".phone-input").toggleClass("hide");
    $(".phone-row").toggleClass("margin-bottom-20px");
    $(".phone-format-text").toggleClass("hide");
    $(".age-value").toggleClass("hide");
    $(".age-input").toggleClass("hide");
    $(".edit-profile-button").toggleClass("hide");
    $(".top-up-button").toggleClass("hide");
    $(".update-button").toggleClass("hide");
    $(".cancel-button").toggleClass("hide");
    $(".withdraw-button").toggleClass("hide");
});

const topUpModals = document.querySelector(".topUpModals")
const span2 = document.querySelector(".close2");

span2.addEventListener("click", function () {
    topUpModals.style.display = "none";
});

const topUpButton = $(".top-up-button");

topUpButton.click(function () {
    topUpModals.style.display = "block";
});

const withdrawModals = document.querySelector(".withdrawModals");
const span3 = document.querySelector(".close3");

span3.addEventListener("click", function () {
    withdrawModals.style.display = "none";
});

const withdrawButton = $(".withdraw-button");

withdrawButton.click(function () {
    withdrawModals.style.display = "block";
});

const withdrawErrorModals = document.querySelector(".withdrawErrorModals");
const span4 = document.querySelector(".close4");

span4.addEventListener("click", function () {
    withdrawErrorModals.style.display = "none";
});

// Input Nominal

const topUpNominal = document.getElementById("topUpNominal");

var rp = false

var countNum = 0
topUpNominal.addEventListener("keydown", function (event) {
    let key = event.key;
    let code = event.code;
    let first = topUpNominal.value == "" ? true : false;
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

const withdrawNominal = document.getElementById("withdrawNominal");

withdrawNominal.addEventListener("keydown", function (event) {
    let key = event.key;
    let code = event.code;
    let first = withdrawNominal.value == "" ? true : false;
    console.log(first);
    if (first) {
        if (code < 49 || code > 57) {
            event.preventDefault();
        }
        else if (key == "Backspace") {

        } else {
            event.preventDefault();
            withdrawNominal.value += "Rp" + key;
        }
    } else {
        if (code < 48 || code > 57) {
            event.preventDefault();
        } else if (key == "Backspace") {

        } else {
            event.preventDefault();
            withdrawNominal.value += key;
        }
    }
});
