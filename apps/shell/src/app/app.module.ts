import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@app/shared/search';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loadRemoteModule } from '@nx/angular/mf';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedSearchModule,
    RouterModule.forRoot(
      [
        { path: '', component: DashboardComponent },
        {
          path: '',
          loadChildren: () =>
          loadRemoteModule('articles', './SearchModule').then((m) => m.SearchModule),
          outlet: 'articles',
        },
        {
          path: '',
          loadChildren: () =>
          loadRemoteModule('customers', './SearchModule').then((m) => m.SearchModule),
          outlet: 'customers',
        },
        {
          path: '',
          loadChildren: () =>
          loadRemoteModule('invoices', './SearchModule').then((m) => m.SearchModule),
          outlet: 'invoices',
        },
        {
          path: 'articles',
          loadChildren: () =>
          loadRemoteModule('articles', './RemoteEntryModule') ,
        },
        {
          path: 'customers',
          loadChildren: () =>
          loadRemoteModule('customers', './RemoteEntryModule'),
        },
        {
          path: 'invoices',
          loadChildren: () =>
          loadRemoteModule('invoices', './RemoteEntryModule') ,
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
