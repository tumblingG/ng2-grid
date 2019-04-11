import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sl-virtual-scroll]'
})
export class SlVirtualScrollDirective {

  constructor(public templateRef: TemplateRef<{$implicit: any, index: number}>) { }

}
