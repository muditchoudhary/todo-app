import "./style.css";
import { Dom } from "./modules/dom";
import { Listener } from "./modules/listener";
import { Data } from "./modules/data";
import {Task} from "./modules/task";

// Checking if there are task stored locally
// if yes then render them first
const taskObj = Task();
taskObj.isTaskPrsentLocally() ? taskObj.renderLocalTask() : NaN;

// Listener object
const litenerObj = Listener();

// Dom object 
const domObject = Dom();

litenerObj.listenClickOnElements(".add-task", () => {domObject.openForm()});
litenerObj.listenClickOnElements(".close", () => {domObject.closeForm()});
litenerObj.listenClickOnElements(".cancel", () => {domObject.closeForm()});
litenerObj.listenClickOnElements(".confirm-add-task-btn", () => {(taskObj.createNewTask())});
