import "./style.css";
import { Dom } from "./modules/dom";
import { Data } from "./modules/data";
import { Task } from "./modules/task";
import inboxIcon from "./assets/icons/inbox-icon.svg";
import todayIcon from "./assets/icons/calender-icon.svg";
import rightArrowIcon from "./assets/icons/right-arrow-icon.svg";
import downArrowIcon from "./assets/icons/down-arrow-icon.svg";
import addIcon from "./assets/icons/add-icon.svg";

const sectionTitleDiv = document.querySelector(".section-title");
sectionTitleDiv.textContent = "Inbox";
// Checking if there are task stored locally
// if yes then render them first
const taskObj = Task();
taskObj.isTaskPrsentLocally() ? taskObj.renderLocalTask("general") : null;

// Dom object
const domObject = Dom();

// Listening elements
document
    .querySelector(".add-task")
    .addEventListener("click", domObject.openForm);
document
    .querySelector(".close")
    .addEventListener("click", () => domObject.closeForm("addTaskForm"));
document
    .querySelector(".cancel")
    .addEventListener("click", () => domObject.closeForm("addTaskForm"));
document
    .querySelector(".update-form-close")
    .addEventListener("click", () => domObject.closeForm("updateTaskForm"));
document
    .querySelector(".update-form-cancel")
    .addEventListener("click", () => domObject.closeForm("updateTaskForm"));
document
    .querySelector(".confirm-add-task-btn")
    .addEventListener("click", taskObj.createNewTask);
document
    .querySelector(".update-task-btn")
    .addEventListener("click", taskObj.updateTask);
document
    .querySelector(".add-new-project")
    .addEventListener("click", domObject.openAddNewProjectForm);
document
    .querySelector(".new-project-form-close")
    .addEventListener("click", domObject.closeAddNewProjectForm);
document
    .querySelector(".new-project-form-cancel")
    .addEventListener("click", domObject.closeAddNewProjectForm);
document
    .querySelector(".confirm-add-project-btn")
    .addEventListener("click", taskObj.createNewProject);
document
    .querySelector(".right-arrow-icon")
    .addEventListener("click", domObject.unHideProjectSection);
document
    .querySelector(".down-arrow-icon")
    .addEventListener("click", domObject.hideProjectSection);
document
    .querySelector(".today-section-btn")
    .addEventListener("click", domObject.openTodaySectionGrid);
document
    .querySelector(".inbox-section-btn")
    .addEventListener("click", () => {domObject.openProjectSectionGrid('general')});

// Adding Icons Images to elements
domObject.addImagesSrcToElement(
    document.querySelector(".inbox-icon"),
    inboxIcon
);
domObject.addImagesSrcToElement(
    document.querySelector(".today-icon"),
    todayIcon
);
domObject.addImagesSrcToElement(
    document.querySelector(".right-arrow-icon"),
    rightArrowIcon
);
domObject.addImagesSrcToElement(
    document.querySelector(".down-arrow-icon"),
    downArrowIcon
);
domObject.addImagesSrcToElement(document.querySelector(".add-icon"), addIcon);

// Render the project list in the sidebar
domObject.createProjectList();

// Rendering current date and time
domObject.renderDateAndTime();
