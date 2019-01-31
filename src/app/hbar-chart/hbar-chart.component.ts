import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawBarChart } from './draw-bar-chart';

@Component({
  selector: 'app-hbar-chart',
  templateUrl: './hbar-chart.component.html',
  styleUrls: ['./hbar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HBarChartComponent implements OnInit {
  @Input() dataset;
  @Input() legend;

  chart = new DrawBarChart();

  ngOnInit(): void {
    this.chart.drawAlt(this.dataset);
  }
}
