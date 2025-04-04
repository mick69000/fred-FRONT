import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMsurgentService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Ms_urgents
  getAllMsurgents(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/msurgents/`)
      .pipe(tap((data: any) => console.log('📊 Ms_urgents reçues :', data)));
  }

  // 📌 ajoute un Ms_urgent
  setMsurgent(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/msurgents/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce Ms_urgent existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un Ms_urgent
  deleteMsurgent(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/msurgents/${numero}`);
  }
}
