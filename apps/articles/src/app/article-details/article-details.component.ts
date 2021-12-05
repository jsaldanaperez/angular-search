import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, ArticlesFacadeService } from '@angular-search/articles/domain-logic';
import { finalize } from 'rxjs';

@Component({
  selector: 'angular-search-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  isEditMode = false;
  article!: Article;
  loading = false;
  isSaving = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesFacade: ArticlesFacadeService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap.subscribe((params) =>{
      const changedId = params.get('id');
      if(changedId && id != changedId){
        this.getArticle(changedId)
      }
    })
    if(id){
      this.isEditMode = true;
      this.getArticle(id);
    }else{
      this.article = new Article;
    }
  }

  getArticle(id: string): void{
    this.loading = true;
    this.articlesFacade.getById(id)
    .pipe(finalize(() => this.loading = false)).subscribe((article) => this.article = article);
  }

  onSave(){
    this.isSaving = true;
    const action = this.isEditMode ?  this.articlesFacade.update(this.article) : this.articlesFacade.create(this.article);
    action.subscribe(() => this.router.navigate(['../', { relativeTo: this.activatedRoute}]));
  }

}
