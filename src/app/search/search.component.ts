import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [WcsAngularModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {}
