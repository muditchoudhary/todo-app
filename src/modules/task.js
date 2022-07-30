import { Data } from "./data";
import { Dom } from "./dom";

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
            })
        })
    }

    const createNewTask = () => {
        /**
         * Get values from the form fields
         * Store the task into the localStorage
         * Create a task element in the page
         */
        const myTask = dataObj.getDatafromForm();
        dataObj.storeTasksLocally(myTask);
        domObj.createTask(myTask);

    }

	return { createNewTask, isTaskPrsentLocally, renderLocalTask };
};

// Dom object
const domObj = Dom();

// Data object
const dataObj = Data();

export { Task };
