import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauArticleComponent } from './nouveau-article.component';

describe('NouveauArticleComponent', () => {
  let component: NouveauArticleComponent;
  let fixture: ComponentFixture<NouveauArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
