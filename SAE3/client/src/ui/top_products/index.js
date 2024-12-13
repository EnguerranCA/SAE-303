import Highcharts from 'highcharts';   


const templateFile = await fetch("src/ui/top_products/template.html");
const template = await templateFile.text();


let TopProductsView = {};

TopProductsView.renderChart = async function(data){

    let productNames = [];
    let productValues = [];
    for (let product of data){
        productNames.push(product.product_name);
        productValues.push(parseFloat(product.total_quantity) || 0);
    }
    Highcharts.chart('top-products', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Meilleurs produits'
        },
        xAxis: {
            categories: productNames
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Quantité vendue',
            data: productValues
        }]
    });
}

TopProductsView.render = async function(){
    // let data = await getRequest("products/top"); 
    let topChart = template;
    document.getElementById('data').innerHTML = topChart;

    
    return topChart;
};



export {TopProductsView};