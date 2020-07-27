import { Directive, ElementRef, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import {
  zoom as d3Zoom,
  ZoomTransform,
  ZoomBehavior,
  zoomIdentity
 } from 'd3-zoom';
 import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { WithZoomHandlerService } from './with-zoom-handler.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appWithZoomHandler]',
  providers: [
    WithZoomHandlerService
  ]
})
export class WithZoomHandlerDirective implements AfterViewInit {
  private _updateLayout$ = new Subject<void>();

  @Output() zoomChange = new EventEmitter<ZoomTransform>();

  private zoom: ZoomBehavior<any, any>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._updateLayout$.next();
  }

  constructor(private elementRef: ElementRef, private withZoomHandlerService: WithZoomHandlerService) {
    this._updateLayout$
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.initZoom();
      })
  }

  ngAfterViewInit() {
    this.initZoom();
    setTimeout(() => {
      this._updateLayout$.next();
    }, 10);
  }

  initZoom() {
    const zoomBaseElement = this.elementRef.nativeElement;
    const { width, height } = zoomBaseElement.getBoundingClientRect();

    this.zoom = d3Zoom()
      .scaleExtent([1 << 8, 1 << 22])
      .extent([[0, 0], [width, height]])
      .on('zoom', () => this.zoomHandler(d3.event.transform));

      const identityZoom = zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 10);

    d3Selection
      .select(zoomBaseElement)
      .call(this.zoom)
      .call(this.zoom.transform, identityZoom);
  }

  zoomHandler(transform: ZoomTransform) {
    this.zoomChange.emit(transform);
    this.withZoomHandlerService.notifyZoomChange(transform);
  }
}
