import type {
    CreateTaskRequestBody,
    DeleteTaskParams,
    FetchTaskParams,
    FetchTasksQueryParams,
    PatchTaskParams, PatchTaskRequestBody,
    Task
} from "@/types";
import {BASE_URL} from "../constants/baseUrl.ts";
import {stringifyObject} from "../helpers/stringifyObject.ts";

interface HandleResponse<Res> {
    xhr: XMLHttpRequest;
    resolve: (value: Res | PromiseLike<Res>) => void,
    reject: (reason?: any) => void,
    errorMsg?: string
}

export class XhrTaskApi {
    TASK_URL: string = BASE_URL + '/tasks';

    private _handleResponse = <Res>({
                                        xhr,
                                        reject,
                                        errorMsg = 'Ошибка сети',
                                        resolve
                                    }: HandleResponse<Res>) => {
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({error: errorMsg});
            }
        };

        xhr.onerror = () => reject({error: errorMsg});
    }

    async createTask(body: CreateTaskRequestBody): Promise<Task> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.TASK_URL);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(body));

            this._handleResponse({xhr, reject, resolve, errorMsg: 'Ошибка при создании задачи'});
        });
    }

    async getAllTasks(params?: FetchTasksQueryParams): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            const queryParams = params ? '?' + new URLSearchParams(stringifyObject(params)) : '';

            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${this.TASK_URL}${queryParams}`);
            xhr.send();

            this._handleResponse({xhr, reject, resolve, errorMsg: 'Ошибка при получении всех задач'});
        });
    }

    async getTaskById(params: FetchTaskParams): Promise<Task> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${this.TASK_URL}/${params.id}`);
            xhr.send();

            this._handleResponse({xhr, reject, resolve, errorMsg: `Ошибка при получении задачи с id = ${params.id}`});
        });
    }

    async updateTaskById(params: PatchTaskParams, updatedTask: PatchTaskRequestBody): Promise<Task> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PATCH', `${this.TASK_URL}/${params.id}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(updatedTask));

            this._handleResponse({xhr, reject, resolve, errorMsg: `Ошибка при получении задачи с id = ${params.id}`});
        });
    }

    async deleteTaskById(params: DeleteTaskParams): Promise<Task> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `${this.TASK_URL}/${params.id}`);
            xhr.send();

            this._handleResponse({xhr, reject, resolve, errorMsg: `Ошибка при получении задачи с id = ${params.id}`});
        });
    }
}