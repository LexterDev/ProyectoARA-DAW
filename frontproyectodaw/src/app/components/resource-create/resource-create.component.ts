import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CategoriesService } from '../../services/categories.service';
import { LicensesService } from '../../services/licenses.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Auth0Service } from '../../services/auth0.service';


@Component({
  selector: 'app-resource-create',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './resource-create.component.html',
  styleUrl: './resource-create.component.scss'
})
export class ResourceCreateComponent implements OnInit {
  resourceForm!: FormGroup;
  selectedFile: File | null = null;
  categories: any[] = [];
  licencias: any[] = [];
  isVideo: boolean = false;
  isInputDisabled: boolean = false;
  auth0UserId: string = '';
  internalUserId: string = '';

  @Output() isResourceSaved = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private categoryService: CategoriesService,
    private licenseService: LicensesService,
    private dialogRef: MatDialogRef<ResourceCreateComponent>,
    private authService: Auth0Service
  ) { }

  ngOnInit(): void {
    this.resourceForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: ['', Validators.required],
      tipo: ['', Validators.required],
      licenciaId: ['', Validators.required],
      urlExterna: [''],
    });

    this.loadCategories();
    this.loadLicencias();
    this.getUserAuth0Id();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: () => Swal.fire('Error', 'No se pudieron cargar las categorías', 'error')
    });
  }

  getUserAuth0Id(): any {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.auth0UserId = user?.sub;
        this.getInternalId(); 
      }
    });    
  }

  getInternalId(): any {
    const userId = this.auth0UserId;
    console.log('User ID:', userId);
    this.resourceService.getUserByAuth0Id(userId).subscribe({
      next: (user) => {
        this.internalUserId = user.id; // Almacena el ID del usuario interno
      },
      error: () => {
        console.error('Error al obtener el ID del usuario interno');
      }
    });
  }

  loadLicencias(): void {
    this.licenseService.getLicenses().subscribe({
      next: (res: any) => {
        this.licencias = res
      },
      error: (error: any) => {
        Swal.fire('Error', 'No se pudieron cargar las licencias', 'error')
        console.error('Error al cargar las licencias:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onTipoChange(event: any): void {
    const tipo = event.target.value;
    if(tipo === 'Video') {
      this.isVideo = true;
      this.resourceForm.get('urlExterna')?.setValidators([Validators.required]);
      this.isInputDisabled = true;

      // Disable file input if the type is video
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.disabled = true;

      }
    }
  }

  uploadResource(): void {
    if(this.isInputDisabled) {
      const urlExterna = this.resourceForm.get('urlExterna')?.value;
      if (!urlExterna || this.resourceForm.invalid) {
        Swal.fire('Falta URL', 'Por favor proporciona una URL externa para el video.', 'warning');
        return;
      }

    } else {
      if (this.resourceForm.invalid || !this.selectedFile) {
        Swal.fire('Faltan datos', 'Por favor completa todos los campos y selecciona un archivo.', 'warning');
        return;
      }
    }

    if (this.isVideo) {
      const urlExterna = this.resourceForm.get('urlExterna')?.value;
      if (!urlExterna) {
        Swal.fire('Falta URL', 'Por favor proporciona una URL externa para el video.', 'warning');
        return;
      }

      const dataVideoToSend = {
        titulo: this.resourceForm.get('titulo')?.value,
        descripcion: this.resourceForm.get('descripcion')?.value,
        tipo: this.resourceForm.get('tipo')?.value,
        idCategoria: this.resourceForm.get('categoriaId')?.value,
        idLicencia: this.resourceForm.get('licenciaId')?.value,
        idUsuario: this.internalUserId, // <-- Reemplazaremos esto  después por el ID dinámico del usuario logueado
        urlExterna: urlExterna
      }

      this.resourceService.createResource(dataVideoToSend, this.isVideo).subscribe({
        next: () => {
          Swal.fire('¡Éxito!', 'Recurso subido correctamente.', 'success');
          this.isResourceSaved.emit({
            isSaved: true,
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          Swal.fire('Error', 'Ocurrió un error al subir el recurso.', 'error');
          console.error(err);
        }
      });

    } else {
      const formData = new FormData();
      formData.append('titulo', this.resourceForm.get('titulo')?.value);
      formData.append('descripcion', this.resourceForm.get('descripcion')?.value);
      formData.append('tipo', this.resourceForm.get('tipo')?.value);
      formData.append('idCategoria', this.resourceForm.get('categoriaId')?.value);
      formData.append('idLicencia', this.resourceForm.get('licenciaId')?.value);
      formData.append('idUsuario', this.internalUserId); // <-- Reemplaza esto por el ID dinámico del usuario logueado
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.resourceService.createResource(formData, this.isVideo).subscribe({
        next: () => {
          Swal.fire('¡Éxito!', 'Recurso subido correctamente.', 'success');
          this.isResourceSaved.emit({
            isSaved: true,
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          Swal.fire('Error', 'Ocurrió un error al subir el recurso.', 'error');
          console.error(err);
        }
      });
    }


  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
