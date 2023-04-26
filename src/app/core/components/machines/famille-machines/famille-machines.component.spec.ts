import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleMachinesComponent } from './famille-machines.component';

describe('FamilleMachinesComponent', () => {
  let component: FamilleMachinesComponent;
  let fixture: ComponentFixture<FamilleMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilleMachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilleMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
