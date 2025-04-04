import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [WcsAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
