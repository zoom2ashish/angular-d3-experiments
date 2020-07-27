import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as d3Tile from 'd3-tile';
import { WithZoomHandlerService } from '../with-zoom-handler/with-zoom-handler.service';
import { Subscription } from 'rxjs';
import { ZoomTransform } from 'd3';

export interface Tile extends Array<number> {
  tileWrap: number[];
  position: number[];
  width: number;
  height: number;
  id: string;
}

export interface Tiles extends Array<Tile> {
  translate: number[];
  scale: number;
}


@Directive({
  selector: '[appWithZoomableTiles]'
})
export class WithZoomableTilesDirective implements AfterViewInit {
  private _tiler: any;
  private _subscriptions = new Subscription();

  @Input() tileSize = 512;

  @Output() tilesChange = new EventEmitter<Tile[]>();

  constructor(private elementRef: ElementRef, private withZoomHandlerService: WithZoomHandlerService) {
    this._subscriptions.add(
      this.withZoomHandlerService.zoom$.subscribe((transform: ZoomTransform) => this.updateTiles(transform))
    );
  }

  ngAfterViewInit() {
    this.initTiler();
  }

  initTiler() {
    // if (this._tiler) {
    //   return;
    // }

    const tilesBaseElement = this.elementRef.nativeElement;
    const { width, height } = tilesBaseElement.getBoundingClientRect();

    this._tiler = d3Tile.tile()
      .extent([ [0, 0], [width, height] ])
      .tileSize(this.tileSize || 512);
  }

  updateTiles(transform: ZoomTransform) {
    this.initTiler();

    const {x , y, k} = transform;
    const tiles: Tiles = this._tiler(transform);

    tiles.forEach((tile) => {
      const [x,y,k] = d3Tile.tileWrap(tile);
      const [ix, iy] = this.position(tile, tiles);;
      tile.tileWrap = [x, y, k];
      tile.position = [ix, iy];
      tile.width = tiles.scale;
      tile.height = tiles.scale;
      tile.id = `${x}/${y}/${k}`;
    });

    this.tilesChange.emit(tiles);
  }

  position(tile, tiles) {
    const [x, y] = tile;
    const {translate: [tx, ty], scale: k} = tiles;
    return [(x + tx) * k, (y + ty) * k];
  }
}
