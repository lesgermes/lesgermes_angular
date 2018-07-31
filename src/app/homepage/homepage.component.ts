import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../app.config';

import { MediaList, Media } from '../models/mediaList';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  config: ApplicationConfig;
  currentUser = {};
  mediaLists: Array<MediaList>;
  error: string = '';
  playerVars: YT.PlayerVars = {
    modestbranding: YT.ModestBranding.Modest,
    iv_load_policy: YT.IvLoadPolicy.Hide,
    rel: YT.RelatedVideos.Hide,
    showinfo: YT.ShowInfo.Hide
  }

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
      this.init();
    }
  }

  init() {
    this.httpService.get(this.config.apiEndpoint + "/user")
    .then(
      (data: any) => {
        this.currentUser = data;
      },
      error => this.error = error.message
    )

    this.httpService.get(this.config.apiEndpoint + '/media/mediaGroupsList')
    .then(
      (data: any) => {
        console.log(data);
        this.mediaLists = data.map(mediaList => { return new MediaList(mediaList); }) || null;
      },
      error => this.error = error.message
    )
  }

  onStateChange(event) {
    // this.ytEvent = event.data;
  }
  savePlayer(player) {
    // this.player = player;
  }

}
