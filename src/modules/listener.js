const Listener = () => {
	const listenClickOnElements = (element, functionToPerform) => {
		document.querySelector(element).addEventListener("click", () => {
			functionToPerform();
		});
	};

	return { listenClickOnElements };
};


export { Listener };
