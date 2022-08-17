import { Data } from "./data";
import { Dom } from "./dom";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const Task = () => {
	const isTaskPrsentLocally = () => {
		/**
		 * Check if tasks are present locally in localStorage
		 */
		return Object.keys(localStorage).length !== 0 ? true : false;
	};

	const renderLocalTask = () => {
		const localStorageKeys = Object.keys(localStorage);
		localStorageKeys.forEach((key) => {
			let tasks = dataObj.convertStringToObject(localStorage[key]);
			let tasksKeys = Object.keys(tasks);
			tasksKeys.forEach((key) => {
				domObj.createTask(tasks[key]);
				domObj.setRadioColorAsPerPriority(tasks[key]);

				const deleteTaskBtns = document.querySelectorAll(".delete-btn");
				deleteTaskBtns.forEach((btn) => {
					btn.addEventListener("click", deleteOldTask);
				});

				const editTaskBtns = document.querySelectorAll(".edit-task");
				editTaskBtns.forEach((btn) => {
					btn.addEventListener("click", domObj.openUpdateTaskForm);
				});
			});
		});
	};

	const createNewTask = () => {
		/**
		 * Get values from the form fields
		 * check if required filed has data otherwise raise an error
		 * check if optional field has data otherwise set the default data.
		 * Store the task into the localStorage
		 * Create a task element in the page
		 */
		const myTask = dataObj.getDatafromForm();
		if (checkRequiredFieldHasData(myTask) === true) {
			checkOptionalFieldsHasData(myTask);
			myTask.uniqueId = uuidv4();
			dataObj.storeTasksLocally(myTask);
			domObj.createTask(myTask);

			const deleteTaskBtns = document.querySelectorAll(".delete-btn");
			deleteTaskBtns.forEach((btn) => {
				btn.addEventListener("click", deleteOldTask);
			});
			domObj.setRadioColorAsPerPriority(myTask);

			const editTaskBtns = document.querySelectorAll(".edit-task");
			editTaskBtns.forEach((btn) => {
				btn.addEventListener("click", domObj.openUpdateTaskForm);
			});
			domObj.closeForm();
		}
	};

	const checkRequiredFieldHasData = (taskData) => {
		/**
		 * This function first checks if required fields has data and must not be empty
		 * If is has not it will give a message and reload the page.
		 */
		let successfull = true;
		const requiredFields = ["title", "dueDate"];

		for (let i = 0; i < requiredFields.length; i++) {
			if (taskData[requiredFields[i]] === null) {
				alert(`${requiredFields[i]} is a must field!!`);
				successfull = false;
				location.reload();
			}
		}

		return successfull;
	};

	const checkOptionalFieldsHasData = (myTask) => {
		const optionalFields = ["description", "project", "priority"];

		for (let i = 0; i < optionalFields.length; i++) {
			if (myTask[optionalFields[i]] === null) {
				switch (optionalFields[i]) {
					case "description":
						myTask[optionalFields[i]] = "None";
						break;
					case "project":
						myTask[optionalFields[i]] = "general";
						break;
					case "priority":
						myTask[optionalFields[i]] = "P3";
					default:
						break;
				}
			}
		}
	};

	const deleteOldTask = (e) => {
		const taskContainer = e.target;
		const uniqueId = taskContainer.getAttribute("data-unique-id");
		dataObj.deleteLocalTask(uniqueId);
	};

	return {
		createNewTask,
		isTaskPrsentLocally,
		renderLocalTask,
		deleteOldTask,
	};
};

// Dom object
const domObj = Dom();

// Data object
const dataObj = Data();

export { Task };
