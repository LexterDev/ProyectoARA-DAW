import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-perfil-docente',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.scss']
})
export class PerfilDocenteComponent {
  docente = {
    nombre: '',
    correo: '',
    rol: 'Docente',
    ultimaSesion: ''
  };
}

