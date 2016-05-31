const generateConfig  = require("./generate-config.js");

module.exports = generateConfig("./src/Entry.jsx", "./dist", "http://localhost:8080", true);
