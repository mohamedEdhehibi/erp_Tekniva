import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleArticleComponent } from './modele-article.component';

describe('ModeleArticleComponent', () => {
  let component: ModeleArticleComponent;
  let fixture: ComponentFixture<ModeleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
