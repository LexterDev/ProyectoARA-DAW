import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" style="padding: 0;">
    <img [src]="user.avatar" width="80" height="80" style="border-radius: 50%" />
    </button>
    <mat-menu #menu="matMenu">
      <div style="padding: 10px; text-align: center;">
        <img [src]="user.avatar" width="50" style="border-radius: 50%" />
        <div><strong>{{ user.name }}</strong></div>
        <div style="font-size: 12px;">{{ user.role }}</div>
        <div style="font-size: 12px;">{{ user.email }}</div>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item>Perfil</button>
      <button mat-menu-item>Preferencias</button>
      <button mat-menu-item>Información</button>
      <button mat-menu-item>Cerrar sesión</button>
    </mat-menu>
  `
})
export class UserAvatarComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}


