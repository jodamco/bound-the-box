import { Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { CanvaPageComponent } from './canva-page/canva-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
    pathMatch: 'full',
    data: { animation: 0 },
  },
  {
    path: 'canva',
    component: CanvaPageComponent,
    pathMatch: 'full',
    data: { animation: 1 },
  },
];
