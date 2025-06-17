import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCommentEditComponent } from './rating-comment-edit.component';

describe('RatingCommentEditComponent', () => {
  let component: RatingCommentEditComponent;
  let fixture: ComponentFixture<RatingCommentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingCommentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingCommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
