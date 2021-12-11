import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedSearchModule } from '@angular-search/shared/search';
import { SearchRoutingModule } from './search-routing.module';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedSearchModule
  ]
})
export class SearchModule { }
