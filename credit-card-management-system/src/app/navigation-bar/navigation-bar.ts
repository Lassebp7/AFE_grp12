import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../app.routes';
import { AuthService } from '../api-services/auth-service/auth-service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.html',
})
export class NavigationBar {
  private authService = inject(AuthService);
  isAuth = this.authService.isAuth;
  navigationRoutes = routes
    .filter((route) => route.path != '**')
    .filter((route) => route.path != 'login');
}
