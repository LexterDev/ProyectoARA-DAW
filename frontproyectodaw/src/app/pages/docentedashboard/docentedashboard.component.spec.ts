import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentedashboardComponent } from './docentedashboard.component';

describe('DocentedashboardComponent', () => {
  let component: DocentedashboardComponent;
  let fixture: ComponentFixture<DocentedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
