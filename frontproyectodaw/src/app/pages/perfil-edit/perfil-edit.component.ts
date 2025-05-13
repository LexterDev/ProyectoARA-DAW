import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-perfil-edit',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatCardModule],
  templateUrl: './perfil-edit.component.html',
  styleUrl: './perfil-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilEditComponent {
  // Expresión regular para validar nombres de usuario (letras, números, _, .)
  usernamePattern = /^[a-zA-Z0-9_.]{4,20}$/; // Entre 4 y 20 caracteres

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.usernamePattern),
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);
  matcher = new ErrorStateMatcher();
}
