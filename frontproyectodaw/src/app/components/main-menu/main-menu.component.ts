import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth0Service } from '../../services/auth0.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
  title = '';
  menuItems: any = [
    { title: 'Inicio', path: '/', icon: 'home' }
  ];

  constructor(private router: Router, public authService: Auth0Service) {}

  ngOnInit(): void {
    this.generateMenu();
  }

  // Generar el menú dinámicamente
  generateMenu() {
    this.authService.getUserRoles().subscribe((roles: string[]) => {
      console.log(roles);

      if (roles.includes('ADMIN')) {
        this.menuItems.push({ title: 'Dashboard', path: '/admin/dashboard', icon: 'widgets' });
        this.menuItems.push({ title: 'Categorias', path: 'categories', icon: 'category' });
        this.menuItems.push({ title: 'Licencias', path: 'licenses', icon: 'description' });
        this.menuItems.push({ title: 'Recursos', path: 'resources', icon: 'folder' });
        this.menuItems.push({ title: 'Etiquetas', path: 'tags', icon: 'label' });
      }

      if (roles.includes('DOCENTE')) {
        this.menuItems.push({ title: 'Dashboard', path: '/docente/dashboard', icon: 'widgets' });
        this.menuItems.push({ title: 'Recursos', path: 'resources', icon: 'folder' });
        this.menuItems.push({ title: 'Etiquetas', path: 'tags', icon: 'label' });
      }

      if (roles.includes('ESTUDIANTE')) {
        this.menuItems.push({ title: 'Dashboard', path: '/estudiante/dashboard', icon: 'widgets' });
        this.menuItems.push({ title: 'Recursos', path: 'resources', icon: 'folder' });
      }

      // ✅ NUEVO: Opción para acceder a los recursos favoritos (para todos)
      this.menuItems.push({
        title: 'Recursos favoritos',
        path: 'resources/favoritos',
        icon: 'favorite' // ícono de corazón
      });
    });
  }

  // Redireccionar
  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}