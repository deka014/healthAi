const express = require("express");

const app = express();

const path = require("path");

const data = require("./data");

var result = "unknown"

const { spawn } = require("child_process");

const bodyParser = require("body-parser");



app.use(express.static(path.join(__dirname, "/public")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/detection", (req, res) => {
  res.render("symptom", { data });
});

app.post("/", async (req, res) => {
    const output = req.body.disease;
      if (Array.isArray(output)) {
        const stringArray = req.body.disease.toString();
        // console.log("arr")
        // console.log(stringArray);
        const py = await spawn("python", ["Main.py", stringArray]);

        py.stdout.on("data", (data) => {
           result =  data.toString();
          console.log(`wow you have ${result}`);
          res.redirect("/result");
        });

        py.on("close", (code) => {
          console.log(`child process exited with code ${code}`);
        })
        
        ;
      } else {
        console.log("obj");
        const stringArray = Object.keys(output);
        // console.log(stringArray);
          const py = spawn("python", ["Main.py", stringArray] );

          py.stdout.on("data", (data) => {
             result = data.toString();
            console.log(`wow you have ${data.toString()}`);
            res.redirect("/result");
          });

          py.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
          });
      }

      });

      app.get("/result", (req, res) => {
        res.render("result", { result });

        //  const array = req.body
        //  console.log(array)
        //   const outputArray = await Object.keys(req.body.disease);

        //   console.log(outputArray)
        //   console.log(stringArray)
        //   const py = spawn("python", ["Main.py", stringArray] );

        //   py.stdout.on("data", (data) => {
        //     console.log(`wow you have ${data.toString()}`);
        //   });

        //   py.on("close", (code) => {
        //     console.log(`child process exited with code ${code}`);
        //   });
      });

app.listen(3000, () => {
  console.log("listening at port 3000");
});
