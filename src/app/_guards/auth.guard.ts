import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(state.url);
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (state.url == "/audit") {
                if (currentUser.role == "Auditor") {
                    return true
                } else {
                    return false;
                }
                //console.log(currentUser);
            } else {
                return true;

            }
            // authorised so return true
        }
        console.log("user not logged in");

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}