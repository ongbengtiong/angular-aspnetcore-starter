import { Component, Inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from '../../models/weatherForecast';
import { AccountService } from '../../../../shared/services/account.service';
import { createEntitySuccess } from '../../../entity/store/actions';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  errorMessage: string;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router:Router) {
  }
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });
  } 
  public credentials = {
    userName: "",
    password: ""
  }
  login() {
    this.credentials = this.authForm.value;
    this.accountService.login(this.credentials)
      .subscribe(success => {
        if (success) {
          this.router.navigate([""]);
        } else {
          this.router.navigate([""]);
        }
      },
        err => {
          this.errorMessage = "Failed to login";
        }
      );
  }
}
