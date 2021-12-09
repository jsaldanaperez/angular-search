import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@angular-search/shared/search';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedSearchModule,
    RouterModule.forRoot(
      [
        { path: '', component: DashboardComponent},
        { path: '', loadChildren: () => import('articles/SearchModule').then((m) => m.SearchModule), outlet: 'articles'},
        // { path: '', loadChildren: () => import('customers/SearchModule').then((m) => m.SearchModule), outlet: 'customers'},
        {
          path: 'articles',
          loadChildren: () =>
            import('articles/RemoteEntryModule').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'customers',
          loadChildren: () =>
            import('customers/RemoteEntryModule').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
