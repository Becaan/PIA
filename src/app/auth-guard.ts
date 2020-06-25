import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authServis: AuthService, private ruter: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | 
    import("@angular/router").UrlTree | import("rxjs").Observable<boolean |
    import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> 
    {
        const isAuth = this.authServis.getIsAuth();

        if(!isAuth)
        {
            this.ruter.navigate(['']);
        }
        return isAuth;
    }

}