import { Component, OnInit } from '@angular/core';
import { ArticlesFacadeService, Article } from '@app/articles/domain-logic';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public loading = false;
  public articles: Article[] = [];

  constructor(private articlesFacadeService: ArticlesFacadeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.articlesFacadeService.search().pipe(finalize(() => this.loading = false))
      .subscribe((articles) => this.articles = articles);
  }
}