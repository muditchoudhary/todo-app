const Data = () => {
	const getDatafromForm = () => {
		/**
		 * Fetch out all the data values from the form fields
		 */
		const title = document.querySelector("#title").value;
		const dueDate = document.querySelector("#due-date").value;
		const description = document.querySelector("#description").value;
		const priority = document.querySelector("#priority").value;
		const project = document.querySelector("#project").value;

		return { title, dueDate, description, priority, project };
	};

	const getLocalTasksData = (key) => {
		/**
		 * This gets the data from localStorage of a given key
		 * if no key is there return an empty object
		 */
		return localStorage.getItem(key) ? localStorage.getItem(key) : {};
	};

	const setLocalTaskData = (key, data) => {
		/**
		 * This sets the data to localStorage of a given key
		 */
		localStorage.setItem(key, data);
	};

	const convertStringToObject = (data) => {
		/**
		 * convert stringify object to object
		 * If it's already an object than only return the data
		 */
		return typeof data === "string" ? JSON.parse(data) : data;
	};

	const convertObjectToString = (data) => {
		/**
		 * convert object to stringify object
		 * If it's already a string than only return the data
		 */
		return typeof data === "object" ? JSON.stringify(data) : data;
	};

	const storeTasksLocally = (task) => {
		/**
		 * The work of this function is to get data from the localStorage
		 * than convert to object if it's not
		 * than convert to stringy object if it's not
		 * than save task data in the localStorage
		 */
		let tasksData = getLocalTasksData("generalTasksData");

		tasksData = convertStringToObject(tasksData);

		let index = Object.keys(tasksData).length;
		tasksData[index + 1] = task;

		let tasksDataStringify = convertObjectToString(tasksData);

		setLocalTaskData("generalTasksData", tasksDataStringify);
	};

	const deleteLocalTask = (id) => {
		let doesDeltedTaskFound = false;
		let localStorageData = convertStringToObject(localStorage);
		const localStorageKeys = Object.keys(localStorage);
		for (let j = 0; j < localStorageKeys.length; j++) {
			let tasks = localStorageData[localStorageKeys[j]];
			tasks = convertStringToObject(tasks);
			let tasksKeys = Object.keys(tasks);
			for (let i = 0; i < tasksKeys.length; i++) {
				const task = tasks[tasksKeys[i]];
				if (task.uniqueId === id) {
					delete tasks[tasksKeys[i]];
					doesDeltedTaskFound = true;
					// Updating Local Storage
					localStorage.setItem(
						localStorageKeys[j],
						convertObjectToString(tasks)
					);
					break;
				}
			}
			if (doesDeltedTaskFound) break;
		}
		location.reload();
	};

	return {
		getDatafromForm,
		storeTasksLocally,
		convertStringToObject,
		convertObjectToString,
		deleteLocalTask,
	};
};

export { Data };
