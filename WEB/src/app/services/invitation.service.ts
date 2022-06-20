import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from 'src/environments/environment.prod';
import { Invitation } from '../models/invitation';
import { PinCode } from '../models/pinCode';
import { SearchUserToEdit } from '../models/searchUserToEdit';


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
    
   createWedding(invitation: Invitation) {
        return this.http.post(`${environment.apiUrl}/invitation`, invitation);
   }
   verifyPinCode(pinCode: PinCode){
        return this.http.post(`${environment.apiUrl}/invitation/pinCode`, pinCode);
   }   

    getAllInvitations():Observable<Invitation[]> {
        return this.http.get<Invitation[]>(`${environment.apiUrl}/invitation`);
    }

    getInvitationById(id: Number) {
        return this.http.get<Invitation>(`${environment.apiUrl}/invitation/${id}`);
    }
    editWedding(body: Invitation,id:number){
        return this.http.put<Invitation>(environment.apiUrl+"/invitation/"+id, body);
    }
    
    verifyUserCanEditInvitation(searchUserToEdit: SearchUserToEdit){
        return this.http.post(`${environment.apiUrl}/invitation/editWedding`, searchUserToEdit);
    }
    AllWeddingByUser(searchUserToEdit: SearchUserToEdit):Observable<Invitation[]>{
        return this.http.post<Invitation[]>(`${environment.apiUrl}/invitation/user`, searchUserToEdit);
    }

    
    
}