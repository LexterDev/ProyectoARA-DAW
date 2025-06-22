import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient

  ) { }

  getAllResources(): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ressources.getAll);
  }

  getResourceById(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.ressources.getById(id));
  }

  createResource(resource: any, isVideo: boolean): Observable<any> {
    if(isVideo) {
      return this.http.post(this.apiService.API_ENDPOINTS.ressources.createExternal, resource);
    }
    return this.http.post(this.apiService.API_ENDPOINTS.ressources.create, resource);
  }

  updateResource(id: number, resource: any): Observable<any> {
    return this.http.put(this.apiService.API_ENDPOINTS.ressources.update(id), resource);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.ressources.delete(id));
  }

  getUserByAuth0Id(auth0Id: string): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.authentication.getUserByAuth0Id(encodeURIComponent(auth0Id)));
  }

  getFileRL(resource: any): string {
    return this.http.get(this.apiService.API_ENDPOINTS.ressources.getFileRL(resource.id), { responseType: 'text' }).toString();
  }

}
