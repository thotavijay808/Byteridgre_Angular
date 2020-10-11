import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';
var ip = require('ip');

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        //console.log(config.apiUrl);
        let myIP = ip.address()
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password,myIP })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout(user) {
        return this.http.post<any>(`${config.apiUrl}/users/logout`,user)
        .pipe(map(user => {
            this.currentUserSubject.next(null); 
            localStorage.removeItem('currentUser');
            localStorage.removeItem('ldID');
            return user;
        }));

    }
}