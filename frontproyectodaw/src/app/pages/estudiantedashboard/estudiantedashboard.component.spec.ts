import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantedashboardComponent } from './estudiantedashboard.component';

describe('EstudiantedashboardComponent', () => {
  let component: EstudiantedashboardComponent;
  let fixture: ComponentFixture<EstudiantedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
