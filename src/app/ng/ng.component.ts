import { CommonModule, formatDate } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { WcsAngularModule } from 'wcs-angular';
import { ApiAgentsService } from '../services/api/api.agents.service';
import { ApiEnginService } from '../services/api/api.engins.service';
import { ApiFiacService } from '../services/api/api.fiacs.service';
import { ApiFirexService } from '../services/api/api.firexs.service';
import { ApiModuleService } from '../services/api/api.modules.service';
import { ApiMsurgentService } from '../services/api/api.msurgents.service';
import { ApiOmService } from '../services/api/api.oms.service';
import { ApiSpecialiteService } from '../services/api/api.specialites.service';
import { ApiSystemeService } from '../services/api/api.systemes.service';
import { ApiVoieService } from '../services/api/api.voies.service';
import { Observable } from 'rxjs';
import { JournéeEngin } from '../models/journéeEngin';
import { DataNgService } from '../services/data/data.ng.service';
import { CommunService } from '../services/transverse/commun.service';

@Component({
  selector: 'app-ng',
  standalone: true,
  imports: [
    WcsAngularModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './ng.component.html',
  styleUrl: './ng.component.scss',
})
export class NgComponent implements OnInit {
  dDJB = formatDate(new Date(), 'dd-MM-yyyy', 'fr');

  constructor(
    private ngZone: NgZone,
    private apiAgentsService: ApiAgentsService,
    private apiEnginsService: ApiEnginService,
    private apiFiacsService: ApiFiacService,
    private apiFirexsService: ApiFirexService,
    private apiModulesService: ApiModuleService,
    private apiMsurgentsService: ApiMsurgentService,
    private apiOmsService: ApiOmService,
    private apiSpecialitesService: ApiSpecialiteService,
    private apiSystemesService: ApiSystemeService,
    private apiVoiesService: ApiVoieService,
    private dataNgService: DataNgService,
    private communService: CommunService
  ) {
    this.lesVoies = this.apiVoiesService.getAllVoies();
    this.lesAgents = this.apiAgentsService.getAllAgents();
    this.lesEngins = this.apiEnginsService.getAllEngins();
    this.lesFiacs = this.apiFiacsService.getAllFiacs();
    this.lesFirexs = this.apiFirexsService.getAllFirexs();
    this.lesModules = this.apiModulesService.getAllModules();
    this.lesMsus = this.apiMsurgentsService.getAllMsurgents();
    this.lesOms = this.apiOmsService.getAllOms();
    this.lesSpecs = this.apiSpecialitesService.getAllSpecialites();
    this.lesSystemes = this.apiSystemesService.getAllSystemes();
    this.service = this.apiOmsService.getAllOms();
  }

  ngOnInit() {
    this.moisEnCours =
      '0' +
      this.communService
        .récupèreLeMoisEtLAnnée(this.communService.dateFrancaise(this.dDJB))[0]
        .toString();
    this.anneeMoisEnCours = this.communService
      .récupèreLeMoisEtLAnnée(
        this.communService.dateFrancaise(this.dDJB).toString()
      )[1]
      .toString();
    if (parseInt(this.moisEnCours) > 1) {
      this.moisPrecedent = '0' + (parseInt(this.moisEnCours) - 1).toString();
      this.anneeMoisPrecedent = this.anneeMoisEnCours;
    } else {
      this.moisPrecedent = '12';
      this.anneeMoisPrecedent = (
        parseInt(this.anneeMoisEnCours) - 1
      ).toString();
    }
    this.rafraichirLesDonneés();
  }

  tousLesData: any[] = [];
  agents: any[] = [];
  engins: any[] = [];
  fiacs: any[] = [];
  firexs: any[] = [];
  modules: any[] = [];
  msurgents: any[] = [];
  oms: any[] = [];
  specialites: any[] = [];
  systemes: any[] = [];
  voies: any[] = [];
  donnees: any[] = [];
  tousLesJoursNg: any[] = [];
  listeMoisEnCours: any[] = [];
  listeMoisPrecedent: any[] = [];
  listeDesMoisSelectionne: any[] = [];
  date: string = this.dDJB;
  engin: string = '';
  voie: string = '';
  module: string = '';
  fiac: string = '';
  om: string = '';
  firex: string = '';
  msurgent: string = '';
  systeme: string = '';
  commentaire: string = '';
  specialite1: string = '';
  specialite2: string = '';
  specialite3: string = '';
  specialite4: string = '';
  agent1: string = '';
  agent2: string = '';
  agent3: string = '';
  agent4: string = '';
  heure1: string = '';
  heure2: string = '';
  heure3: string = '';
  heure4: string = '';
  jour1: string = '';
  jour2: string = '';
  jour3: string = '';
  jour4: string = '';
  en_cours: boolean = false;
  valide: boolean = false;
  dsmat: boolean = false;
  osmose: boolean = false;
  lesAgents: Observable<any>;
  lesEngins: Observable<any>;
  lesFiacs: Observable<any>;
  lesFirexs: Observable<any>;
  lesModules: Observable<any>;
  lesMsus: Observable<any>;
  lesOms: Observable<any>;
  lesSpecs: Observable<any>;
  lesSystemes: Observable<any>;
  lesVoies: Observable<any>;
  service: Observable<any>;
  heures: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];
  jours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  mois: number = 0;
  annee: number = 0;
  modifier: boolean = false;
  aremplirE: string = '';
  aremplirA: string = '';
  aremplirD: string = '';
  aremplirP: string = '';
  btnValider: string = 'VALIDER';
  jourSelectionne: string = '';
  journéeAModifier: any = '';
  moisprecedent: string = '';
  moisencours: string = 'selectionne';
  moisEnCours: string = '';
  moisPrecedent: string = '';
  anneeMoisEnCours: string = '';
  anneeMoisPrecedent: string = '';
  moisSelect: string = 'selectionne';
  listeMoisEnCoursSelectionne: any[] = [];
  listeMoisPrecedentSelectionne: any[] = [];
  agent1Valide: boolean = true;
  agent2Valide: boolean = true;
  agent3Valide: boolean = true;
  agent4Valide: boolean = true;

  rafraichirLesDonneés() {
    this.récupèreLesSetterDUnType(
      this.lesEngins,
      (data) => (this.engins = data)
    );

    this.récupèreLesSetterDUnType(
      this.lesModules,
      (data) => (this.modules = data)
    );

    this.récupèreLesSetterDUnType(this.lesFiacs, (data) => (this.fiacs = data));

    this.récupèreLesSetterDUnType(
      this.lesFirexs,
      (data) => (this.firexs = data)
    );

    this.récupèreLesSetterDUnType(
      this.lesMsus,
      (data) => (this.msurgents = data)
    );

    this.récupèreLesSetterDUnType(this.lesOms, (data) => (this.oms = data));

    this.récupèreTousLesSetter(this.lesAgents, (data) => (this.agents = data));

    this.récupèreTousLesSetter(
      this.lesSpecs,
      (data) => (this.specialites = data)
    );

    this.récupèreTousLesSetter(
      this.lesSystemes,
      (data) => (this.systemes = data)
    );

    this.récupèreTousLesSetter(this.lesVoies, (data) => (this.voies = data));

    this.récupèreTousLesJoursDeLaBDD();
  }

  récupèreTousLesSetter(service: any, setter: (data: any) => void) {
    service.subscribe((data: any) => {
      setter(data);
    });
  }

  récupèreLesDeuxMoisNg(service: any, setter: (data: any) => void) {
    service.subscribe((data: any[]) => {
      const listeMoisEnCours = data.filter(
        (ng) =>
          ng.mois === this.moisEnCours && ng.annee === this.anneeMoisEnCours
      );
      setter(listeMoisEnCours);
      const listeMoisPrecedent = data.filter(
        (ng) =>
          ng.mois === this.moisPrecedent && ng.annee === this.anneeMoisPrecedent
      );
      setter(listeMoisPrecedent);
    });
  }
  récupèreLesSetterDUnType(service: any, setter: (data: any) => void) {
    service.subscribe((data: any[]) => {
      const dataFiltres = data.filter((engin) => engin.type === 'NG');
      setter(dataFiltres);
    });
  }
  récupèreTousLesJoursDeLaBDD() {
    this.dataNgService.getAllNgs().subscribe((data: any[]) => {
      this.tousLesData = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  }

  datePourLeSelect(dateBrute: string, selection: string) {
    const [day, month, year] = dateBrute.split('-');
    if (selection != 'precedent') {
      if (month == this.moisEnCours && year == this.anneeMoisEnCours) {
        return `${day}-${month}-${year}`;
      } else {
        return null;
      }
    } else {
      if (month == this.moisPrecedent && year == this.anneeMoisPrecedent) {
        return `${day}-${month}-${year}`;
      } else {
        return null;
      }
    }
  }

  valideLaJourneeNg() {
    if (this.btnValider !== 'Modifier') {
      this.date = this.communService.dateFrancaise(this.date);
    }
    let journéeAAjouter: JournéeEngin = new JournéeEngin(
      this.date,
      this.engin,
      this.voie,
      this.module,
      this.fiac,
      this.om,
      this.firex,
      this.msurgent,
      this.systeme,
      this.commentaire,
      this.specialite1,
      this.specialite2,
      this.specialite3,
      this.specialite4,
      this.agent1,
      this.agent2,
      this.agent3,
      this.agent4,
      this.heure1,
      this.heure2,
      this.heure3,
      this.heure4,
      this.jour1,
      this.jour2,
      this.jour3,
      this.jour4,
      this.en_cours,
      this.valide,
      this.dsmat,
      this.osmose,
      this.communService.récupèreLeMoisEtLAnnée(this.date.toString())[0],
      this.communService.récupèreLeMoisEtLAnnée(this.date.toString())[1]
    );
    if (this.date !== '' && this.engin !== '' && this.agent1 !== '') {
      if (this.btnValider === 'Modifier') {
        this.dataNgService.deleteNg(this.date).subscribe(() => {});
      }
      this.dataNgService.setNg(journéeAAjouter).subscribe({
        next: () => {
          alert('journée enregistrée....');
          this.récupèreTousLesJoursDeLaBDD();
          this.reinitialiseLesChamps();
        },
      });
    } else {
      this.aremplirE = this.engin === '' ? 'aRemplir' : '';
      this.aremplirA = this.agent1 === '' ? 'aRemplir' : '';
      alert('Les champs `Engin` et `Agent 1` sont OBLIGATOIRES !!!');
    }
  }
  effaceUneJournée(journéeAEffacer: string) {
    this.dataNgService.deleteNg(journéeAEffacer).subscribe(() => {
      alert('Journée effacée');
      this.reinitialiseLesChamps();
    });
  }
  ouvreSelectAModifier() {
    this.récupèreTousLesJoursDeLaBDD();
    this.moisencours = 'selectionne';
    this.moisprecedent = '';
    this.listeMoisEnCoursSelectionne = this.tousLesData.filter(
      (data) =>
        data.mois === parseInt(this.moisEnCours) &&
        data.annee === parseInt(this.anneeMoisEnCours)
    );

    this.listeMoisPrecedentSelectionne = this.tousLesData.filter(
      (data) =>
        data.mois == parseInt(this.moisPrecedent) &&
        data.annee == parseInt(this.anneeMoisPrecedent)
    );
    this.listeDesMoisSelectionne = this.listeMoisEnCoursSelectionne;
    console.log('filtre : ', this.listeDesMoisSelectionne);

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
        (item) => item.date == this.jourSelectionne
      );
      this.rempliLesChampsAModifier();
      (document.getElementById('selectAModifier') as HTMLDialogElement).close();
    }
  }

  supprime() {
    this.effaceUneJournée(this.date);
  }

  rempliLesChampsAModifier() {
    this.btnValider = 'Modifier';
    this.date = this.communService.formatDateToInput(
      this.journéeAModifier.date
    );
    this.engin = this.journéeAModifier.engin;
    this.voie = this.journéeAModifier.voie;
    this.module = this.journéeAModifier.module;
    this.fiac = this.journéeAModifier.fiac;
    this.om = this.journéeAModifier.om;
    this.firex = this.journéeAModifier.firex;
    this.msurgent = this.journéeAModifier.msurgent;
    this.systeme = this.journéeAModifier.systeme;
    this.commentaire = this.journéeAModifier.commentaire;
    this.specialite1 = this.journéeAModifier.specialite1;
    this.specialite2 = this.journéeAModifier.specialite2;
    this.specialite3 = this.journéeAModifier.specialite3;
    this.specialite4 = this.journéeAModifier.specialite4;
    this.agent1 = this.journéeAModifier.agent1;
    this.agent2 = this.journéeAModifier.agent2;
    this.agent3 = this.journéeAModifier.agent3;
    this.agent4 = this.journéeAModifier.agent4;
    this.heure1 = this.journéeAModifier.heure1;
    this.heure2 = this.journéeAModifier.heure2;
    this.heure3 = this.journéeAModifier.heure3;
    this.heure4 = this.journéeAModifier.heure4;
    this.jour1 = this.journéeAModifier.jour1;
    this.jour2 = this.journéeAModifier.jour2;
    this.jour3 = this.journéeAModifier.jour3;
    this.jour4 = this.journéeAModifier.jour4;
    this.en_cours = this.journéeAModifier.en_cours;
    this.valide = this.journéeAModifier.valide;
    this.dsmat = this.journéeAModifier.dsmat;
    this.osmose = this.journéeAModifier.osmose;
    this.modifier = true;
    this.agent1Valide = false;
    this.agent2Valide = this.agent2 === '' ? true : false;
    this.agent3Valide = this.agent3 === '' ? true : false;
    this.agent4Valide = this.agent4 === '' ? true : false;
  }

  reinitialiseLesChamps() {
    this.jourSelectionne = '';
    this.modifier = false;
    this.btnValider = 'VALIDER';
    this.date = this.dDJB;
    this.engin = '';
    this.voie = '';
    this.module = '';
    this.fiac = '';
    this.om = '';
    this.firex = '';
    this.msurgent = '';
    this.systeme = '';
    this.commentaire = '';
    this.specialite1 = '';
    this.specialite2 = '';
    this.specialite3 = '';
    this.specialite4 = '';
    this.agent1 = '';
    this.agent2 = '';
    this.agent3 = '';
    this.agent4 = '';
    this.heure1 = '';
    this.heure2 = '';
    this.heure3 = '';
    this.heure4 = '';
    this.jour1 = '';
    this.jour2 = '';
    this.jour3 = '';
    this.jour4 = '';
    this.en_cours = false;
    this.valide = false;
    this.dsmat = false;
    this.osmose = false;
    this.agent1Valide = true;
    this.agent2Valide = this.agent2 === '' ? true : false;
    this.agent3Valide = this.agent3 === '' ? true : false;
    this.agent4Valide = this.agent4 === '' ? true : false;
    this.fermeSelectAModifier();
  }

  moisSelectionne(selection: string) {
    if (selection === 'precedent') {
      this.moisprecedent = 'selectionne';
      this.moisencours = '';
      this.moisSelect = 'precedent';
      this.listeDesMoisSelectionne = this.listeMoisPrecedentSelectionne;
    } else {
      this.moisprecedent = '';
      this.moisencours = 'selectionne';
      this.moisSelect = 'encours';
      this.listeDesMoisSelectionne = this.listeMoisEnCoursSelectionne;
    }
  }

  onChangeErreur(set: string) {
    switch (set) {
      case 'E':
        this.aremplirE = '';
        break;
      case 'A1':
        this.aremplirA = '';
        this.agent1Valide = false;
        break;
      case 'A2':
        this.aremplirA = '';
        this.agent2Valide = false;
        break;
      case 'A3':
        this.aremplirA = '';
        this.agent3Valide = false;
        break;
      case 'A4':
        this.aremplirA = '';
        this.agent4Valide = false;
        break;
    }
  }
}
