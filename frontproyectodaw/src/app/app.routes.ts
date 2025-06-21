import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LicensesComponent } from './pages/licenses/licenses.component';
import { ResourceComponent } from './pages/resource/resource.component';
import { DashboardStudentsComponent } from './pages/dashboard-students/dashboard-students.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './auth/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyPoliciesComponent } from './pages/privacy-policies/privacy-policies.component';
import { GeneralDescriptionComponent } from './pages/general-description/general-description.component';
import { DashboardDocenteComponent } from './pages/dashboard-docente/dashboard-docente.component';
import { RoleGuard } from './auth/role.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { DocentedashboardComponent } from './pages/docentedashboard/docentedashboard.component';
import { EstudiantedashboardComponent } from './pages/estudiantedashboard/estudiantedashboard.component';

// NUEVO - importación del componente Favoritos
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: 'resources', component: ResourceComponent },
  { path: 'dashboard', component: DashboardStudentsComponent },
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'perfil-edit', component: PerfilEditComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacy-polices', component: PrivacyPoliciesComponent },
  { path: 'general-description', component: GeneralDescriptionComponent },
  { path: 'dashboard-docente', component: DashboardDocenteComponent },



  {
    path: 'estudiante/dashboard',
    component: EstudiantedashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ESTUDIANTE'] }
  },
  {
    path: 'docente/dashboard',
    component: DocentedashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['DOCENTE'] }
  },
  {
    path: 'admin/dashboard',
    component: AdmindashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },

  {
  path: 'resources/favoritos',
  component: FavoritosComponent
}
];
