import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvaPageComponent } from './canva-page.component';

describe('CanvaPageComponent', () => {
  let component: CanvaPageComponent;
  let fixture: ComponentFixture<CanvaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanvaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
