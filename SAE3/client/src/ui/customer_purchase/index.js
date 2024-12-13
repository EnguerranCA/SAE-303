import Highcharts from 'highcharts';   

const templateFile = await fetch("src/ui/customer_purchase/template.html");
const template = await templateFile.text();
const templateOptionFile = await fetch(
  "src/ui/customer_purchase/template_option.html"
);
const template_option = await templateOptionFile.text();

let CustomerOrderCategoryView = {};

CustomerOrderCategoryView.renderChart = async function (data) {
  let categories = [];
  categories = Object.keys(data);

  let products = [];

  // Liste des couleurs pour les catégories
  let colors = [
    ["#544fc5", "#7a73e0"],
    ["#00e272", "#4dffa6"],
    ["#fe6a35", "#ff9a73"],
    ["#d568fb", "#e29aff"],
    ["#2caffe", "#80eaff"],
  ];
  for (let category of categories) {
    // On choisit une couleur pour chaque catégorie
    for (let product of data[category]) {
      let currentColor =
        colors[categories.indexOf(category)][products.length % 2];

      let quantityFormated = Array(categories.length)
        .fill(0)
        .map((_, index) =>
          index === categories.indexOf(category)
            ? parseFloat(product.total_quantity)
            : 0
        );

      let newProduct = {
        name: product.product_name,
        data: quantityFormated,
        color: currentColor,
      };
      products.push(newProduct);
    }
  }

  await Highcharts.chart("client-order-category", {
    chart: {
      polar: true,
      type: "column",
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "Nombre de produits achetés par catégorie",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Unitées achetées",
      },
      stackLabels: {
        enabled: true,
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
        pointPadding: 0,
        groupPadding: 0
      },
    },
    series: products,
  });
};

CustomerOrderCategoryView.render = async function (data) {
  let topChart = template;

  let optionsFormatted = "";
  for (let option of data) {
    let newOption = template_option.replace("{{id}}", option.id);
    newOption = newOption.replace("{{id}}", option.id);

    newOption = newOption.replace("{{name}}", option.name);
    optionsFormatted += newOption;
  }

  topChart = topChart.replace("{{option}}", optionsFormatted);

  document.getElementById("data").innerHTML += topChart;

  return topChart;
};

export { CustomerOrderCategoryView };
