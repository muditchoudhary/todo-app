import "./style.css";
import { Dom } from "./modules/dom";
import { Data } from "./modules/data";
import { Task } from "./modules/task";
import inboxIcon from "./assets/icons/inbox-icon.svg"
import todayIcon from "./assets/icons/calender-icon.svg"
import rightArrowIcon from "./assets/icons/right-arrow-icon.svg"
import addIcon from "./assets/icons/add-icon.svg"

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
// Adding Icons Images to elements
domObject.addImagesSrcToElement(document.querySelector('.inbox-icon'), inboxIcon);
domObject.addImagesSrcToElement(document.querySelector('.today-icon'), todayIcon);
domObject.addImagesSrcToElement(document.querySelector('.projects-icon'), rightArrowIcon);
domObject.addImagesSrcToElement(document.querySelector('.add-icon'), addIcon);



// Rendering current date and time
domObject.renderDateAndTime();
