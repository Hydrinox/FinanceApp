import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-retirement-chart',
  templateUrl: './retirement-chart.component.html',
  styleUrls: ['./retirement-chart.component.css']
})
export class RetirementChartComponent implements OnInit {

  @ViewChild('line') line: any;
  chartInstance: any;
  pieChart;
  storeData: any;

  options = { 
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
            data: [{ name: 'train', value: 100}],
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

  ngOnInit(): void {

  }
}
