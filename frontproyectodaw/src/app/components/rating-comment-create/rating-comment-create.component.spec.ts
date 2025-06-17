import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCommentCreateComponent } from './rating-comment-create.component';

describe('RatingCommentCreateComponent', () => {
  let component: RatingCommentCreateComponent;
  let fixture: ComponentFixture<RatingCommentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingCommentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingCommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
