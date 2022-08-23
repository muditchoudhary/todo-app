let currentTaskUniqueId = "";
const Data = () => {
    const getDatafromForm = () => {
        /**
         * This function fetch all the data from the form fields
         * If any field is empty then return null
         */
        const title =
            document.querySelector("#title").value === ""
                ? null
                : document.querySelector("#title").value;
        const dueDate =
            document.querySelector("#due-date").value === ""
                ? null
                : document.querySelector("#due-date").value;
        const description =
            document.querySelector("#description").value === ""
                ? null
                : document.querySelector("#description").value;
        const priority =
            document.querySelector("#priority").value === ""
                ? null
                : document.querySelector("#priority").value;
        const project =
            document.querySelector("#project").value === ""
                ? null
                : document.querySelector("#project").value;

        return { title, dueDate, description, priority, project };
    };

    const getLocalTasksData = (key) => {
        /**
         * This gets the data from localStorage of a given key
         * if no key is there return an empty object
         */
        return localStorage.getItem(key) ? localStorage.getItem(key) : {};
    };

    const setLocalTaskData = (key, data) => {
        /**
         * This sets the data to localStorage of a given key
         */
        localStorage.setItem(key, data);
    };

    const convertStringToObject = (data) => {
        /**
         * convert stringify object to object
         * If it's already an object than only return the data
         */
        return typeof data === "string" ? JSON.parse(data) : data;
    };

    const convertObjectToString = (data) => {
        /**
         * convert object to stringify object
         * If it's already a string than only return the data
         */
        return typeof data === "object" ? JSON.stringify(data) : data;
    };

    const storeTasksLocally = (task) => {
        /**
         * The work of this function is to first check if the same project
         * as new task project already present in the localstorage
         * If present then store new task data on itself only by first
         * getting the that project data first
         * If it is not than create that new project and store data there.
         */

        if (checkLocalStorageHasSameProjectAsNewTask(task.project)) {
            let tasksData = getLocalTasksData(task.project);
            tasksData = convertStringToObject(tasksData);
            let index = Object.keys(tasksData).length;
            tasksData[index + 1] = task;
            let tasksDataStringify = convertObjectToString(tasksData);
            setLocalTaskData(task.project, tasksDataStringify);
        } else {
            let taskData = {};
            taskData[1] = task;
            let tasksDataStringify = convertObjectToString(taskData);
            setLocalTaskData(task.project, tasksDataStringify);
        }

    };

    const deleteLocalTask = (id) => {
        let doesDeltedTaskFound = false;
        let localStorageData = convertStringToObject(localStorage);
        const localStorageKeys = Object.keys(localStorage);
        for (let j = 0; j < localStorageKeys.length; j++) {
            let tasks = localStorageData[localStorageKeys[j]];
            tasks = convertStringToObject(tasks);
            let tasksKeys = Object.keys(tasks);
            for (let i = 0; i < tasksKeys.length; i++) {
                const task = tasks[tasksKeys[i]];
                if (task.uniqueId === id) {
                    delete tasks[tasksKeys[i]];
                    doesDeltedTaskFound = true;
                    // Updating Local Storage
                    localStorage.setItem(
                        localStorageKeys[j],
                        convertObjectToString(tasks)
                    );
                    break;
                }
            }
            if (doesDeltedTaskFound) break;
        }
        location.reload();
    };

    const getParticularTaskDataById = (id) => {
        for (let projectKey in localStorage) {
            let projectTasksData = localStorage[projectKey];
            projectTasksData = convertStringToObject(projectTasksData);
            for (let task in projectTasksData) {
                let taskData = projectTasksData[task];
                if (taskData.uniqueId === id) {
                    return taskData;
                }
            }
        }

        return null;
    };

    const getDataFromNewProjectForm = () => {
        return document.querySelector("#new-project").value === ""
            ? null
            : document.querySelector("#new-project").value;

    }

    const setParticularTaskDataById = (
        id,
        title,
        dueDate,
        desc,
        priority,
        project
    ) => {
        let isDataStored = false;
        for (let projectKey in localStorage) {
            let projectTasksData = localStorage[projectKey];
            projectTasksData = convertStringToObject(projectTasksData);
            for (let task in projectTasksData) {
                let taskData = projectTasksData[task];
                if (taskData.uniqueId === id) {
                    taskData.title = title;
                    taskData.dueDate = dueDate;
                    taskData.description = desc;
                    taskData.priority = priority;
                    taskData.project = project;
                    projectTasksData = convertObjectToString(projectTasksData);
                    localStorage.setItem(projectKey, projectTasksData);
                    isDataStored = true;
                    break;
                }
            }
            if (isDataStored) break;
        }
    };

    const setParticularFormFieldData = (field, dataValue) => {
        dataValue === "None"
            ? (document.querySelector(`#${field}`).value = "")
            : (document.querySelector(`#${field}`).value = dataValue);
        // console.log(document.querySelector(`#${field}`));
    };

    const getParticularFormFieldData = (field) => {
        return document.querySelector(`#${field}`).value === ""
            ? "None"
            : document.querySelector(`#${field}`).value;
    };

    const setCurrentTaskUniqueId = (id) => {
        currentTaskUniqueId = id;
        console.log(getCurrentTaskUniqueId());
    };

    const getCurrentTaskUniqueId = () => {
        return currentTaskUniqueId;
    };

    const checkLocalStorageHasSameProjectAsNewProject = (newProject) => {
        const localStorageProjects = Object.keys(localStorage);
        for (let i = 0; i < localStorageProjects.length; i++) {
            if (localStorageProjects[i].toLowerCase() === newProject.toLowerCase()) {
                return true;
            }
        }
        return false;
    };

    return {
        getDatafromForm,
        storeTasksLocally,
        convertStringToObject,
        convertObjectToString,
        deleteLocalTask,
        getParticularTaskDataById,
        setParticularFormFieldData,
        getParticularFormFieldData,
        setCurrentTaskUniqueId,
        getCurrentTaskUniqueId,
        setParticularTaskDataById,
        checkLocalStorageHasSameProjectAsNewProject,
        getDataFromNewProjectForm
    };
};

export { Data };
