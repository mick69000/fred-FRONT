import { CommunService } from './../services/transverse/commun.service';
import { HsupastreinteService } from '../services/hsupastreinte.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WcsAngularModule } from 'wcs-angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule, formatDate } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataHsupastService } from '../services/data/data.hsupast.service';
import { JournéeAAjouter } from '../models/journéeAAjouter';
import { CalculHsupService } from '../services/data/calcul.hsupast.service';
import { MercrediService, Mercredi } from '../models/semaines';

@Component({
  selector: 'app-hsupastreinte',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    WcsAngularModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './hsupastreinte.component.html',
  styleUrl: './hsupastreinte.component.scss',
})
export class HsupastreinteComponent implements OnInit {
  dDJB = formatDate(new Date(), 'yyyy-MM-dd', 'fr');
  showOnlySelected = false;

  ngOnInit(): void {
    this.récupèreTousLesJoursDeLaBDD();

    const returnDeDiffH = this.hsupastreinteService.diffH(
      this.heureDebut,
      this.heureFin,
      this.dateDebut,
      this.dateFin
    );
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
    this.annéeDebut = this.hsupastreinteService.annéeDébut;
    this.moisDebut = this.hsupastreinteService.moisDébut;
  }
  constructor(
    private hsupastreinteService: HsupastreinteService,
    private dataHsupService: DataHsupastService,
    private calculHsupService: CalculHsupService,
    private CommunService: CommunService,
    private mercrediService: MercrediService
  ) {}

  tousLesData: any[] = [];
  dateDebut = this.formatDate(this.dDJB);
  dateFin = this.formatDate(this.dDJB);
  heureDebut = '12:00';
  annéeDebut: number = 0;
  moisDebut: number = 0;
  heureFin = '12:15';
  toggle = false;
  supAstr = 'H-sup';
  heureSaisie = '--:--';
  heureDuMois = '0:0';
  heureDeLAnnee = '0:0';
  heureMin = this.heureDebut;
  commentaire = '';
  plusieurJours: string = '';
  astreinte: boolean = false;
  hsup: boolean = false;
  cadeau: boolean = false;
  tooltipEnabled = true;
  private _heureMinDynamic: string = this.heureMin;
  jourSelectionne: string = '';
  journéeAModifier: any = '';
  modifier: boolean = false;
  btnValider: string = 'VALIDER';
  mesMercredis: Mercredi[] = [];

  get heureMinDynamic(): string {
    return this._heureMinDynamic;
  }

  set heureMinDynamic(value: string) {
    this._heureMinDynamic = value;
  }

  récupèreTousLesJoursDeLaBDD() {
    this.dataHsupService.getAllHsups().subscribe((data: any[]) => {
      this.tousLesData = data.sort(
        (a, b) =>
          new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime()
      );

      this.heureDuMois = this.calculHsupService.additionneLesHeures(
        this.tousLesData,
        this.moisDebut,
        'mois'
      );
      this.heureDeLAnnee = this.calculHsupService.additionneLesHeures(
        this.tousLesData,
        this.annéeDebut,
        'annee'
      );
    });
  }

  formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${day}-${month}-${year}`;
  }

  datePourLeSelect(dateBrute: string) {
    const [year, month, day] = dateBrute.split('-');
    return `${day}-${month}-${year}`;
  }

  categorie(hsupast: string) {
    this.hsup = hsupast === 'hsup' ? !this.hsup : this.hsup;
    this.astreinte = hsupast === 'astreinte' ? !this.astreinte : this.astreinte;
    this.cadeau = hsupast === 'cadeau' ? !this.cadeau : this.cadeau;
    console.log(this.hsup);
  }

  diffH(newTimeFin: string | null) {
    const tempo = newTimeFin ?? this.heureFin;

    const returnDeDiffH = this.hsupastreinteService.diffH(
      this.heureDebut,
      tempo,
      this.dateDebut,
      this.dateFin
    )[0];
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
  }

  onDateDebutChange(newDate: string) {
    this.dateFin = newDate;
    const returnDeDiffH = this.hsupastreinteService.diffH(
      this.heureDebut,
      this.heureFin,
      newDate,
      newDate
    );
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
  }
  onDateFinChange(newDate: string) {
    this.heureFin = this.hsupastreinteService.ajoute15Minutes(this.heureDebut);
    if (this.dateDebut === newDate) {
      this.heureMinDynamic = this.heureDebut;
    } else {
      this.heureMinDynamic = '00:00';
    }
    const returnDeDiffH = this.hsupastreinteService.diffH(
      this.heureDebut,
      this.heureFin,
      this.dateDebut,
      newDate
    );
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
  }

  onTimeFChange(newTime: string) {
    const returnDeDiffH = this.hsupastreinteService.diffH(
      this.heureDebut,
      newTime,
      this.dateDebut,
      this.dateFin
    );
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
  }
  onTimeDChange(newTime: string) {
    if (this.dateDebut === this.dateFin) {
      this.heureFin = this.hsupastreinteService.ajoute15Minutes(newTime);
      this.heureMinDynamic = newTime;
    } else {
      this.heureFin = this.heureDebut;
      this.heureMinDynamic = '00:00';
    }
    const returnDeDiffH = this.hsupastreinteService.diffH(
      newTime,
      this.heureFin,
      this.dateDebut,
      this.dateFin
    );
    this.heureSaisie = returnDeDiffH[0];
    this.plusieurJours = returnDeDiffH[1];
  }
  valideLesHeuresSup() {
    let journeeAAjouter: JournéeAAjouter = new JournéeAAjouter(
      this.dateDebut.replace(/-undefined/g, ''),
      this.heureDebut,
      this.CommunService.récupèreLeMoisEtLAnnée(this.dateDebut)[1],
      this.CommunService.récupèreLeMoisEtLAnnée(this.dateDebut)[0],
      this.dateFin,
      this.heureFin.replace(/-undefined/g, ''),
      this.astreinte,
      this.hsup,
      this.cadeau,
      this.commentaire,
      this.heureSaisie,
      this.heureDuMois,
      this.heureDeLAnnee
    );

    console.log(
      'journée à ajouter ligne 208 : ' +
        this.dateDebut.replace(/-undefined/g, ''),
      this.heureDebut,
      this.CommunService.récupèreLeMoisEtLAnnée(this.dateDebut)[1],
      this.CommunService.récupèreLeMoisEtLAnnée(this.dateDebut)[0],
      this.dateFin.replace(/-undefined/g, ''),
      this.heureFin,
      this.astreinte,
      this.hsup,
      this.cadeau,
      this.commentaire,
      this.heureSaisie,
      this.heureDuMois,
      this.heureDeLAnnee
    );

    if (this.btnValider === 'Modifier') {
      this.dataHsupService.deleteHsup(this.dateDebut).subscribe(() => {
        this.reinitialiseLesChamps();
      });
    }
    this.dataHsupService.setHsup(journeeAAjouter).subscribe({
      next: () => {
        alert('journée enregistrée....');
        this.reinitialiseLesChamps();
      },
    });
  }
  effaceUneJournée(journéeAEffacer: string) {
    this.dataHsupService.deleteHsup(journéeAEffacer).subscribe(() => {
      alert('Journée effacée');
      this.reinitialiseLesChamps();
    });
  }
  ouvreSelectAModifier() {
    (
      document.getElementById('selectAModifier') as HTMLDialogElement
    ).showModal();
  }
  fermeSelectAModifier() {
    (document.getElementById('selectAModifier') as HTMLDialogElement).close();
  }
  jourAModifier() {
    if (this.jourSelectionne !== '') {
      this.journéeAModifier = this.tousLesData.find(
        (item) => item.dateDebut === this.jourSelectionne
      );

      this.rempliLesChampsAModifier();
      (document.getElementById('selectAModifier') as HTMLDialogElement).close();
    }
  }

  supprime() {
    this.effaceUneJournée(this.dateDebut);
  }

  rempliLesChampsAModifier() {
    this.modifier = true;
    this.btnValider = 'Modifier';
    this.dateDebut = this.journéeAModifier.dateDebut;
    this.heureDebut = this.journéeAModifier.heureDebut;
    this.dateFin = this.journéeAModifier.dateFin;
    this.heureFin = this.journéeAModifier.heureFin;
    this.astreinte = this.journéeAModifier.astreinte;
    this.hsup = this.journéeAModifier.hsup;
    this.cadeau = this.journéeAModifier.cadeau;
    this.commentaire = this.journéeAModifier.commentaire;
    this.heureSaisie = this.journéeAModifier.heureSaisie;
    this.heureDuMois = this.calculHsupService.additionneLesHeures(
      this.tousLesData,
      this.moisDebut,
      'mois'
    );
    this.heureDeLAnnee = this.calculHsupService.additionneLesHeures(
      this.tousLesData,
      this.annéeDebut,
      'annee'
    );
  }

  reinitialiseLesChamps() {
    this.récupèreTousLesJoursDeLaBDD();
    this.jourSelectionne = '';
    this.modifier = false;
    this.btnValider = 'VALIDER';
    this.dateDebut = this.dDJB;
    this.heureDebut = '12:00';
    this.dateFin = this.dDJB;
    this.heureFin = '12:15';
    this.astreinte = false;
    this.hsup = false;
    this.cadeau = false;
    this.commentaire = '';
    this.heureSaisie = this.hsupastreinteService.diffH(
      this.heureDebut,
      this.heureFin,
      this.dateDebut,
      this.dateFin
    )[0];
    this.plusieurJours = this.hsupastreinteService.diffH(
      this.heureDebut,
      this.heureFin,
      this.dateDebut,
      this.dateFin
    )[1];
    this.heureDuMois = this.calculHsupService.additionneLesHeures(
      this.tousLesData,
      this.moisDebut,
      'mois'
    );
    this.heureDeLAnnee = this.calculHsupService.additionneLesHeures(
      this.tousLesData,
      this.annéeDebut,
      'annee'
    );
    this.fermeSelectAModifier();
  }
  ouvreSemainesDAstreinte() {
    (
      document.getElementById('semainesDAstreinte') as HTMLDialogElement
    ).showModal();
  }
  mAJSemaine() {
    this.fermerSemainesDAstreinte();
  }
  fermerSemainesDAstreinte() {
    (
      document.getElementById('semainesDAstreinte') as HTMLDialogElement
    ).close();
  }
  ouvreUneNouvelleAnnee() {
    this.mesMercredis = this.mercrediService.getAllMercredis(2025);
    console.log(this.mesMercredis);
  }
  get filteredMercredis(): Mercredi[] {
    return this.showOnlySelected
      ? this.mesMercredis.filter((m) => m.value)
      : this.mesMercredis;
  }

  toggleFilter(): void {
    this.showOnlySelected = !this.showOnlySelected;
  }
}
/*
backend => npm run dev
frontend => ng serve
 */
