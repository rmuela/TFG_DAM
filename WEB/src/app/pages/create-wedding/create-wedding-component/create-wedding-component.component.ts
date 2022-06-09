import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { InvitationService } from 'src/app/services/invitation.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-create-wedding-component',
  templateUrl: './create-wedding-component.component.html',
  styleUrls: ['./create-wedding-component.component.css']
})
export class CreateWeddingComponentComponent implements OnInit {

createWeddingForm!: FormGroup;
  loading = false;
  submitted = false;
  inputType='password'
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private invitationService: InvitationService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.createWeddingForm = this.formBuilder.group({
        nameCouple: ['', Validators.required],
        weddingDate: ['', Validators.required],
        placeConvite: ['', Validators.required],
        adressConvite: ['', [Validators.required, Validators.maxLength(9)],Validators.minLength(9)],
        city: ['', Validators.required],
        hourDinnerConvite: ['', Validators.required],
        transportConvite: ['', Validators.required],
        hourTransportConvite: ['', Validators.required],
        boyPhone: ['', Validators.required],
        girlPhone: ['', Validators.required],
        pinCode: ['', Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createWeddingForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.createWeddingForm.invalid) {
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
    if(this.inputType == "password") {
        this.inputType = "text";
    }else{
        this.inputType = "password"
    }
}

}



