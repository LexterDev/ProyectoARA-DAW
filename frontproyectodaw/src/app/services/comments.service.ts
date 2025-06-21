import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  // Método para obtener todos los comentarios
  getAllComments() {
    return this.http.get<any[]>(this.apiService.API_ENDPOINTS.comments.getAll);
  }

  // Método para crear un nuevo comentario
  createComment(comment: any) {
    return this.http.post<any>(this.apiService.API_ENDPOINTS.comments.create, comment);
  }

  // Método para actualizar un comentario existente
  updateComment(id: number, comment: any) {
    return this.http.put<any>(this.apiService.API_ENDPOINTS.comments.update(id), comment);
  }

  // Método para eliminar un comentario
  deleteComment(id: number) {
    return this.http.delete<any>(this.apiService.API_ENDPOINTS.comments.delete(id));
  }

  // Método para obtener los comentarios por ID de recurso
  getCommentsByResourceId(resourceId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiService.API_ENDPOINTS.comments.getByResourceId(resourceId));
  }
}
