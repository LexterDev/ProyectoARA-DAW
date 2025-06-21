import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth0Service } from '../../services/auth0.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { map, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estudiantedashboard',
  imports: [CommonModule, MatCard, MatCardTitle],
  templateUrl: './estudiantedashboard.component.html',
  styleUrl: './estudiantedashboard.component.scss'
})
export class EstudiantedashboardComponent {
  userInformation: any = {};
  private destroy$ = new Subject<void>();
  userSynced: boolean = false;
  user: any = null;

  constructor(private authService2: AuthService, private authService: Auth0Service) {

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

    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.syncUserWithBackend(user);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private syncUserWithBackend(auth0User: any) {
    // const userPayload = {
    //   nombre: this.extractName(auth0User),
    //   email: auth0User.email,
    //   rol: this.determineUserRole(auth0User), // Lógica para determinar rol
    //   avatar: auth0User.picture || 'AvatarMan1.png',
    //   auth0_id: auth0User.sub
    // };

    const nombre = this.extractName(auth0User);
    const email = auth0User.email;
    const rol = this.determineUserRole(auth0User);
    const avatar = auth0User.picture || 'AvatarMan1.png';
    const auth0_id = auth0User.sub;

    
    this.authService2.register(nombre, email, '', rol, avatar, auth0_id)
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.userSynced = true;
          // this.isLoading = false;
          
          if (response.isNewUser) {
            // Mostrar mensaje de bienvenida
            // this.showWelcomeMessage();
            console.log('Usuario registrado exitosamente');
          }
        },
        error: (error) => {
          // this.isLoading = false;
          if (error.status === 409) {
            // Usuario ya existe
            this.userSynced = true;
            console.log('Usuario ya registrado');
          } else {
            console.error('Error:', error);
            // Manejar error apropiadamente
          }
        }
      });
  }
  private extractName(auth0User: any): string {
    return auth0User.name || auth0User.nickname || '';
  }

  private determineUserRole(auth0User: any): string {
    const roles = auth0User['https://my-app.example.com/roles'] || [];
    return roles.length > 0 ? roles[0] : 'Usuario';
  }
}
