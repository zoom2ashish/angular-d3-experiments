import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlippyMapExampleComponent } from './slippy-map-example.component';

describe('SlippyMapExampleComponent', () => {
  let component: SlippyMapExampleComponent;
  let fixture: ComponentFixture<SlippyMapExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlippyMapExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlippyMapExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
