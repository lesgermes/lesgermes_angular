import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { 
    this.registerForm = formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.httpService.hasAuthToken())
      this.router.navigate(['']);
  }

  onSubmit() {
    this.success = false;
    this.error = '';
    this.httpService.post(
      "https://api.lesgermes.tk/register", 
      { 
        username: this.registerForm.value.username, 
        email: this.registerForm.value.email, 
        password: this.registerForm.value.password,
        first_name: this.registerForm.value.firstname,
        last_name: this.registerForm.value.lastname
      }
    ).then(
      (data: any) => this.success = true,
      error => this.error = error.error.message
    );
  }
}
