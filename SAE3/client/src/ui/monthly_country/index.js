import Highcharts from 'highcharts';   
import MapModule from 'highcharts/modules/map';
import HighchartsMore from 'highcharts/highcharts-more';
import DataModule from 'highcharts/modules/data';



const templateFile = await fetch("src/ui/monthly_country/template.html");
const template = await templateFile.text();

const topology = await fetch(
  "https://code.highcharts.com/mapdata/custom/europe.topo.json"
).then((response) => response.json());

let MonthlyCountryView = {};

MonthlyCountryView.renderChart = async function (data) {
  let coutryNames = [];
  let countrySales = [];

  for (let loopedCoutry of data) {
    coutryNames.push(loopedCoutry.country);
    countrySales.push(parseFloat(loopedCoutry.articles_count) || 0);
  }

  let csvFormatted = "Pays;Country Code;Value\n";
  const countryCodes = {
    Austria: "AUT",
    Denmark: "DNK",
    France: "FRA",
    Germany: "DEU",
    Greece: "GRC",
    Portugal: "PRT",
    Spain: "ESP",
    Sweden: "SWE",
    "United Kingdom": "GBR",
  };

  for (let i = 0; i < coutryNames.length; i++) {
    const countryCode = countryCodes[coutryNames[i]];
    if (countryCode) {
      csvFormatted +=
        coutryNames[i] + ";" + countryCode + ";" + countrySales[i] + "\n";
    }
  }

  Highcharts.mapChart("monthly-country", {
    chart: {
      map: topology,
    },

    title: {
      text: "Produits envoyés par pays",
      align: "left",
    },

    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    colorAxis: {
      min: 0,
    },

    legend: {
      layout: "vertical",
      align: "left",
      navigation: {
        enabled: false,
      },
    },

    data: {
      csv: csvFormatted,
      seriesMapping: [
        {
          code: 1,
          value: 2,
        },
      ],
    },

    tooltip: {
      valueDecimals: 0,
      valueSuffix: " articles envoyés",
    },

    series: [
      {
        name: "Articles envoyés",
        joinBy: ["iso-a3", "code"],
        dataLabels: {
          enabled: true,
          format: "{point.value:.0f}",
          filter: {
            operator: ">",
            property: "labelrank",
            value: 250,
          },
          style: {
            fontWeight: "normal",
          },
        },
      },
    ],
  });
};

MonthlyCountryView.render = async function () {
  let mapChart = template;
  return mapChart;
};

export { MonthlyCountryView };
