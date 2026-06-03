const fs = require("fs");
const postcss = require("postcss");

const atImport = require("postcss-import");
const mixins = require("postcss-mixins");
const simpleVars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const presetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");

module.exports = class {
  // Tell Eleventy this file outputs CSS, not HTML
  data() {
    return {
      permalink: "/css/styles.css",
      eleventyExcludeFromCollections: true
    };
  }

  async render(data) {
    const css = fs.readFileSync("src/site/_includes/postcss/styles.css", "utf8");

    const result = await postcss([
      atImport(),
      mixins(),
      simpleVars(),
      nested(),
      presetEnv({ stage: 1 }),
      cssnano()
    ]).process(css, { from: "src/site/_includes/postcss/styles.css" });

    return result.css;
  }
};
