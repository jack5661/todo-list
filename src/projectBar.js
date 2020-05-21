import todo from "./todo.js";
import {createModal} from "./modal.js";
import createForm from "./form.js";

function projectBar (barEle) {
    let projects = [];
    let delPath = "assets/icons8-trash-1.svg";
    let runTutorial = true;
    let toDo = todo();

    const _init = () => {
        const title = document.createElement("h1");
        title.textContent = "Projects";
        barEle.appendChild(title);

        const divider = document.createElement("div");
        divider.classList.add("divider");
        barEle.appendChild(divider);

        createModal(document.querySelector("#content"));
        createForm(document.querySelector("#modalContent"), createProject);

        addProjectBtn();

        if (storageAvailable("localStorage")) {
            projects = JSON.parse(localStorage.getItem("projects"));
            if (projects == undefined) {runTutorial = true; projects = []; }
            else {
                runTutorial = false;
                barEle.removeChild(document.querySelector("#addNew"));
                projects.forEach((project) => _addToBar(project));
                addProjectBtn();
            }

            console.log("Projects: " + projects);
        } else {
            alert("localStorage is unavailable, data won't be saved");
        }
    };

    const addProjectBtn = () => {
        const btn = document.createElement("div");
        btn.setAttribute("id", "addNew");
        btn.style.display = "flex";
        barEle.appendChild(btn);
        
        const plus = document.createElement("h2");
        btn.appendChild(plus);
        plus.textContent = "+";
        plus.classList.add("plus");
        
        const text = document.createElement("h2");
        text.textContent = "Add Project";
        text.style.marginLeft = "5px";
        btn.appendChild(text);

        btn.onclick = () => {
            document.querySelector("#modal").style.display = "block";
        };
    };

    const createProject = (projectName, desc) => {
        let proj =  {projectName, desc};
        projects.push(proj);
        barEle.removeChild(document.querySelector("#addNew"));
        _addToBar(proj);
        addProjectBtn();
        toDo.createProj(proj);
        if (runTutorial) {
            toDo.createTutorial();
            runTutorial = false;
        }
        localStorage.setItem("projects", JSON.stringify(projects));
        return proj;
    };

    const _addToBar = (proj) => {
        const box = document.createElement("div");
        box.classList.add("projectBox");
        barEle.appendChild(box);

        const title = document.createElement("h2");
        title.textContent = proj.projectName;
        box.appendChild(title);

        const del = document.createElement("IMG");
        box.appendChild(del);
        del.setAttribute("src", delPath);
        del.onclick = (e) => {
            const index = projects.indexOf(proj);
            projects.splice(index, 1);
            box.parentNode.removeChild(box);
            toDo.delToDo(proj);
            localStorage.setItem("projects", JSON.stringify(projects));
            e.stopPropagation();
        }
        
        box.onclick = () => {
            toDo.render(proj);
        };
    };


    _init();

    if (runTutorial) createProject("Tutorial", "Welcome to the tutorial!");

    return {
        createProject,
    };
}


//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export default projectBar;
