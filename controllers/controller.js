const express = require("express");
const router = express.Router();
const path = require("path");
const { fileWash, textWash } = require("../functions")

router.post("/wash", async (req, res) => {
    const { htmlArea, cssArea } = req.body;
    const result = await textWash(htmlArea, cssArea);
    res.send(result)
});

router.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"))
})

module.exports = router;