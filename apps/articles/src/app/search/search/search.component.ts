import { Component } from '@angular/core';
import { SearchService } from '@angular-search/shared/search';
import { ArticlesFacadeService } from '@angular-search/articles/domain-logic';

@Component({
  selector: 'angular-search-articles',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{  

  public editArticle?: {
    name: string,
    description: string,
    path: string
  };

  constructor(
    searchService: SearchService, 
    articlesFacadeService: ArticlesFacadeService){
      searchService.search$.subscribe((search) => {
        if(search){
          this.editArticle = undefined;
          articlesFacadeService.find(search)
            .subscribe((article) => {
              if(article){
                this.editArticle = {
                  name: `Edit article ${article.name}`,
                  description: 'Quick way to go to edit',
                  path: article.id
                }
              }
            })
        }else{
          this.editArticle = undefined;
        }
      });
  }
}
