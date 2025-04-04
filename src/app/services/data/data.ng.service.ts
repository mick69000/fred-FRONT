import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JournéeEngin } from '../../models/journéeEngin';

@Injectable({
  providedIn: 'root',
})
export class DataNgService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des journées Ng.
  getAllNgs(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/ng/`)
      .pipe(tap((data: any) => console.log('📊 Jounées NG reçues :', data)));
  }

  // 📌 renseigne une journée en ng
  setNg(journéeAAjouter: JournéeEngin): Observable<any> {
    console.log('dans le setNg ', journéeAAjouter);

    return this.http.post(`${this.apiUrl}/ng/`, journéeAAjouter).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce jours est déjà renseigné !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime les données d'une journée
  deleteNg(journee: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ng/${journee}`);
  }
}
