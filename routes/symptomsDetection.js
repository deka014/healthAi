var express = require("express");
var router = express.Router();
const { spawn } = require("child_process");
const data = require("../ML-Backend/symptoms.js");

let result = undefined;

//get routes

router.get("/", (req, res) => {
  res.render("symptom", { data });
});

router.get("/result", (req, res) => {
  res.render("result", { result });
});

//post routes

router.post("/", (req, res) => {
  const output = req.body.disease;
  console.log(req.body.disease);
  const stringArray = req.body.disease.toString();

  const py = spawn("python", ["Main.py", stringArray], {
    cwd: "./ML-Backend/",
  });

  py.stdout.on("data", (data) => {
    result = data.toString();
    console.log(`You have ${result}`);
    res.redirect(req.baseUrl + "/result");
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  py.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;
