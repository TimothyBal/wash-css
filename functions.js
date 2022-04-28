const { PurgeCSS } = require("purgecss");
const fs = require("fs");

const fileWash = async (htmlFiles, cssFiles, newFileName = "newstyles.css") => {
    const purgeCSSResults = await new PurgeCSS().purge({
        content: htmlFiles, //array
        css: cssFiles, //array... ie : public/style.css
    });
    fs.appendFile(newFileName, purgeCSSResults[0].css, function (err) {
        if (err) throw err;
        console.log("Saved!");
    });
    // console.log(purgeCSSResults[0].css);
};

const textWash = async (htmlText, cssText) => {
    const purgeCSSResults = await new PurgeCSS().purge({
        content: [
            {
                raw: htmlText,
                extension: "html",
            },
        ],
        css: [
            {
                raw: cssText,
            },
        ],
    });
    return purgeCSSResults[0].css;
};

module.exports = {
    fileWash, textWash
}