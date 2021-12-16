import Mongoose from "mongoose";
let f = require('util').format
let database: Mongoose.Connection;

export const connect = () => {
  // needs encodeuricomponent??
  const uri = 'mongodb+srv://root:example@mongo/test?retryWrites=true&w=majority';
  console.log(uri)
  if (database) {
    return;
  }
  Mongoose.connect(uri,{
    u
  });
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};