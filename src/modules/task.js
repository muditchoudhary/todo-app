import { Data } from "./data";
import { Dom } from "./dom";

const Task = () => {
	const isTaskPrsentLocally = () => {
		return Object.keys(localStorage).length !== 0 ? true : false;
	};

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

	return { createNewTask, isTaskPrsentLocally };
};

// Dom object
const domObj = Dom();

// Data object
const dataObj = Data();

export { Task };
