import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChainesComponent } from './liste-chaines.component';

describe('ListeChainesComponent', () => {
  let component: ListeChainesComponent;
  let fixture: ComponentFixture<ListeChainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeChainesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
