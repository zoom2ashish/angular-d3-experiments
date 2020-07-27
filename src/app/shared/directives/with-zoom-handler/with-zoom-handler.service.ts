import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZoomTransform } from 'd3-zoom';

@Injectable()
export class WithZoomHandlerService {
  private _zoom$ = new Subject<ZoomTransform>()

  get zoom$() {
    return this._zoom$.asObservable();
  }

  notifyZoomChange(transform: ZoomTransform) {
    this._zoom$.next(transform);
  }
}