import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiModuleService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Modules
  getAllModules(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/modules/`)
      .pipe(tap((data: any) => console.log('📊 Modules reçues :', data)));
  }

  // 📌 ajoute un Module
  setModule(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/modules/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce Module existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un Module
  deleteModule(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/modules/${numero}`);
  }
}
