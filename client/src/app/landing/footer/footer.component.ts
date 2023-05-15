import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private politicasDialogs: {[key: string]: HTMLDialogElement} = {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.politicasDialogs['privacidad'] = this.elementRef.nativeElement.querySelector('#politicasPrivacidad-dialog');
    this.politicasDialogs['uso'] = this.elementRef.nativeElement.querySelector('#condicionesUso-dialog');
    this.politicasDialogs['cookies'] = this.elementRef.nativeElement.querySelector('#politicasCookies-dialog');
    this.politicasDialogs['copyright'] = this.elementRef.nativeElement.querySelector('#politicasCopyright-dialog');
  }

  mostrarPoliticas(politica: string) {
    this.politicasDialogs[politica]?.showModal();
  }
  
  cerrarPoliticas(politica: string) {
    this.politicasDialogs[politica]?.close();
  }
}