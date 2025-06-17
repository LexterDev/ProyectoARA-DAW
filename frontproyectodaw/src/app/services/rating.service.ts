import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RatingService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  getRatings(): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ratings.getAll);
  }

  getRatingById(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ratings.getById(id)); 
  }

  createRating(rating: any): Observable<any> {
    return this.http.post(this.apiService.API_ENDPOINTS.ratings.create, rating);
  }

  updateRating(id: number, rating: any): Observable<any> {
    return this.http.put(this.apiService.API_ENDPOINTS.ratings.update(id), rating);
  }

  deleteRating(id: number): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.ratings.delete(id)); 
  }
  
  getRatingByUserAndResource(userId: number, resourceId: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ratings.getByUserAndResource(userId, resourceId)); 
  }

  getRatingsByResourceId(resourceId: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ratings.getByResourceId(resourceId));
  }
}
