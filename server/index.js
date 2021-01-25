import express from "express";
import cors from "cors";

import contactRountes from "./routes/contact.js"

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", contactRountes);

app.get("/", (req, res) => {
  res.send("Hello to PennyPlate request api")
});

const PORT = process.env.PORT || 5000;
console.log(`Setting up server on port: ${PORT}.....`);
app.listen(PORT, () => console.log("SUCCESS!"));