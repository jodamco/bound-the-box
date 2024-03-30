import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './slider';

@Component({
  selector: 'btb-root',
  standalone: true,
  imports: [RouterOutlet],
  animations: [slider],
  template: `
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet" />
    </div>
  `,
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
