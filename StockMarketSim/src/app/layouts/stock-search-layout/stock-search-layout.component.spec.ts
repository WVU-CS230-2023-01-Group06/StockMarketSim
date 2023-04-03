import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSearchLayoutComponent } from './stock-search-layout.component';

describe('StockSearchLayoutComponent', () => {
  let component: StockSearchLayoutComponent;
  let fixture: ComponentFixture<StockSearchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSearchLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
