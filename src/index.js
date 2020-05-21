import projectBar from "./projectBar.js";


const content = document.querySelector("#content");

const sideBar = document.createElement("div");
sideBar.setAttribute("id", "sideBar");
content.appendChild(sideBar);

const main = document.createElement("div");
main.setAttribute("id", "main");
content.appendChild(main);

const bar = projectBar(sideBar);

//$ npx webpack -d --mode development --watch
//npx webpack --watch
