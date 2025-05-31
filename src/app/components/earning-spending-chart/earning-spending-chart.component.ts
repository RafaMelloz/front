import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  NgApexchartsModule,
  ApexFill,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
} from 'ng-apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-earning-spending-chart',
  imports: [NgApexchartsModule],
  templateUrl: './earning-spending-chart.component.html',
  styleUrl: './earning-spending-chart.component.css'
})
export class EarningSpendingChartComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Ganho",
          data: [44, 55, 57]
        },
        {
          name: "Gasto",
          data: [76, 85, 100]
        },
      ],
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr"],
        labels: {
          style: {
            colors: "#fff"
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ["#16a34a", "#b91c1c"]
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          colors: ["#fff", "#fff"],
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "R$ " + val;
          }
        }
      }
    };
  }
}
