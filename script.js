const entradaTarea = document.getElementById("entradaTarea");
const agregarTareas = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");
const eliminarTareasCompletadas = document.getElementById("eliminarCompletadas");
const todasTareas = document.getElementById("mostrarTodas");
const tareasPendientes = document.getElementById("mostrarPendientes");
const tareasCompletadas = document.getElementById("mostrarCompletadas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas(filtro = "todas") {
    listaTareas.innerHTML = "";
    let tareasFiltradas = tareas.filter(tarea => {
        if (filtro === "pendientes") {
            return !tarea.completada;
        } 
        
        if (filtro === "completadas") {
            return tarea.completada; 
        } 
        
        return true; 
    });

    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completada", tarea.completada);
        li.innerHTML = `
            ${tarea.texto} <br>
            <small>Creado: ${tarea.creado}</small>
            ${tarea.completado ? `<br><small>Completado: ${tarea.completado}</small>` : ""}
            <div>
                <button onclick="completarTarea(${index})">✔</button>
                <button onclick="eliminarTarea(${index})">❌</button>
            </div>
        `;
        listaTareas.appendChild(li);
    });
}

agregarTareas.addEventListener("click", () => {
    if (entradaTarea.value.trim() === "") return;
    tareas.push({
        texto: entradaTarea.value,
        completada: false,
        creado: new Date().toLocaleString(),
        completado: null
    });
    entradaTarea.value = "";
    guardarTareas();
    mostrarTareas();
});

function completarTarea(index) {
    let tarea = tareas[index];
    tarea.completada = !tarea.completada;  
    tarea.completado = tarea.completada ? new Date().toLocaleString() : null;  

    guardarTareas();
    mostrarTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
}

eliminarTareasCompletadas.addEventListener("click", () => {
    tareas = tareas.filter(tarea => !tarea.completada);
    guardarTareas();
    mostrarTareas();
});

todasTareas.addEventListener("click", () => mostrarTareas("todas"));
tareasPendientes.addEventListener("click", () => mostrarTareas("pendientes"));
tareasCompletadas.addEventListener("click", () => mostrarTareas("completadas"));

mostrarTareas();
