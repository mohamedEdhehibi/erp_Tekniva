import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaineMachineComponent } from './chaine-machine.component';

describe('ChaineMachineComponent', () => {
  let component: ChaineMachineComponent;
  let fixture: ComponentFixture<ChaineMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaineMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaineMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
