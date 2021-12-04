import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from '../article-details/article-details.component';
import { ArticleListComponent } from '../article-list/article-list.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent},
  { path: 'create', component: ArticleDetailsComponent},
  { path: ':id', component: ArticleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteEntryRoutingModule { }
