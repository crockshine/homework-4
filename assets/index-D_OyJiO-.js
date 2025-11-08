(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const k="https://tasks-service-maks1394.amvera.io",g=n=>Object.fromEntries(Object.entries(n).map(([t,e])=>[t,e?.toString()]));class w{TASK_URL=k+"/tasks";async createTask(t){const e=await fetch(this.TASK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw{error:"Ошибка при создании задачи"};return await e.json()}async getAllTasks(t){const e=t?"?"+new URLSearchParams(g(t)):"",a=await fetch(`${this.TASK_URL}${e}`);if(!a.ok)throw new Error("Ошибка при получении всех задач");return await a.json()}async getTaskById(t){const e=await fetch(`${this.TASK_URL}/${t.id}`);if(!e.ok)throw new Error(`Ошибка при получении задачи с id = ${t.id}`);return await e.json()}async updateTaskById(t,e){const a=await fetch(`${this.TASK_URL}/${t.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok)throw new Error(`Ошибка при обновлении задачи с id = ${t.id}`);return await a.json()}async deleteTaskById(t){const e=await fetch(`${this.TASK_URL}/${t.id}`,{method:"DELETE"});if(!e.ok)throw new Error(`Ошибка при удалении задачи с id = ${t.id}`);return await e.json()}}class b{constructor(t){this._taskApi=t}async createTask(t){try{const e=await this._taskApi.createTask(t);return console.log("созданная задача",e),e}catch(e){return console.error(e),null}}async getAllTasks(t){try{const e=await this._taskApi.getAllTasks(t);return console.log("все задачи",e),e}catch(e){return console.error(e),[]}}async getTaskById(t){try{const e=await this._taskApi.getTaskById(t);return console.log(`задача с id ${t.id}`,e),e}catch(e){return console.error(e),null}}async updateTaskById(t,e){try{const a=await this._taskApi.updateTaskById(t,e);return console.log(`обновленная задача с id ${t.id}`,a),a}catch(a){return console.error(a),null}}async deleteTaskById(t){try{const e=await this._taskApi.deleteTaskById(t);return console.log(`удаленная задача с id ${t.id}`,e),e}catch(e){return console.error(e),null}}}const T=new w,i=new b(T),y=(n,t)=>{n.preventDefault();const e=new FormData(t),a=e.get("name"),s=e.get("info"),o=e.get("isImportant");return{name:a?a.toString():"",info:s?s.toString():"",isImportant:!!o,isCompleted:!1}},_=()=>{const n=document.createElement("form");n.className="edit-panel__form",n.id="create-form",n.innerHTML=`
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
    `,n?.addEventListener("submit",h);const t=document.getElementById("edit-panel");t&&(t.innerHTML=""),t?.appendChild(n)},E=n=>{const t=document.createElement("form");t.className="edit-panel__form",t.id="edit-form",t.innerHTML=`
            <h2>Редактирование</h2>

        <label for="name">
            Название задачи *
            <input type="text" id="name" name="name" required value="${n.name}"/>
        </label>

        <label for="info">Описание задачи
            <textarea id="info" name="info">${n.info||""}</textarea>
        </label>

        <label for="isImportant" class="checkbox">
            <input type="checkbox" name="isImportant" id="isImportant"  ${n.isImportant?"checked":""}/>
            Очень важно
        </label>

        <button type="submit">
            Сохранить изменения
        </button>
    `,t?.addEventListener("submit",async a=>{await A(a,t,n),_()});const e=document.getElementById("edit-panel");e&&(e.innerHTML=""),e?.appendChild(t)},I=n=>{const t=document.createElement("div");t.className="task",t.innerHTML=`
        <div class="task__head-info">
            <span class="task__id">${n.id}</span>
            <div>
                 ${n.isCompleted?"":'<button class="task__switch-state-button">Выполнить</button>'}
                <button class="task__edit-button">
                    Изменить
                </button>
                <button class="task__delete-button">
                    Удалить
                </button>
            </div>
        </div>
        
        <div class="task__empty-item"></div>
        <h3 class="task__name">${n.name}</h3>
        <p class="task__info">${n.info}</p>
        <div class="task-statuses">
            ${n.isImportant?'<span class="task-statuses__is-important">Очень важно</span>':""}
            ${n.isCompleted?'<span class="task-statuses__is-completed">Готово</span>':""}
        </div>
    `;const e=t.querySelector(".task__switch-state-button"),a=t.querySelector(".task__edit-button"),s=t.querySelector(".task__delete-button");return e?.addEventListener("click",async o=>{o.stopPropagation(),await S({id:n.id})}),a?.addEventListener("click",o=>{o.stopPropagation(),E(n)}),s?.addEventListener("click",async o=>{o.stopPropagation(),await x({id:n.id})}),t.addEventListener("click",async o=>{o.stopPropagation(),await C({id:n.id})}),t},L=n=>{const t=document.getElementById("task-list");t&&(t.innerHTML="",n.reverse().forEach(e=>{const a=I(e);t.appendChild(a)}))},c=document.getElementById("create-form");c&&c.addEventListener("submit",h);const m=document.getElementById("search-form");m&&m.addEventListener("submit",v);const p=document.getElementById("is-completed-checkbox");p&&p.addEventListener("change",$);const f=document.getElementById("is-important-checkbox");f&&f.addEventListener("change",B);window.addEventListener("DOMContentLoaded",async()=>{await d()});async function h(n){if(!c)return;const t=y(n,c),e=await i.createTask(t);await u(!!e)}let r={};const d=async n=>{const t=await i.getAllTasks(n);L(t)};async function v(n){if(!m)return;n.preventDefault();const e=new FormData(m).get("search");r&&(r.name_like=e?e.toString():""),await d(r)}async function B(n){const e=n.target.checked;if(r)if(e)r.isImportant=e;else{const{isImportant:a,...s}=r;r=s}await d(r)}async function $(n){const e=n.target.checked;if(r)if(e)r.isCompleted=e;else{const{isCompleted:a,...s}=r;r=s}await d(r)}async function u(n){n?(await d(),alert("Успешно!"),c?.reset()):alert("Произошла ошибка")}async function C(n){const t=await i.getTaskById(n);alert(t?`
        Название: ${t.name} 
        Описание: ${t.info}
        --------------------------------------

        ${t.isImportant?"Очень важно |":""} ${t.isCompleted?"Выполнено!":"Не выполнено"} 
            `:"Не получилось загрузить задачу")}async function S(n){const t=await i.updateTaskById(n,{isCompleted:!0});await u(!!t)}const A=async(n,t,e)=>{const a=y(n,t),s=await i.updateTaskById({id:e.id},{...a,isCompleted:e.isCompleted});await u(!!s)};async function x(n){const t=await i.deleteTaskById(n);await u(!!t)}
