import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  // Método para obtener todas las valoraciones
  getAllRatings() {
    return this.http.get<any[]>(this.apiService.API_ENDPOINTS.ratings.getAll);
  }

  // Método para crear una nueva valoración
  createRating(rating: any) {
    return this.http.post<any>(this.apiService.API_ENDPOINTS.ratings.create, rating);
  }

  // Método para actualizar una valoración existente
  updateRating(id: number, rating: any) {
    return this.http.put<any>(this.apiService.API_ENDPOINTS.ratings.update(id), rating);
  }

  // Método para obtener las valoraciones por ID de recurso
  getRatingsByResourceId(resourceId: number) {
    return this.http.get<any[]>(this.apiService.API_ENDPOINTS.ratings.getByResourceId(resourceId));
  }


}
