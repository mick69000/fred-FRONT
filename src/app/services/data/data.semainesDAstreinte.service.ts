import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { SemainesDAstreinte } from '../../models/semainesDAstreinte';

@Injectable({
  providedIn: 'root',
})
export class DataSemainesDAstreinteService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des semaines d'astreinte.
  getAllSemaines(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/semaines/`)
      .pipe(
        tap((data: any) =>
          console.log("📊 Semaines d'astreinte reçues :", data)
        )
      );
  }

  // 📌 enregistre les semaines de la nouvelle année
  setSemaines(semainesDAstreinte: SemainesDAstreinte[]): Observable<any> {
    console.log('dans le setSemaine ', semainesDAstreinte);

    return this.http.post(`${this.apiUrl}/semaines/`, semainesDAstreinte).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  updateSemaines(semainesDAstreinte: SemainesDAstreinte[]) {
    console.log('dans le updateSemaines ', semainesDAstreinte);

    return this.http.put(`${this.apiUrl}/semaines`, semainesDAstreinte);
  }

  // 📌 supprime les données d'une journée
  deleteSemaines(annee: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/semaines/${annee}`);
  }
}
