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
    { type: 'PDF', icon: 'picture_as_pdf' },
    { type: 'VIDEO', icon: 'video_library' },
    { type: 'Video', icon: 'video_library' },
    { type: 'IMAGE', icon: 'image' },
    { type: 'OTRO', icon: 'insert_drive_file' }
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
            icon: this.icons.find(icon => icon.type === resource.tipo)?.icon || 'insert_drive_file'
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

    openResourcesEditDialog(resource: any) {
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

    deleteResource(id: number) {
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

    toggleFavorite(resource: any) {

     console.log('Recurso favorito toggled:', resource);
    }

}
