import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from 'src/environments/environment.prod';
import { Invitation } from '../models/invitation';
import { Province } from '../models/province';


@Injectable({ providedIn: 'root' })
export class ProvinceService {
    private provinceSubject: BehaviorSubject<Province> ; 
    public province: Observable<Province>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.provinceSubject = new BehaviorSubject<Province>(JSON.parse(localStorage.getItem('user') || "[]"));
        this.province = this.provinceSubject.asObservable();
    }

    public get provinceValue(): Province {
        return this.provinceSubject.value;
    }   
    
  

    getAllProvinces() {
        var prueba =  this.http.get<Province[]>(`${environment.apiUrl}/province`);
        return prueba;
    }

   
    
    
}