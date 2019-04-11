import { Directive, Optional, Host } from '@angular/core';
import {SlTableComponent} from "./sl-table/sl-table.component";

@Directive({
  selector: 'tbody',
  host: {
    '[class.sl-table-tbody]': 'slTableComponent'
  }
})
export class TbodyDirective {

  constructor(@Host() @Optional() public slTableComponent: SlTableComponent) { }

}
