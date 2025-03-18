import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:8089`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    // Vérifie si un utilisateur est stocké dans localStorage/sessionStorage
    const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');

    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        // En cas d'erreur de parsing, nettoyer le stockage
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
      }
    }
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signin`, { username: email,password: password })
      .pipe(
        map(response => response),
        tap(user => {
          // Stocker l'utilisateur selon le choix "Se souvenir de moi"
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('currentUser', JSON.stringify(user));

          // Mettre à jour le BehaviorSubject
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Erreur de connexion', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    // Supprimer l'utilisateur du stockage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    // Réinitialiser le BehaviorSubject
    this.currentUserSubject.next(null);

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }

  register(user: { email: string; password: string; firstName: string; lastName: string }): Observable<User> {
    return this.http.post<{ user: User }>(`${this.apiUrl}/register`, user)
      .pipe(
        map(response => response.user),
        catchError(error => {
          console.error('Erreur d\'inscription', error);
          return throwError(() => error);
        })
      );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        catchError(error => {
          console.error('Erreur de récupération de mot de passe', error);
          return throwError(() => error);
        })
      );
  }

  resetPassword(token: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, { token, password })
      .pipe(
        catchError(error => {
          console.error('Erreur de réinitialisation de mot de passe', error);
          return throwError(() => error);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }
}
