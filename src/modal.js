function createModal(content) {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    content.insertBefore(modal, content.childNodes[0]);

    const modalContent = document.createElement("div");
    modalContent.setAttribute("id", "modalContent");
    modal.appendChild(modalContent);
}

export {createModal};