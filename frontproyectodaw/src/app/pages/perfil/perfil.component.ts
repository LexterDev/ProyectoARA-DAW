import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FavoritesComponent } from '../../components/favorites/favorites.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  openFavoritesDialog() {
    const dialogRef = this.dialog.open(FavoritesComponent, {
      width: '600px',
      disableClose: true // Opcional: evita que se cierre haciendo clic fuera
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Favorito creado con éxito');
        // Aquí puedes actualizar la lista de favoritos si es necesario
      }
    });
  }
  userInformation: any = {};

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {}

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  nombre: string = '';
  email: string = '';
  rol: string = '';
  avatar: string = '';
  ultimo_acceso: string = '';


  ngOnInit(): void {
    this.getUserInfo();  
  }

  // get user Info from local storage
  getUserInfo() {
    const userName = this.authService.getUserName();
    const email = this.authService.getUserEmail();
    const rol = this.authService.getUserRole();
    const avatar = this.authService.getUserAvatar();
    const ultimo_acceso = this.authService.getUserLastAccess();

    this.userInformation = {
      userName: userName,
      email: email,
      rol: rol,
      avatar: avatar,
      ultimo_acceso: ultimo_acceso
    };    
  }


}
