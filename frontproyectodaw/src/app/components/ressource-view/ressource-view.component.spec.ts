import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceViewComponent } from './ressource-view.component';

describe('RessourceViewComponent', () => {
  let component: RessourceViewComponent;
  let fixture: ComponentFixture<RessourceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
