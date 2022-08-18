const Data = () => {
	const getDatafromForm = () => {
		/**
		 * This function fetch all the data from the form fields
		 * If any field is empty then return null
		 */
		const title =
			document.querySelector("#title").value === ""
				? null
				: document.querySelector("#title").value;
		const dueDate =
			document.querySelector("#due-date").value === ""
				? null
				: document.querySelector("#due-date").value;
		const description =
			document.querySelector("#description").value === ""
				? null
				: document.querySelector("#description").value;
		const priority =
			document.querySelector("#priority").value === ""
				? null
				: document.querySelector("#priority").value;
		const project =
			document.querySelector("#project").value === ""
				? null
				: document.querySelector("#project").value;

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

	const getParticularTaskDataById = (id) => {
		for (let projectKey in localStorage) {
			let projectTasksData = localStorage[projectKey];
			projectTasksData = convertStringToObject(projectTasksData);
			for (let task in projectTasksData) {
				let taskData = projectTasksData[task];
				if (taskData.uniqueId === id) {
					return taskData;
				}
			}
		}

		return null;
	};

	const setParticularFormFieldData = (field, dataValue) => {
		dataValue === "None"
		    ? (document.querySelector(`#${field}`).value = "")
		    : (document.querySelector(`#${field}`).value = dataValue);
		// console.log(document.querySelector(`#${field}`));
	};

	return {
		getDatafromForm,
		storeTasksLocally,
		convertStringToObject,
		convertObjectToString,
		deleteLocalTask,
		getParticularTaskDataById,
		setParticularFormFieldData,
	};
};

export { Data };
