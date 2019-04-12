import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaginationModule } from './pagination/pagination.module';
import { SpinModule } from '../share/components/spin/spin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaginationModule,
    SpinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
