import { Data } from "./data";
import { Dom } from "./dom";
import { v4 as uuidv4 } from "uuid";

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
			});
		});
	};

	const createNewTask = () => {
		/**
		 * Get values from the form fields
		 * Store the task into the localStorage
		 * Create a task element in the page
		 */
		const myTask = dataObj.getDatafromForm();
		myTask.uniqueId = uuidv4();
		dataObj.storeTasksLocally(myTask);
		domObj.createTask(myTask);

		const deleteTaskBtns = document.querySelectorAll(".delete-btn");
		deleteTaskBtns.forEach((btn) => {
			btn.addEventListener("click", deleteOldTask);
		});
        domObj.setRadioColorAsPerPriority(myTask);
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
