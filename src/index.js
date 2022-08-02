import "./style.css";
import { Dom } from "./modules/dom";
import { Data } from "./modules/data";
import { Task } from "./modules/task";

// Checking if there are task stored locally
// if yes then render them first
const taskObj = Task();
taskObj.isTaskPrsentLocally() ? taskObj.renderLocalTask() : null;

// Dom object
const domObject = Dom();

// Listening elements
document
	.querySelector(".add-task")
	.addEventListener("click", domObject.openForm);
document.querySelector(".close").addEventListener("click", domObject.closeForm);
document
	.querySelector(".cancel")
	.addEventListener("click", domObject.closeForm);
document
	.querySelector(".confirm-add-task-btn")
	.addEventListener("click", taskObj.createNewTask);

// Rendering current date and time
domObject.renderDateAndTime()