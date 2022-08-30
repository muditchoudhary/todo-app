import deleteIcon from "../assets/icons/delete-icon.svg";
import editTaskIcon from "../assets/icons/edit-icon.svg";
import { format } from "date-fns";
import descriptionIcon from "../assets/icons/description.svg";
import { parseISO } from "date-fns";
import { Data } from "./data";
import { data } from "autoprefixer";
import { da } from "date-fns/locale";
import { taskObj } from "./task";
const Dom = () => {
    const openForm = () => {
        const taskInputForm = document.querySelector(".task-input-form");
        taskInputForm.classList.remove("hidden");
        updateFormProjectsOptions("#project");
        taskInputForm.classList.add("grid");
    };

    const closeForm = (whichFormToClose) => {
        /**
         * It clear the fields of the form
         * and then close it
         */
        let formToClose = "";
        if (whichFormToClose === "addTaskForm") {
            formToClose = document.querySelector(".task-input-form");
        } else if (whichFormToClose === "updateTaskForm") {
            formToClose = document.querySelector(".update-task-input-form ");
        }
        formToClose.classList.remove("grid");
        formToClose.classList.add("hidden");
        clearFormFields();
    };

    const openUpdateTaskForm = (e) => {
        const updateTaskInputForm = document.querySelector(
            ".update-task-input-form "
        );
        updateTaskInputForm.classList.remove("hidden");
        updateTaskInputForm.classList.add("grid");
    };

    const fillFormFields = (e) => {
        const uniqueId = e.target.getAttribute("data-unique-id");
        dataObj.setCurrentTaskUniqueId(uniqueId);
        const taskData = dataObj.getParticularTaskDataById(uniqueId);

        dataObj.setParticularFormFieldData("update-task-title", taskData.title)
        dataObj.setParticularFormFieldData("update-task-due-date", taskData.dueDate)
        dataObj.setParticularFormFieldData("update-task-description", taskData.description)
        dataObj.setParticularFormFieldData("update-task-priority", taskData.priority)
        dataObj.setParticularFormFieldData("update-task-project", taskData.project)

    };

    const clearFormFields = () => {
        /**
         * This method clear all the field from the form
         * when the user click the cancel or close button
         */
        const formFieldsIds = [
            "#title",
            "#due-date",
            "#description",
            "#priority",
            "#project",
        ];
        formFieldsIds.forEach((id) => {
            document.querySelector(id).value = "";
        });
    };

    const setRadioColorAsPerPriority = (task) => {
        /**
         * Check for the priority of the task of the given task
         * set the color of radio button as per priority
         */
        const radioBtn = document.body.querySelector(
            `[data-unique-id="${task.uniqueId}"] .task-check-radio`
        );
        console.log(radioBtn);
        const radioBtnBorderColorClasses = [
            "border-gray-600",
            "border-red-600",
            "border-red-600",
            "border-red-600",
        ];
        radioBtn.classList.remove(...radioBtnBorderColorClasses);
        switch (task.priority) {
            case "P1":
                radioBtn.classList.add("border-red-600");
                break;
            case "P2":
                radioBtn.classList.add("border-yellow-600");
                break;
            case "P3":
                radioBtn.classList.add("border-blue-600");
                break;
            default:
                break;
        }
    };

    const createTask = (task) => {

        const taskContainerClasses = [
            "border-b-2",
            "border-solid",
            "border-black",
            "h-[75px]",
            "w-[92%]",
            "flex",
            "items-center",
            "justify-between",
            "p-3",
        ];
        const taskContainer = document.createElement("div");
        taskContainer.classList.add(...taskContainerClasses);
        // Task unique id
        taskContainer.setAttribute("data-unique-id", task.uniqueId);

        // Box div1 to contain checkbox and name
        const boxDiv1Classes = ["flex", "justify-between", "items-center"];
        const boxDiv1 = document.createElement("div");
        boxDiv1.classList.add(...boxDiv1Classes);
        // Box div2
        const boxDiv2Classes = ["flex", "justify-end", "w-[25%]"];
        const boxDiv2 = document.createElement("div");
        boxDiv2.classList.add(...boxDiv2Classes);

        // Checkbox Icon
        const checkBoxInputClasses = [
            "appearance-none",
            "w-5",
            "h-5",
            "rounded-xl",
            "border-2",
            "border-solid",
            "border-gray-600",
            "mr-3",
            "task-check-radio",
            "outline-none",
            "task-checkbox"
        ];
        const checkBoxInput = document.createElement("input");
        checkBoxInput.classList.add(...checkBoxInputClasses);
        checkBoxInput.type = "checkbox";
        checkBoxInput.name = "task-status";
        checkBoxInput.id = "task-status";
        checkBoxInput.setAttribute("data-unique-id", task.uniqueId);

        // task and due date box
        const taskDueDateBoxClasses = ["flex", "flex-col", "items-center"];
        const taskDueDateBox = document.createElement("div");
        taskDueDateBox.classList.add(...taskDueDateBoxClasses);

        // Task Name
        const taskNameSpan = document.createElement("span");
        taskNameSpan.classList.add("ml-2");
        taskNameSpan.textContent = task.title;

        // Task Due Date
        const dueDateSpanClasses = ["task-due-date"];
        const dueDateSpan = document.createElement("span");
        dueDateSpan.classList.add(...dueDateSpanClasses);

        dueDateSpan.textContent = format(parseISO(task.dueDate), "PP");
        const taskIconClasses = [
            "h-auto",
            "w-4",
            "cursor-pointer",
            "mr-[24px]"
        ];
        // Description Icon
        const descriptionIconImg = document.createElement("img");
        descriptionIconImg.src = descriptionIcon;
        descriptionIconImg.alt = "Description Icon";
        descriptionIconImg.classList.add(...taskIconClasses, "description-btn");
        descriptionIconImg.setAttribute("data-unique-id", task.uniqueId);
        
        // Edit Task Icon
        const editTaskIconElm = document.createElement("img");
        editTaskIconElm.src = editTaskIcon;
        editTaskIconElm.alt = "Edit Task Icon";
        editTaskIconElm.classList.add(...taskIconClasses, "edit-task");
        editTaskIconElm.setAttribute("data-unique-id", task.uniqueId);
        
        // Delte task Icon button
        const deleteTaskIcon = document.createElement("img");
        deleteTaskIcon.src = deleteIcon;
        deleteTaskIcon.alt = "Delete Task Icon";
        deleteTaskIcon.classList.add(...taskIconClasses, "delete-btn", "w-5");
        // Task unique id on delete button
        deleteTaskIcon.setAttribute("data-unique-id", task.uniqueId);

        // Appending to parent
        taskDueDateBox.append(taskNameSpan, dueDateSpan);
        boxDiv1.append(checkBoxInput, taskDueDateBox);

        boxDiv2.append(
            descriptionIconImg,
            editTaskIconElm,
            deleteTaskIcon
        );

        taskContainer.append(boxDiv1, boxDiv2);

        // Appending to the main parent
        document
            .querySelector(".tasks-grid-general-container")
            .appendChild(taskContainer);

    };

    const renderDateAndTime = () => {
        const box = document.querySelector(".date-time-section");
        box.textContent = format(new Date(), "PPPP");
    };

    const addImagesSrcToElement = (element, img) => {
        element.src = img;
    };

    const openAddNewProjectForm = () => {
        document.querySelector('.new-project-input-form').classList.remove("hidden");
        document.querySelector('.new-project-input-form').classList.add("grid");
    }

    const closeAddNewProjectForm = () => {
        document.querySelector('.new-project-input-form').classList.remove("grid");
        document.querySelector('.new-project-input-form').classList.add("hidden");
    }

    const updateFormProjectsOptions = (selectTag) => {
        const projectSelectTag = document.querySelector(selectTag);
        const projects = Object.keys(localStorage);
        projects.forEach(project => {
            if (isProjectOptionAlreadyPresent(selectTag, project)) {
                return;
            } else {
                let optionTag = document.createElement("option");
                optionTag.value = project.toLocaleLowerCase();
                optionTag.textContent = project.charAt(0).toUpperCase() + project.slice(1);
                optionTag.classList.add("project-options");
                projectSelectTag.append(optionTag);
            }
        });
    }

    const isProjectOptionAlreadyPresent = (parentSelectTag, project) => {
        const allProjectOptionsValue = document.querySelectorAll(`${parentSelectTag} .project-options`);
        for (let i = 0; i < allProjectOptionsValue.length; i++) {
            if (allProjectOptionsValue[i].value === project) {
                return true;
            }
        }
        return false;
    }

    const unHideProjectSection = () => {
        changeArrowImg(".right-arrow-icon", ".down-arrow-icon");
        document.querySelector(".projects-section").classList.remove("hidden");
        document.querySelector(".projects-section").classList.add("flex");
    }

    const hideProjectSection = () => {
        changeArrowImg(".down-arrow-icon", ".right-arrow-icon");
        document.querySelector(".projects-section").classList.remove("flex");
        document.querySelector(".projects-section").classList.add("hidden");
    }

    const changeArrowImg = (arrowToHide, arrowToShow) => {
        document.querySelector(arrowToHide).classList.add("hidden");
        document.querySelector(arrowToShow).classList.remove("hidden");
    }

    const createProjectList = () => {
        const projectListSectionDiv = document.querySelector(".projects-section");
        const totalProjects = Object.keys(localStorage);
        for (let i = 0; i < totalProjects.length; i++) {
            if (totalProjects[i] !== "general") {
                const div = document.createElement('div');
                const projectName = document.createElement('span');
                projectName.textContent = totalProjects[i].charAt(0).toLocaleUpperCase() + totalProjects[i].slice(1);
                projectName.classList.add("text-[22px]");
                const deleteImg = document.createElement('img');
                deleteImg.src = deleteIcon;
                // Adding project name on delete icon alt, so that it can be use when deleting the project
                deleteImg.alt = totalProjects[i];
                deleteImg.classList.add("w-[14px]", "h-[auto]", "cursor-pointer");
                deleteImg.addEventListener('click', dataObj.deleteProject);

                div.classList.add("flex", "items-center", "justify-between", "border-b-2", "border-solid", "border-black", "h-[40px]", "cursor-pointer");
                div.addEventListener("click", () => {openProjectSectionGrid(totalProjects[i])});
                div.append(projectName, deleteImg);

                projectListSectionDiv.appendChild(div);
            }
        }
    }

    const clearGrid = () => {
        const taskGrid = document.querySelector(".tasks-grid-general-container");
        while (taskGrid.hasChildNodes()) {
            taskGrid.removeChild(taskGrid.firstChild);
        }
    }

    const openProjectSectionGrid = (projectName) => {
        const sectionTitleDiv = document.querySelector(".section-title");
        if (projectName === 'general') {
            sectionTitleDiv.textContent = "Inbox";
        } else {
            sectionTitleDiv.textContent = projectName.charAt(0).toUpperCase() + projectName.slice(1);
        }
        clearGrid();
        taskObj.renderLocalTask(projectName, null, false);
    }

    const openTodaySectionGrid = () => {
        const sectionTitleDiv = document.querySelector(".section-title");
        sectionTitleDiv.textContent = "Today";
        clearGrid();
        taskObj.renderLocalTask(null, getTodayDate(), true);
    }

    const getTodayDate = () => {
        let today = new Date();

        let date = today.getFullYear() + '-' + (`0${today.getMonth() + 1}`) + '-' + today.getDate();
        return date;
    }

    const showDescription = (e) => {
        const uniqueId = e.target.getAttribute("data-unique-id");
        const taskData = dataObj.getParticularTaskDataById(uniqueId);
        const message = `Description\n----------------------------------------------\n\n${taskData.description}`;
        alert(message);
    }



    return {
        openForm,
        closeForm,
        createTask,
        renderDateAndTime,
        setRadioColorAsPerPriority,
        addImagesSrcToElement,
        openUpdateTaskForm,
        fillFormFields,
        openAddNewProjectForm,
        closeAddNewProjectForm,
        updateFormProjectsOptions,
        unHideProjectSection,
        hideProjectSection,
        createProjectList,
        clearGrid,
        openTodaySectionGrid,
        openProjectSectionGrid,
        showDescription
    };
};


// Data.js objects
let dataObj = Data();
const domObj = Dom();
export { Dom, domObj };

