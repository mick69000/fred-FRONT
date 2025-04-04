import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HsupastreinteService {
  annéeDébut: number = 0;
  moisDébut: number = 0;

  diffH(
    heureD: string,
    heureF: string,
    dateDebut: string,
    dateFin: string
  ): [string, string] {
    let heureSaisie: string;
    let plusieurJours: string = '';
    const [hoursD, minutesD] = heureD
      .split(':')
      .map((num: string) => parseInt(num, 10));
    const [yearsD, monthsD, daysD] = dateDebut
      .split('-')
      .map((num: string) => parseInt(num, 10));

    this.annéeDébut = yearsD;
    this.moisDébut = monthsD;

    let dateD2 = `${yearsD}-${this.padZero(monthsD)}-${this.padZero(
      daysD
    )}T${this.padZero(hoursD)}:${this.padZero(minutesD)}:00.0`;

    const [hoursF, minutesF] = heureF
      .split(':')
      .map((num: string) => parseInt(num, 10));
    const [yearsF, monthsF, daysF] = dateFin
      .split('-')
      .map((num: string) => parseInt(num, 10));

    let dateF2 = `${yearsF}-${this.padZero(monthsF)}-${this.padZero(
      daysF
    )}T${this.padZero(hoursF)}:${this.padZero(minutesF)}:00.0`;
    const diffDate = Date.parse(dateF2) - Date.parse(dateD2);
    heureSaisie = this.milliSecondToHeureMinutes(diffDate);

    const [hours, minutes] = heureSaisie
      .split(':')
      .map((num: string) => parseInt(num, 10));
    if (hours > 23) {
      const nbrJ = Math.floor(hours / 24);
      const texteJ = nbrJ > 1 ? ' jours' : ' jour ';
      const nbrH = hours - nbrJ * 24;

      plusieurJours = `( ${nbrJ}${texteJ}${nbrH} h ${minutesF}mn )`;
    } else {
      plusieurJours = '';
    }

    return [heureSaisie, plusieurJours];
  }

  récupèreLeMoisEtLAnnée(dateDebutSaisie: string) {
    const [yearsD, monthsD, daysD] = dateDebutSaisie
      .split('-')
      .map((num: string) => parseInt(num, 10));

    this.annéeDébut = yearsD;
    this.moisDébut = monthsD;

    return [monthsD, yearsD];
  }

  milliSecondToHeureMinutes(milliseconds: number): string {
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor(milliseconds / 1000 / 60 / 60);
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
    ].join(':');

    return formattedTime;
  }

  ajoute15Minutes(heureDebut: string): string {
    const [hours, minutes] = heureDebut
      .split(':')
      .map((num) => parseInt(num, 10));
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Mettre les secondes à zéro

    // Ajouter 15 minutes
    date.setMinutes(date.getMinutes() + 15);

    // Formater la nouvelle heure
    const newTime = this.formatTime(date);
    return newTime;
  }

  differenceHeure(
    heureDebut: string,
    heureFin: string,
    dateDeb: Date,
    dateFi: Date
  ): string {
    let [hoursD, minutesD] = heureDebut
      .split(':')
      .map((num) => parseInt(num, 10));
    const heureD = new Date();
    heureD.setHours(hoursD);
    heureD.setMinutes(minutesD);
    heureD.setSeconds(0); // Mettre les secondes à zéro

    let [hoursF, minutesF] = heureFin
      .split(':')
      .map((num) => parseInt(num, 10));
    const heureF = new Date();
    heureF.setHours(hoursF);
    heureF.setMinutes(minutesF);
    heureF.setSeconds(0); // Mettre les secondes à zéro

    if (dateDeb.getTime() === dateFi.getTime() && hoursF < hoursD) {
      hoursF = hoursD;
    }

    let heureDiff = new Date();
    heureDiff.setHours(hoursF - hoursD);
    heureDiff.setMinutes(minutesF - minutesD);
    heureDiff.setSeconds(0);
    let heure;
    heure = this.formatTime(heureDiff);

    return heure;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  padZero(num: number) {
    return num < 10 ? '0' + num : num;
  }
}
