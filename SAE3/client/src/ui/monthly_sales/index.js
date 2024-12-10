const templateFile = await fetch("src/ui/monthly_sales/template.html");
const template = await templateFile.text();


let MonthlySalesView = {};

MonthlySalesView.renderChart = async function(data){
    console.log(data);

    let productNames = [];
    let productValues = [];
    for (let product of data){
        productNames.push(product.product_name);
        productValues.push(product.quantity);
    }
    Highcharts.chart('monthly-sales', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ventes mensuelles'
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

MonthlySalesView.render = async function(){
    // let data = await getRequest("products/top"); 
    let topChart = template;
    document.getElementById('data').innerHTML = topChart;

    
    return topChart;
};



export {MonthlySalesView};