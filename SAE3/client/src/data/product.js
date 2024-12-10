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

export {ProductData};