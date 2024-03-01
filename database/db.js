import mongoose from "mongoose";

const Connection = async (URL) => {
  // Note:- We have to endcode the special character, hence @ is encoded to %40
  try {
    await mongoose.connect(URL);
    console.log("DB Connected successfully");
  } catch (err) {
    console.log("Error while connecting DB", err);
  }
};

export default Connection;

// userName:- shubhamrajput252000
// pswd:---Shubham252000%40
