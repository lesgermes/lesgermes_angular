import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public httpService: HttpService
  ) { 
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.httpService.post(
      "http://localhost/lesgermes_symfony/web/app_dev.php/api/login_check", 
      { username: this.loginForm.value.username, password: this.loginForm.value.password }
    ).then(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['']);
      },
      error => this.error = error.message
    );
  }
}
