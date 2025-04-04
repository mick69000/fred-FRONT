import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';
import { CommonModule } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [WcsAngularModule, CommonModule, MatTooltipModule],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss',
})
export class ParametresComponent implements OnInit {
  @ViewChild('PrenomInput') prenomInput!: ElementRef;
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
  enginASupprimer = '';
  typeASupprimer = '';
  typeAAjouter: string = '';
  voieASupprimer: string = '';
  nomAgentASupprimer: string = '';
  prenomAgentASupprimer: string = '';
  erreurMessage: string = '';
  alerteTitre: string = '';
  alerteChamps1: string = '';
  alerteChamps2: string = '';
  titreAAjouter: string = '';
  choseAAjouter: string = '';
  chose2AAjouter: string = '';
  onglet: string = '';
  service: Observable<any>;
  affichage: boolean = false;
  titreASupprimer: string = '';
  choseASupprimer: string = '';
  chose2ASupprimer: string = '';
  typeEngin: string = '';
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

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.prenomInput) {
        console.log('PrenomInput est chargé');
      }
    });
  }

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
    private apiVoiesService: ApiVoieService
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

  ngOnInit(): void {
    this.rafraichirLesDonneés();
  }

  récupèreTouteLaListe(service: any, setter: (data: any) => void) {
    service.subscribe((data: any) => {
      setter(data);
    });
  }

  rafraichirLesDonneés() {
    this.récupèreTouteLaListe(this.lesAgents, (data) => (this.agents = data));
    this.récupèreTouteLaListe(this.lesEngins, (data) => (this.engins = data));
    this.récupèreTouteLaListe(this.lesFiacs, (data) => (this.fiacs = data));
    this.récupèreTouteLaListe(this.lesFirexs, (data) => (this.firexs = data));
    this.récupèreTouteLaListe(this.lesModules, (data) => (this.modules = data));
    this.récupèreTouteLaListe(this.lesMsus, (data) => (this.msurgents = data));
    this.récupèreTouteLaListe(this.lesOms, (data) => (this.oms = data));
    this.récupèreTouteLaListe(
      this.lesSpecs,
      (data) => (this.specialites = data)
    );
    this.récupèreTouteLaListe(
      this.lesSystemes,
      (data) => (this.systemes = data)
    );
    this.récupèreTouteLaListe(this.lesVoies, (data) => (this.voies = data));
  }

  supprime(onglet: string, valeur1: string, valeur2: string) {
    // valeur1 = numero, nom
    // valeur2 = prenom,''
    let serviceCall: any;
    let refreshMethod: any;

    switch (onglet) {
      case 'engin':
        serviceCall = this.apiEnginsService.deleteEngin(valeur1);
        this.récupèreTouteLaListe(
          this.lesEngins,
          (data) => (this.engins = data)
        );
        break;
      case 'voie':
        serviceCall = this.apiVoiesService.deleteVoie(valeur1);
        this.récupèreTouteLaListe(this.lesVoies, (data) => (this.voies = data));
        break;

      case 'module':
        serviceCall = this.apiModulesService.deleteModule(valeur1);
        this.service = this.lesModules;
        this.donnees = this.modules;

        break;

      case 'fiac':
        serviceCall = this.apiFiacsService.deleteFiac(valeur1);
        this.service = this.lesFiacs;
        this.donnees = this.fiacs;

        break;

      case 'om':
        serviceCall = this.apiOmsService.deleteOm(valeur1);
        this.service = this.lesOms;
        this.donnees = this.oms;
        break;

      case 'firex':
        serviceCall = this.apiFirexsService.deleteFirex(valeur1);
        this.service = this.lesFirexs;
        this.donnees = this.firexs;

        break;

      case 'msu':
        serviceCall = this.apiMsurgentsService.deleteMsurgent(valeur1);
        this.service = this.lesMsus;
        this.donnees = this.msurgents;

        break;

      case 'agent':
        serviceCall = this.apiAgentsService.deleteAgent(valeur1, valeur2);
        this.récupèreTouteLaListe(
          this.lesAgents,
          (data) => (this.agents = data)
        );
        break;

      case 'specialite':
        serviceCall = this.apiSpecialitesService.deleteSpecialite(valeur1);
        this.service = this.lesSpecs;
        this.donnees = this.specialites;
        break;

      case 'systeme':
        serviceCall = this.apiSystemesService.deleteSysteme(valeur1);
        this.service = this.lesSystemes;
        this.donnees = this.systemes;
        break;
    }

    serviceCall.subscribe(() => {
      this.fermeSupprime();
      this.rafraichirLesDonneés();
    });
  }

  ajoute(onglet: string, valeur1Brut: string, typeEngin: string) {
    // valeur1Brut : nomAgent,voie,engin,
    // valeur2Brut : prenomAgent,type
    this.typeEngin = typeEngin;
    let valeur2Brut = onglet;
    const prenom =
      this.affichage && this.prenomInput
        ? this.prenomInput.nativeElement.value
        : onglet;
    if (onglet === 'agent') {
      valeur2Brut = prenom;
    }
    if (valeur1Brut.length !== 0 && valeur2Brut.length != 0) {
      const valeur1 = valeur1Brut.toUpperCase();
      const valeur2 =
        onglet === 'agent'
          ? valeur2Brut.charAt(0).toUpperCase() +
            valeur2Brut.slice(1).toLowerCase()
          : valeur2Brut.toUpperCase();
      let serviceCall: any;
      let messageSuccess: string;
      let refreshMethod: any;
      let alerteTitre: string;
      let alerte1: string;
      let alerte2: string = '';

      switch (onglet) {
        case 'engin':
          serviceCall = this.apiEnginsService.setEngin(typeEngin, valeur1);
          messageSuccess = 'Rame ajoutée avec succes !!! ';
          this.service = this.lesEngins;
          this.donnees = this.engins;
          alerteTitre = "L'ENGIN";
          alerte1 = valeur2;
          alerte2 = valeur1;
          break;
        case 'voie':
          serviceCall = this.apiVoiesService.setVoie(valeur1);
          messageSuccess = 'Voie ajoutée avec succes !!! ';
          this.service = this.lesVoies;
          this.donnees = this.voies;
          alerteTitre = 'LA VOIE';
          alerte1 = valeur1;
          alerte2 = '';
          break;

        case 'module':
          serviceCall = this.apiModulesService.setModule(typeEngin, valeur1);
          messageSuccess = 'Module ajouté avec succes !!! ';
          this.service = this.lesModules;
          this.donnees = this.modules;
          alerteTitre = 'LE MODULE';
          alerte1 = valeur1;
          break;

        case 'fiac':
          serviceCall = this.apiFiacsService.setFiac(typeEngin, valeur1);
          messageSuccess = 'Fiac ajouté avec succes !!! ';
          this.service = this.lesFiacs;
          this.donnees = this.fiacs;
          alerteTitre = 'LE FIAC';
          alerte1 = valeur1;
          break;

        case 'om':
          serviceCall = this.apiOmsService.addOm(typeEngin, valeur1);
          messageSuccess = 'OM ajoutée avec succes !!! ';
          this.service = this.lesOms;
          this.donnees = this.oms;
          alerteTitre = "L'OM";
          alerte1 = valeur1;
          break;

        case 'firex':
          serviceCall = this.apiFirexsService.setFirex(typeEngin, valeur1);
          messageSuccess = 'Firex ajouté avec succes !!! ';
          this.service = this.lesFirexs;
          this.donnees = this.firexs;
          alerteTitre = 'LE FIREX';
          alerte1 = valeur1;
          break;

        case 'msu':
          serviceCall = this.apiMsurgentsService.setMsurgent(
            typeEngin,
            valeur1
          );
          messageSuccess = 'Ms_urgent ajouté avec succes !!! ';
          this.service = this.lesMsus;
          this.donnees = this.msurgents;
          alerteTitre = 'LE MS_URGENT';
          alerte1 = valeur1;
          break;

        case 'agent':
          serviceCall = this.apiAgentsService.setAgent(valeur2, valeur1);
          messageSuccess = 'Collaborateur ajoutée avec succes !!! ';
          this.service = this.lesAgents;
          this.donnees = this.agents;
          alerteTitre = 'LE COLLABORATEUR';
          alerte1 = valeur2;
          alerte2 = valeur1;
          break;

        case 'specialite':
          serviceCall = this.apiSpecialitesService.setSpecialite(valeur1);
          messageSuccess = 'Spécialité ajoutée avec succes !!! ';
          this.service = this.lesSpecs;
          this.donnees = this.specialites;
          alerteTitre = 'LA SPÉCIALITÉ';
          alerte1 = valeur1;
          break;

        case 'systeme':
          serviceCall = this.apiSystemesService.setSysteme(valeur1);
          messageSuccess = 'Systeme ajouté avec succes !!! ';
          this.service = this.lesSystemes;
          this.donnees = this.systemes;
          alerteTitre = 'LE SYSTÈME';
          alerte1 = valeur1;
          break;
      }

      serviceCall.subscribe({
        next: () => {
          alert(messageSuccess);
          this.fermeAjout();
          this.rafraichirLesDonneés();
        },
        error: (error: Error) => {
          this.alerteTitre = alerteTitre;
          this.alerteChamps1 = alerte1;
          this.alerteChamps2 = alerte2;
          this.ouvreAlerteDejaPresent();
        },
      });
    }
  }

  ouvreAlerteDejaPresent() {
    (
      document.getElementById('AlerteDejaPresent') as HTMLDialogElement
    ).showModal();
  }

  fermeAlerteDejaPresent() {
    (document.getElementById('AlerteDejaPresent') as HTMLDialogElement).close();
  }

  ouvreAjout(onglet: string, typeEngin: string) {
    this.affichage = false;
    this.onglet = onglet;
    this.typeEngin = typeEngin;
    switch (onglet) {
      case 'engin':
        this.titreAAjouter = "d'une rame " + typeEngin;
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;
      case 'voie':
        this.titreAAjouter = "d'une voie";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'module':
        this.titreAAjouter = "d'un module";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'fiac':
        this.titreAAjouter = "d'un fiac";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'om':
        this.titreAAjouter = "d'une OM";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'firex':
        this.titreAAjouter = "d'un firex";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'msu':
        this.titreAAjouter = "d'un Ms urgent";
        this.choseAAjouter = 'le numéro';
        this.chose2AAjouter = '';
        break;

      case 'agent':
        this.affichage = true;
        this.titreAAjouter = "d'un collaborateur";
        this.choseAAjouter = 'le nom';
        this.chose2AAjouter = 'le prénom';
        break;

      case 'specialite':
        this.titreAAjouter = "d'une spécialité";
        this.choseAAjouter = 'le nom';
        this.chose2AAjouter = '';
        break;

      case 'systeme':
        this.titreAAjouter = "d'un système";
        this.choseAAjouter = 'le nom';
        this.chose2AAjouter = '';
        break;
    }
    (document.getElementById('ajout') as HTMLDialogElement).showModal();
  }

  fermeAjout() {
    (document.getElementById('ajout') as HTMLDialogElement).close();
  }

  ouvreSupprime(onglet: string, valeur1: string, valeur2: string) {
    this.titreASupprimer = '';
    this.choseASupprimer = valeur1;
    this.chose2ASupprimer = '';
    this.onglet = onglet;
    switch (onglet) {
      case 'NG':
      case 'AGC':
      case 'R2N':
        this.titreASupprimer = 'la rame ' + onglet;
        break;
      case 'voie':
        this.titreASupprimer = 'la voie';
        break;

      case 'module':
        this.titreASupprimer = 'le module';
        break;

      case 'fiac':
        this.titreASupprimer = 'le fiac';
        break;

      case 'om':
        this.titreASupprimer = "l' OM";
        break;

      case 'firex':
        this.titreASupprimer = 'le firex';
        break;

      case 'msu':
        this.titreASupprimer = 'le Ms urgent';
        break;

      case 'agent':
        this.titreASupprimer = 'le collaborateur';
        this.chose2ASupprimer = valeur2;
        break;

      case 'specialite':
        this.titreASupprimer = 'la spécialité';
        break;

      case 'systeme':
        this.titreASupprimer = 'le système';
        break;
    }
    (document.getElementById('supprime') as HTMLDialogElement).showModal();
  }

  fermeSupprime() {
    (document.getElementById('supprime') as HTMLDialogElement).close();
  }
}
