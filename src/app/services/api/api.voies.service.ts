import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiVoieService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste de toutes les voies
  getAllVoies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/voies/`)
      .pipe(tap((data: any) => console.log('📊 Voies reçues :', data)));
  }

  // 📌 ajoute une voie
  setVoie(numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/voies/`, { numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Cette voie existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime une voie
  deleteVoie(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/voies/${numero}`);
  }
}
