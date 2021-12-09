import { Injectable } from '@angular/core';
 import { fromEvent, Subject } from 'rxjs';

 @Injectable({
   providedIn: 'root'
 })
 export class KeyAssignmentService {
   private keyAssignments: string[] = [];
   private selectedKeySubject = new Subject();
   public selectedKey$ = this.selectedKeySubject.asObservable();

   constructor(){
     fromEvent<KeyboardEvent>(window, 'keydown')
       .subscribe((event) =>{
         if(event.ctrlKey){
          const keyAssignment = this.keyAssignments.find(x => x === event.key);
          if(keyAssignment){
            this.selectedKeySubject.next(keyAssignment);
          }
         }
       })
   }

   public get(): string{
     const key = (this.keyAssignments.length + 1).toString();
     this.keyAssignments.push(key);
     return key;
   }


   public reset(): void{
     this.keyAssignments.splice(0, this.keyAssignments.length);
   }
 }