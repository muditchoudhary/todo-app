import { myListener as Listener } from "./listener";
import { myData as Data } from "./data";
import { Task } from "./task";
import  deleteIcon  from "../assets/delete-svgrepo-com.svg";
const Dom = () => {
	function openForm() {
		const taskInputForm = document.querySelector(".task-input-form");
		taskInputForm.classList.remove("hidden");
		taskInputForm.classList.add("grid");
	}

	function closeForm() {
		const taskInputForm = document.querySelector(".task-input-form");
		taskInputForm.classList.remove("grid");
		taskInputForm.classList.add("hidden");
	}

	function createNewTask() {
        // Ojbect of task factory
		const newTask = Task();

		const taskContainerClasses = [
			"bg-white",
			"border-2",
			"border-solid",
			"border-black",
			"h-max",
			"flex",
			"items-center",
			"justify-between",
			"p-3",
		];
		const taskContainer = document.createElement("div");
		taskContainer.classList.add(...taskContainerClasses);

		// Box div, to contain checkbox and name
		const boxDiv1 = document.createElement("div");
		// Box div, to contain due date input and delete button
		const boxDiv2Classes = ["flex", "justify-between", "w-[27%]"];
		const boxDiv2 = document.createElement("div");
		boxDiv2.classList.add(...boxDiv2Classes);

		// Checkbox Icon
		const checkBoxInputClasses = [
			"appearance-none",
			"w-4",
			"h-4",
			"rounded-lg",
		];
		const checkBoxInput = document.createElement("input");
		checkBoxInput.classList.add(...checkBoxInputClasses);
		checkBoxInput.type = "checkbox";
		checkBoxInput.name = "task-status";
		checkBoxInput.id = "task-status";

		// Task Name
		const taskNameSpan = document.createElement("span");
		taskNameSpan.classList.add("ml-2");
		taskNameSpan.textContent = newTask.myTask.title;

		// Task Due Date
		const dueDateInputClasses = [
			"border-2",
			"border-gray-500",
			"border-solid",
			"p-1",
		];
		const dueDateInput = document.createElement("input");
		dueDateInput.classList.add(...dueDateInputClasses);
		dueDateInput.type = "date";
		dueDateInput.name = "task-due-date";
		dueDateInput.id = "task-due-date";

		dueDateInput.value = newTask.myTask.dueDate;

		// Delte task Icon button
		const deleteTaskIconClasses = ["h-9", "w-9"];
		const deleteTaskIcon = document.createElement("img");
		deleteTaskIcon.src = deleteIcon;
		deleteTaskIcon.alt = "Delete Task Icon";
		deleteTaskIcon.classList.add(...deleteTaskIconClasses);

		// Appending to parent
		boxDiv1.append(checkBoxInput, taskNameSpan);

		boxDiv2.append(dueDateInput, deleteTaskIcon);


        taskContainer.append(boxDiv1, boxDiv2);

		// Appending to the main parent
		document.querySelector(".tasks-grid-container").appendChild(taskContainer);
		// const parentGridContainer = document.querySelector(".tasks-grid-container");
		// parentGridContainer.appendChild(taskContainer);
	}

	return { openForm, closeForm, createNewTask };
};

const myDom = Dom();

export { myDom };
