import "./style.css";
import { myDom as Dom } from "./modules/dom";
import { myListener as Listener } from "./modules/listener";
import { myData as Data } from "./modules/data";

Listener.listenClickOnElements(".add-task", () => {Dom.openForm()});
Listener.listenClickOnElements(".close", () => {Dom.closeForm()});
Listener.listenClickOnElements(".cancel", () => {Dom.closeForm()});
Listener.listenClickOnElements(".confirm-add-task-btn", () => {Dom.createNewTask()});

console.log("working");