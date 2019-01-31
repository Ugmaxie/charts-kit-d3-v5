import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';

@Component({
  selector: 'app-data-structure',
  templateUrl: './data-structure.component.html',
  styleUrls: ['./data-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataStructureComponent {
  @Input() dataset;
}
