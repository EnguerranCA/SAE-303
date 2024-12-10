const templateFile = await fetch("src/ui/monthly_sales/template.html");
const template = await templateFile.text();


let MonthlySalesView = {};

MonthlySalesView.renderChart = async function(data){

    let monthName = [];
    let monthSales = [];
    for (let loopedMonth of data){
        monthName.push(loopedMonth.month);
        monthSales.push(parseFloat(loopedMonth.total_quantity) || 0);
    }

    Highcharts.chart('monthly-sales', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Ventes mensuelles'
        },
        xAxis: {
            categories: monthName
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Revenu mensuel',
            data: monthSales
        }]
    });
}

MonthlySalesView.render = async function(){
    // let data = await getRequest("products/top"); 
    let topChart = template;
    document.getElementById('data').innerHTML += topChart;

    
    return topChart;
};



export {MonthlySalesView};