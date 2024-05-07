import mongoose from "mongoose";

const url = process.env.DB_URL;

export const connectusingMongoose = async() => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Mongodb Connected using mongoose")
    } catch(err) {
        console.log("Error while connecting to db")
        console.log(err);
    }
    
}