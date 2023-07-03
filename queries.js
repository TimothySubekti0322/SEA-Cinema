const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "sea_movie",
  password: "timothy",
  port: 5432,
});

const createUser = (request, response) => {
  const { username, email, password } = request.body;

  client.query(
    "INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      //   response.status(201).send(`User added with ID: ${results.insertId}`);
      response.send("User added");
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
};

// module.exports = {
//   createUser,
// };
module.exports = createUser;