import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  currentUser = {};
  error: string = '';

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    if (!this.httpService.hasAuthToken())
      this.router.navigate(['login']);
    else {
      this.httpService.get("https://api.lesgermes.tk/user")
      .then(
        (data: any) => {
          this.currentUser = data;
        },
        error => this.error = error.message
      )
    }
  }

}
