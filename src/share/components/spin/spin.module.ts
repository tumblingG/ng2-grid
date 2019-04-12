import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlSpinComponent } from './sl-spin/sl-spin.component';

@NgModule({
  declarations: [SlSpinComponent],
  imports: [
    CommonModule
  ],
  exports:[SlSpinComponent]
})
export class SpinModule { }
