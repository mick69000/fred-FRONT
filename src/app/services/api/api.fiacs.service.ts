import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFiacService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les fiacs
  getAllFiacs(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/fiacs/`)
      .pipe(tap((data: any) => console.log('📊 Fiacs reçues :', data)));
  }

  // 📌 ajoute un fiac
  setFiac(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/fiacs/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce Fiac existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un fiac
  deleteFiac(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fiacs/${numero}`);
  }
}
