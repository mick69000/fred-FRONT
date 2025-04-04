import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Fournit le service à toute l'application
})
export class CalculHsupService {
  additionneLesHeures(
    toutesLesDonnees: any[],
    mois: number,
    reference: string
  ) {
    if (reference === 'mois') {
      const totalMinutes = toutesLesDonnees
        .filter((item) => item.moisDebut === mois) // Filtrer sur le mois
        .map((item) => {
          const [heures, minutes] = item.heureSaisie.split(':').map(Number);
          return heures * 60 + minutes; // Convertir en minutes
        })
        .reduce((acc, curr) => acc + curr, 0); // Additionner toutes les minutes

      // Convertir minutes totales en HH:MM
      const heures = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${heures.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    } else {
      const totalMinutes = toutesLesDonnees
        .filter((item) => item.anneeDebut === mois) // Filtrer sur le mois
        .map((item) => {
          const [heures, minutes] = item.heureSaisie.split(':').map(Number);
          return heures * 60 + minutes; // Convertir en minutes
        })
        .reduce((acc, curr) => acc + curr, 0); // Additionner toutes les minutes

      // Convertir minutes totales en HH:MM
      const heures = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${heures.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    }
  }

  verifieSIlExisteDeja(toutesLesDonnees: any[], dateDebut: string): boolean {
    const isExiste = toutesLesDonnees.some(
      (item) => item.dateDebut === dateDebut
    );

    return isExiste;
  }
}
