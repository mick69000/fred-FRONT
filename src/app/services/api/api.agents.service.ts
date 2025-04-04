import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAgentsService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des engins selon le type
  getAgents(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents/${type}`);
  }

  // 📌 Récupérer la liste de tous les engins
  getAllAgents(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/agents/`)
      .pipe(tap((data: any) => console.log('📊 Agents reçues :', data)));
  }

  // 📌 ajoute un agent a partir de son nom et prenom
  setAgent(nom: string, prenom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/agents/`, { nom, prenom }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Error('Cet agent existe déjà !'));
        }
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  // 📌 supprime un agent a partir de son nom et prenom
  deleteAgent(nom: string, prenom: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agents/${nom}/${prenom}`);
  }
}
