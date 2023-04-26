import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChaineComponent } from './menu-chaine.component';

describe('MenuChaineComponent', () => {
  let component: MenuChaineComponent;
  let fixture: ComponentFixture<MenuChaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuChaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
