import { Component } from '@angular/core';
import { CustomersFacadeService } from '@app/customers/domain-logic';
import { SearchItem, SearchConfig } from '@app/shared/search';
import { InvoicesFacadeService } from '@app/invoices/domain-logic';

@Component({
  selector: 'app-invoices',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public createInvoiceForCustomer?: SearchItem;
  public editInvoice?: SearchItem;

  constructor(
    private invoicesFacadeService: InvoicesFacadeService,
    private customersFacadeService: CustomersFacadeService){ }

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

  public readonly editInvoiceConfig = SearchConfig.create({
    onSearch: (search: string) => this.invoicesFacadeService.find(search),
    onResult: (invoice) => {
      if(invoice){
        this.editInvoice = {
          name: `Edit invoice ${invoice.invoiceNumber}`,
          description: 'Quick way to edit invoice',
          path: invoice.id,
        }
      }
    },
    onReset: () => this.editInvoice = undefined
  })
}
