import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawOrgChart } from './draw-org-chart';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgChartComponent implements OnInit {
  @Input() dataset;

  chart = new DrawOrgChart();

  ngOnInit(): void {
    this.chart.drawAlt(this.dataset);
  }
}
