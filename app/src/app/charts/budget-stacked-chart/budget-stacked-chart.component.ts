import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import 'echarts/theme/dark.js';
import { ThemeOption } from "ngx-echarts";

@Component({
  selector: 'app-budget-stacked-chart',
  templateUrl: './budget-stacked-chart.component.html',
  styleUrls: ['./budget-stacked-chart.component.css']
})
export class BudgetStackedChartComponent implements OnChanges {
  @Input() expenseData;
  @Input() incomeData;
  expenseSum = 0;
  incomeSum = 0;
  expenseChartObj = [];

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
      trigger: 'item',
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
      name: 'expense',
      data: null,
      type: 'bar',
      stack: '2',
    }]
  };

  ngOnChanges(changes): void {
    //if expense data found, add each expense value to expenseSum (var used in chart)
    if (changes.expenseData && changes.expenseData.currentValue != undefined && changes.expenseData.currentValue.length > 0) {
      this.expenseSum = 0;
      changes.expenseData.currentValue.forEach(element => {
        this.expenseSum += element.value;
      });

      //dynamically create data objects for chart expense series
      this.expenseChartObj = [];
      for (let i = 0; i < this.expenseData.length; i++) {
        this.expenseChartObj[i] = {
          name: this.expenseData[i].name,
          data: [, this.expenseData[i].value],
          type: 'bar',
          stack: '2',
        }
      }
      this.expenseChartObj.unshift({
        name: 'Income',
        data: [{ value: this.incomeSum, itemStyle: { color: '#69f0ae' } }],
        type: 'bar',
        stack: '2'
      });
    }


    //if income data found, add each income value to incomeSum (var used in chart)
    if (changes.incomeData && changes.incomeData.currentValue != undefined) {
      const incomeData = changes.incomeData.currentValue;
      switch (incomeData.frequency) {
        case 'yearly':
          this.incomeSum = incomeData.value / 12;
          break;
        case 'monthly':
          this.incomeSum = incomeData.value;
          break;
        case 'biweekly':
          this.incomeSum = (incomeData.value * 26) / 12;
          break;
        default:
          this.incomeSum = incomeData.value;
          break;
      }
      this.incomeSum = Math.round(this.incomeSum);

      //insert income into left bar in chart
      this.expenseChartObj.shift();
      this.expenseChartObj.unshift({
        name: 'Income',
        data: [{ value: this.incomeSum, itemStyle: { color: '#69f0ae' } }],
        type: 'bar',
        stack: '2'
      });
    }

    //sets color of total sum, green for positive red for negative
    let totalColor: string = Math.sign(this.incomeSum - this.expenseSum) > 0 ? '#69f0ae' : '#ff4081';
    let totalSum = this.incomeSum - this.expenseSum;

    //had to create this stupid options variable with options re-set because of clear set to true in 'setOptions' method below
    let options = {
      backgroundColor: '',
      title: {
        text: `$${totalSum}`,
        left: 'center',
        textStyle: {
          color: totalColor
        }
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'item',
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
      series: this.expenseChartObj
    };


    setTimeout(() => {
      this.loading = false;
      this.chartControl = echarts.init(this.chart.nativeElement);
      //causes whole chart to load animation on every action
      //this.chartControl.clear();
      this.chartControl.setOption(options, true
      )
    }, 60)
  }
}