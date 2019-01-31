import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  chartsInitial = {
    orgChartActive: true,
    feedbackChartActive: false,
    vBarChartActive: false,
    hBarChartActive: false,
    lineChartActive: false,
    donutChart: false
  };

  chartsActive = {...this.chartsInitial};

  orgChartDataset = [
    {name: 'Dima', parent: null, visible: true},
    {name: 'Mike', parent: 'Dima', visible: true},
    {name: 'Lyudka', parent: 'Dima', visible: true},
    {name: 'Alex', parent: 'Mike', visible: true},
    {name: 'Dasha', parent: 'Mike', visible: true},
    {name: 'Ilya', parent: 'Mike', visible: true},
    {name: 'Oleg', parent: 'Ilya', visible: true},
    {name: 'Rob', parent: 'Ilya', visible: true},
    {name: 'Daisy', parent: 'Ilya', visible: true},
    {name: 'Kree', parent: 'Alex', visible: true},
    {name: 'Kreg', parent: 'Dima', visible: true},
    {name: 'Sergey', parent: 'Lyudka', visible: true},
    {name: 'Lopata', parent: 'Lyudka', visible: true}
  ];

  feedbackChartDataset = [
    [
      {axis: 'Leadership', value: 0.59},
      {axis: 'Communication', value: 0.56},
      {axis: 'Vision', value: 0.42},
      {axis: 'Innovation', value: 0.34},
      {axis: 'Confidence', value: 0.48},
      {axis: 'Productivity', value: 0.14},
      {axis: 'Commitment', value: 0.11},
      {axis: 'Openness', value: 0.05}
    ],
    [
      {axis: 'Leadership', value: 0.05},
      {axis: 'Communication', value: 0.60},
      {axis: 'Vision', value: 0.22},
      {axis: 'Innovation', value: 0.64},
      {axis: 'Confidence', value: 0.98},
      {axis: 'Productivity', value: 0.4},
      {axis: 'Commitment', value: 0.01},
      {axis: 'Openness', value: 0.5}
    ],
    [
      {axis: 'Leadership', value: 0.9},
      {axis: 'Communication', value: 0.3},
      {axis: 'Vision', value: 0.12},
      {axis: 'Innovation', value: 0.05},
      {axis: 'Confidence', value: 0.1},
      {axis: 'Productivity', value: 0.7},
      {axis: 'Commitment', value: 0.1},
      {axis: 'Openness', value: 0.5}
    ]
  ];

  vBarChartDataset = {
    elements: [
      [1, 3, 0, 2, 2, 2, 1, 2, 3, 3, 2],
      [2, 2, 3, 2, 1, 3, 0, 3, 2, 1, 1],
      [3, 3, 3, 3, 2, 1, 0, 0, 2, 3, 3]
    ],
    skillGrade: ['Beginner', 'Basic', 'Skilled', 'Advanced', 'Expert'],
    skillNames: ['HTML', 'CSS', 'JS', 'Angular', 'Vue', 'React', 'd3.js', 'node', 'express', 'nest', 'PHP']
  };

  hBarChartDataset = {
    labels: [
      'soft', 'tech', 'humor', 'other'
    ],
    series: [{
      label: 'me',
      values: [50, 75, 50, 25]
    },
      {
        label: 'team',
        values: [25, 50, 50, 50]
      },
      {
        label: 'manager',
        values: [75, 25, 50, 75]
      }]
  };

  lineChartDataset = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    series: [
      {
        name: 'Me',
        values: [
          {label: 'Jan', price: '100'},
          {label: 'Feb', price: '110'},
          {label: 'Mar', price: '145'},
          {label: 'Apr', price: '241'},
          {label: 'May', price: '101'},
          {label: 'Jun', price: '90'},
          {label: 'Jul', price: '10'},
          {label: 'Aug', price: '35'},
          {label: 'Sep', price: '21'},
          {label: 'Oct', price: '101'},
          {label: 'Nov', price: '131'},
          {label: 'Dec', price: '141'}
        ]
      },
      {
        name: 'Team',
        values: [
          {label: 'Jan', price: '200'},
          {label: 'Feb', price: '120'},
          {label: 'Mar', price: '33'},
          {label: 'Apr', price: '21'},
          {label: 'May', price: '51'},
          {label: 'Jun', price: '190'},
          {label: 'Jul', price: '120'},
          {label: 'Aug', price: '85'},
          {label: 'Sep', price: '221'},
          {label: 'Oct', price: '101'},
          {label: 'Nov', price: '151'},
          {label: 'Dec', price: '41'}
        ]
      },
      {
        name: 'Manger',
        values: [
          {label: 'Jan', price: '50'},
          {label: 'Feb', price: '10'},
          {label: 'Mar', price: '5'},
          {label: 'Apr', price: '71'},
          {label: 'May', price: '20'},
          {label: 'Jun', price: '9'},
          {label: 'Jul', price: '220'},
          {label: 'Aug', price: '235'},
          {label: 'Sep', price: '61'},
          {label: 'Oct', price: '10'},
          {label: 'Nov', price: '111'},
          {label: 'Dec', price: '61'}
        ]
      }
    ]
  };

  donutChartDataset = [
    {name: 'TS', value: 50},
    {name: 'Angular', value: 30},
    {name: 'node', value: 20}
  ];

  legendDataset = {
    dataset: ['Me', 'Team', 'Manager'],
    colors: ['#ff64ff', '#9678dc', '#328cdc']
  };

  setActiveComponent(activeChart: string):void {
    Object.keys(this.chartsActive).forEach(item => {
      this.chartsActive[item] = false;
    });

    this.chartsActive[activeChart] = true;
  }
}
