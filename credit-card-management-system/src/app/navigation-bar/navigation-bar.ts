import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TitleCasePipe, UpperCasePipe} from '@angular/common';
import {routes} from '../app.routes';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css'
})
export class NavigationBar {
  appName: string = "angular test app";
  navigationRoutes = routes.filter(route => route.path != "**")
}
