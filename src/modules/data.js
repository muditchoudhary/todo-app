const Data = () => {
	const getDatafromForm = () => {
		const title = document.querySelector("#title").value;
		const dueDate = document.querySelector("#due-date").value;
		const description = document.querySelector("#description").value;
		const priority = document.querySelector("#priority").value;
		const project = document.querySelector("#project").value;

		return { title, dueDate, description, priority, priority, project };
	};

	return { getDatafromForm};
};

const myData = Data();

export { myData };
