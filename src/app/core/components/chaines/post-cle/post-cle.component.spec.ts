import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCleComponent } from './post-cle.component';

describe('PostCleComponent', () => {
  let component: PostCleComponent;
  let fixture: ComponentFixture<PostCleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
