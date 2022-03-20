import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerListComponent,
      },
      { path: 'create', component: CustomerDetailsComponent },
      { path: ':id', component: CustomerDetailsComponent },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
