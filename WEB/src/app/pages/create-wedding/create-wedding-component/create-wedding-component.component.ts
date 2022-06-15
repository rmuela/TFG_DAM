import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
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
      transportConvite: ['', ],
      hourTransportConvite: ['', ],
      boyPhone: ['', Validators.required],
      girlPhone: ['', Validators.required],
      pinCode: ['', Validators.required],
      usuarioId: [''],
    });

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
      this.alertService.error("Formulario no valido-");
      return;
    }

    this.loading = true;
    this.invitationService.createWedding(this.createWeddingForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
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



