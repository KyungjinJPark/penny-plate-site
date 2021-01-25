import express from "express";
import cors from "cors";

import contactRountes from "./routes/contact.js"

const app = express();

app.use("/contact", contactRountes);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));