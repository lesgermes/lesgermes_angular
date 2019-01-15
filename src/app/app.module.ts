import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Routing } from './app.routing';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from './app.config';
import { TokenService } from './app.tokenservice';
import { RefreshTokenInterceptorService } from './services/refresh-token-interceptor.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';

import { MediaModalComponent } from './components/mediamodal/mediamodal.component';
import { ProfileImageMouseOverDirective } from './directives/profile-image-mouse-over.directive';

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
    RegisterpageComponent,
    ProfilepageComponent,
    MediaModalComponent,
    ProfileImageMouseOverDirective
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
    YoutubePlayerModule,
    NgbModule.forRoot()
  ],
  providers: [
    {provide: MY_CONFIG_TOKEN, useValue: MY_CONFIG},
    TokenService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useExisting: JwtInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }