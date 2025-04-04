import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'afficheCommentaire',
  pure: true, // Optimisation pour éviter les recalculs inutiles
})
export class AfficheCommentairePipe implements PipeTransform {
  transform(nomJour: string, jour: string): string | null {
    if (jour === '') {
      return null;
    }
    return 'commentaire';
  }
}
