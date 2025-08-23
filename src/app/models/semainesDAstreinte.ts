export class SemainesDAstreinte {
  semaine: string;
  astreinte: boolean;
  month: string;
  annee: number;

  constructor(
    semaine: string,
    astreinte: boolean,
    month: string,
    annee: number
  ) {
    this.semaine = semaine;
    this.astreinte = astreinte;
    this.month = month;
    this.annee = annee;
  }
}
