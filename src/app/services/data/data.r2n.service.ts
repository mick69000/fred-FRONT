import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JournéeEngin } from '../../models/journéeEngin';

@Injectable({
  providedIn: 'root',
})
export class DataR2nService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des journées R2n.
  getAllR2ns(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/r2n/`)
      .pipe(tap((data: any) => console.log('📊 Jounées R2N reçues :', data)));
  }

  // 📌 renseigne une journée en r2n
  setR2n(journéeAAjouter: JournéeEngin): Observable<any> {
    console.log('dans le steR2N ', journéeAAjouter);

    return this.http.post(`${this.apiUrl}/r2n/`, journéeAAjouter).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce jours est déjà renseigné !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime les données d'une journée
  deleteR2n(journee: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/r2n/${journee}`);
  }
}
