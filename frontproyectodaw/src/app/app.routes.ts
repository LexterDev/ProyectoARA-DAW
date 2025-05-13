import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LicensesComponent } from './pages/licenses/licenses.component';
import { ResourceComponent } from './pages/resource/resource.component';
import { DashboardDocenteComponent } from './components/dashboard-docente/dashboard-docente.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: 'resources', component: ResourceComponent },
  { path: 'dashboard-docente', component: DashboardDocenteComponent },
  { path: '', redirectTo: 'dashboard-docente', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard-docente' }
];
