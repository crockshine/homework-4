import type {
    CreateTaskRequestBody,
    DeleteTaskParams,
    FetchTaskParams,
    FetchTasksQueryParams,
    PatchTaskParams, PatchTaskRequestBody,
    Task
} from "@/types";
import {FetchTaskApi} from "../api/fetch-task.api.ts";
import {XhrTaskApi} from "../api/xhr-task.api.ts";

class TaskController {
    constructor(protected _taskApi: FetchTaskApi | XhrTaskApi) {
    }

    async createTask(body: CreateTaskRequestBody): Promise<Task | null> {
        try {
            const createdTask = await this._taskApi.createTask(body);
            console.log('созданная задача', createdTask);
            return createdTask;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getAllTasks(params?: FetchTasksQueryParams): Promise<Task[]> {
        try {
            const tasks = await this._taskApi.getAllTasks(params);
            console.log('все задачи', tasks);
            return tasks;
        }catch (e) {
            console.error(e);
            return [];
        }
    }

    async getTaskById(params: FetchTaskParams): Promise<Task | null> {
        try {
            const task =  await this._taskApi.getTaskById(params);
            console.log(`задача с id ${params.id}`, task);
            return task;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async updateTaskById(params: PatchTaskParams, body: PatchTaskRequestBody): Promise<Task | null> {
        try {
            const updatedTask = await this._taskApi.updateTaskById(params, body);
            console.log(`обновленная задача с id ${params.id}`, updatedTask);
            return updatedTask;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async deleteTaskById(params: DeleteTaskParams): Promise<Task | null> {
        try {
            const deletedTask = await this._taskApi.deleteTaskById(params);
            console.log(`удаленная задача с id ${params.id}`, deletedTask);
            return deletedTask;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

const fetchTaskApi = new FetchTaskApi()
// const xhrTaskApi = new XhrTaskApi()
export const taskController = new TaskController(fetchTaskApi)