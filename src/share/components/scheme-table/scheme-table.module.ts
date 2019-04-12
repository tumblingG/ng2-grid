import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AddonModule } from '../../addon/addon.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { SpinModule } from '../spin/spin.module';
import { SlTdComponent } from './sl-td/sl-td.component';
import { TrDirective } from './tr.directive';
import { TbodyDirective } from './tbody.directive';
import { SlThComponent } from './sl-th/sl-th.component';
import { SlTableComponent } from './sl-table/sl-table.component';
import { SlTheadComponent } from './sl-thead/sl-thead.component';
import { SlVirtualScrollDirective } from './sl-virtual-scroll.directive';

@NgModule({
  declarations: [SlTdComponent, TrDirective, TbodyDirective, SlThComponent, SlTableComponent, SlTheadComponent, SlVirtualScrollDirective],
  imports: [
    CommonModule,
    FormsModule,
    ScrollDispatchModule,
    AddonModule,
    PaginationModule,
    SpinModule
  ]
})
export class SchemeTableModule { }
