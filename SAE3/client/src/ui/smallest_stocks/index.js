import Highcharts from 'highcharts';   


const templateFile = await fetch("src/ui/smallest_stocks/template.html");
const template = await templateFile.text();

let SmallestStocksView = {};

SmallestStocksView.renderChart = async function (data) {
  let productNames = [];
  let productStocks = [];
  for (let product of data) {
    productNames.push(product.product_name);
    productStocks.push(parseFloat(product.stock) || 0);
  }
  Highcharts.chart("smallest-stocks", {

    chart: {
      // polar: true,
      type: "column"
    },
    title: {
      text: "Stocks les plus faibles",
    },
    xAxis: {
      categories: productNames,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },
    series: [
      {
        name: "Stock restant",
        data: productStocks,
        color: "#00e272",
      },
    ],
  });
};

SmallestStocksView.render = async function () {
  // let data = await getRequest("products/top");
  let topChart = template;
  document.getElementById("data").innerHTML = topChart;

  return topChart;
};

export { SmallestStocksView };
