import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryRoutingModule } from './remote-entry-routing.module';
import { RemoteEntryComponent } from './remote-entry/remote-entry.component';


@NgModule({
  declarations: [
    RemoteEntryComponent
  ],
  imports: [
    CommonModule,
    RemoteEntryRoutingModule
  ]
})
export class RemoteEntryModule { }
