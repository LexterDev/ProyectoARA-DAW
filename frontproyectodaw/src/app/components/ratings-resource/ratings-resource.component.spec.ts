import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsResourceComponent } from './ratings-resource.component';

describe('RatingsResourceComponent', () => {
  let component: RatingsResourceComponent;
  let fixture: ComponentFixture<RatingsResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
