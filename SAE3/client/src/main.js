// import des composants
import { HeaderView } from "./ui/header/index.js";
import { StatusView } from "./ui/status/index.js";
import { TopProductsView } from "./ui/top_products/index.js";
import { MonthlySalesView } from "./ui/monthly_sales/index.js";

// import des data
import { ProductData } from "./data/product.js";


// import des méthodes 
import {getRequest, postRequest, deleteRequest } from "./lib/api-request.js";



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

V.renderHeader= async function(){
    V.header.innerHTML = HeaderView.render();
    V.data.innerHTML = await StatusView.render();
    
    V.data.innerHTML += await TopProductsView.render();
    TopProductsView.renderChart(await ProductData.fetchTop(3, "2"));

    V.data.innerHTML += await MonthlySalesView.render();
    MonthlySalesView.renderChart(await ProductData.fetchSales("6"));
}

C.init();