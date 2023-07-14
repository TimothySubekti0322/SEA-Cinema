# SEA Movie Project

SEA Movie Project is a mini project created as a selection task for the compfest academy. This project was created by utilizing html, css, javascript, node.js, mongoDB, and ejs.

## Getting Started

first of all you need to have node.js installed on your computer.

Install all depedencies with npm. You need to go to root directory. then run this command below

```bash
  npm install
```

Next, Create a .env file that contains your personal database. Copy this code below, paste it on your .env file, change **YOUR_MONGODB_URL_HERE** with your MongoDB url and **YOUR_MONGODB_NAME_HERE** with your database name

```bash
  MONGO_LOCAL_URL=YOUR_MONGODB_URL_HERE
  MONGGO_DB_NAME=YOUR_MONGODB_NAME_HERE
```

then to run the website locally , you need to run this command below

```bash
  nodemon index.js
```

in case nodemon isn't installed yet , you can download the nodemon by run this command
```bash
  npm i -g nodemon
```

Now you can run the website by typing http://localhost:3000/ in your browser

## References

[Download mongoDB](https://www.mongodb.com/try/download/community)

[Tutorial Download mongoDB](https://youtu.be/gB6WLkSrtJk)
