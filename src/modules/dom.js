import deleteIcon from "../assets/icons/delete-icon.svg";
import priorityIcon from "../assets/icons/priority-icon.svg";
import projectIcon from "../assets/icons/project-icon.svg";

import { format } from "date-fns";
import { parseISO } from "date-fns";
const Dom = () => {
	const openForm = () => {
		const taskInputForm = document.querySelector(".task-input-form");
		taskInputForm.classList.remove("hidden");
		taskInputForm.classList.add("grid");
	};

	const closeForm = () => {
        /**
         * It clear the fields of the form
         * and then close it
         */
		const taskInputForm = document.querySelector(".task-input-form");
		taskInputForm.classList.remove("grid");
		taskInputForm.classList.add("hidden");
		clearFormFields();
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
		const boxDiv2Classes = ["flex", "justify-between", "w-[25%]"];
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
		];
		const checkBoxInput = document.createElement("input");
		checkBoxInput.classList.add(...checkBoxInputClasses);
		checkBoxInput.type = "checkbox";
		checkBoxInput.name = "task-status";
		checkBoxInput.id = "task-status";

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

		// Priority Icon
		const taskIconClasses = ["h-auto", "w-4", "cursor-pointer"];
		const priorityIconElm = document.createElement("img");
		priorityIconElm.src = priorityIcon;
		priorityIconElm.alt = "Priority Icon";
		priorityIconElm.classList.add(...taskIconClasses);

		// project task Icon
		const projectIconElm = document.createElement("img");
		projectIconElm.src = projectIcon;
		projectIconElm.alt = "Project Icon";
		projectIconElm.classList.add(...taskIconClasses);

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

		boxDiv2.append(priorityIconElm, projectIconElm, deleteTaskIcon);

		taskContainer.append(boxDiv1, boxDiv2);

		// Appending to the main parent
		document
			.querySelector(".tasks-grid-container")
			.appendChild(taskContainer);
		// const parentGridContainer = document.querySelector(".tasks-grid-container");
		// parentGridContainer.appendChild(taskContainer);
	};

	const renderDateAndTime = () => {
		const box = document.querySelector(".date-time-section");
		box.textContent = format(new Date(), "PPPP");
	};

	return {
		openForm,
		closeForm,
		createTask,
		renderDateAndTime,
		setRadioColorAsPerPriority,
	};
};

export { Dom };
