import type {Task} from "@/types";
import {updateTask} from "../main.ts";
import {renderCreateForm} from "./renderCreateForm.ts";


export const renderEditForm = (selectedTask: Task) => {
    const editFormElement = document.createElement('form');
    editFormElement.className = 'edit-panel__form';
    editFormElement.id = 'edit-form';

    editFormElement.innerHTML = `
            <h2>Редактирование</h2>

        <label for="name">
            Название задачи *
            <input type="text" id="name" name="name" required value="${selectedTask.name}"/>
        </label>

        <label for="info">Описание задачи
            <textarea id="info" name="info">${selectedTask.info || ''}</textarea>
        </label>

        <label for="isImportant" class="checkbox">
            <input type="checkbox" name="isImportant" id="isImportant"  ${selectedTask.isImportant ? 'checked' : ''}/>
            Очень важно
        </label>

        <button type="submit">
            Сохранить изменения
        </button>
    `;

    editFormElement?.addEventListener('submit', async (e) => {
        await updateTask(e, editFormElement, selectedTask);
        renderCreateForm()
    })

    // подставить новую форму
    const editPanel = document.getElementById('edit-panel')
    if (editPanel) editPanel.innerHTML = ''
    editPanel?.appendChild(editFormElement);
}