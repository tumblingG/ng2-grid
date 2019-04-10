import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { SlTdComponent } from './sl-td/sl-td.component';
import { TrDirective } from './tr.directive';
import { TbodyDirective } from './tbody.directive';
import { SlThComponent } from './sl-th/sl-th.component';
import { SlComponent } from './sl/sl.component';
import { SlTableComponent } from './sl-table/sl-table.component';

@NgModule({
  declarations: [SlTdComponent, TrDirective, TbodyDirective, SlThComponent, SlComponent, SlTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SchemeTableModule { }
