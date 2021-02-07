import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopProp]'
})
export class StopPropDirective {

  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
      event.preventDefault();
  }

}
