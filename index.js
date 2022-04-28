const { PurgeCSS } = require("purgecss");
const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require("fs");

// File-based
const getResultsFile = async () => {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      "affiliate.html",
      "api.html",
      "cryptocurrency.html",
      "ecommerce.html",
      "general.html",
      "orders.html",
      "rent-page.html",
    ],
    css: ["public/style.css"],
  });

  fs.appendFile("newstyles.css", purgeCSSResults[0].css, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  // console.log(purgeCSSResults[0].css);
};

// Raw based
const getResultsText = async () => {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      {
        raw: '<html><body><div class="used-class"></div></body></html>',
        extension: "html",
      },
    ],
    css: [
      {
        raw: `.unused-class {
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
          }
          
          .used-class {
            background-color: pink;
          }`,
      },
    ],
  });
  console.log(purgeCSSResults[0].css);
};

getResultsFile();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/wash", (req, res) => {
  console.log("washing !");
  console.log(req.body);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log(`Listening on port 8000`);
});
