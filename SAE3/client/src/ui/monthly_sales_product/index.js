const templateFile = await fetch("src/ui/monthly_sales_product/template.html");
const template = await templateFile.text();
const templateOptionFile = await fetch("src/ui/monthly_sales_product/template_option.html");
const template_option = await templateOptionFile.text();


let MonthlySalesProductView = {};

MonthlySalesProductView.renderChart = async function(data){

    let monthName = [];
    let monthSales = [];
    for (let loopedMonth of data){
        monthName.push(loopedMonth.month);
        monthSales.push(parseFloat(loopedMonth.total_sales) || 0);
    }

    Highcharts.chart('monthly-sales-product', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Ventes mensuelles'
        },
        xAxis: {
            categories: monthName
        },
        yAxis: {
            title: {
                text: 'Unités vendues'
            }
        },
        series: [{
            name: 'Quantité vendue',
            data: monthSales
        }]
    });
}

MonthlySalesProductView.render = async function(data){
    let topChart = template;

    let optionsFormatted = "";
    for (let option of data){
        let newOption = template_option.replace("{{id}}", option.id);
        newOption = newOption.replace("{{id}}", option.id);

        newOption = newOption.replace("{{product_name}}", option.product_name);
        optionsFormatted += newOption;
    }


    topChart = topChart.replace("{{option}}", optionsFormatted);
    

    document.getElementById('data').innerHTML += topChart;

    
    return topChart;
};



export {MonthlySalesProductView};