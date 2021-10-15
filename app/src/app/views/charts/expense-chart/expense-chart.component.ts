import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import 'echarts/theme/dark.js';
import { ThemeOption } from 'ngx-echarts';



@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css']
})
export class ExpenseChartComponent implements OnChanges {
  @Input() data;
  @ViewChild('pie') pie: any;
  chartInstance: any;
  pieChart;
  loading = true;
  theme: string | ThemeOption = 'dark';

  expenseOptions = {
    backgroundColor: '',
    tooltip: {
      trigger: 'item',
      formatter: '{b} : ${c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: []
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [{ name: 'Expenses', value: 0 }],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  constructor() { }

  ngOnChanges(changes): void {
    if (changes.data.currentValue != undefined && changes.data.currentValue.length > 0) {
      this.loading = false;
      setTimeout(() => {
        this.pieChart = echarts.init(this.pie.nativeElement);
        this.pieChart.setOption({
          series:
          {
            data: changes.data.currentValue
          }
        }
        )
      }, 60)

    }
  }

  editExpense(event: any, type: string) {
    console.log('chart event:', type, event);
  }
}
