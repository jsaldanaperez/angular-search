import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesFacadeService {
  
  private invoices: Invoice[] = [
    { id: '1', invoiceNumber: 'Invoice1', amount: 100, customerId: '1'},
    { id: '2', invoiceNumber: 'Invoice2',  amount: 100, customerId: '2'},
    { id: '3', invoiceNumber: 'Invoice3', amount: 100, customerId: '3'},
    { id: '4', invoiceNumber: 'Invoice4', amount: 100, customerId: '4'},
    { id: '5', invoiceNumber: 'Invoice5', amount: 100, customerId: '5'},
    { id: '6', invoiceNumber: 'Invoice6', amount: 100, customerId: '6'},
    { id: '7', invoiceNumber: 'Invoice7', amount: 100, customerId: '7'},
    { id: '8', invoiceNumber: 'Invoice8', amount: 100, customerId: '8'},
    { id: '9', invoiceNumber: 'Invoice9', amount: 100, customerId: '9'}
  ];
  
  public search(): Observable<Invoice[]>{
    return new Observable<Invoice[]>((observer) =>{ 
      setTimeout(() =>{
        observer.next(this.invoices);
        observer.complete();
      }, 500)
    });
  }


  public getById(invoiceId: string) : Observable<Invoice>{
    return new Observable<Invoice>((observer) =>{
      const invoice = this.invoices.find(x => x.id === invoiceId);
      setTimeout(() =>{
        observer.next(invoice);
        observer.complete();
      }, 500)
    });
  }


  public find(invoiceNumber: string) : Observable<Invoice | undefined>{
    return new Observable<Invoice | undefined>((observer) =>{
      const invoice = this.invoices.find(x => x.invoiceNumber.toLocaleLowerCase() === invoiceNumber.toLocaleLowerCase());
      setTimeout(() =>{
        observer.next(invoice);
        observer.complete();
      }, 500)
    });
  }

  public update(updatedInvoice: Invoice) : Observable<void>{
    return new Observable<void>((observer) =>{
      const invoiceIndex = this.invoices.findIndex(x => x.id === updatedInvoice.id)
      this.invoices[invoiceIndex] = updatedInvoice;
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }

  public create(invoice: Invoice) : Observable<void>{
    return new Observable<void>((observer) =>{
      const id = this.invoices.length + 1;
      invoice.id = id.toString();
      this.invoices.push(invoice);
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }
}

export class Invoice{
  id!: string;
  invoiceNumber!: string;
  amount!: number;
  customerId!: string;
}
