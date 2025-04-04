import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFirexService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Firexs
  getAllFirexs(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/firexs/`)
      .pipe(tap((data: any) => console.log('📊 Firexs reçues :', data)));
  }

  // 📌 ajoute un Firex
  setFirex(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/firexs/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce Firex existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un Firex
  deleteFirex(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/firexs/${numero}`);
  }
}
