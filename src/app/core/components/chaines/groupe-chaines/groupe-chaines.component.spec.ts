import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeChainesComponent } from './groupe-chaines.component';

describe('GroupeChainesComponent', () => {
  let component: GroupeChainesComponent;
  let fixture: ComponentFixture<GroupeChainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeChainesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeChainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
