import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'afficheNomJour',
  pure: true, // Optimisation pour éviter les recalculs inutiles
})
export class AfficheNomJourPipe implements PipeTransform {
  transform(nomJour: string, jour: string): string | null {
    if (jour === '') {
      return null;
    }
    return nomJour;
  }
}
