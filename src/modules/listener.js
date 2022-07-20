const Listener = () => {
	const listenClickOnElements = (element, functionToPerform) => {
		document.querySelector(element).addEventListener("click", () => {
			functionToPerform();
		});
	};

	return { listenClickOnElements };
};

const myListener = Listener();
export { myListener };
