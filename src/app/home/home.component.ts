import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'
import { AccountService } from '../services/account.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private router: Router, private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void { }

}
