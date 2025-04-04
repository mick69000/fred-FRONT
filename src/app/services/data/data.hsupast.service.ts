import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JournéeAAjouter } from '../../models/journéeAAjouter';

@Injectable({
  providedIn: 'root',
})
export class DataHsupastService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des heures sup.
  getAllHsups(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/hsupast/`)
      .pipe(tap((data: any) => console.log('📊 Heure sup. reçues :', data)));
  }

  // 📌 renseigne une journée en hsup
  setHsup(journéeAAjouter: JournéeAAjouter): Observable<any> {
    return this.http.post(`${this.apiUrl}/hsupast/`, { journéeAAjouter }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Ce jours est déjà renseigné !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime les données d'une journée
  deleteHsup(dateDebut: string): Observable<any> {
    console.log('data.hsupast.service dateDebut === ', dateDebut);

    return this.http.delete(`${this.apiUrl}/hsupast/${dateDebut}`);
  }
}
