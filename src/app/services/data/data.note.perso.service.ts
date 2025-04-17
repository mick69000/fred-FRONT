import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NotePerso } from '../../models/notePerso';

@Injectable({
  providedIn: 'root',
})
export class DataNotePersoService {
  private apiUrl = 'http://localhost:3000/api'; // Adresse du backend

  constructor(private http: HttpClient) {}

  // 📌 Récupérer la liste des journées Ng.
  getAllNotesPerso(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/noteperso/`)
      .pipe(tap((data: any) => console.log('📊 Notes perso reçues :', data)));
  }

  // 📌 renseigne une journée en ng
  setNotePerso(noteAAjouter: NotePerso): Observable<any> {
    console.log('dans le setNotePersog ', noteAAjouter);

    return this.http.post(`${this.apiUrl}/noteperso/`, noteAAjouter).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Une erreur est survenue.'));
      })
    );
  }

  updateNotePerso(
    id: number,
    titreAModifier: string,
    commentaireAModifier: string
  ) {
    console.log(
      'dans le updateNotePersog ',
      id,
      titreAModifier,
      commentaireAModifier
    );

    return this.http.put(`${this.apiUrl}/noteperso`, {
      id,
      titre: titreAModifier,
      commentaire: commentaireAModifier,
    });
  }

  // 📌 supprime les données d'une journée
  deleteNotePerso(journee: string, numero: number): Observable<any> {
    console.log('journee et numero : ', journee, numero);

    return this.http.delete(`${this.apiUrl}/noteperso/${journee}/${numero}`);
  }
}
