import Highcharts from 'highcharts';


const templateFile = await fetch("src/ui/monthly_country_heatmap/template.html");
const template = await templateFile.text();

const topology = await fetch(
  "https://code.highcharts.com/mapdata/custom/europe.topo.json"
).then((response) => response.json());

let MonthlyCountryHeatmapView = {};

MonthlyCountryHeatmapView.renderChart = async function (data) {
  let coutryNames = [];
  let monthNames = [];
  let salesData = [];

  // Extraire les noms de pays et de mois
  data.forEach(item => {
    if (!coutryNames.includes(item.country)) {
      coutryNames.push(item.country);
    }
    if (!monthNames.includes(item.month)) {
      monthNames.push(item.month);
    }
  });

  // Range les noms de mois
  monthNames.sort();

  // On prépare es données pour la heatmap
  coutryNames.forEach((country, countryIndex) => {
    monthNames.forEach((month, monthIndex) => {
      let ordersCount = data.find(item => item.country === country && item.month === month)?.orders_count || 0;
      salesData.push([monthIndex, countryIndex, ordersCount]);
    });
  });


  Highcharts.chart('monthly-country-heatmap', {

    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },
  
  
    title: {
      text: 'Ventes par pays et par mois',
      style: {
        fontSize: '1em'
      }
    },
  
    xAxis: {
      categories: monthNames,
    },
  
    yAxis: {
      categories: coutryNames,
      title: null,
      reversed: true
    },
  
    accessibility: {
      point: {
        descriptionFormat: '{(add index 1)}. ' +
          '{series.xAxis.categories.(x)} sales ' +
          '{series.yAxis.categories.(y)}, {value}.'
      }
    },
  
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
  
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },
  
    tooltip: {
      format: '<b>{series.xAxis.categories.(point.x)}</b><br>' +
        '<b>{point.value}</b> articles vendus <br>' +
        '<b>{series.yAxis.categories.(point.y)}</b>'
    },
  
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: salesData,
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          yAxis: {
            labels: {
              format: '{substr value 0 1}'
            }
          }
        }
      }]
    }
  
  });
}

MonthlyCountryHeatmapView.render = async function () {
  let mapChart = template;
  return mapChart;
};

export { MonthlyCountryHeatmapView };
