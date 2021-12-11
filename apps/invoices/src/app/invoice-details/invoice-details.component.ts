import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Invoice, InvoicesFacadeService } from '@angular-search/invoices/domain-logic';

@Component({
  selector: 'angular-search-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  isEditMode = false;
  invoice!: Invoice;
  loading = false;
  isSaving = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoicesFacade: InvoicesFacadeService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap.subscribe((params) =>{
      const changedId = params.get('id');
      if(changedId && id != changedId){
        this.getInvoice(changedId)
      }
    })
    if(id){
      this.isEditMode = true;
      this.getInvoice(id);
    }else{
      this.invoice = new Invoice;
    }
  }

  getInvoice(id: string): void{
    this.loading = true;
    this.invoicesFacade.getById(id)
    .pipe(finalize(() => this.loading = false)).subscribe((invoice) => this.invoice = invoice);
  }

  onSave(){
    this.isSaving = true;
    const action = this.isEditMode ?  this.invoicesFacade.update(this.invoice) : this.invoicesFacade.create(this.invoice);
    action.subscribe(() => this.router.navigate(['../', { relativeTo: this.activatedRoute}]));
  }
}
