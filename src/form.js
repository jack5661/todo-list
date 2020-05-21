function createForm(box, func) {
    const fieldset = document.createElement("fieldset");
    box.appendChild(fieldset);

    const legend = document.createElement("legend");
    legend.textContent = "Project";
    fieldset.appendChild(legend);

    const form = document.createElement("form");
    form.setAttribute("name", "projectInfo");
    fieldset.appendChild(form);

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Project Name";
    nameLabel.setAttribute("for", "Project Name");
    form.appendChild(nameLabel);

    const name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "projectName");
    name.required = true;
    form.appendChild(name);

    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));

    const descrLabel = document.createElement("label");
    descrLabel.textContent = "Description";
    descrLabel.setAttribute("for", "Project Description");
    form.appendChild(descrLabel);

    const descr = document.createElement("textarea");
    descr.setAttribute("id", "projectDescr");
    descr.style.verticalAlign = "top";
    descr.value = "";
    form.appendChild(descr);

    const miniBox = document.createElement("div");
    miniBox.setAttribute("style", "display: flex; justify-content: center; padding-top: 10px;");
    form.appendChild(miniBox);

    const submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.textContent = "Submit";
    submit.style.marginRight = "5px";
    form.onsubmit = () => {
        func(name.value, descr.value);
        document.querySelector("#modal").style.display = "none";
        form.reset();
        return false;
    };
    
    miniBox.appendChild(submit);

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "Cancel";
    cancel.style.marginLeft = "5px";
    cancel.onclick = () => {form.reset(); document.querySelector("#modal").style.display = "none";};
    miniBox.appendChild(cancel);
}

export default createForm;