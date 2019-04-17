import { Directive, Host, Optional, Input } from '@angular/core';
import { SlTableComponent } from "./sl-table/sl-table.component";

@Directive({
  selector: 'tr',
  host: {
    '[class.sl-table-row]': 'slTableComponent'
  }
})
export class TrDirective {
  @Input() data: {[index: string]: any};
  @Input() checked: boolean = false;
  constructor(@Host() @Optional() public slTableComponent: SlTableComponent) { }
}
