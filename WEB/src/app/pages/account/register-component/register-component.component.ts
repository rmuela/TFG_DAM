import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponent implements OnInit {
 
  
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  inputType='password'
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.register(this.registerForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  this.router.navigate(['/']);
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
