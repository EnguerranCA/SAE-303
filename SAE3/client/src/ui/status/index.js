import {getRequest} from "../../lib/api-request.js";

const templateFile = await fetch("src/ui/status/template.html");
const template = await templateFile.text();


let StatusView = {};

StatusView.render = function(){
    console.log(getRequest("order/status"));
    const data = {"Delivered": 1557, "Pending": 155, "Shipped": 288};
    let cells = '';

    for (const [title, number] of Object.entries(data)) {
        let cell = template.replace('{{title}}', title).replace('{{number}}', number);
        cells += cell;
    }

    return cells;
}

export {StatusView};