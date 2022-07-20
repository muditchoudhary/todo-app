module.exports = {
	content: ["./src/**/*.{html,js}", "./dist/index.html"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
