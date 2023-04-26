import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Order } from 'src/app/shared/models/order';
import { PaymentMethod } from 'src/app/shared/models/paymentMethod';
import { OrderService } from 'src/app/shared/service/order.service';
import { PaymentMethodService } from 'src/app/shared/service/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  filtered:string=''
  paymentMethodDialog: boolean = false;
  originalpaymentMethods:any[] = [];  
  filteredpaymentMethods!:any[]
  deletepaymentMethodDialog: boolean = false;
  deletepaymentMethodsDialog: boolean = false;
  paymentMethods: PaymentMethod[] = [];
  
  paymentMethod: PaymentMethod = { 
    id:"",
    designation: "",
    order:[],
      }
    orders:Order[]=[] 
   order!:any[]
  selectedpaymentMethods: PaymentMethod[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  groupe: any[] = [];
  poste: any[] = [];
  etat: any[] = [];
  atelier: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  contact!: any[];
  idSelected: any;
  id!: string;
 
  
    constructor(private paymentMethodService: PaymentMethodService , 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private serviceorder :OrderService
   
      ) { }

  ngOnInit() {
     this.getAllpaymentMethod()
      this.getallOrder();
      
      
  } 
  getAllpaymentMethod(){
    this.paymentMethodService.getAllpayment_method().subscribe(data=>{this.paymentMethods=data });
  }
  getallOrder(){
      this.serviceorder.getAllOrder().subscribe(data=>{
          this.orders=data
    console.log(data);
    
          this.order=this.orders.map((co)=>{
          return{label: co.designation,value:co.id}
      })
      })
  }
 

  openNew() {
    this.submitted = false;
    this.paymentMethod={id:"",
    designation: "",
    order:[],}
          
      this.submitted = false;
      this.paymentMethodDialog = true;
  }

 editpaymentMethod(id: string) {
    this.idSelected = id;
    this.paymentMethodService.getpayment_methodByID(id).subscribe((data) => {
      this.paymentMethod = data;
    });

    this.paymentMethodDialog = true;
  }
  deleteSelectedpaymentMethods(){
    // to do
  }
  deletepaymentMethod(id: string) {
    this.deletepaymentMethodDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletepaymentMethodsDialog = false;
    this.paymentMethodService.deletepayment_method(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "la méthode de paiement  a été supprimé",
        life: 3000,
      });
      this.getAllpaymentMethod();
    });
    this.selectedpaymentMethods = [];
  }

  confirmDelete() {
    this.deletepaymentMethodDialog = false;
    this.paymentMethodService.deletepayment_method(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "la méthode de paiement a été supprimé",
        life: 3000,
      });
      this.getAllpaymentMethod();
    });
    this.paymentMethod = { ...this.paymentMethod };
  }

  hideDialog() {
    this.paymentMethodDialog = false;
    this.submitted = false;
  }

  savepaymentMethod() {
    this.submitted = true;
    if (this.idSelected) {
      let gc = {
        designation: this.paymentMethod.designation,
        order: this.paymentMethod.order,
      };


      this.paymentMethodService
        .Updatepayment_method(this.idSelected, gc)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: "la méthode de paiement été modifié",
            life: 3000,
          });
          this.paymentMethodDialog = false;
          this.getAllpaymentMethod();
        });

      this.paymentMethodDialog = false;
    } else {
      let ch = {
        designation: this.paymentMethod.designation,
        order: this.paymentMethod.order,
      };

      this.paymentMethodService.createpayment_method(ch).subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'votre méthode de paiement  a été créé avec succès',
          life: 3000,
        });
        this.paymentMethodDialog = false;
        this.getAllpaymentMethod();
      });
      this.paymentMethodDialog = false;
    }
  }
}
