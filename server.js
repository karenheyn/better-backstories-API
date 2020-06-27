const express = require("express");
const router = express.Router();
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

console.log(process.env.SECRET_MESSAGE);

//connect DB
connectDB();

//middleware
app.use(express.json({ extended: false }));
app.use(cors());
router.all("*", (_, res) =>
  res.json({ message: "please make a POST request to /stripe/charge" })
);
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => res.send("API running"));

//routes
app.use("/pay", require("./routes/api/stripe"));
app.use("/pdf", require("./routes/api/pdf"));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
