import {Component, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Media } from '../../models/mediaList';

@Component({
  selector: 'mediamodal-component',
  templateUrl: './mediamodal.component.html',
  styleUrls: ['./mediamodal.component.css']
})
export class MediaModalComponent {
  closeResult: string;
  @Input() media: Media;
  playerVars: YT.PlayerVars = {
    modestbranding: YT.ModestBranding.Modest,
    iv_load_policy: YT.IvLoadPolicy.Hide,
    rel: YT.RelatedVideos.Hide,
    showinfo: YT.ShowInfo.Hide
  }

  constructor(private modalService: NgbModal) {}

  open(content) {
    console.log(this.media);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onStateChange(event) {
    // this.ytEvent = event.data;
  }
  savePlayer(player) {
    // this.player = player;
  }
}