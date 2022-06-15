import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { InvitationService } from 'src/app/services/invitation.service';
import { AlertService } from 'src/app/services/alert.service';
import { Province } from 'src/app/models/province';
import { ProvinceService } from 'src/app/services/province.service';
import { User } from 'src/app/models';
import { Invitation } from 'src/app/models/invitation';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-edit-wedding',
  templateUrl: './edit-wedding.component.html',
  styleUrls: ['./edit-wedding.component.css']
})
export class EditWeddingComponent implements OnInit {

  provinces: Province[] | null;
  invitation: Invitation; 
  idWedding: number = 0;
  createWeddingForm!: FormGroup;
  loading = false;
  submitted = false;
  inputType = 'password';
  nameCity : string | undefined;
  date: Date | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _invitationService: InvitationService,
    private _alertService: AlertService,
    private _provinceService: ProvinceService,
    private datePipe: DatePipe
    
  ) {
    this.provinces = null;
    this.invitation = new Invitation();
  }

  ngOnInit() {
    this._provinceService.getAllProvinces().subscribe(items =>
      this.provinces = items
    );

    this.createWeddingForm = this.formBuilder.group({
      coupleName: ['', ],
      weddingDate: ['', ],
      placeConvite: ['', ],
      adressConvite: ['',],
      cityIdProvince: ['', ],
      hourDinnerConvite: ['', ],
      transportConvite: ['', ],
      hourTransportConvite: ['', ],
      boyPhone: ['', ],
      girlPhone: ['', ],
      
      
    });

    this.idWedding= this.route.snapshot.params['id']; 
    this._invitationService.getInvitationById(this.idWedding).subscribe( weddingResponse => {
      var idCity = this.provinces?.find(x => x.idProvince == weddingResponse.cityIdProvince );
      this.invitation = weddingResponse;     
      this.nameCity = idCity?.provinceName;     
      let latest_date =this.datePipe.transform(this.invitation.weddingDate, 'yyyy-MM-dd');
      this.createWeddingForm.controls['weddingDate'].setValue(latest_date);
      //this.SetInitiaValues() 
    })  

  }

  SetInitiaValues(){
    this.createWeddingForm.controls['coupleName'].setValue(this.invitation.coupleName);
    this.createWeddingForm.controls['weddingDate'].setValue(this.invitation.weddingDate);
    this.createWeddingForm.controls['placeConvite'].setValue(this.invitation.placeConvite);
    this.createWeddingForm.controls['adressConvite'].setValue(this.invitation.adressConvite);
    this.createWeddingForm.controls['hourDinnerConvite'].setValue(this.invitation.hourDinnerConvite);
    this.createWeddingForm.controls['transportConvite'].setValue(this.invitation.transportConvite);
    this.createWeddingForm.controls['hourTransportConvite'].setValue(this.invitation.hourTransportConvite);
    this.createWeddingForm.controls['boyPhone'].setValue(this.invitation.boyPhone);
    this.createWeddingForm.controls['girlPhone'].setValue(this.invitation.girlPhone);
  }
  // convenience getter for easy access to form fields
  get f() { return this.createWeddingForm.controls; }

  onSubmit() {
    const nameCityUser: String = this.createWeddingForm.controls['cityIdProvince'].value;
    var idCity = this.provinces?.find(x => x.provinceName == nameCityUser);
    this.createWeddingForm.controls['cityIdProvince'].setValue(idCity?.idProvince);
    
    this.submitted = true;

    // reset alerts on submit
    this._alertService.clear();

    // stop here if form is invalid
    if (this.createWeddingForm.invalid) {
      return;
    }

    this.loading = true;
    this._invitationService.editWedding(this.createWeddingForm.value,this.idWedding)
      .pipe(first())
      .subscribe({
        next: () => {
          this._alertService.success('Update wedding successful', { keepAfterRouteChange: true });
          this.router.navigate(['../home']);
        },
        error: error => {
          this._alertService.error(error);
          this.loading = false;
        }

      });

  }
  

}
