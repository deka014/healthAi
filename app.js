const express = require("express");

const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/health", (req, res) => {
  res.send("i am alive");
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
