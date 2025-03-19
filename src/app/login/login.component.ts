import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatLabel,
    MatError,
    MatInput,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   if (this.authService.isAuthenticated()) {
     this.router.navigate(['/']);
   }
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: { error: { message: string; }; }) => {
          const errorMessage = error?.error?.message || 'Identifiants invalides';
          this.snackBar.open(errorMessage, 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }

    if (controlName === 'password' && control.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return '';
  }
}
