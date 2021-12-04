import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'angular-search-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  isEditMode = false;
  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode = true;
    }
  }

}
