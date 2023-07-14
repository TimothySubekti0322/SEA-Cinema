const bodyParser = require("body-parser");
const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = 3000;
const md5 = require('md5');
require('dotenv').config()

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { render } = require("ejs");


const mongo_url = process.env.MONGO_URL + process.env.MONGGO_DB_NAME;
// Connect to MongoDB
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
});

// Create a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  balance: Number,
  phone: { type: String, default: "-" },
  age: Number
});

const bookingHistorySchema = new mongoose.Schema({
  username: String,
  email: String,
  movie_title: String,
  date: String,
  location: String,
  showtime: String,
  quantity: Number,
  seat: [String],
  total: Number
});

const cinemaSchema = new mongoose.Schema({
  movie_title: String,
  date: String,
  location: String,
  showtime: String,
  seatUsed: [String]
});

// Create a model
const User = new mongoose.model("User", userSchema);
const Cinema = new mongoose.model("Cinema", cinemaSchema);
const BookingHistory = new mongoose.model("BookingHistory", bookingHistorySchema);

// ejs
app.set("view engine", "ejs");

// Global Variabel
const apiURL = "https://seleksi-sea-2023.vercel.app/api/movies";
var logedIn = false;
var username = "";
var email = "";
var phone = "-";
var balance = 0;
var password = "";
var age = 0;
var buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./login.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`;

var secondHiddenLi = "";
var listTicket = "";
var numTicket = 0;

var poster_url = "";
var title = "";
var age_rating = "";
var release_date = "";
var ticket_price = "";
var description = "";

var date = "";
var location = "";
var showtime = "";
var total = 0;
var ticketSelected = 0;
var seatSelected = [];
var totalWithTax = 0;

var dateEmpty = "";
var locationEmpty = "";

var A1 = "";
var A2 = "";
var A3 = "";
var B1 = "";
var B2 = "";
var B3 = "";
var C1 = "";
var C2 = "";
var C3 = "";

var A1type = "submit";
var A2type = "submit";
var A3type = "submit";
var B1type = "submit";
var B2type = "submit";
var B3type = "submit";
var C1type = "submit";
var C2type = "submit";
var C3type = "submit";

var modalsError = "display: none;";
var modalsTopUp = "display: none;";
var modalsWithdraw = "display: none;";
var modalsWithdrawError = "display: none;";
var modalsSeatError = "display: none;";
var withdrawErrorMessage = "";
var modalsUnderAge = "display: none;";

// Home Page
app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  let buttonOrProfile = "";
  total = 0;
  ticketSelected = 0;
  seatSelected = [];
  dateEmpty = "";
  locationEmpty = "";
  A1 = ""; A2 = ""; A3 = ""; B1 = ""; B2 = ""; B3 = ""; C1 = ""; C2 = ""; C3 = "";
  totalWithTax = 0;
  modalsError = "display: none;";
  modalsTopUp = "display: none;";
  modalsWithdraw = "display: none;";
  modalsWithdrawError = "display: none;";
  withdrawErrorMessage = "";
  modalsSeatError = "display: none;";
  modalsUnderAge = "display: none;";

  if (logedIn) {
    buttonOrProfile = `<div class="dropdown text-end">
                            <a href="#" class="d-block text-decoration-none dropdown-toggle" id="dropdownUser1"
                                data-bs-toggle="dropdown" aria-expanded="false" style="color: white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                    class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                <p style="display: inline">`+ username + `</p>
                            </a>
                            <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="./profile.ejs">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="./login.ejs">Sign out</a></li>
                            </ul>
                        </div>`
    res.render("index", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile });
  }
  else {
    buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./login.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`
    res.render("index", { secondHiddenLi: "", buttonOrProfile: buttonOrProfile })
  }
});

app.post("/", function (req, res) {
  var count = 0;
  var buttonValue = req.body.details;
  if (buttonValue.slice(0, 9) === "buyTicket") {
    if (!logedIn) {
      res.redirect("/login.ejs");
    }
    else {
      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((movie) => {
            // console.log(`${count++} : ${movie.title} : ${buttonValue}`);
            if (movie.title == buttonValue.slice(10,)) {
              poster_url = movie.poster_url;
              title = movie.title;
              age_rating = movie.age_rating;
              release_date = movie.release_date;
              release_date = release_date.slice(0, 4);
              ticket_price = movie.ticket_price;
              description = movie.description;
            }
          })
          res.redirect("/buyTicket.ejs");
        }).catch((err) => console.log(`An error occurred: ${err}`));
    }
  }

  else {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((movie) => {
          // console.log(`${count++} : ${movie.title} : ${buttonValue}`);
          if (movie.title == buttonValue.slice(8,)) {

            poster_url = movie.poster_url;
            title = movie.title;
            age_rating = movie.age_rating;
            release_date = movie.release_date;
            release_date = release_date.slice(0, 4);
            ticket_price = movie.ticket_price;
            description = movie.description;
          }
        })
        res.redirect("/details.ejs");
      }).catch((err) => console.log(`An error occurred: ${err}`));

  }
})

// Login Page
app.get("/login.ejs", function (req, res) {
  logedIn = false;
  username = "";
  email = "";
  balance = "";
  buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./login.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`;

  secondHiddenLi = "";
  phone = "-";

  // poster_url = "";
  // title = "";
  // age_rating = "";
  // release_date = "";
  // ticket_price = "";
  // description = "";
  res.render("login", { incorrectCredential: "" });
});

app.post("/login", function (req, res) {
  email = req.body.email;
  emailWarning = "";
  const password = md5(req.body.password);
  User.findOne({ email: email }).then(function (userFound) {
    if (userFound) {
      if (userFound.password === password) {

        secondHiddenLi = "";
        balance = userFound.balance;
        age = userFound.age;

        // Tidy Up the Header
        let usernamaLength = userFound.username.length;
        let userName = userFound.username;
        phone = userFound.phone;
        if (usernamaLength > 15) {
          userName = userName.slice(0, 13) + "..";
        }
        else if (usernamaLength < 15) {
          for (let i = 1; i <= (15 - usernamaLength); i++) {
            secondHiddenLi += "a";
          }
        }
        buttonOrProfile = `<div class="dropdown text-end">
                            <a href="#" class="d-block text-decoration-none dropdown-toggle" id="dropdownUser1"
                                data-bs-toggle="dropdown" aria-expanded="false" style="color: white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                    class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                <p style="display: inline">` + userName + `</p>
                            </a>
                            <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="./profile.ejs">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="./login.ejs">Sign out</a></li>
                            </ul>
                        </div>`
        username = userName;
        res.render("index", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile });
        logedIn = true;
      }
      else {
        res.render("login", { incorrectCredential: "incorrect password" });
      }
    }
    else {
      res.render("login", { incorrectCredential: "incorrect username or password" });
    }
  }).catch(function (err) {
    console.log("Error: " + err);
    return res.status(500).send("Error: " + err.message);
  })
});

// Signup Page
app.get("/signup.ejs", function (req, res) {
  res.render("signup", { emailWarn: "" });
});

app.post("/signup", function (req, res) {
  User.findOne({ email: req.body.email })
    .then(function (userFound) {
      // console.log(userFound);
      if (userFound) {
        res.render("signup", { emailWarn: "Email has been registered" });
      } else {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;
        balance = 0;

        res.redirect("/ageVerification.ejs");
      }
    })
    .catch(function (err) {
      console.log("Error saving user: " + err);
      return res.status(500).send("Error: " + err.message);
    });
});

app.get("/ageVerification.ejs", function (req, res) {
  res.render("ageVerification");
});

app.post("/ageVerification.ejs", function (req, res) {
  const newUser = new User({
    username: username,
    email: email,
    password: md5(password),
    balance: balance,
    age: req.body.age,
  });

  newUser.save().then(function (user) {
    console.log("New user created: " + user);
  }).catch((err) => {
    console.log("Error saving user: " + err);
    return res.status(500).send("Error: " + err.message);
  });

  username = "";
  email = "";
  password = "";
  balance = 0;
  age = 0;

  res.redirect("/login.ejs");
});

// Details page
app.get("/details.ejs", function (req, res) {
  modalsUnderAge = "display: none;";
  let movieDetails = `    <form action="/details.ejs" method="POST"><div class="body-section">
        <div class="container col-xxl-8 px-4 py-4">
            <div class="row flex-lg-row align-items-start py-5">
                <div class="col-10 col-sm-8 col-lg-4 mb-md-3" style="text-align: start;">
                    <img src="`+ poster_url + `"
                        class="d-block mr-lg-auto img-fluid" alt="Bootstrap Themes" width="250" height="75"
                        loading="lazy">
                </div>
                <div class="col-lg-8">
                    <h2 class="display-5 fw-bold lh-1 mb-3">`+ title + `</h2>
                    <div class="container my-5">
                        <div class="row">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-person-fill" viewBox="0 18 18">
                                    <path
                                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                                <text style="margin-left: 4px;">`+ age_rating + `+</text>
                            </div>
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-calendar-date" viewBox="0 0 18 18">
                                    <path
                                        d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                    <path
                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>
                                <text style="margin-left: 4px;">` + release_date + `</text>
                            </div>
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-cash" viewBox="0 0 18 18">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    <path
                                        d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                                </svg>
                                <text style="margin-left: 4px;">`+ ticket_price + `</text>
                            </div>
                        </div>
                    </div>
                    <p class="lead mb-5">`+ description + `</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="submit" name="buyTicket" value="buyTicket" class="btn book btn-lg px-4 me-md-2">Book Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    </div></form>`
  res.render("details", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile, movieDetails: movieDetails });
});

app.post("/details.ejs", function (req, res) {

  if (!logedIn) {
    res.redirect("/login.ejs");
  }
  else {
    res.redirect("/buyTicket.ejs");
  }

});

// About Me page

app.get("/about.ejs", function (req, res) {
  res.render("about", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile });
});


// Buy Ticket
app.get("/buyTicket.ejs", function (req, res) {
  let movieDetails = `          <img src="` + poster_url + `"
                                    class="movie-image" />

                                <h4 class="movie-title">`+ title + `</h4>
                                <br class="br40" />
                                <img src="images/person-fill.svg" class="svg" />
                                <text style="margin-left: 4px;">`+ age_rating + `+</text>
                                <br class="br40" />
                                <img src="images/calendar3.svg" class="svg" />
                                <text style="margin-left: 4px;">` + release_date + `</text>
                                <br class="br40" />
                                <img src="images/cash.svg" class="svg" />
                                <text style="margin-left: 4px;">`+ ticket_price + `</text>`

  res.locals.secondHiddenLi = secondHiddenLi;
  res.locals.buttonOrProfile = buttonOrProfile;
  res.locals.movieDetails = movieDetails;
  res.locals.dateEmpty = dateEmpty;
  res.locals.locationEmpty = locationEmpty;
  res.locals.modalsUnderAge = modalsUnderAge;
  res.locals.age_rating = age_rating;

  A1 = ""; A2 = ""; A3 = ""; B1 = ""; B2 = ""; B3 = ""; C1 = ""; C2 = ""; C3 = "";
  A1type = "submit"; A2type = "submit"; A3type = "submit"; B1type = "submit";
  B2type = "submit"; B3type = "submit"; C1type = "submit"; C2type = "submit";
  C3type = "submit";

  date = ""; location = ""; showtime = "";

  total = 0; ticketSelected = 0;

  res.render("buyTicket");
})

app.post("/buyTicket.ejs", function (req, res) {
  date = req.body.date;
  location = req.body.location;
  showtime = req.body.showtime;
  if (age < age_rating) {
    modalsUnderAge = "display: block;";
    res.redirect("/buyTicket.ejs");
  }
  else {
    if (location === "Choose" && date === "") {
      dateEmpty = `<i style="color: red;">Choose the Date</i>`;
      locationEmpty = `<i style="color: red;">Choose the Location</i>`;
      res.redirect("/buyTicket.ejs");
    }
    else if (location === "Choose") {
      locationEmpty = `<i style="color: red;">Choose the Location</i>`;
      res.redirect("/buyTicket.ejs");
    }
    else if (date === "") {
      dateEmpty = `<i style="color: red;">Choose the Date</i>`;
      res.redirect("/buyTicket.ejs");
    }
    else {
      dateEmpty = "";
      locationEmpty = "";
      modalsSeatError = "display: none;"
      // console.log("Masuk buyTicket Post");
      res.redirect("/seatPlan.ejs");
    }
  }

});

// Seat Plan
app.get("/seatPlan.ejs", async function (req, res) {

  var seatUsedArray = [];

  let cinema = await getCinemaData(title, date, location, showtime, seatUsedArray);
  if (cinema) {
    seatUsedArray = cinema.seatUsed;
  }


  console.log(`seatUsedArray2: ${seatUsedArray}`);
  console.log(`seatUsedArray.length: ${seatUsedArray.length}`);
  if (seatUsedArray.length > 0) {
    seatUsedArray.forEach((element) => {
      if (element === "A1") {
        console.log("A1 jadi Red dan Jadi button");
        A1 = "red";
        A1type = "button";
      }
      else if (element === "A2") {
        A2 = "red";
        A2type = "button";
      }
      else if (element === "A3") {
        A3 = "red";
        A3type = "button";
      }
      else if (element === "B1") {
        B1 = "red";
        B1type = "button";
      }
      else if (element === "B2") {
        B2 = "red";
        B2type = "button";
      }
      else if (element === "B3") {
        B3 = "red";
        B3type = "button";
      }
      else if (element === "C1") {
        C1 = "red";
        C1type = "button";
      }
      else if (element === "C2") {
        C2 = "red";
        C2type = "button";
      }
      else if (element === "C3") {
        C3 = "red";
        C3type = "button";
      }
    })
  }
  res.locals.A1 = A1;
  res.locals.A2 = A2;
  res.locals.A3 = A3;
  res.locals.B1 = B1;
  res.locals.B2 = B2;
  res.locals.B3 = B3;
  res.locals.C1 = C1;
  res.locals.C2 = C2;
  res.locals.C3 = C3;
  res.locals.A1type = A1type;
  res.locals.A2type = A2type;
  res.locals.A3type = A3type;
  res.locals.B1type = B1type;
  res.locals.B2type = B2type;
  res.locals.B3type = B3type;
  res.locals.C1type = C1type;
  res.locals.C2type = C2type;
  res.locals.C3type = C3type;
  res.locals.secondHiddenLi = secondHiddenLi;
  res.locals.buttonOrProfile = buttonOrProfile;
  res.locals.title = title;

  const formatedDate = new Date(date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  res.locals.date = formatedDate;
  res.locals.location = location;
  res.locals.showtime = showtime;
  res.locals.total = numberToCurrency(total);
  res.locals.ticketSelected = ticketSelected;
  res.locals.modalsSeatError = modalsSeatError;

  res.render("seatPlan");
});

app.post("/seatPlan.ejs", function (req, res) {
  if (ticketSelected === 6) {
    if (req.body.seat !== "confirm") {
      modalsSeatError = "display: block;";
      res.redirect("/seatPlan.ejs");
    }
  }
  if (((ticketSelected === 6) && (req.body.seat === "confirm")) || (ticketSelected < 6)) {
    if (req.body.seat === "A1") {
      if (A1 === "") {
        A1 = "yellow";
        seatSelected.push("A1");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        A1 = "";
        seatSelected.pop("A1");
        total -= ticket_price;
        ticketSelected -= 1;
      }

    }
    else if (req.body.seat === "A2") {
      if (A2 === "") {
        A2 = "yellow";
        seatSelected.push("A2");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        A2 = "";
        seatSelected.pop("A2");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "A3") {
      if (A3 === "") {
        A3 = "yellow";
        seatSelected.push("A3");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        A3 = "";
        seatSelected.pop("A3");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "B1") {
      if (B1 === "") {
        B1 = "yellow";
        seatSelected.push("B1");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        B1 = "";
        seatSelected.pop("B1");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "B2") {
      if (B2 === "") {
        B2 = "yellow";
        seatSelected.push("B2");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        B2 = "";
        seatSelected.pop("B2");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "B3") {
      if (B3 === "") {
        B3 = "yellow";
        seatSelected.push("B3");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        B3 = "";
        seatSelected.pop("B3");
        total -= ticket_price;
        ticketSelected -= 1;
      }

    }
    else if (req.body.seat === "C1") {
      if (C1 === "") {
        C1 = "yellow";
        seatSelected.push("C1");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        C1 = "";
        seatSelected.pop("C1");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "C2") {
      if (C2 === "") {
        C2 = "yellow";
        seatSelected.push("C2");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        C2 = "";
        seatSelected.pop("C2");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "C3") {
      if (C3 === "") {
        C3 = "yellow";
        seatSelected.push("C3");
        total += ticket_price;
        ticketSelected += 1;
      }
      else {
        C3 = "";
        seatSelected.pop("C3");
        total -= ticket_price;
        ticketSelected -= 1;
      }
    }
    else if (req.body.seat === "confirm") {
      modalsSeatError = "display: none;";
      res.redirect("/checkout.ejs")
    }
    // console.log(seatSelected);
    modalsSeatError = "display: none;"
    res.redirect("/seatPlan.ejs");
  }
});

// checkout page
app.get("/checkout.ejs", function (req, res) {
  res.locals.secondHiddenLi = secondHiddenLi;
  res.locals.buttonOrProfile = buttonOrProfile;
  res.locals.poster_url = poster_url;
  res.locals.movie_title = title;
  res.locals.location = location;

  const formatedDate = new Date(date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  res.locals.date = formatedDate;
  res.locals.showtime = showtime;
  res.locals.ticketSelected = ticketSelected;
  res.locals.seatSelected = seatSelected;
  res.locals.price = numberToCurrency(total);

  const tax = total * 0.1;
  res.locals.tax = numberToCurrency(tax);

  totalWithTax = total + tax;
  res.locals.totalWithTax = numberToCurrency(totalWithTax);


  res.locals.balance = numberToCurrency(balance);

  res.locals.modalsError = modalsError;
  res.locals.modalsTopUp = modalsTopUp;

  res.render("checkout");
});

app.post("/checkout.ejs", function (req, res) {
  const button = req.body.button;
  if (button === "pay") {
    if (balance < totalWithTax) {
      modalsError = "display: block;";
      res.redirect("/checkout.ejs");
    }
    else {

      // Urusan dengan Database
      // put Code Here.....
      const newBookingHistory = new BookingHistory({
        username: username,
        email: email,
        movie_title: title,
        location: location,
        date: date,
        showtime: showtime,
        quantity: ticketSelected,
        seat: seatSelected,
        total: totalWithTax
      })

      // Masukin ke Booking History
      newBookingHistory.save().then(function (savedBookingHistory) {
        console.log("savedBookingHistory", savedBookingHistory);
      }).catch((err) => console.log(err));

      // Masukin ke Cinema
      const query = {
        movie_title: title,
        date: date,
        location: location,
        showtime: showtime
      };

      var cinemaFound = false;
      var theCinema = null;

      Cinema.findOne(query).then(function (cinema) {
        // console.log("Find the Cinema");
        // console.log("cinema: ", cinema);
        if (cinema) {
          theCinema = cinema;
          cinemaFound = true;
        }
        else {
          console.log("Cinema Not Found");
        }
      }).catch((err) => console.log(err));

      if (cinemaFound) {
        const newSeatUsed = theCinema.seatUsed.concat(seatSelected);
        Cinema.updateOne(query, { $set: { seatUsed: newSeatUsed } }).then(function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("success Update Seat Used in Cinema");
          }
        }).catch((err) => console.log(err));
      }

      else {
        const newCinema = new Cinema({
          movie_title: title,
          date: date,
          location: location,
          showtime: showtime,
          seatUsed: seatSelected
        });

        newCinema.save().then(function (savedCinema) {
          console.log("savedCinema: ", savedCinema);
        }).catch((err) => console.log(err));
      }



      // Update Balance User
      const newBalance = balance - totalWithTax;

      User.updateOne({ email: email }, { $set: { balance: newBalance } }).then(function (err) {
        if (err) {
          console.log(err);
        }
      }).catch((err) => console.log(err));

      balance = newBalance;

      // Reset
      date = ""; location = ""; showtime = ""; total = 0; ticketSelected = 0;
      seatSelected = []; totalWithTax = 0; dateEmpty = ""; locationEmpty = "";
      A1 = ""; A2 = ""; A3 = ""; B1 = ""; B2 = ""; B3 = ""; C1 = ""; C2 = ""; C3 = "";
      A1type = "submit"; A2type = "submit"; A3type = "submit"; B1type = "submit";
      B2type = "submit"; B3type = "submit"; C1type = "submit"; C2type = "submit";
      C3type = "submit"; modalsError = "display: none;"; modalsTopUp = "display: none;";
      res.redirect("/success.ejs");
    };
  }
  else if (button === "topUp") {
    const newBalance = Number(req.body.nominal.slice(2)) + balance;
    balance = newBalance;
    User.updateOne({ email: email }, { balance: newBalance }).then(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        balance = newBalance;
      }
    }).catch((err) => console.log(err));
    modalsTopUp = "display: none;";
    modalsError = "display: none;";
    res.redirect("/checkout.ejs");
  };
});

// success page
app.get("/success.ejs", function (req, res) {
  res.locals.balance = numberToCurrency(balance);
  res.render("success");
});


// Profile Page
app.get("/profile.ejs", async function (req, res) {
  if (!logedIn) {
    res.redirect("/login.ejs");
  }
  else {
    numTicket = 0;
    listTicket = [];
    res.locals.username = username;
    res.locals.email = email;
    res.locals.phone = phone;
    res.locals.balance = numberToCurrency(balance);
    res.locals.age = age;

    listTicket = await BookingHistory.find({ email: email });
    numTicket = listTicket.length;

    res.locals.numTicket = numTicket;
    res.locals.listTicket = listTicket;
    res.locals.modalsTopUp = modalsTopUp;
    res.locals.modalsWithdraw = modalsWithdraw;
    res.locals.modalsWithdrawError = modalsWithdrawError;
    res.locals.withdrawErrorMessage = withdrawErrorMessage;
    res.render("profile", { numberToMonth, formatDate });
  }
});

app.post("/profile.ejs", function (req, res) {
  const button = req.body.button;
  console.log("button: ", button);
  if (button === "update-profile") {
    const newUserName = req.body.username;
    const newPhone = req.body.phone;
    const newAge = req.body.age;
    User.updateOne({ email: email }, { username: newUserName, phone: newPhone, age: newAge }).then(function (err) {
      if (err) {
        console.log(err);
      }
    }).catch((err) => console.log(err));

    username = newUserName;
    phone = newPhone;
    age = newAge;
    console.log("username: ", username);
    console.log("phone: ", phone);
    console.log("age: ", age);

    res.redirect("/profile.ejs");
  }
  else if (button === "topUp") {
    const newBalance = Number(req.body.nominal.slice(2)) + balance;
    balance = newBalance;
    User.updateOne({ email: email }, { balance: newBalance }).then(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        balance = newBalance;
      }
    }).catch((err) => console.log(err));
    modalsTopUp = "display: none;";
    // alert('Balance updated')
    res.redirect("/profile.ejs");
  }
  else if (button === "withdraw") {
    const nominalWithdraw = Number(req.body.nominalWithdraw.slice(2));
    console.log("nominalWithdraw: ", nominalWithdraw);
    console.log("balance: ", balance);
    if ((nominalWithdraw <= balance) && (nominalWithdraw <= 500000)) {
      const newBalance = balance - nominalWithdraw;
      balance = newBalance;
      User.updateOne({ email: email }, { balance: newBalance }).then(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          balance = newBalance;
        }
      }).catch((err) => console.log(err));
      modalsWithdraw = "display: none;";
      modalsWithdrawError = "display: none;";
      withdrawErrorMessage = "";
      res.redirect("/profile.ejs");
    }
    else if (nominalWithdraw > balance) {
      modalsWithdrawError = "display: block;";
      withdrawErrorMessage = "Insufficient balance";
      res.redirect("/profile.ejs");
    }
    else if (nominalWithdraw > 500000) {
      modalsWithdrawError = "display: block;";
      withdrawErrorMessage = "Maximum withdraw is Rp. 500.000";
      res.redirect("/profile.ejs");
    }
  }
});

app.listen(process.env.PORT || port, function () {
  console.log(`App listening on port ${port}!`);
});

// Function
function numberToCurrency(number) {
  var numString = number.toString();
  var result = "";
  for (let i = numString.length - 1; i >= 0; i--) {
    if ((numString.length - i) % 3 === 0 && i !== 0) {
      result = "," + numString[i] + result;
    }
    else {
      result = numString[i] + result;
    }
  }
  return result;
}

async function getCinemaData(title, date, location, showtime) {
  try {
    const cinema = await Cinema.findOne({ movie_title: title, date: date, location: location, showtime: showtime });
    // console.log("INSIDE getCinemaData , seatUsed: ", cinema.seatUsed);
    return cinema;
  }
  catch (err) {
    console.log(err);
  }
}

function numberToMonth(number) {
  switch (number) {
    case 1:
      return "January";
      break;
    case 2:
      return "February";
      break;
    case 3:
      return "March";
      break;
    case 4:
      return "April";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "June";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "August";
      break;
    case 9:
      return "September";
      break;
    case 10:
      return "October";
  }
}

function formatDate(date) {
  const formatedDate = new Date(date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );
  return formatedDate;
}