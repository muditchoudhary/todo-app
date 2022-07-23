import { myData as Data } from "./data";
const Task = () => {
	// Data object from data.js, contains form inputs data
	const myTask = Data.getDatafromForm();

	return { myTask };
};



export { Task };
