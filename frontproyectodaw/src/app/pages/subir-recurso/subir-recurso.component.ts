import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subir-recurso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './subir-recurso.component.html',
  styleUrls: ['./subir-recurso.component.scss']
})
export class SubirRecursoComponent {
  archivoSeleccionado: File | null = null;

  seleccionarArchivo(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subir() {
    if (this.archivoSeleccionado) {
      console.log('Archivo a subir:', this.archivoSeleccionado);
    }
  }
}
