import { Component } from '@angular/core';
import { CustomersFacadeService } from '@angular-search/customers/domain-logic';
import { SearchItem, SearchConfig } from '@angular-search/shared/search';

@Component({
  selector: 'angular-search-invoices',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public createInvoiceForCustomer?: SearchItem;
  constructor(private customersFacadeService: CustomersFacadeService){ }

  public readonly createInvoiceForCustomerConfig = SearchConfig.create({
    onSearch: (search: string) => this.customersFacadeService.find(search),
    onResult: (customer) => {
      if(customer){
        this.createInvoiceForCustomer = {
          name: `Create invoice for customer ${customer.name}`,
          description: 'Quick way to create invoice',
          path: 'create',
          params: { customerId: customer.id}
        }
      }
    },
    onReset: () => this.createInvoiceForCustomer = undefined
  })
}
