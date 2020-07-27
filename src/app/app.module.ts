import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { TileExampleComponent } from './components/tile-example/tile-example.component';
import { CommonModule } from '@angular/common';
import { SlippyMapExampleComponent } from './components/slippy-map-example/slippy-map-example.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    SharedModule
  ],
  declarations: [AppComponent, TileExampleComponent, SlippyMapExampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
