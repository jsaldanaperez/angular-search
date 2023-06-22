import { Component } from '@angular/core';
import { SearchConfig, SearchItem } from '@app/shared/search';
import { CustomersFacadeService } from '@app/customers/domain-logic';

@Component({
  selector: 'app-customers',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{
  public editCustomer?: SearchItem;
  constructor(private customersFacadeService: CustomersFacadeService){ }

  public readonly editCustomerSearchConfig = SearchConfig.create({
    onSearch: (search: string) => this.customersFacadeService.find(search),
    onResult: (customer) => {
      if(customer){
        this.editCustomer = {
          name: `Edit customer ${customer.name}`,
          description: 'Quick way to go to edit',
          path: customer.id
        }
      }
    },
    onReset: () => this.editCustomer = undefined
  })
}
