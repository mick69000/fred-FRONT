import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommunService {
  année: number = 0;
  mois: number = 0;
  jour: number = 0;

  récupèreLeMoisEtLAnnée(dateDebutSaisie: string) {
    //const [yearsD, monthsD, daysD] = dateDebutSaisie
    const [j, m, a] = dateDebutSaisie
      .split('-')
      .map((num: string) => parseInt(num, 10));

    if (j > 31) {
      this.année = j;
      this.mois = m;
      this.jour = a;
    } else {
      this.année = a;
      this.mois = m;
      this.jour = j;
    }

    return [this.mois, this.année, this.jour];
  }

  dateFrancaise(date: string) {
    const separator = date.includes('/') ? '/' : '-';
    const parts = date.split(separator);

    let jour: string, mois: string, annee: string;

    if (parts[0].length === 4) {
      annee = parts[0];
      mois = parts[1];
      jour = parts[2];
    } else {
      jour = parts[0];
      mois = parts[1];
      annee = parts[2];
    }

    return `${jour.padStart(2, '0')}-${mois.padStart(2, '0')}-${annee}`;
  }

  formatDateToInput(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  }
}
