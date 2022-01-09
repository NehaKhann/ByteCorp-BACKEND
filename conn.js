const mongoose = require("mongoose");
require("dotenv").config()

const db =process.env.MONGO_CONN_URL
mongoose
  .connect(db)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
