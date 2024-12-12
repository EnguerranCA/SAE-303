import {getRequest} from '../lib/api-request.js';


let ProductData = {};


ProductData.fetchTop = async function(amount, duration){
    let data = await getRequest('product'+ "?amount=" + amount + "&duration=" + duration + "&stat=top");
    return data;
}

ProductData.fetchSales = async function(duration){
    let data = await getRequest('product' + "?duration=" + duration + "&stat=sales");
    return data;
}

ProductData.fetchSalesCategory = async function(duration){
    let data = await getRequest('product' + "?duration=" + duration + "&stat=sales_category");
    return data;
}

ProductData.fetchSalesProduct = async function(product_id, duration){
    let data = await getRequest('product' + "?product_id=" + product_id + "&duration=" + duration + "&stat=sales_product");
    return data;
}

ProductData.fetchSmallestStocks = async function(amount){
    let data = await getRequest('product' + "?amount=" + amount + "&stat=smallest_stocks");
    return data;
}

ProductData.fetchNames = async function(){
    let data = await getRequest('product');
    return data;
}

export {ProductData};