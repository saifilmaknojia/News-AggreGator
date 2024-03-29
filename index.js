const controller = require("./assets/js/node_controller");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/assets/"));
app.use(express.static(__dirname + "/js"));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { articles: [] });
});

// News page
app.get("/news", function (req, res) {
  res.render("pages/index", { articles: [] });
});

// POST /news gets urlencoded bodies
app.post("/news", urlencodedParser, async function (req, res) {
  let articles_json = await controller.formSearchString(req.body);
  console.log(articles_json.length);
  res.render("pages/index", {
    articles: articles_json,
  });
});

app.listen(port, function () {
  console.log("Started application on port %d", port);
});
