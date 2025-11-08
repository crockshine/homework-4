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

export class FetchTaskApi {
    TASK_URL: string = BASE_URL+'/tasks';

    async createTask(body: CreateTaskRequestBody): Promise<Task> {
        const response = await fetch(this.TASK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw {error: 'Ошибка при создании задачи'};
        }

        return await response.json();
    }

    async getAllTasks(params?: FetchTasksQueryParams): Promise<Task[]> {
        const queryParams = params ? '?' + new URLSearchParams(stringifyObject(params)) : '';
        const response = await fetch(`${this.TASK_URL}${queryParams}`)

        if (!response.ok) {
            throw new Error('Ошибка при получении всех задач');
        }

        return await response.json();
    }

    async getTaskById(params: FetchTaskParams): Promise<Task> {
        const response = await fetch(`${this.TASK_URL}/${params.id}`)
        if (!response.ok) {
            throw new Error(`Ошибка при получении задачи с id = ${params.id}` );
        }
        return await response.json();
    }

    async updateTaskById(params: PatchTaskParams, updatedTask: PatchTaskRequestBody): Promise<Task> {
        const response = await fetch(`${this.TASK_URL}/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })

        if (!response.ok) {
            throw new Error(`Ошибка при обновлении задачи с id = ${params.id}` );
        }

        return await response.json();
    }

    async deleteTaskById(params: DeleteTaskParams): Promise<Task> {
        const response = await fetch(`${this.TASK_URL}/${params.id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error(`Ошибка при удалении задачи с id = ${params.id}` );
        }

        return await response.json();
    }
}