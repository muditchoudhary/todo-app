const tailwindConfig = require("./tailwind.config");

module.exports = {
	plugins: [
		require("tailwindcss")("./tailwind.config.js"),
		require("autoprefixer")
	]
};
