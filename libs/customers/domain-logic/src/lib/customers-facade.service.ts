import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersFacadeService {

  private customers: Customer[] = [
    { id: '1', name: 'Customer1'},
    { id: '2', name: 'Customer2'},
    { id: '3', name: 'Customer3'},
    { id: '4', name: 'Customer4'},
    { id: '5', name: 'Customer5'},
    { id: '6', name: 'Customer6'},
    { id: '7', name: 'Customer7'},
    { id: '8', name: 'Customer8'},
    { id: '9', name: 'Customer9'},
  ];
  
  public search(): Observable<Customer[]>{
    return new Observable<Customer[]>((observer) =>{ 
      setTimeout(() =>{
        observer.next(this.customers);
        observer.complete();
      }, 500)
    });
  }


  public getById(customerId: string) : Observable<Customer>{
    return new Observable<Customer>((observer) =>{
      const customer = this.customers.find(x => x.id === customerId);
      setTimeout(() =>{
        observer.next(customer);
        observer.complete();
      }, 500)
    });
  }


  public find(customerName: string) : Observable<Customer | undefined>{
    return new Observable<Customer | undefined>((observer) =>{
      const customer = this.customers.find(x => x.name.toLocaleLowerCase() === customerName.toLocaleLowerCase());
      setTimeout(() =>{
        observer.next(customer);
        observer.complete();
      }, 500)
    });
  }

  public update(updatedCustomer: Customer) : Observable<void>{
    return new Observable<void>((observer) =>{
      const customerIndex = this.customers.findIndex(x => x.id === updatedCustomer.id)
      this.customers[customerIndex] = updatedCustomer;
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }

  public create(customer: Customer) : Observable<void>{
    return new Observable<void>((observer) =>{
      const id = this.customers.length + 1;
      customer.id = id.toString();
      this.customers.push(customer);
      setTimeout(() =>{
        observer.next();
        observer.complete();
      }, 500)
    });
  }

}

export class Customer{
  id!: string;
  name!: string;
}