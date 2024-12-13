import {getRequest} from '../lib/api-request.js';


let OrderData = {};


OrderData.fetchMonthlyCountry = async function($month){
    let data = await getRequest('order?month=' + $month + '&stat=' + 'articles_country');
    return data;
}

export {OrderData};