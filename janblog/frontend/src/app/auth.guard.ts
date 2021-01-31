import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated = this.authService.isAuthenticated();
        if (isAuthenticated && (route.url[0].path === 'login' || route.url[0].path === 'register')) {
            return this.router.navigateByUrl('/home');
        } else if (isAuthenticated || !isAuthenticated && (route.url[0].path === 'login' || route.url[0].path === 'register')) {
            return true;
        } else {
            return this.router.navigateByUrl('/login');
        }
    }
}
