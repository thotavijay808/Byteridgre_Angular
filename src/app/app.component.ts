import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    user: any;
    logOutuser
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.user = JSON.parse(localStorage.getItem('currentUser'));

    }



    logout() {
        // this.authenticationService.logout();
        // this.router.navigate(['/login']);
        this.logOutuser = this.authenticationService.logout(this.user).subscribe(
            (data) => {
                // if(data.message==="updated"){
                this.router.navigate(['/login']);
                
                // }
            },
            err => {

            }
        );

    }
}