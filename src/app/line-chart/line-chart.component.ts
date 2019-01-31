import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawLineChart } from './draw-line-chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LineChartComponent implements OnInit {
  @Input() dataset;
  @Input() legend;

  chart = new DrawLineChart();

  ngOnInit(): void {
    this.chart.drawAlt(this.dataset);
  }
}
