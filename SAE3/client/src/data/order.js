import {getRequest} from '../lib/api-request.js';


let OrderData = {};


OrderData.fetchMonthlyCountry = async function($month){
    let data = await getRequest('order?month=' + $month + '&stat=' + 'articles_country');
    return data;
}

OrderData.fetchCountryData = async function($month){
    let data = await getRequest('order?duration=' + $month + '&stat=' + 'country_data');
    return data;
}

export {OrderData};