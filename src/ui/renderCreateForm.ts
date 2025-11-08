import {createTask} from "../main.ts";


export const renderCreateForm = () => {
    const createFormElement = document.createElement('form');
    createFormElement.className = 'edit-panel__form';
    createFormElement.id = 'create-form';

    createFormElement.innerHTML = `
            <h2>Создание</h2>
            <label for="name">
                Название задачи *
                <input type="text" id="name" name="name" required/>
            </label>

            <label for="info">Описание задачи
                <textarea id="info" name="info"></textarea>
            </label>

            <label for="isImportant" class="checkbox">
                <input type="checkbox" name="isImportant" id="isImportant">
                Очень важно
            </label>

            <button type="submit">
                Создать
            </button>
    `;

    createFormElement?.addEventListener('submit', createTask)

    // подставить новую форму
    const editPanel = document.getElementById('edit-panel')
    if (editPanel) editPanel.innerHTML = ''
    editPanel?.appendChild(createFormElement);
}