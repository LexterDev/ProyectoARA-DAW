import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor(private auth: AuthService) {}

  // Estado de autenticación
  get isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  // Datos del usuario
  get user$(): Observable<any> {
    return this.auth.user$;
  }

  // Login
  login(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
        ui_locales: 'es'
      }
    });
  }

  //Registro
  register(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
        screen_hint: 'signup',
        ui_locales: 'es'
      }
    });
  }

  // Logout
  logout(): void {
    this.auth.logout({ 
      logoutParams: { returnTo: window.location.origin } 
    });
  }

  // Obtener roles
  getUserRoles(): Observable<string[]> {
    return this.user$.pipe(
      map(user => {
        const namespace = 'https://my-app.example.com/';
        return user?.[`${namespace}roles`] || [];
      })
    );
  }

  // Verificar si tiene un rol específico
  hasRole(role: string): Observable<boolean> {
    return this.getUserRoles().pipe(
      map(roles => roles.includes(role))
    );
  }
}
