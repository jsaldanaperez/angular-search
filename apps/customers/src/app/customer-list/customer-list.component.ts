import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CustomersFacadeService, Customer } from '@angular-search/customers/domain-logic';

@Component({
  selector: 'angular-search-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public loading = false;
  public customers: Customer[] = [];

  constructor(private customersFacadeService: CustomersFacadeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.customersFacadeService.search().pipe(finalize(() => this.loading = false))
      .subscribe((customers) => this.customers = customers);
  }
}
