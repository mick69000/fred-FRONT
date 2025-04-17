import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ErrorComponent } from './error/error.component';
import { DiversComponent } from './divers/divers.component';
import { PointageComponent } from './pointage/pointage.component';
import { HsupastreinteComponent } from './hsupastreinte/hsupastreinte.component';
import { SaisieAstreinteComponent } from './saisie-astreinte/saisie-astreinte.component';
import { AgcComponent } from './agc/agc.component';
import { NgComponent } from './ng/ng.component';
import { R2nComponent } from './r2n/r2n.component';
import { SearchComponent } from './search/search.component';
import { ParametresComponent } from './parametres/parametres.component';
import { NotePersoComponent } from './note-perso/noteperso.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'divers', component: DiversComponent },
  { path: 'pointage', component: PointageComponent },
  { path: 'hsupastreinte', component: HsupastreinteComponent },
  { path: 'saisie-astreinte', component: SaisieAstreinteComponent },
  { path: 'agc', component: AgcComponent },
  { path: 'ng', component: NgComponent },
  { path: 'r2n', component: R2nComponent },
  { path: 'search', component: SearchComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'note-perso', component: NotePersoComponent },
  { path: '', component: ErrorComponent },
];
