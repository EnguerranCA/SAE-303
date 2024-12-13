import Highcharts from 'highcharts';   

const templateFile = await fetch("src/ui/monthly_sales_category/template.html");
const template = await templateFile.text();

let MonthlySalesCategoryView = {};

MonthlySalesCategoryView.renderChart = async function (data) {

  let categories = [];
  //   On récupère les données de chaque catégorie
  for (let loopedCategory of data) {
    let loopedSales = [];
    for (let loopedMonth of loopedCategory) {
      loopedSales.push(parseFloat(loopedMonth.total_sales) || 0);
    }

    let newCategory = {
      name: loopedCategory[0].category_name,
      data: loopedSales,
    };

    categories.push(newCategory);
  }

  //  On récupère les mois
  let monthName = [];
  for (let loopedMonth of data[0]) {
    monthName.push(loopedMonth.month);
  }


  Highcharts.chart("monthly-sales-category", {
    chart: {
      type: "spline",
    },
    title: {
      text: "Revenu mensuel par catégories",
    },
    xAxis: {
      categories: monthName,
    },
    yAxis: {
      title: {
        text: "Revenu en €",
      },
    },
    series: categories,
  });
};

MonthlySalesCategoryView.render = async function () {
  // let data = await getRequest("products/top");
  let topChart = template;
  document.getElementById("data").innerHTML += topChart;

  return topChart;
};

export { MonthlySalesCategoryView };

// //  On récupère les mois
// let monthName = [];
// for (let loopedMonth of data[0]){
//     monthName.push(loopedMonth.month);
// }

// Highcharts.chart("monthly-sales-category", {
// chart: {
//   type: "column",
// },
// title: {
//   text: "Ventes mensuelles",
// },
// xAxis: {
//   categories: monthName,
// },
// yAxis: {
//   title: {
//     text: "",
//   },
// },
// series: categories,
// });
// };
