(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();class c{constructor(){this.tasks=[],this.taskInput=document.getElementById("task-input"),this.todoList=document.getElementById("todo-list"),this.setupEventListeners()}setupEventListeners(){this.taskInput.addEventListener("keypress",s=>{if(s.key==="Enter"){const r=this.taskInput.value.trim();r&&(this.addTask(r),this.taskInput.value="")}})}addTask(s){const r={id:Date.now(),text:s,completed:!1};this.tasks.push(r),this.renderTasks()}renderTasks(){this.todoList.innerHTML="";const s=this.tasks.filter(n=>!n.completed),r=this.tasks.filter(n=>n.completed);[...s,...r].forEach(n=>this.renderTask(n))}renderTask(s){const r=document.createElement("div");r.className="task-item";const n=document.createElement("input");n.type="checkbox",n.className="task-checkbox",n.checked=s.completed,n.addEventListener("change",()=>{s.completed=n.checked,this.renderTasks()});const e=document.createElement("span");e.className="task-label",e.textContent=s.text,e.setAttribute("contenteditable","true"),e.addEventListener("click",t=>{t.target.focus()}),e.addEventListener("blur",()=>{const t=e.textContent.trim();t!==s.text&&(t?s.text=t:this.tasks=this.tasks.filter(i=>i.id!==s.id),this.renderTasks())}),e.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e.blur())}),r.appendChild(n),r.appendChild(e),this.todoList.appendChild(r)}}new c;
