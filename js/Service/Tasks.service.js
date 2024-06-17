import {createXMLHttpRequest} from '../createXMLHttpRequest.js';
import {Task} from '../Model/Task.model.js';

const urlUsers = "http://localhost:3000/users";

export default class TasksService {
    constructor(){
        this.tasks = [];
    }
    add(task){
        if(!task instanceof Task){
            throw TypeError("task must be an instance of Task");
        }
        this.tasks.push(task);
    }
    getTasks(userId, cb){
        console.log("getTasks", urlUsers)
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt } = task
                return new Task(title, completed, createdAt, updatedAt)
            });
            cb(this.tasks);
        }
        createXMLHttpRequest("GET", `${urlUsers}/${userId}/tasks`, fn);
    }
}