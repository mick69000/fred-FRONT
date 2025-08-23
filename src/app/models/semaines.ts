import { Injectable } from '@angular/core';

export interface Mercredi {
  date: string; // "01/01/2025 ==> 08/01/2025"
  value: boolean;
  month: string; // ex: "Janvier"
}

@Injectable({
  providedIn: 'root',
})
export class MercrediService {
  private mois = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  getAllSemaines(year: number): Mercredi[] {
    const result: Mercredi[] = [];
    let date = new Date(year, 0, 1);

    // trouver le premier mercredi
    while (date.getDay() !== 3) {
      date.setDate(date.getDate() + 1);
    }

    while (true) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 7);

      result.push({
        date: `${this.formatDate(start)} ==> ${this.formatDate(end)}`,
        value: false,
        month: this.mois[start.getMonth()],
      });

      date.setDate(date.getDate() + 7);

      if (date.getFullYear() > year) break;
    }

    return result;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
