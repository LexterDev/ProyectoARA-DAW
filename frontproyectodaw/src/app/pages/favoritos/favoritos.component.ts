import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    const guardados = localStorage.getItem('favoritosDocente');
    const datos = guardados ? JSON.parse(guardados) : [];

    const recursosFavoritos = [
      { id: 1, name: 'Libro A', weight: 1.0, symbol: 'PDF' },
      { id: 2, name: 'Video B', weight: 2.5, symbol: 'MP4' },
      { id: 3, name: 'Documento C', weight: 1.2, symbol: 'DOC' }
    ];

    const filtrados = recursosFavoritos.filter(r =>
      datos.some((f: any) => f.id === r.id && f.favorito)
    );

    this.favoritos = [...filtrados.slice(0, 5)];
    while (this.favoritos.length < 5) {
      this.favoritos.push(null);
    }
  }

  eliminarFavorito(recurso: any): void {
    // Obtiene los favoritos guardados
    const guardados = localStorage.getItem('favoritosDocente');
    const datos = guardados ? JSON.parse(guardados) : [];

    // Marca el recurso como no favorito
    const actualizados = datos.map((f: any) =>
      f.id === recurso.id ? { ...f, favorito: false } : f
    );

    // Guarda los cambios
    localStorage.setItem('favoritosDocente', JSON.stringify(actualizados));

    // Recarga los favoritos
    this.cargarFavoritos();
  }
}
