import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaginationModule } from './pagination/pagination.module';
import { SpinModule } from '../share/components/spin/spin.module';
import {SchemeTableModule} from 'src/share/components/scheme-table/scheme-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaginationModule,
    SpinModule,
    SchemeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
