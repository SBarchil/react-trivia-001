const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Question");
require("./models/QuestionSet");
require("./services/passport");

mongoose.connect(keys.db);

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(" Hello there ");
});

app.listen(PORT, () => {
  console.log("Application started");
});
