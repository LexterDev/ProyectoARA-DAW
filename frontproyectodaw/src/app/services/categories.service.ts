import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getCategories(): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.categories.getAll);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.categories.getById(id));
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.apiService.API_ENDPOINTS.categories.create, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(this.apiService.API_ENDPOINTS.categories.update(id), category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.categories.delete(id));
  }
  getFavorites(): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.favorites.getAll);
  }
  deleteFavorite(favoriteId: string): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.favorites.delete(favoriteId));
  }
}
