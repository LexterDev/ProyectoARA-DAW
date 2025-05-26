import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { Auth0Service } from '../../services/auth0.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule, MatCard, MatCardTitle],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  userInformation: any = {};
  private destroy$ = new Subject<void>();

  constructor(private authService: Auth0Service) {
    
  }

  ngOnInit(): void {
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

}
