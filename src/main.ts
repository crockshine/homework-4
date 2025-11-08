import type {FetchTaskParams, FetchTasksQueryParams, PatchTaskParams, Task} from "@/types";
import {taskController} from "./controllers/task";
import {getFormFields} from "./helpers/getFormFields.ts";
import {renderTaskList} from "./ui/renderTaskList.ts";

// начальные обработчики
const createForm = document.getElementById("create-form") as HTMLFormElement | null;
if (createForm) createForm.addEventListener('submit', createTask)

const searchForm = document.getElementById("search-form") as HTMLFormElement | null;
if (searchForm) searchForm.addEventListener('submit', _handleSearch)

const isCompleteCheckbox = document.getElementById("is-completed-checkbox") as HTMLInputElement | null;
if (isCompleteCheckbox) isCompleteCheckbox.addEventListener('change', _handleSortByCompleted)

const isImportantCheckbox = document.getElementById("is-important-checkbox") as HTMLInputElement | null;
if (isImportantCheckbox) isImportantCheckbox.addEventListener('change', _handleSortByImportance)


window.addEventListener("DOMContentLoaded", async () => {
    await _getTaskList()
})

// запросы
// CREATE
export async function createTask(event: SubmitEvent) {
    if (!createForm) return

    const formData = getFormFields(event, createForm)
    const task = await taskController.createTask(formData)
    await getUpdatedTaskList(!!task)
}

// READ
let params: FetchTasksQueryParams = {}

const _getTaskList = async (params?: FetchTasksQueryParams) => {
    const tasks = await taskController.getAllTasks(params);
    renderTaskList(tasks);
}

async function _handleSearch (event: SubmitEvent){
    if (!searchForm) return
    event.preventDefault()

    const formData = new FormData(searchForm)
    const search = formData.get('search')

    if (params) params.name_like = search ? search.toString() : ''

    await _getTaskList(params)
}

async function _handleSortByImportance (event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    if (params) {
        if (isChecked) {
            params.isImportant = isChecked;
        } else {
            const {isImportant, ...rest} = params;
            params = rest;
        }
    }

    await _getTaskList(params)
}

async function _handleSortByCompleted (event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    if (params) {
        if (isChecked) {
            params.isCompleted = isChecked;
        } else {
            const {isCompleted, ...rest} = params;
            params = rest;
        }
    }

    await _getTaskList(params)
}


export async function getUpdatedTaskList(result: boolean) {
    if (result) {
        await _getTaskList()
        alert('Успешно!')
        createForm?.reset()
    } else {
        alert('Произошла ошибка')
    }
}

export async function getTaskById(params: FetchTaskParams) {
    const task = await taskController.getTaskById(params);
    if (task) {
        alert(
            `
        Название: ${task.name} 
        Описание: ${task.info}
        --------------------------------------

        ${task.isImportant ? 'Очень важно |' : ''} ${task.isCompleted ? 'Выполнено!' : 'Не выполнено'} 
            `
        )
    } else {
        alert('Не получилось загрузить задачу')
    }
}

// UPDATE
export async function completeTask(params: PatchTaskParams) {
    const task = await taskController.updateTaskById(params, {isCompleted: true})
    await getUpdatedTaskList(!!task)
}

export const updateTask = async (event: SubmitEvent, form: HTMLFormElement, task: Task) => {
    const formData = getFormFields(event, form)
    const updated = await taskController.updateTaskById(
        {id: task.id!},
        {...formData, isCompleted: task.isCompleted}
    )
    await getUpdatedTaskList(!!updated)
}

// DELETE
export async function deleteTask(params: PatchTaskParams) {
    const task = await taskController.deleteTaskById(params)
    await getUpdatedTaskList(!!task)
}


