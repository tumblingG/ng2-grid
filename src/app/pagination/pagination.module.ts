import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcPaginationComponent } from './zc-pagination/zc-pagination.component';

@NgModule({
  declarations: [ZcPaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [ZcPaginationComponent]
})
export class PaginationModule { }
