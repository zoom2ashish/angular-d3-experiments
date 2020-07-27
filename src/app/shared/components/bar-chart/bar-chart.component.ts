import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  scaleBand as d3_scaleBand,
  scaleLinear as d3_scaleLinear
} from 'd3-scale';
import {
  max as d3_max
} from 'd3-array';

export interface BarChartDataItem {
  id: string;
  x: string;
  y: string;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent<EntityType = BarChartDataItem> implements AfterViewInit {
  private _updateLayout$ = new Subject<void>();

  width: number;
  height: number;
  bars: DOMRect[] = [];

  @Input() xValue = 'x';
  @Input() yValue = 'y';
  @Input() data: EntityType[] = [];
  @Input() barWidth: number;
  @Input() paddingInner = 0.1;
  @Input() paddingOuter = 0.1;

  @ViewChild('svgContainer', { static: false, read: ElementRef }) svgContainer: ElementRef<HTMLDivElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._updateLayout$.next();
  }

  constructor() {
    this._updateLayout$
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this._render();
      })
  }

  ngAfterViewInit() {
    this._updateLayout$.next();
  }

  private _render() {
    this.width = this.svgContainer.nativeElement.offsetWidth;
    this.height = this.svgContainer.nativeElement.offsetHeight;

    const xValues = this.data.map((d, i) => d[this.xValue]);
    const maxYValue = d3_max(this.data, (d, i) => d[this.yValue]);

    const xScale = d3_scaleBand()
      .range([0, this.width])
      .domain(xValues)
      .paddingInner(this.paddingInner)
      .paddingOuter(this.paddingOuter);

    const yScale = d3_scaleLinear().range([this.height, 0]).domain([0, maxYValue]);

    this.bars = this.data.map((d, i) => {
      const x = xScale(d[this.xValue]);
      const y = yScale(d[this.yValue]);
      const width = xScale.bandwidth();
      const height = this.height - y;
      const rect = new DOMRect(x, y, width, height);

      console.log(d[this.xValue], rect);
      return rect;
    });

  }

}