import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';
import { SearchComponent } from './search/search.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    SearchItemComponent,
    SearchComponent,
    SearchModalComponent
  ],
  exports: [
    SearchItemComponent,
    SearchComponent,
    SearchModalComponent
  ]
})
export class SharedSearchModule {}
