import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileExampleComponent } from './tile-example.component';

describe('TileExampleComponent', () => {
  let component: TileExampleComponent;
  let fixture: ComponentFixture<TileExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
