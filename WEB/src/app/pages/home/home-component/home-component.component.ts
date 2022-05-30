import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

}
