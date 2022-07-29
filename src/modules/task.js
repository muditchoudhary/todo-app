import { data } from "autoprefixer";
import { myData as Data } from "./data";
const Task = () => {
    
    // Properties
    // Data object from data.js, contains form inputs data
    const myTask = Data.getDatafromForm();
    Data.storeTasksLocally(myTask);
    
	return { myTask };
};



export { Task };
