import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import { extent as d3_extent } from 'd3-array';
import { line as d3_line, curveMonotoneX } from 'd3-shape';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SparklineChartDataItem } from './sparkline-chart.model';

const RESIZE_RENDER_DEBOUSE_TIME = 1000;

@Component({
  selector: 'app-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.css']
})
export class SparklineChartComponent<EntityType = SparklineChartDataItem> implements AfterViewInit {

  private _subscriptions = new Subscription();
  private _recalculateLayout$ = new Subject<void>();

  width: number;
  height: number;
  linePath: string;
  circles: any;

  @Input() idProperty = 'id';
  @Input() xValue = 'x';
  @Input() yValue = 'y';
  @Input() data: EntityType[];
  @Input() radius = 3;
  @Input() padding = 5;

  @Output() dataPointClicked = new EventEmitter<EntityType>();
  @Output() dataPointHover = new EventEmitter<EntityType>();

  @ViewChild('svgContainer', { static: false, read: ElementRef }) svgContainer: ElementRef<HTMLDivElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._recalculateLayout$.next();
  }

  constructor(private elementRef: ElementRef) {
    this._recalculateLayout$
      .pipe(debounceTime(RESIZE_RENDER_DEBOUSE_TIME))
      .subscribe(() => {
        this._render();
      });
  }

  ngAfterViewInit() {
    this._recalculateLayout$.next();
  }

  private _render() {
    this.width = this.svgContainer.nativeElement.offsetWidth;
    this.height = this.svgContainer.nativeElement.offsetHeight;

    // Define Scale
    const xData = this.data.map((entity, index) => `${index}`);
    const [yMinValue, yMaxValue] = d3_extent(this.data, (entity) => +entity[this.yValue]);

    const bandwidth = scaleBand().domain(xData).rangeRound([0, this.width]).bandwidth();
    const xScale = scaleBand().domain(xData).rangeRound([0, this.width + bandwidth - 5]);
    const yScale = scaleLinear().domain([yMinValue, yMaxValue]).rangeRound([this.height - 10, 0]);

    const linePath = d3_line<EntityType>()
      .curve(curveMonotoneX)
      .x((d, i) => {
        const xScaleValue = xScale('' + i); // d[this.xValue]);
        return xScaleValue;
      })
      .y((d, i) => {
        const yScaleValue = +yScale(d[this.yValue]);
        return yScaleValue;
      });


    this.linePath = linePath(this.data);

    this.circles = this.data.map((d, i) => {
      return {
        id: d[this.idProperty],
        cx: xScale('' + i), // d[this.xValue]),
        cy: yScale(d[this.yValue]),
        radius: this.radius,
        data: d
      };
    });
  }

  circleTrackBy(index, entity: EntityType) {
    return entity[this.idProperty] || index;
  }

  onDataPointClicked(data: EntityType) {
    this.dataPointClicked.emit(data);
  }

  onDataPointHover(data: EntityType) {
    this.dataPointHover.emit(data);
  }
}
