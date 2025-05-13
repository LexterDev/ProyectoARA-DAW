import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirRecursoComponent } from './subir-recurso.component';

describe('SubirRecursoComponent', () => {
  let component: SubirRecursoComponent;
  let fixture: ComponentFixture<SubirRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirRecursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
