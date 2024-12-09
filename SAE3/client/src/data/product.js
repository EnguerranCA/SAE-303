import {getRequest} from '../lib/api-request.js';


let ProductData = {};


ProductData.fetchTop = async function(amount, duration){
    let data = await getRequest('product/top'+ "?amount=" + amount + "&duration=" + duration);
    return data;
}

export {ProductData};