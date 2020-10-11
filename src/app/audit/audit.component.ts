import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import {  AuthenticationService, UserService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    p: number = 1;
    collection: any[];

    constructor(
        private authenticationService: AuthenticationService,
        private userService:UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.getAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }


    private getAllUsers() {
        this.userService.getUserDetails().pipe(first()).subscribe(UsersDetails => {
            if(UsersDetails!=401){
                this.userService.getAll().pipe(first()).subscribe(users => {
                    this.collection = users
                })
            }
            else{
                this.collection = null;
            }
        });
    }
}