/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, InvoiceListComponent, InvoiceDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([ { path: '', loadChildren: () => import('./remote-entry/entry.module').then(m => m.RemoteEntryModule)}], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
