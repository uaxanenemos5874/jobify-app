//code to connect to MONGODB

import mongoose from "mongoose";

export default async function connectDb() {
    try{
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB ☑️");
    }catch(err){
        console.log("🔴 Error: ", err);
        process.exit(1);  // Exit with error code 1 if connection fails
    }

}
