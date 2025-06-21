import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { ResourceEditComponent } from '../../components/resource-edit/resource-edit.component';
import { ResourceService } from '../../services/resource.service';
import { Auth0Service } from '../../services/auth0.service'; // ✅ Import necesario

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favoritos.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];
  isLoading: boolean = false;
  currentUserId: string = ''; // ✅ Guardamos el ID del usuario

  icons: any[] = [
    { type: 'PDF', icon: 'picture_as_pdf' },
    { type: 'VIDEO', icon: 'video_library' },
    { type: 'Video', icon: 'video_library' },
    { type: 'IMAGE', icon: 'image' },
    { type: 'OTRO', icon: 'insert_drive_file' }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private resourceService: ResourceService,
    private authService: Auth0Service // ✅ Inyección del servicio Auth0
  ) {}

  ngOnInit(): void {
    // ✅ Obtener ID del usuario logueado
    this.authService.user$.subscribe((user: any) => {
      this.currentUserId = user?.sub || '';
      this.cargarFavoritos();
    });
  }

  cargarFavoritos(): void {
    this.isLoading = true;
    const guardados = localStorage.getItem('favoritos');
    const favoritosLocales = guardados ? JSON.parse(guardados) : [];

    // ✅ Filtrar favoritos por ID de usuario
    this.favoritos = favoritosLocales
      .filter((r: any) => r.favorito === true && r.userId === this.currentUserId)
      .map((resource: any) => ({
        ...resource,
        isFavorite: true,
        icon: this.icons.find(icon => icon.type === resource.tipo)?.icon || 'insert_drive_file'
      }));

    this.isLoading = false;
  }

  toggleFavorite(resource: any): void {
    resource.isFavorite = !resource.isFavorite;

    const guardados = localStorage.getItem('favoritos');
    let favoritos = guardados ? JSON.parse(guardados) : [];

    const index = favoritos.findIndex((r: any) => r.id === resource.id && r.userId === this.currentUserId);

    if (index > -1) {
      favoritos[index].favorito = resource.isFavorite;
    } else {
      favoritos.push({ ...resource, favorito: resource.isFavorite, userId: this.currentUserId }); // ✅ Se asocia el recurso al usuario
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.cargarFavoritos();
  }

  openResourcesEditDialog(resource: any): void {
    const dialogRef = this.dialog.open(ResourceEditComponent, {
      width: '500px',
      data: {
        resourceObject: resource,
        isVideo: resource.tipo === 'video'
      }
    });

    dialogRef.componentInstance.isResourceSaved.subscribe((isSaved: any) => {
      if (isSaved) {
        Swal.fire({
          icon: 'success',
          title: 'Recurso editado',
          text: 'El recurso fue editado correctamente',
          showConfirmButton: false,
          timer: 2500
        });

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/resources/favoritos']);
        });
      }
    });
  }

  deleteResource(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resourceService.deleteResource(id).subscribe({
          next: () => {
            this.favoritos = this.favoritos.filter(r => r.id !== id);

            const guardados = localStorage.getItem('favoritos');
            let favoritos = guardados ? JSON.parse(guardados) : [];
            favoritos = favoritos.filter((r: any) => !(r.id === id && r.userId === this.currentUserId)); // ✅ Borra solo del usuario actual
            localStorage.setItem('favoritos', JSON.stringify(favoritos));

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El recurso fue eliminado correctamente',
              showConfirmButton: false,
              timer: 2500
            });
          },
          error: (error) => {
            console.error('Error al eliminar el recurso', error);
          }
        });
      }
    });
  }
}
