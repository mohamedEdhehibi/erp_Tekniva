import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMachineComponent } from './type-machine.component';

describe('TypeMachineComponent', () => {
  let component: TypeMachineComponent;
  let fixture: ComponentFixture<TypeMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
