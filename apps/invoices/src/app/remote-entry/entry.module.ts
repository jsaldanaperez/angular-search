import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ InvoiceListComponent, InvoiceDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: InvoiceListComponent },
      { path: 'create', component: InvoiceDetailsComponent },
      { path: ':id', component: InvoiceDetailsComponent },
    ]),
  ],
  providers: [],
})
export default class RemoteEntryModule {}
