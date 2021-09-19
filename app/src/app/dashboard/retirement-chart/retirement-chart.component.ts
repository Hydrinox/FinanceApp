import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ThemeOption } from 'ngx-echarts';

@Component({
    selector: 'app-retirement-chart',
    templateUrl: './retirement-chart.component.html',
    styleUrls: ['./retirement-chart.component.css']
})
export class RetirementChartComponent implements OnChanges {
    @Input() retirementData;
    @ViewChild('line') line: any;
    theme: string | ThemeOption = 'dark';
    chartInstance: any;
    lineChart;

    retireOptions = {
        backgroundColor: '',
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Retirement Dollars',
                type: 'bar',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: [{}]
            }
        ]
    };

    ngOnChanges(changes): void {
        if (changes.retirementData.currentValue != undefined && changes.retirementData.currentValue.length > 0) {
            setTimeout(() => {

                this.lineChart = echarts.init(this.line.nativeElement);
                this.lineChart.setOption({
                    series:
                    {
                        data: changes.retirementData.currentValue
                    }
                }
                )
            }, 60)
        }
    }
}
