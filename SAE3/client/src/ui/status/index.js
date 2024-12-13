import {getRequest} from "../../lib/api-request.js";

const templateFile = await fetch("src/ui/status/template.html");
const template = await templateFile.text();


let StatusView = {};

StatusView.render = async function() {
    let data = await getRequest("order?stat=status");
    let v = document.createElement("div");
    let cells = '';

    for (const [title, number] of Object.entries(data)) {
        let cell = template.replace('{{title}}', title).replace('{{number}}', number);
        cells += cell;
    }

    v.innerHTML = cells;
    v.classList.add('cellule--split');
    
    return v.outerHTML;
}

export {StatusView};