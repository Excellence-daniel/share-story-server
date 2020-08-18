const express = require("express");
const app = express();
const cors = require("cors");
const mailFunctions = require("./controllers/mail");
const port = 4040;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server Started!");
});

app.post("/send-email", mailFunctions.sendEmail);
