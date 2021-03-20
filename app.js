const express = require("express");

const app = express();

const path = require("path");

const data = require("./data");

const { spawn } = require("child_process");
const py = spawn("python", ["Main.py", [1, 1, 2, 3]]);

py.stdout.on("data", (data) => {
  console.log(`wow you have ${data.toString()}`);
});

py.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/detection", (req, res) => {
  res.render("symptom", { data });
});

app.post("/", (req, res) => {
  console.log(req.body)
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
