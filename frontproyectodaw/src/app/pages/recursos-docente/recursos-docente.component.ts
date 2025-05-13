import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // NUEVO
import { MatTableModule } from '@angular/material/table'; // NUEVO

@Component({
  selector: 'app-recursos-docente',
  standalone: true, // Asegúrate de que esté en true
  imports: [CommonModule, MatTableModule], // NUEVO
  templateUrl: './recursos-docente.component.html',
  styleUrls: ['./recursos-docente.component.scss']
})
export class RecursosDocenteComponent {
  recursos = [];
}


