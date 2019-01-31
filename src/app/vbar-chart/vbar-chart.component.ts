import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawBarChart } from './draw-bar-chart';

@Component({
  selector: 'app-vbar-chart',
  templateUrl: './vbar-chart.component.html',
  styleUrls: ['./vbar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VBarChartComponent implements OnInit {
  @Input() dataset;
  @Input() legend;

  ngOnInit(): void {
    this.drawContainer(this.dataset.elements, this.dataset.skillGrade, this.dataset.skillNames);
  }

  drawContainer(elements: number[][], skillGrade: string[], skillNames: string[]): void {
    const chart = new DrawBarChart();
    chart.drawAlt(elements, skillGrade, skillNames);
  }
}
