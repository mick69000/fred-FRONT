import { CommunService } from './../services/transverse/commun.service';
import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { WcsAngularModule } from 'wcs-angular';
import { DataNotePersoService } from '../services/data/data.note.perso.service';
import { NotePerso } from '../models/notePerso';

@Component({
  selector: 'app-pointage',
  standalone: true,
  imports: [
    WcsAngularModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  providers: [],
  templateUrl: './noteperso.component.html',
  styleUrl: './noteperso.component.scss',
})
export class NotePersoComponent implements OnInit {
  dDJB = formatDate(new Date(), 'dd-MM-yyyy', 'fr');
  
  constructor(
    private dataNotePersoService: DataNotePersoService,
    private communService: CommunService
  ) {}
  
  ngOnInit() {
    this.date = this.dDJB;
    this.rechercheLesNotesDuJourSelectionne();
  }
  
  date: string = this.dDJB;
  commentaire: string[] = [];
  btnValider: string = 'Valider';
  modifier: boolean = false;
  commentaireAModifier: boolean = true;
  afficheLesBoutonsModifier: boolean = false;
  journeeTrouvee: string = '';
  compteurMinimum: string = '1';
  nbrNote: string = '1';
  numeroNote: number = 1;
  compteur: boolean = true;
  notesPersoDuJourTriees: NotePerso[] = [];
  notesDuJourTriees: NotePerso[] = [];
  titre: string[] = [];
  id: number[] = [];
  textAjoutModifie: string = "";

  rechercheLesNotesDuJourSelectionne() {
    this.notesDuJourTriees = [];
    const dateFR = this.communService.dateFrancaise(this.date);
    this.dataNotePersoService.getAllNotesPerso().subscribe((data: any[]) => {
      const notesDuJour = data.filter((note) => note.date == dateFR);

      this.notesDuJourTriees = notesDuJour.sort(
        (a, b) => new Date(a.numero).getTime() - new Date(b.numero).getTime()
      );

      this.nbrNote = this.notesDuJourTriees.length.toString();

      if (this.notesDuJourTriees.length === 0) {
        this.reinitialiseLesChamps(false);
      } else {
        this.ouvreDejaPresent();
      }
    });
  }

  valideOuMaj(titre: string, commentaireAAjouter: string) {
    if (this.btnValider === 'Modifier') {
      this.modifieLaJournee(titre, commentaireAAjouter);
    } else if (this.btnValider === 'Valider') {
      this.valideLaJournee(titre, commentaireAAjouter);
    }
  }

  valideLaJournee(titre: string, commentaireAAjouter: string) {
    const noteAAjouter: NotePerso = new NotePerso(
      0,
      this.dateVF(this.date),
      titre,
      commentaireAAjouter,
      (parseInt(this.nbrNote) + 1).toString(),
      this.communService.récupèreLeMoisEtLAnnée(this.date.toString())[0],
      this.communService.récupèreLeMoisEtLAnnée(this.date.toString())[1]
    );

    this.dataNotePersoService.setNotePerso(noteAAjouter).subscribe({
      next: () => {
        this.ouvreAjoute("ajoutée");
        this.reinitialiseLesChamps(true);
      },
    });
    this.btnValider = 'Valider';
    console.log('noteAAjouter : ', noteAAjouter);
  }

  modifieLaJournee(titreAModifier: string, commentaireAModifier: string) {
    const id = this.id[parseInt(this.dateVF(this.date))];

    this.dataNotePersoService
      .updateNotePerso(this.id[0], titreAModifier, commentaireAModifier)
      .subscribe({
        next: () => {
          this.ouvreAjoute("modifiée");
          this.reinitialiseLesChamps(true);
        },
      });
    this.btnValider = 'Valider';
  }

  dateVF(date: string) {
    return this.communService.dateFrancaise(date);
  }

  supprimeUneNote(date: string, numero: number) {
    this.dataNotePersoService
      .deleteNotePerso(this.dateVF(date), numero)
      .subscribe(() => {
        this.reinitialiseLesChamps(true);
        this.fermeConfirmeSupprime();
        this.ouvreEstSupprime();
      });
  }

  reinitialiseLesChamps(aujourdhui: boolean) {
    this.numeroNote = 1;
    this.compteurMinimum = '1';
    this.nbrNote = "0";
    this.commentaireAModifier = false;
    if(aujourdhui === true){this.date = this.dDJB;}
    this.titre = [];
    this.commentaire = [];
    this.compteur = true;
    this.afficheLesBoutonsModifier = false;
    this.btnValider = 'Valider';
  }
  ouvreDejaPresent() {
    (
      document.getElementById('alerteDejaPresent') as HTMLDialogElement
    ).showModal();
  }
  fermeAnnuleDejaPresent() {
    this.reinitialiseLesChamps(true);
    this.fermeDejaPresent();
  }
  fermeDejaPresent() {
    (document.getElementById('alerteDejaPresent') as HTMLDialogElement).close();
  }
  ouvreConfirmeSupprime() {
    (
      document.getElementById('confirmeSupprime') as HTMLDialogElement
    ).showModal();
  }
  fermeConfirmeSupprime() {
    (document.getElementById('confirmeSupprime') as HTMLDialogElement).close();
  }
  ouvreEstSupprime() {
    (
      document.getElementById('commentaireEstSupprime') as HTMLDialogElement
    ).showModal();
  }
  fermeEstSupprime() {
    (
      document.getElementById('commentaireEstSupprime') as HTMLDialogElement
    ).close();
  }
  ouvreAjoute(text: string) {
    this.textAjoutModifie = text;
    (document.getElementById('noteAjoute') as HTMLDialogElement).showModal();
  }
  fermeAjoute() {
    (document.getElementById('noteAjoute') as HTMLDialogElement).close();
  }
  jourAModifier() {
    for (let journee of this.notesDuJourTriees) {
      this.commentaire.push(journee.commentaire);
      this.titre.push(journee.titre);
      this.id.push(journee.id);
    }
    console.log('titre a modifier et id :', this.titre, this.id);

    this.numeroNote = 1;
    this.nbrNote = this.commentaire.length.toString();
    this.compteurMinimum = '1';
    this.commentaireAModifier = false;
    this.compteur = false;
    this.afficheLesBoutonsModifier = true;
    this.btnValider = 'Modifier';
    this.fermeDejaPresent();
  }
  nouvelleNote() {
    this.numeroNote = 1;
    this.compteurMinimum = '1';
    this.commentaireAModifier = false;
    this.compteur = false;
    this.fermeDejaPresent();
  }
}
