import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationBar} from './navigation-bar/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
