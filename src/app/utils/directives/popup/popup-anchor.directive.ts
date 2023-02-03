import { Directive, ElementRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[popupAnchor]',
  exportAs: 'popupAnchor',
})
export class PopupAnchorDirective {
  constructor(public element: ElementRef) {}
}
