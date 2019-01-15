import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProfileImageMouseOver]'
})
export class ProfileImageMouseOverDirective {

  @Input('appProfileImageMouseOver') imageUrl: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.displayEditLogo();
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.hideEditLogo();
  }

  constructor(private el: ElementRef) { }

  private displayEditLogo() {
    this.el.nativeElement.style.backgroundImage = "url(" + this.imageUrl + ")";
    this.el.nativeElement.src = "assets/images/icon-edit.png";
  }

  private hideEditLogo() {
    this.el.nativeElement.style.backgroundImage = "";
    this.el.nativeElement.src = this.imageUrl;
  }

}
