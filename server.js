const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);

//connecting database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`DB connection successful`);
  });

const port = process.env.PORT || 3000;

// running server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// fetch('http://localhost:3000/data').then(res=>res.json()).then(res=>console.log(res));
