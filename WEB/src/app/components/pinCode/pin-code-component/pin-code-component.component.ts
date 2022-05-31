import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pin-code-component',
  templateUrl: './pin-code-component.component.html',
  styleUrls: ['./pin-code-component.component.css']
})
export class PinCodeComponentComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*
  pinCodeForm!: FormGroup;
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