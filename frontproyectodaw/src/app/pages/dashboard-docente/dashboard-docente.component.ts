import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResourceCreateComponent } from '../../components/resource-create/resource-create.component';

@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './dashboard-docente.component.html',
  styleUrls: ['./dashboard-docente.component.scss']
})
export class DashboardDocenteComponent implements OnInit {
  displayedColumnsWithFav: string[] = ['position', 'name', 'weight', 'symbol', 'favorito'];

  dataSource: any[] = [
    { id: 1, position: 1, name: 'Libro A', weight: 1.0, symbol: 'PDF', favorito: false },
    { id: 2, position: 2, name: 'Video B', weight: 2.5, symbol: 'MP4', favorito: false },
    { id: 3, position: 3, name: 'Documento C', weight: 1.2, symbol: 'DOC', favorito: false },
    { id: 4, position: 4, name: 'Libro A', weight: 1.0, symbol: 'PDF', favorito: false }
  ];

  uploadedDisplayedColumns: string[] = ['title', 'type', 'uploadedBy'];
  uploadedResources: any[] = [];

  pendingDisplayedColumns: string[] = ['title', 'type', 'submittedBy'];
  pendingResources: any[] = [];

  mostrarFormulario: boolean = false;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.cargarFavoritosDesdeStorage();
  }

  openResourceDialog(): void {
    const dialogRef = this.dialog.open(ResourceCreateComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Recurso creado');
      }
    });
  }

  // NUEVO: guardar y alternar recurso completo
  toggleFavorito(recurso: any): void {
    let favoritosArray = JSON.parse(localStorage.getItem('favoritosDocente') || '[]');

    const contenidoDuplicado = favoritosArray.some((r: any) =>
      r.id !== recurso.id &&
      r.name === recurso.name &&
      r.weight === recurso.weight &&
      r.symbol === recurso.symbol &&
      r.favorito
    );

    if (contenidoDuplicado && !recurso.favorito) {
      alert('Este recurso ya está marcado como favorito (mismo contenido).');
      return;
    }

    recurso.favorito = !recurso.favorito;

    const index = favoritosArray.findIndex((r: any) => r.id === recurso.id);

    if (index !== -1) {
      favoritosArray[index] = { ...recurso }; // guarda todo
    } else {
      favoritosArray.push({ ...recurso });
    }

    localStorage.setItem('favoritosDocente', JSON.stringify(favoritosArray));
  }

  guardarFavoritosEnStorage(): void {
    const favoritos = this.dataSource.map(r => ({ ...r }));
    localStorage.setItem('favoritosDocente', JSON.stringify(favoritos));
  }

  cargarFavoritosDesdeStorage(): void {
    const stored = localStorage.getItem('favoritosDocente');
    if (stored) {
      const favoritos = JSON.parse(stored);
      this.dataSource.forEach(recurso => {
        const found = favoritos.find((f: any) => f.id === recurso.id);
        if (found) {
          recurso.favorito = found.favorito;
        }
      });
    }
  }

  verFavoritos(): void {
    this.router.navigate(['/favoritos']);
  }
}
