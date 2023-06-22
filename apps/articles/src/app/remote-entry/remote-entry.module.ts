import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryRoutingModule } from './remote-entry-routing.module';
import { RemoteEntryComponent } from './remote-entry/remote-entry.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RemoteEntryRoutingModule
  ]
})
export default class RemoteEntryModule { }
