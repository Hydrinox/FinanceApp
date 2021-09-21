import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ThemeOption } from "ngx-echarts";
import 'echarts/theme/dark.js';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})
export class BudgetChartComponent implements OnChanges {
  @Input() expenseData;
  @Input() incomeData;
  expenseSum = 0;
  incomeSum = 0;

  @ViewChild('budgeting') chart: any;
  chartInstance: any;
  chartControl;
  loading = true;
  theme: string | ThemeOption = 'dark';

  budgetOptions = {
    backgroundColor: '',
    title: {
      text: this.incomeSum - this.expenseSum,
      left: 'center',
      textStyle: {
        color: 'white'
      }
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Income', 'Expenses'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Total',
      type: 'bar',
      barWidth: '95%',
      data: [{ value: '', itemStyle: { color: '#69f0ae' } }, { value: '', itemStyle: { color: '#ff4081' } }]
    }]
  };

  ngOnChanges(changes): void {
    //if expense data found, add each expense value to expenseSum (var used in chart)
    if (changes.expenseData && changes.expenseData.currentValue != undefined && changes.expenseData.currentValue.length > 0) {
      changes.expenseData.currentValue.forEach(element => {
        this.expenseSum += element.value;
      });
    }
    //if income data found, add each income value to incomeSum (var used in chart)
    if (changes.incomeData && changes.incomeData.currentValue != undefined && changes.incomeData.currentValue.length > 0) {
      changes.incomeData.currentValue.forEach(element => {
        switch (element.frequency) {
          case 'yearly':
            this.incomeSum += element.value / 12;
            break;
          case 'monthly':
            this.incomeSum += element.value;
            break;
          case 'biweekly':
            this.incomeSum += (element.value * 26) / 12;
            break;
          default:
            this.incomeSum += element.value;
            break;
        }
        this.incomeSum = Math.round(this.incomeSum);
      });
    }

    //sets color of total sum, green for positive red for negative
    let totalColor: string = Math.sign(this.incomeSum - this.expenseSum) > 0 ? '#69f0ae' : '#ff4081';

    setTimeout(() => {
      this.loading = false;
      this.chartControl = echarts.init(this.chart.nativeElement);
      this.chartControl.setOption({
        title: {
          text: `$${this.incomeSum - this.expenseSum}`,
          left: 'center',
          textStyle: {
            color: totalColor
          }
        },
        series:
        {
          data: [{ value: this.incomeSum, itemStyle: { color: '#69f0ae' } }, { value: this.expenseSum, itemStyle: { color: '#ff4081' } }]
        }
      }
      )
    }, 60)
  }


  onChartInit(e: any) {
    this.chartInstance = e;
    // console.log('on chart init:', e);
  }

  callMethod(type: string) {
    if (this.chartInstance) {
      const result = this.chartInstance[type]();
      console.log("this is result", result);
    }
  }
}

