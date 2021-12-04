import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SearchItemComponent
  ],
  exports: [
    SearchItemComponent
  ]
})
export class SharedSearchModule {}
