import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../services/auth0.service';
import { RatingsService } from '../../services/ratings.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-ratings-resource',
  imports: [CommonModule, MatIcon, MatButtonModule],
  templateUrl: './ratings-resource.component.html',
  styleUrl: './ratings-resource.component.scss'
})
export class RatingsResourceComponent implements OnInit {

  constructor(private authService: AuthService,
    private auth0Service: Auth0Service,
    private ratingsService: RatingsService,
    private resourceService: ResourceService
  ) {}

  @Input() resource: any;
  userId: number = 0;
  totalRatings: number = 0;
  ratingForResource: any = null;

  ngOnInit(): void {
  this.getuserId().then(() => {
    // Solo después de obtener el userId, ejecutar el resto
    this.setStars();
    this.getRatingsByResourceId(this.resource.id);
    console.log("Valoraciones del usuario:", this.getUserRating());
  });
}

  // Método para obtner las valoraciones por el ID del recurso
  getRatingsByResourceId(resourceId: number) {
    this.ratingsService.getRatingsByResourceId(resourceId).subscribe({
      next: (ratings) => {
        console.log('Valoraciones obtenidas:', ratings);
        this.resource.valoraciones = ratings; // Asignar las valoraciones al recurso
        this.setStars(); // Actualizar las estrellas visualmente
        this.ratingForResource = ratings;
      },
      error: (error) => {
        console.error('Error al obtener las valoraciones:', error);
      }
    });
  }

  // Calcular promedio de las valoraciones
  get averageRating(): number {
    if (!this.resource || !this.resource.valoraciones || this.resource.valoraciones.length === 0) {
      return 0;
    }
    const total = this.resource.valoraciones.reduce((sum: number, rating: any) => sum + rating.puntuacion, 0);
    return total / this.resource.valoraciones.length;
  }

  // Método para obtener el número total de valoraciones
  get totalRatingsCount(): number {
    if (!this.resource || !this.resource.valoraciones) {
      return 0;
    }
    return this.resource.valoraciones.length;
  }

  // Método para marcar las entrellas de rojo filtrando por la puntuación del usuario
  setStars(): void {
    const starsContainer = document.querySelector('#rating-stars') as HTMLElement;

    if (starsContainer) {
      const starButtons = starsContainer.querySelectorAll('.star-button');
      starButtons.forEach((button, index) => {
        const starIcon = button.querySelector('.star-icon') as HTMLElement;
        // Verificar si la valoración del usuario es igual o mayor al índice de la estrella
        if (this.getUserRating() && this.getUserRating().puntuacion > index && this.getUserRating().puntuacion >= 1) {
          starIcon.style.color = 'red'; // Cambiar el color a rojo si está seleccionada
          console.log('Valoración del usuario:', this.getUserRating().puntuacion);
        } else {
          starIcon.style.color = 'black'; // Cambiar el 
        }
      });
  }
}

// Método para actualizar la visualización de las estrellas


  getuserId(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.authService.user$.subscribe(user => {
      if (user && typeof user.sub === 'string') {
        const userId = user.sub;
        this.resourceService.getUserByAuth0Id(userId).subscribe({
          next: (response) => {
            this.userId = response.id;
            console.log('ID del usuario obtenido:', this.userId);
            resolve(); // Resuelve la promesa cuando termine
          },
          error: (error) => {
            console.error('Error al obtener el usuario:', error);
            reject(error);
          }
        });
      } else {
        console.error('El usuario no tiene un sub válido.');
        reject('Usuario no válido');
      }
    });
  });
}

  // Método para manejar el clic en una estrella
  onStarClick(starIndex: number): void {
    if (this.authService.isAuthenticated$) {
      const starsContainer = document.querySelector('#rating-stars') as HTMLElement;
      if (starsContainer) {
        const starButtons = starsContainer.querySelectorAll('.star-button');
        starButtons.forEach((button, index) => {
          const starIcon = button.querySelector('.star-icon') as HTMLElement;
          // Cambia el color de la estrella a rojo si está seleccionada
          starIcon.style.color = index <= starIndex ? 'red' : 'black';

        });

        // Guardar la valoración en la api
        const rating = {
          puntuacion: starIndex + 1, // La puntuación es el índice de la estrella + 1
          recursoId: this.resource.id,
          usuarioId: this.userId
        };

        // console.log('Valoración a guardar:', rating);

        this.ratingsService.createRating(rating).subscribe({
          next: (response) => {
            console.log('Valoración guardada:', response);
            // Actualizar la lista de valoraciones del recurso
            this.resource.valoraciones.push(response);
            this.getUserRating().puntuacion = response.puntuacion; // Actualizar la puntuación del usuario
            this.setStars(); // Actualizar las estrellas visualmente
          },
          error: (error) => {
            console.error('Error al guardar la valoración:', error);
            alert('Error al guardar la valoración. Por favor, inténtalo de nuevo más tarde.');
          }
        });       
        
      }
    } else {
      alert('Por favor, inicia sesión para valorar este recurso.');
    }
  }

  // Filtrar las valoraciones del usuario
  getUserRating(): any {
    if (!this.resource || !this.resource.valoraciones || this.resource.valoraciones.length === 0) {
      return null;
    }
    // Buscar la valoración del usuario actual
    return this.resource.valoraciones.find((rating: any) => rating.usuarioId === this.userId);

    console.log(this.userId);
  }


}
