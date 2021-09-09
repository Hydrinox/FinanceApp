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
export class BudgetChartComponent implements OnChanges{  
  @Input() data;
  @ViewChild('pie') pie: any;
  chartInstance: any;
  pieChart;
  storeData: any;
  loading = true;
  theme: string | ThemeOption = 'dark';

  expenseOptions = { 
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
            data: [{ }],
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

  incomeOptions = {
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
      name: 'asdf' ,
      type: 'bar',
      barWidth: '95%',
      data: [{value: 1500, itemStyle: {color: '#00ff00 '}}, {value: 1100, itemStyle: {color: '#ff0000 '}}]
    }]
  };

  ngOnChanges(changes): void {
    this.storeData = { series: [changes.data.currentValue]};  
    console.log("pie element on changes", this.pie);
    if(changes.data.currentValue != undefined && changes.data.currentValue.length > 0){
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

