import { Component } from '@angular/core';
import { LookUpService, SearchService } from '@angular-search/shared/search';
import { CustomersFacadeService, Customer } from '@angular-search/customers/domain-logic';

@Component({
  selector: 'angular-search-customers',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent{ 
 
  public editCustomer?: {
    name: string,
    description: string,
    path: string
  };

  constructor(
    lookupService: LookUpService,
    searchService: SearchService, 
    customersFacadeService: CustomersFacadeService){
      searchService.search$.subscribe((search) => {
        if(search){
          this.editCustomer = undefined;
          lookupService.execute<Customer | undefined>(customersFacadeService.find(search))
            .subscribe((customer) => {
              if(customer){
                this.editCustomer = {
                  name: `Edit customer ${customer.name}`,
                  description: 'Quick way to go to edit',
                  path: customer.id
                }
              }
            })
        }else{
          this.editCustomer = undefined;
        }
      });
  }
}
