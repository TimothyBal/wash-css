const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
const mainRouter = require("./controllers/controller")
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
const { fileWash, textWash } = require("./functions")

//Test cases
// fileWash(["index.html"], ["public/style.css"])
// htmlText = `<div class="used-css">hi</div>`
// cssText = `.used-css { background-color : red } .unused-css { background-color : blue }`
// textWash(htmlText,cssText);

app.use("/", mainRouter);

app.listen(8000, () => {
  console.log(`Listening on port 8000`);
});
