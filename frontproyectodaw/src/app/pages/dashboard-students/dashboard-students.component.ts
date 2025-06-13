import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfilComponent } from "../perfil/perfil.component";
import { ConfiguracionComponent } from "../configuracion/configuracion.component";


@Component({
  selector: 'app-dashboard-students',
  imports: [
    MatTabsModule,
    PerfilComponent,
    ConfiguracionComponent,
],
  templateUrl: './dashboard-students.component.html',
  styleUrl: './dashboard-students.component.scss'
})
export class DashboardStudentsComponent{}
