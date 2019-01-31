import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawRadarChart } from './draw-radar-chart';

@Component({
  selector: 'app-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackChartComponent implements OnInit {
  @Input() dataset;
  @Input() legend;

  chart = new DrawRadarChart();

  w = 500;
  h = 500;

  cfg = {
    w: this.w,
    h: this.h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
  };

  ngOnInit(): void {
    this.chart.drawAlt("#chart", this.dataset, this.cfg);
  }
}
