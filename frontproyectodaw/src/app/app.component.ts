import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { routeTransitionAnimations } from '../route-transition';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { Auth0Service } from './services/auth0.service';
import { Observable, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainMenuComponent,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ProfileMenuComponent,
    MatButtonModule
  ],
  animations: [
    routeTransitionAnimations
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontproyectodaw';
  isSidenavOpen = true;
  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, public route: ActivatedRoute, public authService: Auth0Service) {}

  toggleMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(
        switchMap(isAuthenticated => {
          if (isAuthenticated) {
            return this.authService.user$;
          }
          return of(null);
        })
      )
      .subscribe(user => {
        if (user) {
          const roles = user['https://my-app.example.com/roles'] || [];

          // Evita redirigir si ya está en otra ruta
          if (this.router.url === '/' || this.router.url === '/login') {
            // Redireccionamos según el primer rol encontrado
            if (roles.includes('ADMIN')) {
              this.router.navigate(['/admin/dashboard']);
            } else if (roles.includes('DOCENTE')) {
              this.router.navigate(['/docente/dashboard']);
            } else if (roles.includes('ESTUDIANTE')) {
              this.router.navigate(['/estudiante/dashboard']);
            } else {
              this.router.navigate(['/unauthorized']);
            }
          }
        }
      });
  }
  
  // Funcion para guar usuario en localstorage
  // saveUser(user: any) {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // Función para redireccionar a la página de login
  redirectToLogin() {
    // this.router.navigate(['/login']);
    // this.authService.loginWithRedirect();
    this.authService.login();
  }

  // Función para redireccionar a la página de registro
  redirectToRegister() {
    this.authService.register();
  }

  // Función para cerrar sesión
  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
    


}
