import deleteIcon from "../assets/delete-svgrepo-com.svg";
import { format } from 'date-fns'
import { parseISO } from 'date-fns'
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

	function createTask(task) {
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
		const boxDiv2Classes = ["flex", "justify-end", "w-[27%]"];
		const boxDiv2 = document.createElement("div");
		boxDiv2.classList.add(...boxDiv2Classes);

		// Checkbox Icon
		const checkBoxInputClasses = [
			"appearance-none",
			"w-4",
			"h-4",
			"rounded-lg",
            "mr-3"
		];
		const checkBoxInput = document.createElement("input");
		checkBoxInput.classList.add(...checkBoxInputClasses);
		checkBoxInput.type = "checkbox";
		checkBoxInput.name = "task-status";
		checkBoxInput.id = "task-status";

        // task and due date box
        const taskDueDateBoxClasses = ["flex", "flex-col"];
        const taskDueDateBox = document.createElement("div");
        taskDueDateBox.classList.add(...taskDueDateBoxClasses);

		// Task Name
		const taskNameSpan = document.createElement("span");
		taskNameSpan.classList.add("ml-2");
		taskNameSpan.textContent = task.title;

		// Task Due Date
		const dueDateSpanClasses = [
			"task-due-date"
		];
		const dueDateSpan = document.createElement("span");
		dueDateSpan.classList.add(...dueDateSpanClasses);

		dueDateSpan.textContent = format(parseISO(task.dueDate), "PP"); 

		// Delte task Icon button
		const deleteTaskIconClasses = [
			"delete-btn",
			"h-9",
			"w-9",
			"cursor-pointer",
		];
		const deleteTaskIcon = document.createElement("img");
		deleteTaskIcon.src = deleteIcon;
		deleteTaskIcon.alt = "Delete Task Icon";
		deleteTaskIcon.classList.add(...deleteTaskIconClasses);
		// Task unique id on delete button
		deleteTaskIcon.setAttribute("data-unique-id", task.uniqueId);

		// Appending to parent
        taskDueDateBox.append(taskNameSpan, dueDateSpan);
		boxDiv1.append(checkBoxInput, taskDueDateBox);


		boxDiv2.append(deleteTaskIcon);

		taskContainer.append(boxDiv1, boxDiv2);

		// Appending to the main parent
		document
			.querySelector(".tasks-grid-container")
			.appendChild(taskContainer);
		// const parentGridContainer = document.querySelector(".tasks-grid-container");
		// parentGridContainer.appendChild(taskContainer);
	}

    const renderDateAndTime = () => {
        const box = document.querySelector('.date-time-section');
        box.textContent = format(new Date(), "PPPP");

    }

	return { openForm, closeForm, createTask, renderDateAndTime };
};

export { Dom };
