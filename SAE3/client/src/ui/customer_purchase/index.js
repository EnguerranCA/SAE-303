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

  for (let category of categories) {
    for (let product of data[category]) {
      console.log(product);

      let quantityFormated = Array(categories.length)
      .fill(0)
      .map((_, index) =>
        index === categories.indexOf(category) ? parseFloat(product.total_quantity) : 0
      );
      console.log(quantityFormated);

      let newProduct = {
        name: product.product_name,
        data: quantityFormated
      };
      products.push(newProduct);
      console.log(newProduct);
    }
  }


  await Highcharts.chart("client-order-category", {
    chart: {
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
