import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleConditionsComponent } from './sale-conditions.component';

describe('SaleConditionsComponent', () => {
  let component: SaleConditionsComponent;
  let fixture: ComponentFixture<SaleConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
