import { Component } from '@angular/core';
import { SearchConfig, SearchItem } from '@angular-search/shared/search';
import { ArticlesFacadeService } from '@angular-search/articles/domain-logic';

@Component({
  selector: 'angular-search-articles',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{  
  public editArticle?: SearchItem;

  constructor(private articlesFacadeService: ArticlesFacadeService){ }

  public readonly editArticleSearchConfig = SearchConfig.create({
    onSearch: (search: string) => this.articlesFacadeService.find(search),
    onResult: (article) => {
      if(article){
        this.editArticle = {
          name: `Edit article ${article.name}`,
          description: 'Quick way to go to edit',
          path: article.id
        }
      }
    },
    onReset: () => this.editArticle = undefined
  });
}
