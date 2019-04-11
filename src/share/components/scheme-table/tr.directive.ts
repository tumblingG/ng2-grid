import { Directive, Host, Optional } from '@angular/core';
import { SlTableComponent } from "./sl-table/sl-table.component";

@Directive({
  selector: 'tr',
  host: {
    '[class.sl-table-row]': 'slTableComponent'
  }
})
export class TrDirective {

  constructor(@Host() @Optional() public slTableComponent: SlTableComponent) { }

}
