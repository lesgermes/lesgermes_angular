import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import { Routing } from './app.routing';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from './app.config';
import { TokenService } from './app.tokenservice';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

export function jwtOptionsFactory(tokenService) {
  var whitelistedDomains = tokenService.getWhitelistedDomains();
  var blacklistedRoutes = tokenService.getBlacklistedRoutes();
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: whitelistedDomains,
    blacklistedRoutes: blacklistedRoutes
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    RegisterpageComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    YoutubePlayerModule
  ],
  providers: [
    {provide: MY_CONFIG_TOKEN, useValue: MY_CONFIG},
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }