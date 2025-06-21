import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../services/resource.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ResourceCreateComponent } from '../../components/resource-create/resource-create.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ResourceEditComponent } from '../../components/resource-edit/resource-edit.component';
import { MatCardModule } from '@angular/material/card';
import { RessourceViewComponent } from '../../components/ressource-view/ressource-view.component';

@Component({
  selector: 'app-resource',
  imports: [
    DataTablesModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent implements OnInit {

  listResources: any[] = [];
  isLoading: boolean = false;
  icons: any[] = [
    { type: 'PDF', icon: 'picture_as_pdf', image: 'document-default.jpg' },
    { type: 'VIDEO', icon: 'video_library', image: 'video_default.jpg' },
    { type: 'Video', icon: 'video_library', image: 'video_default.jpg' },
    { type: 'IMAGE', icon: 'image', image: 'image-default.jpg' },
    { type: 'Imagen', icon: 'image', image: 'image-default.jpg' },
    { type: 'OTRO', icon: 'insert_drive_file', imagen: 'other-default.jpg' },
  ]

  constructor(
    private resourceService: ResourceService,
    private dialog: MatDialog,
    private router: Router

  ) { }

   dtOptions: Config = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
  
      },
    };

    ngOnInit() {
      this.isLoading = true;
      this.getAllResources();

      this.getAllFavorites();
    }

    //get all resources
    getAllResources() {
      this.resourceService.getAllResources().subscribe({
        next: (res) => {
          // Agegar prpiedad isFavorite a cada recurso
          this.listResources = res.map((resource: any) => ({
            ...resource,
            isFavorite: false,
            // Asignar el icono basado en el tipo de recurso puede ser PDF, Video, Imagen u otro.
            icon: this.icons.find(icon => icon.type === resource.tipo)?.icon || 'insert_drive_file',
            image: this.icons.find(icon => icon.type === resource.tipo)?.image || 'other-default.jpg'
          }));
          // this.listResources = res;
        this.isLoading = false;
          console.log(this.listResources);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }


    openResourcesCreateDialog() {
      const dialogRef = this.dialog.open(ResourceCreateComponent, {
        width: '500px',
        data: {}
      });

      dialogRef.componentInstance.isResourceSaved.subscribe((isSaved: any) => {
        if (isSaved) {
          Swal.fire({
            icon: 'success',
            title: 'Recurso creado',
            text: 'El recurso fue creado correctamente',
            showConfirmButton: false,
            timer: 2500
          });
          // Fuerza la recarga del componente actual

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/resources']);
          });
        }
      });
    }

    openResourcesEditDialog(resource: any, event: Event) {
      event.stopPropagation();
      const dialogRef = this.dialog.open(ResourceEditComponent, {
        width: '500px',
        data: {
          resourceObject: resource,
          isVideo: resource.tipo === 'video' ? true : false
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
          // Fuerza la recarga del componente actual
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/resources']);
          });
        }
      });
    }

    deleteResource(id: number, event: Event) {
      event.stopPropagation();
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resourceService.deleteResource(id).subscribe({
            next: (response) => {
              console.log('Recurso eliminado con éxito', response);
              // Fuerza la recarga del componente actual
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/resources']);
              });
            },
            error: (error) => {
              console.error('Error al eliminar el recurso', error);
            }
          });
        }
      });
    }

    openResourceDetailsDialog(resource: any) {
    }

    toggleFavorite(resource: any, event: Event) {
    event.stopPropagation();
    const favoritesArray = JSON.parse(localStorage.getItem('favorites') || '[]');

     favoritesArray.push(resource);

     localStorage.setItem('favorites', JSON.stringify(favoritesArray));

    //  Set isFavorite to true for the resource in the listResources
    const resourceIndex = this.listResources.findIndex((res) => res.id === resource.id);
    if (resourceIndex !== -1) {
      this.listResources[resourceIndex].isFavorite = true;
    }
  }

    getAllFavorites() {
      const favoritesArray = JSON.parse(localStorage.getItem('favorites') || '[]');
      
    }

    openRessourceViewDialog(resource: any, event: Event) {
      event.stopPropagation();
      const dialogRef = this.dialog.open(RessourceViewComponent, {
        width: '85vw',
        height: '85vh',
        maxWidth: '85vw',
        maxHeight: '85vh',
        data: {
          resourceObject: resource
        }
      });
    }

}
