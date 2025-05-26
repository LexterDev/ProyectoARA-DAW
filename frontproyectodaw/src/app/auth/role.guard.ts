import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Auth0Service } from '../services/auth0.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: Auth0Service, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    const expectedRoles: string[] = route.data['roles'];

    return this.auth.getUserRoles().pipe(
      map(userRoles => {
        const hasRole = userRoles.some(role => expectedRoles.includes(role));
        if (!hasRole) {
          this.router.navigate(['/unauthorized']); // o tu ruta de error
        }
        return hasRole;
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}

