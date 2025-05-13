import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosDocenteComponent } from './recursos-docente.component';

describe('RecursosDocenteComponent', () => {
  let component: RecursosDocenteComponent;
  let fixture: ComponentFixture<RecursosDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
