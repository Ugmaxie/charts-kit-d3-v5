import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DrawLegend } from './draw-legend';

@Component({
  selector: 'app-draw-legend',
  templateUrl: './draw-legend.component.html',
  styleUrls: ['./draw-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DrawLegendComponent implements OnInit {
  @Input() dataset;
  @Input() colors;

  options = {
    xCircleOffset: 70,
    yCircleOffset: 10,
    radius: 5,
    xTextOffset: 70,
    yTextOffset: 15,
    textLeftMargin: 10,
    fontSize: '12px',
    fontColor: '#737373'
  };

  legend = new DrawLegend();

  ngOnInit(): void {
    this.legend.draw(this.colors, this.dataset, this.options);
  }
}
