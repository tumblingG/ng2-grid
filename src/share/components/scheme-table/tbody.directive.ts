import { Directive, Optional, Host, ElementRef, TemplateRef } from '@angular/core';
import {SlTableComponent} from "./sl-table/sl-table.component";
import {TableComponent} from './sl-table/table.component';

@Directive({
  selector: 'tbody',
  host: {
    '[class.sl-table-tbody]': 'tableComponent'
  }
})
export class TbodyDirective {

  constructor(
    @Host() @Optional() public tableComponent: TableComponent,
  ) {
    this.tableComponent.tbodyDirective = this;
  }

}
