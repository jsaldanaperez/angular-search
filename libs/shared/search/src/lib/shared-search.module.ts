import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SearchItemComponent,
    SearchComponent
  ],
  exports: [
    SearchItemComponent,
    SearchComponent
  ]
})
export class SharedSearchModule {}
