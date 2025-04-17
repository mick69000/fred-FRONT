import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JournéeEngin } from '../../models/journéeEngin';

@Injectable({
  providedIn: 'root',
})
export class DataAgcService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des journées Agc.
  getAllAgcs(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/agc/`)
      .pipe(tap((data: any) => console.log('📊 Jounées AGC reçues :', data)));
  }

  // 📌 renseigne une journée en agc
  setAgc(journéeAAjouter: JournéeEngin): Observable<any> {
    console.log('dans le setAgc ', journéeAAjouter);

    return this.http.post(`${this.apiUrl}/agc/`, journéeAAjouter).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime les données d'une journée
  deleteAgc(journee: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agc/${journee}`);
  }
}
