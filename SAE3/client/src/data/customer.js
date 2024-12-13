import {getRequest} from '../lib/api-request.js';


let CustomerData = {};


CustomerData.fetchOrdersCategory = async function(id){
    let data = await getRequest('customer/' + id);
    return data;
}

CustomerData.fetchNames = async function(){
    let data = await getRequest('customer');
    return data;
}


export {CustomerData};