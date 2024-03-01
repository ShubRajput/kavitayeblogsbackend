import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", Router);

// here we are deploying the frontend build folder.
  if(process.env.NODE_ENV === 'production'){
      app.use(express.static("client/build"));
  }

const URL = `mongodb+srv://shubhamrajput252000:Shubham252000%40@shubhamkamnaye.ajvpajx.mongodb.net/?retryWrites=true&w=majority`
Connection(URL);
