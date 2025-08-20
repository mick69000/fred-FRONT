import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-saisie-astreinte',
  standalone: true,
  imports: [WcsAngularModule, CommonModule],
  templateUrl: './saisie-astreinte.component.html',
  styleUrl: './saisie-astreinte.component.scss',
})
export class SaisieAstreinteComponent {
  heures: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ];
  semaine: boolean[][] = [];
  ngOnInit(): void {
    this.semaine = Array.from({ length: 8 }, () => Array(24).fill(false));
  }
}
