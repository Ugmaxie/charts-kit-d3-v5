import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawDonutChart } from './draw-donut-chart';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DonutChartComponent implements OnInit {
  @Input() dataset;
  @Input() legend;

  legendNames = [];
  chart = new DrawDonutChart();

  ngOnInit(): void {
    this.legendNames = this.dataset.map(item => item.name);
    this.chart.drawAlt(this.dataset);
  }
}
