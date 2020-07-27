import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  public barChartData = [
    {
      id: 1,
      x: '1 Minute Ago',
      y: 25
    },
    {
      id: 2,
      x: '5 Minute Ago',
      y: 20
    },
    {
      id: 3,
      x: '10 Minute Ago',
      y: 35
    },
    {
      id: 4,
      x: '15 Minute Ago',
      y: 17
    },
    {
      id: 5,
      x: '20 Minute Ago',
      y: 17
    },
    {
      id: 6,
      x: '25 Minute Ago',
      y: 22
    },
  ];
}
