import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    getUserDetails() {
        const user=JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get(`${config.apiUrl}/users/audit/${user._id}`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
    getIPAddress()
    {
        this.http.get('https://jsonip.com/').subscribe(data => {
            console.log(data);
            });
    }
}