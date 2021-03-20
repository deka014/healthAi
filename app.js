const express = require("express");

const app = express();

const path = require("path");

const data = require("./data");

var pyDisease = "unknown"

const { spawn } = require("child_process");

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

app.post("/", async (req, res) => {
  const outputArray = Object.keys(req.body.disease);
  const stringArray = outputArray.toString();
//   console.log(stringArray)
  const py = spawn("python", ["Main.py", stringArray] );

  py.stdout.on("data", (data) => {
    console.log(`wow you have ${data.toString()}`);
  });

  py.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
