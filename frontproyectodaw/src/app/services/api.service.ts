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
      register: `${this.apiUrl}/auth/register`,
      //AGREGAR RUTAS DE VER Y EDITAR INFORMACION
      edit: `${this.apiUrl}/auth/edit`,
      get: `${this.apiUrl}/auth/get`,
      getUserByAuth0Id: (auth0Id: string) => `${this.apiUrl}/users/auth0/${auth0Id}`,
    },
    ressources: {
      getAll: `${this.apiUrl}/resources`,
      getById: (id: number) => `${this.apiUrl}/resources/${id}`,
      create: `${this.apiUrl}/resources`,
      update: (id: number) => `${this.apiUrl}/resources/${id}`,
      delete: (id: number) => `${this.apiUrl}/resources/${id}`,
      //AGREGAR RUTAS DE VER RECURSOS POR ID DE USUARIO
      getByUser: (userId: number) => `${this.apiUrl}/resources/user/${userId}`,
      //Busqueda de recursos por tipo
      search: `${this.apiUrl}/resources/search`,
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
  },
  users: {
    getAll: `${this.apiUrl}/users`,
    getById: (id: number) => `${this.apiUrl}/users/${id}`,
    create: `${this.apiUrl}/users`,
    update: (id: number) => `${this.apiUrl}/users/${id}`,
    delete: (id: number) => `${this.apiUrl}/users/${id}`
  },
  ratings: {
    getAll: `${this.apiUrl}/ratings`,
    getById: (id: number) => `${this.apiUrl}/ratings/${id}`,
    create: `${this.apiUrl}/ratings`,
    update: (id: number) => `${this.apiUrl}/ratings/${id}`,
    delete: (id: number) => `${this.apiUrl}/ratings/${id}`,
    getByResourceId: (resourceId: number) => `${this.apiUrl}/ratings/resource/${resourceId}`,
    getRatingsByResourceId: (resourceId: number) => `${this.apiUrl}/ratings/resource/${resourceId}`,
  },
  comments: {
    getAll: `${this.apiUrl}/comments`,
    getById: (id: number) => `${this.apiUrl}/comments/${id}`,
    create: `${this.apiUrl}/comments`,
    update: (id: number) => `${this.apiUrl}/comments/${id}`,
    delete: (id: number) => `${this.apiUrl}/comments/${id}`,
    getByResourceId: (resourceId: number) => `${this.apiUrl}/comments/resource/${resourceId}`,
  }
}
}