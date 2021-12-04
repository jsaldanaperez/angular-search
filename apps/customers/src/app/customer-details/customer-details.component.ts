import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'angular-search-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  isEditMode = false;
  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode = true;
    }
  }
}
