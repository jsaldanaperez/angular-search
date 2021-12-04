import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedSearchModule } from '@angular-search/shared/search';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedSearchModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('articles/SearchModule').then(m => m.SearchModule), outlet: 'articles'},
      { path: 'articles', loadChildren: () => import('articles/RemoteEntryModule').then(m => m.RemoteEntryModule)}
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
