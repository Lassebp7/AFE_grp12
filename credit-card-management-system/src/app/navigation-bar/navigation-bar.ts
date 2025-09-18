import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.html',
})
export class NavigationBar {
  appName: string = 'angular test app';
  navigationRoutes = routes.filter((route) => route.path != '**');
}
