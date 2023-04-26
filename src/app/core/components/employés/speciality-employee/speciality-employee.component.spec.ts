import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityEmployeeComponent } from './speciality-employee.component';

describe('SpecialityEmployeeComponent', () => {
  let component: SpecialityEmployeeComponent;
  let fixture: ComponentFixture<SpecialityEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
