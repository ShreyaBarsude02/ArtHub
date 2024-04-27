const mongoose = require('mongoose');

const mongo_url = 'mongodb://localhost:27017/arthub';

const connectMongoDB = async () =>{
  await mongoose.connect(mongo_url);
  console.log("Connected to MongoDB successfully")
}

module.exports = connectMongoDB;