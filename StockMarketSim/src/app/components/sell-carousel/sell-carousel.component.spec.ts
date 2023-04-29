import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCarouselComponent } from './sell-carousel.component';

describe('SellCarouselComponent', () => {
  let component: SellCarouselComponent;
  let fixture: ComponentFixture<SellCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
