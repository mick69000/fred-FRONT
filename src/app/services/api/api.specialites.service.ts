import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSpecialiteService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer tous les Specialites
  getAllSpecialites(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/specialites/`)
      .pipe(tap((data: any) => console.log('📊 Specialites reçues :', data)));
  }

  // 📌 ajoute une Specialite
  setSpecialite(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/specialites/`, { nom }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Cette Specialite existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime une Specialite
  deleteSpecialite(nom: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/specialites/${nom}`);
  }
}
