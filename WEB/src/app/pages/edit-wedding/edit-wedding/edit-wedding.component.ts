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
  nameCity: string | undefined;
  date: Date | undefined;
  telPattern = "[0-9]{3}[ -][0-9]{3}[ -][0-9]{3}";
  hourPattern = "[0-2]{1}[0-9]{1}[ : ][0-5]{1}[0-9]{1}";  
  pinCodePattern="[0-9]{4}"
  nameCouplePattern="^[A-Za-z -]+$"
  isHidden: boolean | undefined;
  dateBD : string | null;
  editBoda= true
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
    this.dateBD = null;
  }

  ngOnInit() {
    this._provinceService.getAllProvinces().subscribe(items =>
      this.provinces = items
    );

    this.createWeddingForm = this.formBuilder.group({
      coupleName: ['',],
      weddingDate: ['',],
      placeConvite: ['',],
      adressConvite: ['',],
      cityIdProvince: ['',],
      hourDinnerConvite: ['',],
      transportConvite: ['',],
      hourTransportConvite: ['',],
      boyPhone: ['',],
      girlPhone: ['',],


    });

    this.idWedding = this.route.snapshot.params['id'];
    this._invitationService.getInvitationById(this.idWedding).subscribe(weddingResponse => {
      var idCity = this.provinces?.find(x => x.idProvince == weddingResponse.cityIdProvince);
      this.invitation = weddingResponse;
      this.nameCity = idCity?.provinceName;
      this.dateBD = this.datePipe.transform(this.invitation.weddingDate, 'yyyy-MM-dd');
      //this.createWeddingForm.value.weddingDate = latest_date;
      this.createWeddingForm.controls['weddingDate'].setValue(this.dateBD)
      this.createWeddingForm.value.coupleName = weddingResponse.coupleName;
      //this.createWeddingForm.value.weddingDate = weddingResponse.weddingDate;
      this.createWeddingForm.value.placeConvite = weddingResponse.placeConvite;
      this.createWeddingForm.value.adressConvite = weddingResponse.adressConvite;
      this.createWeddingForm.value.hourDinnerConvite = weddingResponse.hourDinnerConvite;
      this.createWeddingForm.value.transportConvite = weddingResponse.transportConvite;
      this.createWeddingForm.value.hourTransportConvite = weddingResponse.hourTransportConvite;
      this.createWeddingForm.value.boyPhone = weddingResponse.boyPhone;
      this.createWeddingForm.value.girlPhone = weddingResponse.girlPhone;
      this.createWeddingForm.value.cityIdProvince = idCity?.provinceName;
      if(weddingResponse.transportConvite == "ninguno"){
        this.isHidden = true;        
      }else{
        this.isHidden = false;
      }
      //this.SetInitiaValues() 
    })

  }

 
  selectInput(event:  any) {
    let selected = event.target.value;
    if (selected == "ninguno") {
      this.isHidden = true;
      this.createWeddingForm.value.hourTransportConvite = "nada"
    } else {
      this.isHidden = false;
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.createWeddingForm.controls; }

  onSubmit() {
    /* const nameCityUser: String =this.createWeddingForm.value.cityIdProvince.value;
     var idCity = this.provinces?.find(x => x.provinceName == nameCityUser);
    this.createWeddingForm.value.cityIdProvince.setValue(idCity?.idProvince);*/

    this.submitted = true;

    // reset alerts on submit
    this._alertService.clear();

    // stop here if form is invalid
    if (this.createWeddingForm.invalid) {
      return;
    }
    const nameCityUser: String = this.createWeddingForm.value.cityIdProvince
    var idCity = this.provinces?.find(x => x.provinceName == nameCityUser);
    //this.createWeddingForm.controls['cityIdProvince'].setValue(idCity?.idProvince);
    const invitationEdit: Invitation = new Invitation();
    if(this.createWeddingForm.controls['coupleName'].value != "") 
    {
      invitationEdit.coupleName = this.createWeddingForm.controls['coupleName'].value;
    }else
    {
        invitationEdit.coupleName = this.invitation.coupleName;
    }
    if(this.createWeddingForm.controls['weddingDate'].value != "")  
    {
      invitationEdit.weddingDate = this.createWeddingForm.value.weddingDate
    } else
    {
      invitationEdit.weddingDate = this.invitation.weddingDate
    }
    if(this.createWeddingForm.controls['placeConvite'].value != "")  
    {
      invitationEdit.placeConvite = this.createWeddingForm.value.placeConvite
    } else
    {
      invitationEdit.placeConvite = this.invitation.placeConvite
    }
    if(this.createWeddingForm.controls['adressConvite'].value != "")  
    {
      invitationEdit.adressConvite = this.createWeddingForm.value.adressConvite
    } else
    {
      invitationEdit.adressConvite = this.invitation.adressConvite
    }
    if(this.createWeddingForm.controls['hourDinnerConvite'].value != "")  
    {
      invitationEdit.hourDinnerConvite = this.createWeddingForm.value.hourDinnerConvite
    } else
    {
      invitationEdit.hourDinnerConvite = this.invitation.hourDinnerConvite
    }
    if(this.createWeddingForm.controls['transportConvite'].value != "")  
    {
      invitationEdit.transportConvite = this.createWeddingForm.value.transportConvite
    } else
    {
      invitationEdit.transportConvite = this.invitation.transportConvite
    }
    if(this.createWeddingForm.controls['boyPhone'].value != "")  
    {
      invitationEdit.boyPhone = this.createWeddingForm.value.boyPhone
    } else
    {
      invitationEdit.boyPhone = this.invitation.boyPhone
    }
    if(this.createWeddingForm.controls['girlPhone'].value != "")  
    {
      invitationEdit.girlPhone = this.createWeddingForm.value.girlPhone
    } else
    {
      invitationEdit.girlPhone = this.invitation.girlPhone
    }
    if(this.createWeddingForm.controls['cityIdProvince'].value != "")
    {
      invitationEdit.cityIdProvince = idCity?.idProvince
    }else{
      invitationEdit.cityIdProvince = this.invitation.cityIdProvince;
    }
    if(this.createWeddingForm.controls['hourTransportConvite'].value != "")
    {
      invitationEdit.hourTransportConvite = this.createWeddingForm.value.hourTransportConvite
    }else{
      invitationEdit.hourTransportConvite = this.invitation.hourTransportConvite;
    }   

    this.loading = true;
    this._invitationService.editWedding(invitationEdit, this.idWedding)
      .pipe(first())
      .subscribe({
        next: () => {
          //this._alertService.success('Update wedding successful', { keepAfterRouteChange: true });
          this.router.navigate(['../home']);
        },
        error: error => {
          this._alertService.error(error);
          this.loading = false;
        }

      });

  }


}
