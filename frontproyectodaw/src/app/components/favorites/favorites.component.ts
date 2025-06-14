import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<FavoritesComponent>,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.isLoading = true;
    this.categoriesService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar favoritos', error);
        this.isLoading = false;
      }
    });
  }

  deleteFavorite(favoriteId: string) {
    if (confirm('¿Estás seguro de eliminar este favorito?')) {
      this.categoriesService.deleteFavorite(favoriteId).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
        },
        error: (error) => {
          console.error('Error al eliminar favorito', error);
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}