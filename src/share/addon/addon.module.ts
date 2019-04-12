import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringTemplateOutletDirective } from './string-template-outlet.directive';
import { ClasslistAddDirective } from './classlist-add.directive';

@NgModule({
  declarations: [StringTemplateOutletDirective, ClasslistAddDirective],
  imports: [
    CommonModule
  ],
  exports: [StringTemplateOutletDirective, ClasslistAddDirective]
})
export class AddonModule { }
