import {getRequest} from '../lib/api-request.js';


let ProductData = {};


ProductData.fetchTop = async function(amount, duration){
    let data = await getRequest('product/top'+ "?amount=" + amount + "&duration=" + duration);
    return data;
}

ProductData.fetchSales = async function(duration){
    let data = await getRequest('product/sales' + "?duration=" + duration);
    return data;
}

ProductData.fetchSalesCategory = async function(duration){
    let data = await getRequest('product/sales' + "?duration=" + duration + "&category=true");
    return data;
}

ProductData.fetchSalesProduct = async function(product_id, duration){
    let data = await getRequest('product/sales' + "?product_id=" + product_id + "&duration=" + duration);
    return data;
}

ProductData.fetchSmallestStocks = async function(amount){
    let data = await getRequest('product/stock' + "?amount=" + amount);
    return data;
}

ProductData.fetchNames = async function(){
    let data = await getRequest('product');
    return data;
}

export {ProductData};