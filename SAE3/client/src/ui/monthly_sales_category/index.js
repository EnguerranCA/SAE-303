const templateFile = await fetch("src/ui/monthly_sales_category/template.html");
const template = await templateFile.text();

let MonthlySalesCategoryView = {};

MonthlySalesCategoryView.renderChart = async function (data) {
  console.log(data);

  let categories = [];
  // let category = {
  //     name: "Category",
  //     data: []
  // }

  //   On récupère les données de chaque catégorie
  for (let loopedCategory of data) {
    let loopedSales = [];
    for (let loopedMonth of loopedCategory) {
      loopedSales.push(parseFloat(loopedMonth.total_quantity) || 0);
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

  console.log(categories);

  Highcharts.chart("monthly-sales-category", {
    chart: {
      type: "spline",
    },
    title: {
      text: "Ventes mensuelles par catégories",
    },
    xAxis: {
      categories: monthName,
    },
    yAxis: {
      title: {
        text: "Nombre de ventes",
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
