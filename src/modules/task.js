import { Data } from "./data";
import { domObj } from "./dom";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const Task = () => {
    const isTaskPrsentLocally = () => {
        return Object.keys(localStorage).length !== 0 ? true : false;
    };

    const renderTask = (task) => {
        domObj.createTask(task);
        domObj.setRadioColorAsPerPriority(task);
        const checkTaskBtns = document.querySelectorAll(".task-checkbox");
        checkTaskBtns.forEach((checkBtn) => {
            checkBtn.addEventListener("click", isTaskCompleted);
        });

        const descriptionBtns = document.querySelectorAll(".description-btn");
        descriptionBtns.forEach((btn) => {
            btn.addEventListener("click", domObj.showDescription);
        });

        const deleteTaskBtns = document.querySelectorAll(".delete-btn");
        deleteTaskBtns.forEach((btn) => {
            btn.addEventListener("click", deleteOldTask);
        });

        const editTaskBtns = document.querySelectorAll(".edit-task");
        editTaskBtns.forEach((btn) => {
            btn.addEventListener("click", domObj.fillFormFields);
            btn.addEventListener("click", domObj.openUpdateTaskForm);
        });
    }

    const rederTaskOnDateBase = (task, dateOfTask) => {
        if (task.dueDate === dateOfTask) {
            renderTask(task)
        }
    }

    const renderTaskOnProjectBase = (task, projectName) => {
        if (task.project === projectName) {
            renderTask(task);
        }
    }
    const renderLocalTask = (projectName, dateOfTask, isDateGiven) => {
        const localStorageKeys = Object.keys(localStorage);
        localStorageKeys.forEach((key) => {
            let tasks = dataObj.convertStringToObject(localStorage[key]);
            let tasksKeys = Object.keys(tasks);
            tasksKeys.forEach((key) => {
                if (isDateGiven) {
                    rederTaskOnDateBase(tasks[key], dateOfTask)
                } else {
                    renderTaskOnProjectBase(tasks[key], projectName)
                }
            });
        });
    };

    const createNewTask = () => {
        const myTask = dataObj.getDatafromForm();
        if (checkRequiredFieldHasData(myTask) === true) {
            checkOptionalFieldsHasData(myTask);
            myTask.uniqueId = uuidv4();
            dataObj.storeTasksLocally(myTask);
            if (myTask.project === 'general') {
                domObj.createTask(myTask);

                const checkTaskBtns = document.querySelectorAll(".task-checkbox");
                checkTaskBtns.forEach((checkBtn) => {
                    checkBtn.addEventListener("click", isTaskCompleted);
                });
                
                domObj.setRadioColorAsPerPriority(myTask);

                const descriptionBtns = document.querySelectorAll(".description-btn");
                descriptionBtns.forEach((btn) => {
                    btn.addEventListener("click", domObj.showDescription);
                });

                const deleteTaskBtns = document.querySelectorAll(".delete-btn");
                deleteTaskBtns.forEach((btn) => {
                    btn.addEventListener("click", deleteOldTask);
                });
                
                const editTaskBtns = document.querySelectorAll(".edit-task");
                editTaskBtns.forEach((btn) => {
                    btn.addEventListener("click", domObj.fillFormFields);
                    btn.addEventListener("click", domObj.openUpdateTaskForm);
                });
                
            }
            domObj.closeForm("addTaskForm");
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

    const updateTask = () => {
        const uniqueId = dataObj.getCurrentTaskUniqueId();

        const title = dataObj.getParticularFormFieldData("update-task-title");
        const dueDate = dataObj.getParticularFormFieldData(
            "update-task-due-date"
        );
        const desc = dataObj.getParticularFormFieldData(
            "update-task-description"
        );
        const priority = dataObj.getParticularFormFieldData(
            "update-task-priority"
        );
        const project = dataObj.getParticularFormFieldData(
            "update-task-project"
        );

        dataObj.setParticularTaskDataById(
            uniqueId,
            title,
            dueDate,
            desc,
            priority,
            project
        );

        location.reload();
    };

    const createNewProject = () => {
        const project = dataObj.getDataFromNewProjectForm();
        if (project === null) {
            alert("Please enter a valid project name");
            location.reload();
        } else {
            if (dataObj.checkLocalStorageHasSameProjectAsNewProject(project)) {
                alert("Project with name: " + project + " already present.");
                location.reload();
            } else {
                localStorage.setItem(project.toLowerCase(), "{}");
                alert("Project has been successfuly created!");
                domObj.closeAddNewProjectForm();
                location.reload();
            }
        }
    };

    const isTaskCompleted = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            dataObj.deleteLocalTask(e.target.getAttribute("data-unique-id"));
            alert("Task completed!! Keep up the work!! You can do this!!");
        }
    }

    return {
        createNewTask,
        isTaskPrsentLocally,
        renderLocalTask,
        deleteOldTask,
        updateTask,
        createNewProject,
        renderLocalTask
    };
};
//
const taskObj = Task()

// // Dom object
// const domObj = Dom();

// Data object
const dataObj = Data();

export { Task, taskObj };
