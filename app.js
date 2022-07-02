const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const index = require("./routes/index")
const symptomsDetection = require("./routes/symptomsDetection")
const imageDetection = require("./routes/imageDetection")


app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));


app.use("/", index);
app.use("/symptom-based-detection" , symptomsDetection)
app.use("/image-based-detection" , imageDetection )


app.listen(3000, () => {
  console.log("listening at port 3000");
});
