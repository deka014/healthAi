var express = require("express");
var router = express.Router();
const { spawn } = require("child_process");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, "index" + ".jpg");
  },
});

const upload = multer({ storage: storage });

let result = undefined;

router.get("/", (req, res) => {
  res.render("image");
});

router.get("/result", (req, res) => {
  res.render("result", { result });
});

router.post("/", upload.single("eyeImage"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    const py = spawn("python", ["eye.py", "../uploads/index.jpg"], {
      cwd: "./ML-Backend/",
    });

    py.stdout.on("data", (data) => {
      result = data.toString();
      console.log(`You have ${data.toString()}`);
      res.redirect(req.baseUrl + "/result");
    });

    py.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    py.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
});

module.exports = router;
