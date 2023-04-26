import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPGammeComponent } from './op-gamme.component';

describe('OPGammeComponent', () => {
  let component: OPGammeComponent;
  let fixture: ComponentFixture<OPGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OPGammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
