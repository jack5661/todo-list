function todo() {
    const main = document.querySelector("#main");
    let currProject;

    let projects = JSON.parse(localStorage.getItem("todos"));


    const createProj = (proj) => {
        let project = Object.assign({}, proj);

        project.high = [];
        project.med = [];
        project.low = [];

        projects.push(project);
        localStorage.setItem("todos", JSON.stringify(projects));
        render(proj);
    };

    const createTutorial = () => {
        const project = _findToDo({projectName: "Tutorial", desc: "Welcome to the tutorial!",});

        const date = new Date();
        const today = date.getMonth() + "-" + date.getDay() + "-" + date.getFullYear();

        let task1 = {};
        task1.task = "Welcome to my to-do List!";
        task1.date = today;
        project.high.push(task1);

        let task2 = {};
        task2.task = "Access other projects throught the sidebar. Create new projects by pressing \"Add Project\"."
        task2.date = today;
        project.high.push(task2);

        let task3 = {};
        task3.task = "Create todo's for your project by pressing \"Add Task\". Todo's will be sorted here in the main section and will be color coded";
        task3.date = today;
        project.high.push(task3);

        let task4 = {};
        task4.task = "High priority todo's will be red";
        task4.date = today;
        project.high.push(task4);

        let task5 = {};
        task5.task = "Medium priority todo's will be yellow";
        task5.date = today;
        project.med.push(task5);

        let task6 = {};
        task6.task = "Low priority todo's will be blue";
        task6.date = today;
        project.low.push(task6);

        localStorage.setItem("todos", JSON.stringify(projects));
        render(project);
    }

    const render = (proj) => {
        _clearContent();

        const project = _findToDo(proj);
        currProject = project;

        const title = document.createElement("h2");
        title.textContent = project.projectName;
        main.appendChild(title);

        const descr = document.createElement("h3");
        
        descr.textContent = project.desc;
        main.appendChild(descr);

        const divider = document.createElement("div");
        divider.classList.add("divider");
        main.append(divider); 

        _addToDoBtn();

        project.high.forEach((task) => _renderToDos(task, "High"));
        project.med.forEach((task) => _renderToDos(task, "Medium"));
        project.low.forEach((task) => _renderToDos(task, "Low"));

    };

    const delToDo = (proj) => {
        const project = _findToDo(proj);
        const index = projects.indexOf(project);
        projects.splice(index, 1);
        const last = projects[projects.length - 1];

        if (last == undefined) {
            _clearContent();
            localStorage.setItem("todos", JSON.stringify(projects));
            return;
        }

        localStorage.setItem("todos", JSON.stringify(projects));
        render({projectName: last.projectName, desc: last.desc,});
    };

    const _findToDo = (proj) => {
        return projects.filter((x) =>  proj.projectName == x.projectName && proj.desc == x.desc)[0];
    };

    const _clearContent = () => {
        while (main.firstChild) {
            main.removeChild(main.lastChild);
        }
    };

    const _renderToDos = (todo, priority) => {
        const box = document.createElement("div");
        box.classList.add("todo");
        box.classList.add(priority);
        main.append(box);

        const checkCircle = document.createElement("div");
        checkCircle.classList.add("checkCircle");
        box.appendChild(checkCircle);
        
        const text = document.createElement("h4");
        text.textContent = todo.task;
        text.classList.add("toDoText");
        box.append(text);

        const date = document.createElement("h4");
        date.classList.add("dates");
        date.textContent = todo.date;

        const delBtn = document.createElement("h4");
        delBtn.classList.add("delBtn");
        delBtn.textContent = "X";
        box.appendChild(delBtn);
        box.appendChild(date);

        const divider = document.createElement("div");
        divider.classList.add("divider");
        divider.setAttribute("style", "display: inline-block; height: 2px; margin-top: 10px;")
        main.appendChild(divider);

        if (todo.done) {
            checkCircle.textContent = "✔";
            checkCircle.style.backgroundColor = "#d1f8cd";
            text.style.textDecoration = "line-through";
        }

        checkCircle.onclick = () => {
            if (todo.done) { 
                checkCircle.textContent = ""; 
                checkCircle.style.backgroundColor = "";
                text.style.textDecoration = "";
            } else { 
                checkCircle.textContent = "✔";
                checkCircle.style.backgroundColor = "#d1f8cd";
                text.style.textDecoration = "line-through";
            }

            todo.done = !todo.done;
            localStorage.setItem("todos", JSON.stringify(projects));
        };

        delBtn.onclick = () => {
            if (priority == "High") { const index = currProject.high.indexOf(todo); currProject.high.splice(index, 1);}
            else if (priority == "Medium") {const index = currProject.med.indexOf(todo); currProject.med.splice(index, 1);}
            else {const index = currProject.low.indexOf(todo); currProject.low.splice(index, 1);}

            localStorage.setItem("todos", JSON.stringify(projects));
            render(currProject);
        }

    };

    const _addToDoBtn = () => {
        const box = document.createElement("div");
        box.setAttribute("class", "addToDoBtn");
        const firstToDo = document.querySelector(".todo");
        if (firstToDo == undefined)
            main.appendChild(box);
        else 
            main.insertBefore(box, firstToDo);

        const plus = document.createElement("h4");
        plus.textContent = "+";
        plus.setAttribute("style", "color: red; transform: scale(2.5);")
        box.appendChild(plus);

        const text = document.createElement("h4");
        text.textContent = "Add Task";
        text.style.transform = "scale(1.4)";
        box.appendChild(text);

        box.onclick = () => {
            box.setAttribute("class", "addToDo");
            box.onclick = () => {};
            while (box.firstChild) box.removeChild(box.lastChild);

            const form = document.createElement("form");
            form.name = "toDoInfo";
            box.appendChild(form);

            const inputs = document.createElement("div");
            form.appendChild(inputs);

            const toDoDesc = document.createElement("input");
            toDoDesc.setAttribute("type", "text");
            toDoDesc.id = "toDoDesc";
            toDoDesc.placeholder = "Enter ToDo Task:";
            toDoDesc.setAttribute("style", "width: 68%;");
            toDoDesc.required = true;
            inputs.appendChild(toDoDesc);

            const priorityLabel = document.createElement("label");
            inputs.appendChild(priorityLabel);
            priorityLabel.style.paddingLeft = "5px";
            priorityLabel.textContent = "Priority:";
            priorityLabel.for = "Priority";

            const priority = document.createElement("select");
            inputs.appendChild(priority);
            priority.requied = true;
            const _createOption = (value) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                priority.appendChild(option);
            };
            _createOption("High");
            _createOption("Medium");
            _createOption("Low");

            const date = document.createElement("input");
            date.type = "date";
            date.setAttribute("style", "float: right;");
            date.required = true;
            inputs.appendChild(date);

            const buttons = document.createElement("div");
            buttons.setAttribute("style", "margin-top: 10px;");
            form.appendChild(buttons);

            const submit = document.createElement("button");
            submit.type = "submit";
            submit.textContent = "Submit";
            submit.setAttribute("style", "margin-right: 10px;");
            buttons.appendChild(submit);

            const cancel = document.createElement("button");
            cancel.type = "button";
            cancel.textContent = "Cancel";
            buttons.appendChild(cancel);

            cancel.onclick = () => {main.removeChild(box); _addToDoBtn();};

            toDoInfo.onsubmit = () => {
                const priority = document.toDoInfo[1].value;

                const toDo = {task: document.toDoInfo[0].value, date: document.toDoInfo[2].value, done: false,};

                if (priority == "High") currProject.high.push(toDo);
                else if (priority == "Medium") currProject.med.push(toDo);
                else currProject.low.push(toDo);

                main.removeChild(box);
                _addToDoBtn();

                render(currProject);

                localStorage.setItem("todos", JSON.stringify(projects));

                return false;
            }
        }
    };

    if (projects == undefined) 
        projects = [];
    else if (projects.length != 0) {
        let first = projects[0];
        render({projectName: first.projectName, desc: first.desc,});
    }

    return {
        createProj,
        render,
        delToDo,
        createTutorial,
    }
}

export default todo;