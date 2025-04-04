import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEnginService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des engins selon le type
  getEngins(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/engins/${type}`);
  }

  // 📌 Récupérer la liste de tous les engins
  getAllEngins(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/engins/`)
      .pipe(tap((data: any) => console.log('📊 Engins reçues :', data)));
  }

  // 📌 ajoute un engin a partir de son numéro et de sa série
  setEngin(type: string, numero: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/engins/`, { type, numero }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Cet Engin existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un engin a partir de son numéro
  deleteEngin(numero: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/engins/${numero}`);
  }
}
