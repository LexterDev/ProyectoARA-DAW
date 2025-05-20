import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ResourceCreateComponent } from '../../components/resource-create/resource-create.component';


@Component({
  selector: 'app-dashboard-docente',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './dashboard-docente.component.html',
  styleUrls: ['./dashboard-docente.component.scss']
})
export class DashboardDocenteComponent {
  // Tabla final
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any[] = [];

  // Tabla de recursos subidos
  uploadedDisplayedColumns: string[] = ['title', 'type', 'uploadedBy'];
  uploadedResources: any[] = [];

  // Tabla de recursos pendientes
  pendingDisplayedColumns: string[] = ['title', 'type', 'submittedBy'];
  pendingResources: any[] = [];

  // Mostrar el componente ResourceEdit
  mostrarFormulario: boolean = false;

  // Mostrar el componente ResourceCreate
  constructor(private dialog: MatDialog) {}

  openResourceDialog(): void {
    const dialogRef = this.dialog.open(ResourceCreateComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Recurso creado');
        // Aquí podrías recargar los datos
      }
    });
  }

}

