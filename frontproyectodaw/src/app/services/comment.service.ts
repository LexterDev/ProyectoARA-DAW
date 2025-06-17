import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  // Comentarios de un recurso en particular
  getCommentsByResourceId(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.comments.getByResourceId(id)); 
  }
  
  // Comentarios hechos por un usuario en particular
  getCommentsByUserId(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.comments.getByUserId(id)); 
  }
  
  createComment(comment: any): Observable<any> {
    return this.http.post(this.apiService.API_ENDPOINTS.comments.create, comment);
  }
  
  updateComment(id: number, comment: any): Observable<any> {
    return this.http.put(this.apiService.API_ENDPOINTS.comments.update(id), comment);
  }
  
  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.comments.delete(id)); 
  }
}

