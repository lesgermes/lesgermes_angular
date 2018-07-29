import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../app.config';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  config: ApplicationConfig;
  currentUser = {};
  error: string = '';

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private router: Router, 
    private httpService: HttpService
  ) {
    this.config = configuration;
   }

  ngOnInit() {
    if (!this.httpService.hasAuthToken())
      this.router.navigate(['login']);
    else {
      this.httpService.get(this.config.apiEndpoint + "/user")
      .then(
        (data: any) => {
          this.currentUser = data;
        },
        error => this.error = error.message
      )
    }
  }

}
