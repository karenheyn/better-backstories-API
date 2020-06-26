const express = require("express");

const connectDB = require("./config/db");

const app = express();

//connect DB
connectDB();

//middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

//routes
app.use("/pdf", require("./routes/api/pdf"));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
