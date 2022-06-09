import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from 'src/environments/environment.prod';
import { Invitation } from '../models/invitation';


@Injectable({ providedIn: 'root' })
export class InvitationService {
    private invitationSubject: BehaviorSubject<Invitation> ; 
    public invitation: Observable<Invitation>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.invitationSubject = new BehaviorSubject<Invitation>(JSON.parse(localStorage.getItem('user') || "[]"));
        this.invitation = this.invitationSubject.asObservable();
    }

    public get userValue(): Invitation {
        return this.invitationSubject.value;
    }
    /*
    login(username: any, password: any) {
        return this.http.post<invitation>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(invitation => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.invitationSubject.next(invitation);
                return invitation;
            }));
    }
*/
   createWedding(invitation: Invitation) {
        return this.http.post(`${environment.apiUrl}/invitation`, invitation);
   }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    
    /*
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }*/
}