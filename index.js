const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.log("Erreur de connexion à MongoDB : " + err));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", noteRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
