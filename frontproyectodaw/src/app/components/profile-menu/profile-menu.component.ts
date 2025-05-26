import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Auth0Service } from '../../services/auth0.service';
import { Router } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent implements OnInit, OnDestroy {

  userInformation: any = {};
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: Auth0Service) {}

  //functionto redirect
  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    this.authService.user$.pipe(
      takeUntil(this.destroy$),
      map(user => {
        if (user) {
          const namespace = 'https://my-app.example.com/';
          const roles = user[`${namespace}roles`] || [];
          
          this.userInformation = {
            nombre: user.nickname || user.name || '',
            email: user.email || '',
            rol: roles.length > 0 ? roles[0] : 'Usuario',
            avatar: user.picture || ''
          };
        }
      })
    ).subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/']);
  }

}
