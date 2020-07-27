import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithZoomHandlerDirective } from './directives/with-zoom-handler/with-zoom-handler.directive';
import { WithZoomableTilesDirective } from './directives/with-zoomable-tiles/with-zoomable-tiles.directive';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { SparklineChartComponent } from './components/sparkline-chart/sparkline-chart.component';

@NgModule({
  exports: [
    WithZoomHandlerDirective,
    WithZoomableTilesDirective,
    BarChartComponent,
    DonutChartComponent,
    SparklineChartComponent
  ],
  declarations: [
    WithZoomHandlerDirective,
    WithZoomableTilesDirective,
    BarChartComponent,
    DonutChartComponent,
    SparklineChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }