import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauUtilisateurComponent } from './nouveau-utilisateur.component';

describe('NouveauUtilisateurComponent', () => {
  let component: NouveauUtilisateurComponent;
  let fixture: ComponentFixture<NouveauUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
