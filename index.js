const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4020;
const config = process.env.NODE_ENV || "dev";
const morgan = require("morgan");

const { mongoUrl } = require("./utils/constants");
const userRoutes = require("./routes/userRoutes");

mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.connect(mongoUrl);

const conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));
conn.on("error", function (err) {
  console.log("mongoose connection error:", err.message);
});

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log({ config });
  console.log("Server started work on " + port);
});

//auth
app.use("/register", userRoutes);
