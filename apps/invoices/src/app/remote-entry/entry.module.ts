import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: InvoiceListComponent},
      { path: 'create', component: InvoiceDetailsComponent},
      { path: ':id', component: InvoiceDetailsComponent}
    ])
  ],
  providers: [],
})
export class RemoteEntryModule {}
