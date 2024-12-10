// import de highcharts
// var Highcharts = require('../node_modules/highcharts/highcharts.js');


// import des composants
import { HeaderView } from "./ui/header/index.js";
import { StatusView } from "./ui/status/index.js";
import { TopProductsView } from "./ui/top_products/index.js";
import { MonthlySalesCategoryView } from "./ui/monthly_sales_category/index.js";
import { MonthlySalesProductView } from "./ui/monthly_sales_product/index.js";
import { SmallestStocksView } from "./ui/smallest_stocks/index.js";
import { MonthlySalesView } from "./ui/monthly_sales/index.js";


// import des data
import { ProductData } from "./data/product.js";


// import des méthodes 
import {getRequest, postRequest, deleteRequest } from "./lib/api-request.js";

let C = {};

C.init = async function(){
    await V.init();
    
    let productSelect = document.querySelector("#product-select");
    productSelect.addEventListener("change", C.handler_changeSelectProduct);
}

let V = {
    header: document.querySelector("#header"),
    data: document.querySelector("#data")

};

V.init = async function(){
    V.renderHeader();
    V.header.innerHTML = HeaderView.render();
    V.data.innerHTML = await StatusView.render();
    
    // rendu des zones pour les graphiques
    V.data.innerHTML += await TopProductsView.render();
    V.data.innerHTML += await MonthlySalesView.render();
    V.data.innerHTML += await MonthlySalesCategoryView.render();
    V.data.innerHTML += await SmallestStocksView.render();
    V.data.innerHTML += await MonthlySalesProductView.render(await ProductData.fetchNames());


    // affichage des graphiques
    MonthlySalesView.renderChart(await ProductData.fetchSales("6"));
    TopProductsView.renderChart(await ProductData.fetchTop(3, "2"));
    MonthlySalesCategoryView.renderChart(await ProductData.fetchSalesCategory("6"));
    MonthlySalesProductView.renderChart(await ProductData.fetchSalesProduct(1, "12"));
    SmallestStocksView.renderChart(await ProductData.fetchSmallestStocks(10));
}

V.renderHeader= async function(){
    
}

// Controlleurs 

// Changement de produit dans le select 
C.handler_changeSelectProduct = async function(){
    let product_id = document.querySelector("#product-select").value;
    MonthlySalesProductView.renderChart(await ProductData.fetchSalesProduct(product_id, "12"));
}

C.init();