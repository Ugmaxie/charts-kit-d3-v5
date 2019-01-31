import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { FeedbackChartComponent } from './feedback-chart/feedback-chart.component';
import { VBarChartComponent } from './vbar-chart/vbar-chart.component';
import { DataStructureComponent } from './data-structure/data-structure.component';
import { HBarChartComponent } from 'src/app/hbar-chart/hbar-chart.component';
import { LineChartComponent } from 'src/app/line-chart/line-chart.component';
import { DonutChartComponent } from 'src/app/donut-chart/donut-chart.component';
import { DrawLegendComponent } from 'src/app/draw-legend/draw-legend.component';

@NgModule({
  declarations: [
    AppComponent,
    VBarChartComponent,
    HBarChartComponent,
    DataStructureComponent,
    FeedbackChartComponent,
    OrgChartComponent,
    LineChartComponent,
    DonutChartComponent,
    DrawLegendComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  exports:[ DrawLegendComponent ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
