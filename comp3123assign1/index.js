const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const port = process.env.PORT;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/emp", require("./routes/employeeRoutes"));

app.use("*", (req, res) => {
    res.status(400).json({ success: false, message: "Endpoint not found" });
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
