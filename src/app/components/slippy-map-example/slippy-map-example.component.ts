import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as d3Tile from 'd3-tile';
import * as d3Zoom from 'd3-zoom';
import { Tile, Tiles } from '#shared/directives/with-zoomable-tiles/with-zoomable-tiles.directive';

export interface ImageTile extends Tile {
  url: string;
}

@Component({
  selector: 'app-slippy-map-example',
  templateUrl: './slippy-map-example.component.html',
  styleUrls: ['./slippy-map-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlippyMapExampleComponent {

  public images: ImageTile[] = [];

  @ViewChild('chart', { static: true, read: ElementRef }) chart: ElementRef<SVGSVGElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  tilesChange(tiles: Tiles) {
    this.images = tiles.map((tile) => {
      const [x,y,k] = tile.tileWrap;
      const url = this.getImageUrl(x,y,k);
      return {
        ...tile,
        url: url,
      } as ImageTile;
    });

    this.cdr.detectChanges();
  }

  getImageUrl(x, y, z) {
    const token = 'pk.eyJ1Ijoiem9vbTJhc2hpc2giLCJhIjoiY2tkMWMxcXB3MTF6ZTJxcXJudXNxeTdocCJ9.CYVB_n40Pbv5GlR8edNHdw';
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}?access_token=${token}`
  }
}
