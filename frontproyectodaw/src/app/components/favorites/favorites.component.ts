import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  favoriteForm: FormGroup;

  @Output() isCategorySaved = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<FavoritesComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.favoriteForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  closeFavoritesCreateDialog() {
    this.dialogRef.close();
  }

  editFavorite() {
    if (this.favoriteForm.valid) {
      const newFavorite = {
        nombre: this.favoriteForm.get('name')?.value,
        descripcion: this.favoriteForm.get('description')?.value,
      };

      this.categoriesService.createCategory(newFavorite).subscribe({
        next: (response) => {

          this.isCategorySaved.emit({
            isCreated: true,
          });
          
          console.log('Favorito editado con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
          this.closeFavoritesCreateDialog();
          
        },
        error: (error) => {
          console.error('Error al editar el favorito', error);
        }
      });
    }
  }

}
