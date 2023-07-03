const bodyParser = require("body-parser");
const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/sea_movie", {
  useNewUrlParser: true,
});

// Create a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  balance: Number
});

// Create a model
const User = new mongoose.model("User", userSchema);

// ejs
app.set("view engine", "ejs");

// Global Variabel
const apiURL = "https://seleksi-sea-2023.vercel.app/api/movies";
var logedIn = false;
var username = "";
var buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./signup.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`;

var secondHiddenLi = "";

var poster_url = "";
var title = "";
var age_rating = "";
var release_date = "";
var ticket_price = "";
var description = "";


// Home Page
app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  let buttonOrProfile = "";
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
                                <li><a class="dropdown-item" href="#"></a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="./login.ejs">Sign out</a></li>
                            </ul>
                        </div>`
    res.render("index", { secondHiddenLi: "", buttonOrProfile: buttonOrProfile });
  }
  else {
    buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./signup.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`
    res.render("index", { secondHiddenLi: "", buttonOrProfile: buttonOrProfile })
  }
});

app.post("/", function (req, res) {
  var count = 0;
  var buttonValue = req.body.details;
  console.log(`Button Value: ${buttonValue}`);
  fetch("https://seleksi-sea-2023.vercel.app/api/movies")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((movie) => {
        // console.log(`${count++} : ${movie.title} : ${buttonValue}`);
        if (movie.title == buttonValue) {

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


  // res.render("details", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile, poster_url: poster_url, title: title, age_rating: age_rating, release_date: release_date, ticket_price: ticket_price, description: description });


})

// Login Page
app.get("/login.ejs", function (req, res) {
  logedIn = false;
  username = "";
  buttonOrProfile = `<div class="col-md-2 text-end py-sm-3 py-lg-0">
                            <a href="./signup.ejs"><button type="button" class="btn signup px-5 py-3">JOIN US</button></a>
                        </div>`;

  secondHiddenLi = "";

  poster_url = "";
  title = "";
  age_rating = "";
  release_date = "";
  ticket_price = "";
  description = "";
  res.render("login", { incorrectCredential: "" });
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(function (userFound) {
    if (userFound) {
      if (userFound.password === password) {

        secondHiddenLi = "";

        // Tidy Up the Header
        let usernamaLength = userFound.username.length;
        console.log(usernamaLength);
        let userName = userFound.username;
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
                                <li><a class="dropdown-item" href="#"></a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
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
        res.render("login", { incorrectCredential: "incorrect username or password" });
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
      console.log(userFound);
      if (userFound) {
        res.render("signup", { emailWarn: "Email has been registered" });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          balance: 0
        });

        newUser
          .save()
          .then(function (savedUser) {
            console.log("User saved successfully:", savedUser);
            res.render("login", { incorrectCredential: "" });
          })
          .catch(function (err) {
            console.log("Error saving user: " + err);
            return res.status(500).send("Error: " + err.message);
          });
      }
    })
    .catch(function (err) {
      console.log("Error saving user: " + err);
      return res.status(500).send("Error: " + err.message);
    });
});

// Details page
app.get("/details.ejs", function (req, res) {
  let movieDetails = `    <div class="body-section">
        <div class="container col-xxl-8 px-4 py-4">
            <div class="row flex-lg-row align-items-start py-5">
                <div class="col-10 col-sm-8 col-lg-4 mb-md-3" style="text-align: start;">
                    <img src="`+ poster_url + `"
                        class="d-block mr-lg-auto img-fluid" alt="Bootstrap Themes" width="250" height="50"
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
                        <button type="button" class="btn book btn-lg px-4 me-md-2">Book Ticket</button>

                    </div>
                </div>
            </div>
        </div>
    </div>`
  res.render("details", { secondHiddenLi: secondHiddenLi, buttonOrProfile: buttonOrProfile, movieDetails: movieDetails });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});