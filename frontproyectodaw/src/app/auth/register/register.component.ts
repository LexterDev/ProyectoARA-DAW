import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
// import * as particlesJS from 'particles.js/particles';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
declare var particlesJS: any;
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIcon
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  required: any;
  mode: ProgressSpinnerMode = 'indeterminate';
  color: string = 'secondary';
  loading: boolean = false;
  shouldShakeEmail: boolean = false;
  shouldShakePassword: boolean = false;
  shouldShakeFullName: boolean = false;
  shouldShakeConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/)
        ]],
        confirmPassword: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/)
        ]]
      },
      { validators: this.passwordsMatchValidator } // validador de grupo
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          particlesJS.load('particles-js', 'particlesjs-config.json', () => {
            console.log('Particles.js config loaded');
          });
          this.changeButtonColor();
        }, 300); // Espera 1 segundo antes de cargar particles.js
      }
    });
  }


  /*ngAfterViewChecked(): void {
    particlesJS.load('particles-js', 'particlesjs-config.json', () => {
      console.log('Particles.js config loaded');
    });
    this.changeButtonColor();
    console.log('RegisterComponent initialized');
  }*/


  //Function to add #202020 to the border of the button with id "btn_login"
  changeButtonColor() {
    const button = document.getElementById('btn_register');
    if (button) {
      button.style.borderColor = '#202020';
      button.style.borderWidth = '2px';
      button.style.borderStyle = 'solid';
    }
  }

  onInputBlur() {
    const controlsToShake = [
      { controlName: 'email', shakeFlag: 'shouldShakeEmail' },
      { controlName: 'password', shakeFlag: 'shouldShakePassword' },
      { controlName: 'fullName', shakeFlag: 'shouldShakeFullName' },
      { controlName: 'confirmPassword', shakeFlag: 'shouldShakeConfirmPassword' }
    ];

    for (const { controlName, shakeFlag } of controlsToShake) {
      const control = this.registerForm.get(controlName);
      if (control && control.invalid && (control.dirty || control.touched)) {
        (this as any)[shakeFlag] = true;

        setTimeout(() => {
          (this as any)[shakeFlag] = false;
        }, 300);

        break; // Solo aplicamos shake a un campo a la vez
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const fullName = this.registerForm.get('fullName')?.value;
      const rol = "ESTUDIANTE";
      const avatar = 'AvatarMan1.png';

      this.loading = true; // Set loading to true when the request starts
      this.authService.register(fullName, email, password, rol, avatar, '').subscribe({
        next: (response) => {
          console.log(response);
          if (response.error) {
            this.loading = false; // Set loading to false when the request fails

            console.error('Register failed', response.error);

            // Handle register error, e.g., show an error message
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
              confirmButtonColor: '#ad1d7d',
            });

          } else {
            this.loading = false; // Set loading to false when the request succeeds
            console.log('Regitro Correcto', response);
            // Handle successful login, e.g., redirect to another page or show a success message
            Swal.fire({
              icon: 'success',
              title: 'Registro correcto',
              text: response.message,
              confirmButtonColor: '#ad1d7d',
            }).then(() => {
              // Redirect to the login page or any other page              
            });
          }
        },
        error: (error) => {
          this.loading = false; // Set loading to false when the request fails
          console.error('Register failed', error);

          // Handle login error, e.g., show an error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            confirmButtonColor: '#ad1d7d',
          });

        },
      }
      );

    } else {
      console.log('Form is invalid');
    }
  }
  //Function to redirect to the login page
  redirectToLogin() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
  }

}
