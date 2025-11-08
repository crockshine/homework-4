import type {Task} from "@/types";
import {renderEditForm} from "./renderEditForm.ts";
import {completeTask, deleteTask, getTaskById} from "../main.ts";


const createTaskElement = (task: Task) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
        <div class="task__head-info">
            <span class="task__id">${task.id}</span>
            <div>
                 ${!task.isCompleted ? '<button class="task__switch-state-button">Выполнить</button>' : ''}
                <button class="task__edit-button">
                    Изменить
                </button>
                <button class="task__delete-button">
                    Удалить
                </button>
            </div>
        </div>
        
        <div class="task__empty-item"></div>
        <h3 class="task__name">${task.name}</h3>
        <p class="task__info">${task.info}</p>
        <div class="task-statuses">
            ${task.isImportant ? `<span class="task-statuses__is-important">Очень важно</span>` : ''}
            ${task.isCompleted ? `<span class="task-statuses__is-completed">Готово</span>` : ''}
        </div>
    `;

    const switchBtn = taskElement.querySelector('.task__switch-state-button') as HTMLButtonElement | null;
    const editBtn = taskElement.querySelector('.task__edit-button') as HTMLButtonElement | null;
    const deleteBtn = taskElement.querySelector('.task__delete-button') as HTMLButtonElement | null;

    switchBtn?.addEventListener('click', async (e) => {
        e.stopPropagation();
        await completeTask({
            id: task.id!,
        });
    });

    editBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        renderEditForm(task)
    });

    deleteBtn?.addEventListener('click',async (e) => {
        e.stopPropagation();
        await deleteTask({id: task.id!});
    });

    taskElement.addEventListener('click', async (e) => {
        e.stopPropagation();
        await getTaskById({id: task.id!})
    })
    return taskElement;
};

export const renderTaskList = (tasks: Task[]) => {
    const container = document.getElementById('task-list');
    if (!container) return

    container.innerHTML = ''
    tasks.reverse().forEach(task => {
        const taskElement = createTaskElement(task)
        container.appendChild(taskElement)
    });
};

