import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {
  collapsed = true;
  user!: User;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
}
logout() {
  this.accountService.logout();
}
  ngOnInit(): void {
  }

}
