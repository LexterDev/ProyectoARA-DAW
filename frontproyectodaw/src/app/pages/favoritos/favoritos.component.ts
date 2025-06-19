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
  paginaActual: number = 1;
  itemsPorPagina: number = 10;

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    const guardados = localStorage.getItem('favoritosDocente');
    const datos = guardados ? JSON.parse(guardados) : [];
    this.favoritos = datos.filter((r: any) => r.favorito);
  }

  eliminarFavorito(recurso: any): void {
    const guardados = localStorage.getItem('favoritosDocente');
    const datos = guardados ? JSON.parse(guardados) : [];

    const actualizados = datos.map((f: any) =>
      f.id === recurso.id ? { ...f, favorito: false } : f
    );

    localStorage.setItem('favoritosDocente', JSON.stringify(actualizados));
    this.cargarFavoritos();
  }
}
