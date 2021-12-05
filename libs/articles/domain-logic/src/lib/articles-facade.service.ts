import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesFacadeService {
  
  private articles: Article[] = [
    { id: '1', name: 'Article1'},
    { id: '2', name: 'Article2'},
    { id: '3', name: 'Article3'},
    { id: '4', name: 'Article4'},
    { id: '5', name: 'Article5'},
    { id: '6', name: 'Article6'},
    { id: '7', name: 'Article7'},
    { id: '8', name: 'Article8'},
    { id: '9', name: 'Article9'},
  ];
  
  public search(): Observable<Article[]>{
    return new Observable<Article[]>((observer) =>{ 
      setTimeout(() =>{
        observer.next(this.articles);
        observer.complete();
      }, 500)
    });
  }


  public getById(articleId: string) : Observable<Article>{
    return new Observable<Article>((observer) =>{
      const article = this.articles.find(x => x.id === articleId);
      setTimeout(() =>{
        observer.next(article);
        observer.complete();
      }, 500)
    });
  }


  public find(articleName: string) : Observable<Article | undefined>{
    return new Observable<Article | undefined>((observer) =>{
      const article = this.articles.find(x => x.name.toLocaleLowerCase() === articleName.toLocaleLowerCase());
      setTimeout(() =>{
        observer.next(article);
        observer.complete();
      }, 500)
    });
  }

  public update(updatedArticle: Article) : Observable<void>{
    return new Observable<void>((observer) =>{
      const articleIndex = this.articles.findIndex(x => x.id === updatedArticle.id)
      this.articles[articleIndex] = updatedArticle;
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }

  public create(article: Article) : Observable<void>{
    return new Observable<void>((observer) =>{
      const id = this.articles.length + 1;
      article.id = id.toString();
      this.articles.push(article);
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }
}

export class Article{
  id!: string;
  name!: string;
}
