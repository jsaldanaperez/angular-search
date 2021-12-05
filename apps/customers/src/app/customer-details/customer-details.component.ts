import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CustomersFacadeService, Customer } from '@angular-search/customers/domain-logic';

@Component({
  selector: 'angular-search-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  isEditMode = false;
  customer!: Customer;
  loading = false;
  isSaving = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customersFacade: CustomersFacadeService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap.subscribe((params) =>{
      const changedId = params.get('id');
      if(changedId && id != changedId){
        this.getCustomer(changedId)
      }
    })
    if(id){
      this.isEditMode = true;
      this.getCustomer(id);
    }else{
      this.customer = new Customer;
    }
  }

  getCustomer(id: string): void{
    this.loading = true;
    this.customersFacade.getById(id)
    .pipe(finalize(() => this.loading = false)).subscribe((customer) => this.customer = customer);
  }

  onSave(){
    this.isSaving = true;
    const action = this.isEditMode ? this.customersFacade.update(this.customer) : this.customersFacade.create(this.customer);
    action.subscribe(() => this.router.navigate(['../', { relativeTo: this.activatedRoute}]));
  }
}
