import { Component } from '@angular/core';
import { WcsAngularModule } from 'wcs-angular';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [WcsAngularModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {}
