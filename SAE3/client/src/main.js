// import de highcharts
// var Highcharts = require('../node_modules/highcharts/highcharts.js');


// import des composants
import { HeaderView } from "./ui/header/index.js";
import { StatusView } from "./ui/status/index.js";
import { TopProductsView } from "./ui/top_products/index.js";
import { MonthlySalesCategoryView } from "./ui/monthly_sales_category/index.js";
import { SmallestStocksView } from "./ui/smallest_stocks/index.js";
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
    
    // rendu des zones pour les graphiques
    V.data.innerHTML += await TopProductsView.render();
    V.data.innerHTML += await MonthlySalesView.render();
    V.data.innerHTML += await MonthlySalesCategoryView.render();
    V.data.innerHTML += await SmallestStocksView.render();


    // affichage des graphiques
    MonthlySalesView.renderChart(await ProductData.fetchSales("6"));
    TopProductsView.renderChart(await ProductData.fetchTop(3, "2"));
    MonthlySalesCategoryView.renderChart(await ProductData.fetchSalesCategory("6"));
    SmallestStocksView.renderChart(await ProductData.fetchSmallestStocks(10));
}

C.init();