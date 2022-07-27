import { data } from "autoprefixer";
import { myData as Data } from "./data";
const Task = () => {
    
    const getLocalTasksData = (key) => {
        /** 
         * This gets the data from localStorage of a given key
         * if no key is there return an empty object
        */
       return localStorage.getItem(key) ? localStorage.getItem(key) : {};
    }
    
    const setLocalTaskData = (key, data) => {
        /**
         * This sets the data to localStorage of a given key
         */
        localStorage.setItem(key, data);
        
    }
    
    const convertStringToObject = (data) => {
        /**
         * convert stringify object to object
         * If it's already an object than only return the data
         */
        return typeof data === 'string' ? JSON.parse(data) : data;
    }
    
    const convertObjectToString = (data) => {
        /**
         * convert object to stringify object
         * If it's already a string than only return the data
         */
        return typeof data === 'object' ? JSON.stringify(data) : data;
    }
    
    
    const storeTasksLocally = (task) => {
        /**
         * The work of this function is to get data from the localStorage
         * than convert to object if it's not
         * than convert to stringy object if it's not
         * than save task data in the localStorage
         */
        let tasksData = getLocalTasksData('generalTasksData');
    
        tasksData = convertStringToObject(tasksData);
        
        let index = Object.keys(tasksData).length;
        tasksData[index + 1] = task;
        
        let tasksDataStringify = convertObjectToString(tasksData);

        setLocalTaskData('generalTasksData', tasksDataStringify);
    }
    
    // Properties
    // Data object from data.js, contains form inputs data
    const myTask = Data.getDatafromForm();
    storeTasksLocally(myTask)
    
	return { myTask };
};



export { Task };
