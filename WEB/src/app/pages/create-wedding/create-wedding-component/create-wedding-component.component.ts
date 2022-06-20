import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { InvitationService } from 'src/app/services/invitation.service';
import { AlertService } from 'src/app/services/alert.service';
import { Province } from 'src/app/models/province';
import { ProvinceService } from 'src/app/services/province.service';
import { User } from 'src/app/models';


@Component({
  selector: 'app-create-wedding-component',
  templateUrl: './create-wedding-component.component.html',
  styleUrls: ['./create-wedding-component.component.css']
})
export class CreateWeddingComponentComponent implements OnInit {
 
  provinces: Province[] | null;
  createWeddingForm!: FormGroup;
  loading = false;
  submitted = false;
  inputType = 'password';
  telPattern = "[0-9]{3}[ -][0-9]{3}[ -][0-9]{3}";
  hourPattern = "[0-2]{1}[0-9]{1}[ : ][0-5]{1}[0-9]{1}";  
  pinCodePattern="[0-9]{4}"
  nameCouplePattern="^[A-Za-z -]+$"
  isHidden: boolean | undefined;
  datepipe: any;
  fechaActual: Date | undefined
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService,
    private alertService: AlertService,
    private _provinceService: ProvinceService
  ) {
    this.provinces = null;
  }

  ngOnInit() {
    this._provinceService.getAllProvinces().subscribe(items =>
      this.provinces = items     
    );
    this.createWeddingForm = this.formBuilder.group({
      coupleName: ['', Validators.required],
      weddingDate: ['', Validators.required],
      placeConvite: ['', Validators.required],
      adressConvite: ['', Validators.required],
      cityIdProvince: ['', Validators.required],
      hourDinnerConvite: ['', Validators.required],
      transportConvite: ['', Validators.required],
      hourTransportConvite: ['', ],
      boyPhone: ['', Validators.required,],
      girlPhone: ['', Validators.required],
      pinCode: ['', Validators.required],
      usuarioId: [''],
    });
    
    
  }
  
  
  dataGreatThanValidator(): boolean{
    this.fechaActual = new Date();
    //this.fechaActual.getDay
    
    var fechaActualToComparar = this.fechaActual.getFullYear() +"-"+ this.fechaActual.getMonth() +"-"+ this.fechaActual.getDate() 
    if(this.createWeddingForm.get('weddingDate')?.value >= fechaActualToComparar ){
      return true
    }else{
      return false
    }
      
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
    const nameCityUser: String = this.createWeddingForm.controls['cityIdProvince'].value;
    var idCity = this.provinces?.find(x => x.provinceName == nameCityUser);
    this.createWeddingForm.controls['cityIdProvince'].setValue(idCity?.idProvince);
    var usuarioLogeado: User = JSON.parse(localStorage['user']);
    this.createWeddingForm.controls['usuarioId'].setValue(usuarioLogeado.id);
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    
    
    
    // stop here if form is invalid
    if (this.createWeddingForm.invalid) {
      window.alert("Formulario no valido")
      return;
    }

    this.loading = true;
    this.invitationService.createWedding(this.createWeddingForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //this.alertService.success('Wedding create successful', { keepAfterRouteChange: true });
          this.router.navigate(['../home']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }

      });

  }
  hideShowPassword() {
    if (this.inputType == "password") {
      this.inputType = "text";
    } else {
      this.inputType = "password"
    }
  }

}



