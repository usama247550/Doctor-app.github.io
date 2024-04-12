const mongoose = require("mongoose");

const connection = async () => {
  try {
    const connect = mongoose.connect(process.env.URL);
    console.log("connect to dataBase");
  } catch (error) {
    console.log("error in dataBase");
  }
};

connection();
