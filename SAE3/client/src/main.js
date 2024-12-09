import { HeaderView } from "./ui/header/index.js";
import { StatusView } from "./ui/status/index.js";

// import des méthodes 
import {getRequest, postRequest, deleteRequest } from "./lib/api-request.js";

// import './index.css';


let C = {};

C.init = async function(){
    V.init();
}

let V = {
    header: document.querySelector("#header"),
    data: document.querySelector("#data")
};

V.init = function(){
    V.renderHeader();
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
    V.data.innerHTML = StatusView.render();
}


C.init();