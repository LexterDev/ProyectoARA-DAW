import { Injectable } from '@angular/core';

// Environment file
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl; // URL base de la API

  // Endpoint de la API
  API_ENDPOINTS = {
    authentication: {
      login: `${this.apiUrl}/auth/login`,
      register: `${this.apiUrl}/auth/register`
    },
    ressources: {
      getAll: `${this.apiUrl}/resources`,
      getById: (id: number) => `${this.apiUrl}/resources/${id}`,
      create: `${this.apiUrl}/resources`,
      update: (id: number) => `${this.apiUrl}/resources/${id}`,
      delete: (id: number) => `${this.apiUrl}/resources/${id}`,
      createExternal: `${this.apiUrl}/resources/external`,
    },
    tags: {
      getAll: `${this.apiUrl}/tags`,
      getById: (id: number) => `${this.apiUrl}/tags/${id}`,
      create: `${this.apiUrl}/tags`,
      update: (id: number) => `${this.apiUrl}/tags/${id}`,
      delete: (id: number) => `${this.apiUrl}/tags/${id}`,
    },
    categories: {
      getAll: `${this.apiUrl}/categories`,
      getById: (id: number) => `${this.apiUrl}/categories/${id}`,
      create: `${this.apiUrl}/categories`,
      update: (id: number) => `${this.apiUrl}/categories/${id}`,
      delete: (id: number) => `${this.apiUrl}/categories/${id}`
    },
    licenses:{
    getAll: `${this.apiUrl}/licenses`,
      getById: (id: number) => `${this.apiUrl}/licenses/${id}`,
      create: `${this.apiUrl}/licenses`,
      update: (id: number) => `${this.apiUrl}/licenses/${id}`,
      delete: (id: number) => `${this.apiUrl}/licenses/${id}`
  }
}
}