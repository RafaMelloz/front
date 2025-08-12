import { Component, input, OnChanges, OnInit, ViewChild } from '@angular/core';
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
  ChartComponent,
} from 'ng-apexcharts';
import { Totals } from '../../shared/interfaces/totals';

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
})
export class EarningSpendingChartComponent implements OnInit, OnChanges {
  readonly totals = input<Totals[]>([]);
  public chartOptions!: ChartOptions;

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit called", this.totals());
    this.initChart();
  }

  ngOnChanges(): void {
    console.log("ngOnChanges called", this.totals());
    
    if (this.chartOptions) {
      this.updateChart();
    }
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: "Ganho",
          data: []
        },
        {
          name: "Gasto",
          data: []
        },
      ],
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        redrawOnParentResize: true,
        redrawOnWindowResize: true
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
        categories: [],
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

  updateChart() {
    const totalProfit = this.totals().map(item => item.profit || 0);
    const totalExpense = this.totals().map(item => item.expense || 0);
    const months = this.totals().map(item => item.date || '');

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Ganho",
          data: totalProfit
        },
        {
          name: "Gasto",
          data: totalExpense
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: months
      }
    };
  }
}

