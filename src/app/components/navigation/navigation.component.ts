import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {User} from "../../models/user";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: User;

  constructor(private  accountService: AccountService) {
    this.accountService.user
      .subscribe(
        x => this.user = x
      );
  }

  ngOnInit(): void {

  }

  logout() {
    this.accountService.logout();
  }

}
