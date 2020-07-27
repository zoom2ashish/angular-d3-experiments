import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3Tile from 'd3-tile';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { Tile, Tiles } from '#shared/directives/with-zoomable-tiles/with-zoomable-tiles.directive';

@Component({
  selector: 'app-tile-example',
  templateUrl: './tile-example.component.html',
  styleUrls: ['./tile-example.component.css']
})
export class TileExampleComponent {
  public tileSize = 512;
  public tiles: Tiles;

  constructor() {}

  tilesChanged(tiles: Tiles) {
    this.tiles = tiles;
  }
}
