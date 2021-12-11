import { Component, OnInit } from '@angular/core';
import { InvoicesFacadeService, Invoice } from '@angular-search/invoices/domain-logic';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'angular-search-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  public loading = false;
  public invoices: Invoice[] = [];

  constructor(private invoicesFacadeService: InvoicesFacadeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.invoicesFacadeService.search().pipe(finalize(() => this.loading = false))
      .subscribe((invoices) => this.invoices = invoices);
  }
}
