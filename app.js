var express = require("express");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

const sleep = () =>
  new Promise(resolve => {
    setTimeout(resolve, 5000);
  });

app.use(async (req, res, next) => {
  let { url } = req;
  const isSleep = /json|css|js/.test(url);
  if (isSleep) {
    await sleep();
  }
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static("public/index.html"));

app.use(bodyParser.json());

app.listen(8080, function() {
  console.log("Example app listening on port 8080.");
});
