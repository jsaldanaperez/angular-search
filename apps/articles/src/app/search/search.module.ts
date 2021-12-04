import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedSearchModule } from '@angular-search/shared/search';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SearchRoutingModule,
    SharedSearchModule
  ]
})
export class SearchModule { }
