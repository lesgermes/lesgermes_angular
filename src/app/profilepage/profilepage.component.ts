import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '../services/http.service';
import { ApplicationConfig, MY_CONFIG_TOKEN } from '../app.config';
import { CurrentUser } from '../models/currentUser';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  config: ApplicationConfig;
  currentUser: CurrentUser;
  error: string = '';
  registerPromoCodeForm: FormGroup;

  constructor(
    @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig,
    private router: Router, 
    private httpService: HttpService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
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
      (data: CurrentUser) => {
        this.currentUser = data;
      },
      error => this.error = error.message
    )
  }

  openRegisterPromoCodeModal(content) {
    this.registerPromoCodeForm = this.formBuilder.group({
      'promoCode': ['', Validators.required]
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.error = '';
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.error = '';
    });
  }

  registerPromoCode() {
    this.error = '';
    this.httpService.post(
      this.config.apiEndpoint + "/user/register_promo_code", 
      { promocode: this.registerPromoCodeForm.value.promoCode }
    ).then(
      () => {
        this.modalService.dismissAll("User Registered a promo code successfully");
        this.init();
      },
      (error: HttpErrorResponse) => {
        switch(error.status) {
          case 401:
            this.error = "Vous avez déjà enregistré un code promo.";
            break;
          case 402:
            this.error = "Le code promo renseigné n'existe pas.";
            break;
          case 403:
            this.error = "Le code promo utilisé a déjà été enregistré.";
            break;
          default:
            this.error = "Une erreur est survenue, veillez réessayer.";
            break;
        }
      }
    )
  }

}
