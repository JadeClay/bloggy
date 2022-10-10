const mongoose = require('mongoose');

async function connection(){
  try {
    return await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(res => {if(res){console.log("Database connected succesfully")}});
  } catch (error) {
    console.log(error);
  }
}

module.exports.connection = connection