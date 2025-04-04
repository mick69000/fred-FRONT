import { Title } from '@angular/platform-browser';

export class JournéeAAjouter {
  dateDebut: string;
  heureDebut: string;
  anneeDebut: number;
  moisDebut: number;
  dateFin: string;
  heureFin: string;
  astreinte: boolean;
  hsup: boolean;
  cadeau: boolean;
  commentaire: string;
  heureSaisie: string;
  heureDuMois: string;
  heureDeLAnnee: string;

  constructor(
    dateDebut: string,
    heureDebut: string,
    anneeDebut: number,
    moisDebut: number,
    dateFin: string,
    heureFin: string,
    ast: boolean,
    hsup: boolean,
    cadeau: boolean,
    commentaire: string,
    heureSaisie: string,
    heureDuMois: string,
    heureDeLAnnee: string
  ) {
    this.dateDebut = dateDebut;
    this.heureDebut = heureDebut;
    this.anneeDebut = anneeDebut;
    this.moisDebut = moisDebut;
    this.dateFin = dateFin;
    this.heureFin = heureFin;
    this.astreinte = ast;
    this.hsup = hsup;
    this.cadeau = cadeau;
    this.commentaire = commentaire;
    this.heureSaisie = heureSaisie;
    this.heureDuMois = heureDuMois;
    this.heureDeLAnnee = heureDeLAnnee;
  }
}
