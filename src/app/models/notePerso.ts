export class NotePerso {
  id: number;
  date: string;
  titre: string;
  commentaire: string;
  numero: string;
  mois: number;
  annee: number;

  constructor(
    id: number,
    date: string,
    titre: string,
    commentaire: string,
    numero: string,
    mois: number,
    annee: number
  ) {
    this.id = id;
    this.date = date;
    this.titre = titre;
    this.commentaire = commentaire;
    this.numero = numero;
    this.mois = mois;
    this.annee = annee;
  }
}
