import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'btb-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
})
export class SplashScreenComponent {
  public animate: boolean = false;

  constructor(private readonly router: Router) {}

  ngAfterViewInit() {
    this.animationCtrl();
  }

  async animationCtrl() {
    await delay(1200);
    this.animate = true;
    await delay(1350);
    this.router.navigate(['/canva']);
  }
}

export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
