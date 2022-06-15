import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { InvitationService } from 'src/app/services/invitation.service';
import { AlertService } from 'src/app/services/alert.service';
import { Province } from 'src/app/models/province';
import { ProvinceService } from 'src/app/services/province.service';
import { User } from 'src/app/models';
import { PinCode } from 'src/app/models/pinCode';
import { SearchUserToEdit } from 'src/app/models/searchUserToEdit';


@Component({
  selector: 'app-pin-code-component',
  templateUrl: './pin-code-component.component.html',
  styleUrls: ['./pin-code-component.component.css']
})
export class PinCodeComponentComponent implements OnInit {
  provinces: Province[] | null;
  pinCodeForm!: FormGroup;
  loading = false;
  submitted = false;
  inputType = 'password';
  idWeddingEdit: any | null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService,
    private alertService: AlertService,
    private _provinceService: ProvinceService
  ) {
    this.provinces = null;
    this.idWeddingEdit = null;
  }
  ngOnInit() {
    this._provinceService.getAllProvinces().subscribe(items =>
      this.provinces = items
    );
    this.pinCodeForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],

    });


  }
  concatValueInput() {
    return this.pinCodeForm.controls['digit1'].value + this.pinCodeForm.controls['digit2'].value + this.pinCodeForm.controls['digit3'].value + this.pinCodeForm.controls['digit4'].value;
  }
  onSubmit() {

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.pinCodeForm.invalid) {
      return;
    }

    this.loading = true;

    this.idWeddingEdit = this.route.snapshot.params['id'];
   
    if (this.idWeddingEdit != undefined && this.idWeddingEdit != null) {
      const pinCode: PinCode = new PinCode();
      pinCode.pinCode = this.concatValueInput();
      pinCode.IdWedding = this.idWeddingEdit;
      this.invitationService.verifyPinCode(pinCode).
        pipe(first())
        .subscribe({
          next: () => {

            this.alertService.success('Pin code is correct', { keepAfterRouteChange: true });
            this.router.navigate(['../home/invitation/' + this.idWeddingEdit]);
          },
          error: error => {
            this.alertService.error(error);
            this.loading = false;
          }
        });
    }else{
      const userToEdit: SearchUserToEdit = new SearchUserToEdit();
      userToEdit.pinCode = this.concatValueInput();
      var usuarioLogeado: User = JSON.parse(localStorage['user']);
      userToEdit.idUsuario = Number(usuarioLogeado.id);
      this.invitationService.verifyUserCanEditInvitation(userToEdit).
        pipe(first())
        .subscribe({
          next: (data) => {
            this.idWeddingEdit = data;
            this.alertService.success('You can edit', { keepAfterRouteChange: true });
            this.router.navigate(['../home/edit-weddings/' + this.idWeddingEdit]);
          },
          error: error => {
            this.alertService.error(error);
            this.loading = false;
          }
        });
      
    }







  }
  hideShowPassword() {
    if (this.inputType == "password") {
      this.inputType = "text";
    } else {
      this.inputType = "password"
    }
  }

  /*pinCodeForm!: FormGroup;
 toggleShowHide!: string;
 position: number = 0;
 @ViewChild("first", { static: true }) first!: ElementRef;
 @ViewChild("second", { static: true }) second!: ElementRef;
 @ViewChild("third", { static: true }) third!: ElementRef;
 @ViewChild("fourth", { static: true }) fourth!: ElementRef;
 constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private accountService: AccountService,
   private alertService: AlertService
) { }

ngOnInit() {
 this.pinCodeForm = this.formBuilder.group({
   pinCode: ['', Validators.required],
   pinCode2: ['', Validators.required],
     
 });
 this.toggleShowHide = "hidden"  
 
 this.pinCodeForm.get('pincode');
}
 


reset(){
 this.pinCodeForm.reset();
 this.toggleShowHide = "hidden";
 //code.innerText = "";
};
onKeyUp(x:any) { // appending the updated value to the variable
 
   console.log("e");
   
   if (this.position < 5) {
     if (this.position === 0) {
       this.second.nativeElement.value = 1;
       this.first.nativeElement.focus();
     }
     if (this.position === 1) {
       this.third.nativeElement.value = 2;
       this.second.nativeElement.focus();
     }
     if (this.position === 2) {
       this.fourth.nativeElement.value = 3;
       this.third.nativeElement.focus();
     }
     if (this.position === 3) {
       this.fourth.nativeElement.value = 5;
       this.fourth.nativeElement.focus();
     }
     this.position++;
   }
  
 }
 enter(n: number) {
   if (this.position < 5) {
     if (this.position === 1) {
       this.first.nativeElement.value = n;
     }
     if (this.position === 2) {
       this.second.nativeElement.value = n;
     }
     if (this.position === 3) {
       this.third.nativeElement.value = n;
     }
     if (this.position === 4) {
       this.fourth.nativeElement.value = n;
     }
     this.position++;
     console.log(
       "position is " +
         this.position +
         " " +
         "PIN is " +
         this.first.nativeElement.value +
         this.second.nativeElement.value +
         this.third.nativeElement.value +
         this.fourth.nativeElement.value
     );
   }
 }
 back() {
   if (this.position > 1) {
     this.position--;
     if (this.position === 1) {
       this.first.nativeElement.value = "";
     }
     if (this.position === 2) {
       this.second.nativeElement.value = "";
     }
     if (this.position === 3) {
       this.third.nativeElement.value = "";
     }
     if (this.position === 4) {
       this.fourth.nativeElement.value = "";
     }
     console.log(
       "position is " +
         this.position +
         " " +
         "PIN is " +
         this.first.nativeElement.value +
         this.second.nativeElement.value +
         this.third.nativeElement.value +
         this.fourth.nativeElement.value
     );
   }
 }
 signUp() {
   
  
}*/




}