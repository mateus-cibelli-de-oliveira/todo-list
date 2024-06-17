import {createXMLHttpRequest} from '../createXMLHttpRequest.js';
import {Task} from '../Model/Task.model.js';

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
    getTasks(url, cb){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt } = task
                return new Task(title, completed, createdAt, updatedAt)
            });
            cb(this.tasks);
        }
        createXMLHttpRequest("GET", url, fn);
    }
}