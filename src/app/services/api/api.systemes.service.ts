import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSystemeService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Systemes
  getAllSystemes(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/systemes/`)
      .pipe(tap((data: any) => console.log('📊 Systemes reçues :', data)));
  }

  // 📌 ajoute un Systeme
  setSysteme(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/systemes/`, { nom }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce Systeme existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un Systeme
  deleteSysteme(nom: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/systemes/${nom}`);
  }
}
