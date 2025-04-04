import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiOmService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Oms
  getAllOms(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/oms/`)
      .pipe(tap((data: any) => console.log('📊 Oms reçues :', data)));
  }

  // 📌 ajoute un Om
  addOm(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/oms/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Cet Om existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un Om
  deleteOm(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/oms/${numero}`);
  }
}
