import { DataAgcService } from './../services/data/data.agc.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarMonthModule } from 'angular-calendar';
import { WcsAngularModule } from 'wcs-angular';
import { format, getISOWeek, getMonth, getYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DataR2nService } from '../services/data/data.r2n.service';
import { DataNgService } from '../services/data/data.ng.service';
import { AfficheNomJourPipe } from '../pipes/affiche-mon-jour.pipe';
import { JournéeEngin } from '../models/journéeEngin';
import { CommunService } from '../services/transverse/commun.service';
import { AfficheCommentairePipe } from '../pipes/affiche-commentaire.pipe';
import { DataHsupastService } from '../services/data/data.hsupast.service';
import { JournéeAAjouter } from '../models/journéeAAjouter';
import { DataNotePersoService } from '../services/data/data.note.perso.service';
import { NotePerso } from '../models/notePerso';

@Component({
  selector: 'app-pointage',
  standalone: true,
  imports: [
    WcsAngularModule,
    CommonModule,
    CalendarMonthModule,
    AfficheNomJourPipe,
    AfficheCommentairePipe,
  ],
  providers: [],
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.scss',
})
export class PointageComponent implements OnInit {
  semaines: number[] = [];
  jours: string[][] = [];
  nomJour: string[] = [
    'LUNDI',
    'MARDI',
    'MERCREDI',
    'JEUDI',
    'VENDREDI',
    'SAMEDI',
    'DIMANCHE',
  ];
  voirMois: number = 0;
  moisEnCours: number = getMonth(Date.now());
  anneeEnCours: number = getYear(Date.now());
  numeroSemaine: number = getISOWeek(Date.now());
  titreNomDuMois: string = format(new Date(), 'MMMM', {
    locale: fr,
  });
  colorJour: string = '';
  astreinte: string = '';
  classHsupModal: string = '';
  classCommentaireNg: string = '';
  classCommentaireAgc: string = '';
  classCommentaireR2n: string = '';
  classNotePerso: string = '';
  dateAAfficherModal: string = '';
  texteHsupAAfficherModal: string = '';
  titreHsupAAfficherModal: string = '';
  commentairesNgAAfficherModal: string = '';
  commentairesAgcAAfficherModal: string = '';
  commentairesR2nAAfficherModal: string = '';
  titreCommentaireNgAAfficherModal: string = '';
  titreCommentaireAgcAAfficherModal: string = '';
  titreCommentaireR2nAAfficherModal: string = '';
  titreNotePersoAAfficherModal: string[][] = [];
  listeNgMoisEnCours: JournéeEngin[] = [];
  listeAgcMoisEnCours: JournéeEngin[] = [];
  listeR2nMoisEnCours: JournéeEngin[] = [];
  hsupast: JournéeAAjouter[] = [];
  commentaireNg: string[] = [];
  commentaireAgc: string[] = [];
  commentaireR2n: string[] = [];
  hdeb: string[] = [];
  hfin: string[] = [];
  hsup: boolean[] = [];
  hast: boolean[] = [];
  hkdo: boolean[] = [];
  hCommentaire: string[] = [];
  enginNg: string[] = [];
  enginAgc: string[] = [];
  enginR2n: string[] = [];
  listeNotePerso: NotePerso[] = [];
  notePersoAAfficherModal: string[][] = [];
  nbrNotePourCeJour: string[] = [];
  titrePremiereNote: string[] = [];

  constructor(
    private dataR2nService: DataR2nService,
    private dataAgcService: DataAgcService,
    private dataNgService: DataNgService,
    private communService: CommunService,
    private dataHsupastService: DataHsupastService,
    private dataNotePersoService: DataNotePersoService
  ) {}

  ngOnInit() {
    const calendar = document.getElementById('calendar');
    if (calendar) {
      calendar.innerHTML = '';
    } else {
      console.error("Élément 'calendar' non trouvé !");
    }
    const currentDate = new Date();
    this.createCalendar(
      currentDate.getMonth() + this.voirMois,
      currentDate.getFullYear()
    );
    this.récupèreLesDataDuMois();
  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  createCalendar(month: number, year: number) {
    this.jours = [];
    this.semaines = [];

    let date = 1;
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; date <= daysInMonth; i++) {
      this.semaines.push(i); // Ajoute un index pour chaque semaine
      this.jours[i] = []; // Initialise la semaine

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || date > daysInMonth) {
          this.jours[i].push(''); // Ajoute un espace vide si nécessaire
        } else {
          this.jours[i].push(date.toString());
          date++;
        }
      }
    }
  }

  numeroDeLaSemaine(jour: number) {
    return (this.numeroSemaine =
      getISOWeek(new Date(this.anneeEnCours, this.moisEnCours)) + jour);
  }
  moisSuivant() {
    this.moisEnCours++;
    if (this.moisEnCours == 12) {
      this.moisEnCours = 0;
      this.anneeEnCours++;
    }
    this.nomDuMois();
    this.createCalendar(this.moisEnCours, this.anneeEnCours);
    this.récupèreLesDataDuMois();
  }
  moisPrecedent() {
    this.moisEnCours--;
    if (this.moisEnCours < 0) {
      this.moisEnCours = 11;
      this.anneeEnCours--;
    }
    this.nomDuMois();
    this.createCalendar(this.moisEnCours, this.anneeEnCours);
    this.récupèreLesDataDuMois();
  }
  moisActuel() {
    this.moisEnCours = getMonth(Date.now());
    this.anneeEnCours = getYear(Date.now());
    this.nomDuMois();
    this.createCalendar(this.moisEnCours, this.anneeEnCours);
    this.récupèreLesDataDuMois();
  }
  nomDuMois() {
    this.titreNomDuMois = format(
      new Date(this.anneeEnCours, this.moisEnCours, 1),
      'MMMM',
      {
        locale: fr,
      }
    );
  }
  getColorJour(nomJour: string, jour: string, astreinte: string): string {
    let couleur: string = '';
    if (jour !== '') {
      couleur = nomJour === 'SAMEDI' || nomJour === 'DIMANCHE' ? 'we' : '';
      couleur = astreinte !== '' ? couleur + 'A' : couleur;
    }
    return couleur;
  }
  récupèreLesDataDuMois() {
    this.commentaireNg = [];
    this.commentaireAgc = [];
    this.commentaireR2n = [];
    this.hdeb = [];
    this.hfin = [];
    this.hsup = [];
    this.hast = [];
    this.hkdo = [];
    this.enginNg = [];
    this.enginAgc = [];
    this.enginR2n = [];

    // ****************** commentaires NG ****************************
    this.dataNgService.getAllNgs().subscribe((data: any[]) => {
      this.listeNgMoisEnCours = data.filter(
        (ng) =>
          ng.mois === this.moisEnCours + 1 && ng.annee === this.anneeEnCours
      );
      for (let i = 1; i < 32; i++) {
        const date = this.communService.dateFrancaise(
          i + '-' + (this.moisEnCours + 1) + '-' + this.anneeEnCours
        );
        for (let index of this.listeNgMoisEnCours) {
          if (date === index.date) {
            this.enginNg[i] = index.engin;
          }
        }
      }
      console.log('NG du mois : ', this.listeNgMoisEnCours);
    });

    // ****************** commentaires AGC ****************************
    this.dataAgcService.getAllAgcs().subscribe((data: any[]) => {
      this.listeAgcMoisEnCours = data.filter(
        (agv) =>
          agv.mois === this.moisEnCours + 1 && agv.annee === this.anneeEnCours
      );
      for (let i = 1; i < 32; i++) {
        const date = this.communService.dateFrancaise(
          i + '-' + (this.moisEnCours + 1) + '-' + this.anneeEnCours
        );
        for (let index of this.listeAgcMoisEnCours) {
          if (date === index.date) {
            this.enginAgc[i] = index.engin;
          }
        }
      }
      console.log('AGC du mois : ', this.listeAgcMoisEnCours);
    });

    // ****************** commentaires R2N ****************************

    this.dataR2nService.getAllR2ns().subscribe((data: any[]) => {
      this.listeR2nMoisEnCours = data.filter(
        (r2n) =>
          r2n.mois === this.moisEnCours + 1 && r2n.annee === this.anneeEnCours
      );
      for (let i = 1; i < 32; i++) {
        const date = this.communService.dateFrancaise(
          i + '-' + (this.moisEnCours + 1) + '-' + this.anneeEnCours
        );

        for (let index of this.listeR2nMoisEnCours) {
          if (date === index.date) {
            this.enginR2n[i] = index.engin;
          }
        }
      }
      console.log('R2N du mois : ', this.listeR2nMoisEnCours);
    });

    // ****************** Heures Supp ****************************
    this.dataHsupastService.getAllHsups().subscribe((data: any) => {
      this.hsupast = data.filter(
        (hsup: JournéeAAjouter) =>
          hsup.moisDebut === this.moisEnCours + 1 &&
          hsup.anneeDebut === this.anneeEnCours
      );
      for (let i = 1; i < 32; i++) {
        const date = this.communService.dateFrancaise(
          i + '-' + (this.moisEnCours + 1) + '-' + this.anneeEnCours
        );

        for (let index of this.hsupast) {
          if (date === this.communService.dateFrancaise(index.dateDebut)) {
            this.hdeb[i] = index.heureDebut;
            this.hfin[i] = index.heureFin;
            this.hsup[i] = index.hsup;
            this.hast[i] = index.astreinte;
            this.hkdo[i] = index.cadeau;
            this.hCommentaire[i] = index.commentaire;
          }
        }
      }
      console.log('hsup du mois : ', this.hsupast);
    });

    // ****************** commentaires NOTE-PERSO ****************************
    this.dataNotePersoService.getAllNotesPerso().subscribe((data: any) => {
      this.listeNotePerso = data.filter(
        (note: NotePerso) =>
          note.mois == this.moisEnCours + 1 && note.annee == this.anneeEnCours
      );

      this.notePersoAAfficherModal = Array.from({ length: 32 }, () => []);
      this.titreNotePersoAAfficherModal = Array.from({ length: 32 }, () => []);

      for (let i = 1; i < 32; i++) {
        const date = this.communService.dateFrancaise(
          i + '-' + (this.moisEnCours + 1) + '-' + this.anneeEnCours
        );

        let nbrnote = 0;
        let premiereNoteDuJour = true;
        for (let index of this.listeNotePerso) {
          if (date === this.communService.dateFrancaise(index.date)) {
            if (!this.notePersoAAfficherModal[i]) {
              this.notePersoAAfficherModal[i] = [];
              this.titreNotePersoAAfficherModal[i] = [];
            }
            if (premiereNoteDuJour) {
              this.titrePremiereNote[i] = index.titre;
              premiereNoteDuJour = false;
            }
            this.notePersoAAfficherModal[i][nbrnote] = index.commentaire;
            this.titreNotePersoAAfficherModal[i][nbrnote] =
              index.titre || 'bonjour';
            nbrnote++;
            this.nbrNotePourCeJour[i] = nbrnote.toString();
          }
        }
      }
    });
  }

  afficheCommentaire(jour: string) {
    let sAffiche: string = '';
    const index = parseInt(jour);
    this.commentaireNg[index] = this.commentaireNg[index] ?? '';
    this.commentaireAgc[index] = this.commentaireAgc[index] ?? '';
    this.commentaireR2n[index] = this.commentaireR2n[index] ?? '';
    const commentaireTotal =
      this.commentaireNg[index] +
      this.commentaireAgc[index] +
      this.commentaireR2n[index];
    if (commentaireTotal?.length === 0) {
      sAffiche = 'sans-commentaireJour';
    } else {
      sAffiche = 'commentaireJour';
    }
    return sAffiche;
  }
  afficheNotePerso(jour: string) {
    let sAffiche: string = '';
    const index = parseInt(jour);
    if (
      this.notePersoAAfficherModal[index] &&
      this.notePersoAAfficherModal[index].length > 0
    ) {
      sAffiche = 'notePerso';
    } else {
      sAffiche = 'sans-notePerso';
    }
    return sAffiche;
  }
  afficheHeures(jour: string) {
    let sAffiche = 'sans-horaireJour';
    const index = parseInt(jour);
    if (index > 0 && index < 32) {
      if (this.hdeb[index]?.length !== 0 && this.hdeb[index] !== undefined) {
        if (this.hsup[index]) {
          sAffiche = 'heuresup';
        }
        if (this.hast[index]) {
          sAffiche = 'heureast';
        }
        if (this.hkdo[index]) {
          sAffiche = 'horaireJour';
        }
      } else {
        this.hdeb[index] = 'VIDE';
        this.hfin[index] = 'VIDE';
        sAffiche = 'sans-horaireJour';
      }
    }
    return sAffiche;
  }
  heureDebutEtFin(jour: string) {
    let aAfficher: string = '';
    const index = parseInt(jour);
    if (index > 0 && index < 32) {
      aAfficher = this.hdeb[index] + ' -- ' + this.hfin[index];
    }
    return aAfficher;
  }

  calculeNbrNotePourCeJour(jour: string) {
    let titre: string = '';
    if (
      this.titreNotePersoAAfficherModal[parseInt(jour)] &&
      this.titreNotePersoAAfficherModal[parseInt(jour)].length !== 0
    ) {
      titre = this.titreNotePersoAAfficherModal[parseInt(jour)][0];
    }

    const messageRetour =
      '(' + this.nbrNotePourCeJour[parseInt(jour)] + ') - ' + titre;
    return messageRetour;
  }
  ouvreModal(nom: string, jour: string) {
    if (jour !== '') {
      const index = parseInt(jour);
      const alaligneNg = this.commentaireNg[index] === '' ? '' : '\n\n';
      const alaligneAgc = this.commentaireAgc[index] === '' ? '' : '\n\n';
      this.titreHsupAAfficherModal = '';
      this.texteHsupAAfficherModal = '';
      this.titreCommentaireNgAAfficherModal = '';
      this.titreCommentaireAgcAAfficherModal = '';
      this.titreCommentaireR2nAAfficherModal = '';
      this.titreNotePersoAAfficherModal = [];
      this.commentairesNgAAfficherModal = '';
      this.commentairesAgcAAfficherModal = '';
      this.commentairesR2nAAfficherModal = '';
      this.notePersoAAfficherModal = [];
      this.classCommentaireNg = 'nocommentaire';
      this.classCommentaireAgc = 'nocommentaire';
      this.classCommentaireR2n = 'nocommentaire';
      this.classHsupModal = 'noheure';
      this.classNotePerso = 'noNotePerso';

      // ***************************** DATE DU JOUR POUR LE TITRE DE LA MODAL
      this.dateAAfficherModal =
        nom + ' ' + jour + ' ' + this.titreNomDuMois + ' ' + this.anneeEnCours;
      // ***************************** AFFICHE LES NOTE-PERSO SI PRESENT DANS LA MODAL

      // if (this.listeNotePerso.length !== 0) {
      //   for (let i = 0; i < this.listeNotePerso.length; i++) {
      //     this.titreNotePersoAAfficherModal[i] = 'titre de la Note Perso:';
      //     this.notePersoAAfficherModal[i].push(
      //       this.listeNotePerso[index].commentaire
      //     );
      //   }
      //   console.log('liste notes perso = ', this.listeNotePerso);
      if (this.notePersoAAfficherModal[index]) {
        console.log('ligne 423 ', this.notePersoAAfficherModal);

        this.classNotePerso = 'notePersoModal';
      } else {
        this.titreNotePersoAAfficherModal = [];
        this.classNotePerso = 'nonotePerso';
      }
      // ***************************** AFFICHE LE(s) COMMENTAIRE(s) DES HEURES SUP SI PRESENT DANS LA MODAL

      if (this.hsup[index] || this.hast[index] || this.hkdo[index]) {
        this.titreHsupAAfficherModal = this.hsup[index]
          ? 'Heures supplémentaires :'
          : this.titreHsupAAfficherModal;
        this.titreHsupAAfficherModal = this.hast[index]
          ? "Heures supplémentaire d'astreinte :"
          : this.titreHsupAAfficherModal;
        this.titreHsupAAfficherModal = this.hkdo[index]
          ? 'Heures supplémentaire non déclarées :'
          : this.titreHsupAAfficherModal;

        this.texteHsupAAfficherModal =
          'De ' +
          this.hdeb[index] +
          ' à ' +
          this.hfin[index] +
          '\n\n' +
          this.hCommentaire[index];
        this.classHsupModal = this.hsup[index]
          ? 'heureSuplémentaire'
          : this.classHsupModal;
        this.classHsupModal = this.hast[index]
          ? 'heureAstreinte'
          : this.classHsupModal;
        this.classHsupModal = this.hkdo[index]
          ? 'heureCadeau'
          : this.classHsupModal;
      } else {
        this.classHsupModal = 'noheure';
      }
      // ***************************** AFFICHE LE(s) COMMENTAIRE(s) DES NG SI PRESENT DANS LA MODAL
      if (this.commentaireNg[index] !== '') {
        this.classCommentaireNg = 'commentaire';
        this.titreCommentaireNgAAfficherModal =
          'Rame Ng n° ' + this.enginNg[index] + ' :';
        this.commentairesNgAAfficherModal = this.commentaireNg[index];
      }
      // ***************************** AFFICHE LE(s) COMMENTAIRE(s) DES AGC SI PRESENT DANS LA MODAL
      if (this.commentaireAgc[index] !== '') {
        const nombreDeCommentaire = this.commentaireAgc[index].length;
        this.classCommentaireAgc = 'commentaire';

        this.titreCommentaireAgcAAfficherModal =
          'Rame Agc n° ' + this.enginAgc[index] + ' :';
        this.commentairesAgcAAfficherModal = this.commentaireAgc[index];
      }
      // ***************************** AFFICHE LE(s) COMMENTAIRE(s) DES R2N SI PRESENT DANS LA MODAL
      if (this.commentaireR2n[index] !== '') {
        this.classCommentaireR2n = 'commentaire';
        this.titreCommentaireR2nAAfficherModal =
          'Rame R2n n° ' + this.enginR2n[index] + ' :';
        this.commentairesR2nAAfficherModal = this.commentaireR2n[index];
      }

      (document.getElementById('modal') as HTMLDialogElement).showModal();
    }
  }
  fermeModal() {
    (document.getElementById('modal') as HTMLDialogElement).close();
  }
}
