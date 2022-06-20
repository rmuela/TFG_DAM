import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invitation } from 'src/app/models/invitation';
import { SearchUserToEdit } from 'src/app/models/searchUserToEdit';
import { AlertService } from 'src/app/services/alert.service';
import { InvitationService } from 'src/app/services/invitation.service';

@Component({
  selector: 'app-show-wedding-component',
  templateUrl: './show-wedding-component.component.html',
  styleUrls: ['./show-wedding-component.component.css']
})
export class ShowWeddingComponentComponent implements OnInit {

  invitations: Invitation[] | null;
  
    submitted = false;
    inputType='password'
    idUsuario: number | undefined;
    constructor(
       
        private route: ActivatedRoute,
        private router: Router,
        private invitationService: InvitationService,
        private alertService: AlertService,
        private _invitationService: InvitationService
    ) { 
      this.invitations = null;
    }
  
    ngOnInit() {
      this.idUsuario = this.route.snapshot.params['id'];
   
      if (this.idUsuario != undefined && this.idUsuario != null) {
        const userToEdit: SearchUserToEdit = new SearchUserToEdit();
        userToEdit.pinCode = "1234"
        userToEdit.idUsuario = this.idUsuario
        
        this._invitationService.AllWeddingByUser(userToEdit).subscribe(items => 
          this.invitations = items
        ); 
      }else{
        this._invitationService.getAllInvitations().subscribe(items => 
          this.invitations = items
          );      
      }

       
        
    }
  
    // convenience getter for easy access to form fields
   
  /*
    onSubmit() {
      const nameCityUser: String = this.createWeddingForm.controls['city'].value;
      var idCity = this.provinces?.find(x => x.provinceName == nameCityUser);
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
    }*/
    
  

}
