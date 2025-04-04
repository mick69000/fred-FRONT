import { Title } from '@angular/platform-browser';

export class JournéeEngin {
  date: string;
  engin: string;
  voie: string;
  module: string;
  fiac: string;
  om: string;
  firex: string;
  msurgent: string;
  systeme: string;
  commentaire: string;
  specialite1: string;
  specialite2: string;
  specialite3: string;
  specialite4: string;
  agent1: string;
  agent2: string;
  agent3: string;
  agent4: string;
  heure1: string;
  heure2: string;
  heure3: string;
  heure4: string;
  jour1: string;
  jour2: string;
  jour3: string;
  jour4: string;
  depannage: boolean;
  pointage: boolean;
  en_cours: boolean;
  valide: boolean;
  dsmat: boolean;
  osmose: boolean;
  mois: number;
  annee: number;

  constructor(
    date: string,
    engin: string,
    voie: string,
    module: string,
    fiac: string,
    om: string,
    firex: string,
    msurgent: string,
    systeme: string,
    commentaire: string,
    specialite1: string,
    specialite2: string,
    specialite3: string,
    specialite4: string,
    agent1: string,
    agent2: string,
    agent3: string,
    agent4: string,
    heure1: string,
    heure2: string,
    heure3: string,
    heure4: string,
    jour1: string,
    jour2: string,
    jour3: string,
    jour4: string,
    depannage: boolean,
    pointage: boolean,
    en_cours: boolean,
    valide: boolean,
    dsmat: boolean,
    osmose: boolean,
    mois: number,
    annee: number
  ) {
    this.date = date;
    this.engin = engin;
    this.voie = voie;
    this.module = module;
    this.fiac = fiac;
    this.om = om;
    this.firex = firex;
    this.msurgent = msurgent;
    this.systeme = systeme;
    this.commentaire = commentaire;
    this.specialite1 = specialite1;
    this.specialite2 = specialite2;
    this.specialite3 = specialite3;
    this.specialite4 = specialite4;
    this.agent1 = agent1;
    this.agent2 = agent2;
    this.agent3 = agent3;
    this.agent4 = agent4;
    this.heure1 = heure1;
    this.heure2 = heure2;
    this.heure3 = heure3;
    this.heure4 = heure4;
    this.jour1 = jour1;
    this.jour2 = jour2;
    this.jour3 = jour3;
    this.jour4 = jour4;
    this.depannage = depannage;
    this.pointage = pointage;
    this.en_cours = en_cours;
    this.valide = valide;
    this.dsmat = dsmat;
    this.osmose = osmose;
    this.mois = mois;
    this.annee = annee;
  }
}
