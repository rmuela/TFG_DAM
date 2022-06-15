import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { Invitation } from 'src/app/models/invitation';
import { AccountService } from 'src/app/services/account.service';
import { InvitationService } from 'src/app/services/invitation.service';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  user: User;
  invitations: Invitation[] | null;
  constructor(private accountService: AccountService,private _invitationService: InvitationService) { 
    this.user = this.accountService.userValue;
    this.invitations = null;
  }

  ngOnInit(): void {
    this._invitationService.getAllInvitations().subscribe(items => 
      this.invitations = items
      );    
  }

}
