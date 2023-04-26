import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarouselComponent } from './buy-carousel.component';

describe('BuyCarouselComponent', () => {
  let component: BuyCarouselComponent;
  let fixture: ComponentFixture<BuyCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
