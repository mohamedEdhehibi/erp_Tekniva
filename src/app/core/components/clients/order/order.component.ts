import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BillingAddress } from 'src/app/shared/models/billingAddress';
import { Client } from 'src/app/shared/models/client';
import { DeliveryAddress } from 'src/app/shared/models/deliveryAddress';
import { Order } from 'src/app/shared/models/order';
import { OrderCategory } from 'src/app/shared/models/orderCategory';
import { PaymentMethod } from 'src/app/shared/models/paymentMethod';
import { SaleConditions } from 'src/app/shared/models/saleConditions';
import { BillingAddressService } from 'src/app/shared/service/billing-address.service';
import { ClientService } from 'src/app/shared/service/client.service';
import { OrderCategoryService } from 'src/app/shared/service/order-category.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { PaymentMethodService } from 'src/app/shared/service/payment-method.service';
import { SaleConditionsService } from 'src/app/shared/service/sale-conditions.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderDialog: boolean = false;

  deleteorderDialog: boolean = false;

  deleteordersDialog: boolean = false;

  orders: Order[] = [];

  order: Order = {
    id:"", 
 
    designation: "",
    client: 0,
    saleConditions: 0,
    orderCategory: 0,
    paymentMethod: 0,
    deliveryAddress: [],
    billingAddress: [],
    updatedAt:"",
    createdAt:"",
  };

clients: Client[] = [];
saleConditions: any[] = [];
orderCategory: any[] = [];
paymentMethod: any[] = [];
deliveryAddress: any[] = [];
billingAddress: any[] = [];
  selectedorders: Order[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalorders: any[] = [];
  filteredorders!: any[];
  id!: string;
  client!: any[];
  conditions!: SaleConditions[];
  condition!: any[];
  categorys!: OrderCategory[];
  payments!: PaymentMethod[];
  billingAddresss!: BillingAddress[];
  deliveryAddresss!: DeliveryAddress[];
 
  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private servicesClient :ClientService,
    private servicesCondition:SaleConditionsService,
    private servicesOrederCategory:OrderCategoryService,
    private servicesMethodePayment:PaymentMethodService,
    private servicesBillingAddress:BillingAddressService
  ) {}

  ngOnInit() {
    this.getAllordere();
    this.getallClient();
    this.getAllCondition();
    this.getAllorderCategorie();
    this.getAllMethodePayment();
    this.getAllBillingAdderss();
    this.getAllDilAdderss();

  }
  getallClient(){
    this.servicesClient.getAllClient().subscribe(data=>{
        this.clients=data
     this.client=this.clients.map((co)=>{
       return{label: co.name,value:co.id}
    })
    })
}
getAllCondition(){
  this.servicesCondition.getAllsale_conditions().subscribe(data=>{
    this.conditions=data
    this.condition=this.conditions.map((con=>{
      return{label:con.designation ,value:con.id}
    }))
  })
}
getAllorderCategorie(){
  this.servicesOrederCategory.getAllorderCategory().subscribe(data=>{
    this.categorys=data
    this.orderCategory=this.categorys.map((con=>{
      return{label:con.designation ,value:con.id}
    }))
  })
}
getAllMethodePayment(){
  this.servicesMethodePayment.getAllpayment_method().subscribe(data=>{
    this.payments=data
    this.paymentMethod=this.payments.map((con=>{
      return{label:con.designation ,value:con.id}
    }))
  })
}
getAllBillingAdderss(){
  this.servicesBillingAddress.getAllbilling_address().subscribe(data=>{
    this.billingAddresss=data
    this.billingAddress=this.billingAddresss.map((con=>{
      return{label:con.address ,value:con.id}
    }))
  })
}
getAllDilAdderss(){
  this.servicesBillingAddress.getAllbilling_address().subscribe(data=>{
    this.deliveryAddresss=data
    this.deliveryAddress=this.deliveryAddresss.map((con=>{
      return{label:con.address ,value:con.id}
    }))
  })
}

  getAllordere() {
    this.orderService.getAllOrder().subscribe(
      (data) => {
        this.orders = data;
       
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.order={id:"", 
    designation: "",
     client: 0,
     saleConditions: 0,
     orderCategory: 0,
     paymentMethod: 0,
     deliveryAddress: [],
     billingAddress: [],
     updatedAt:"",
     createdAt:"",}
    this.submitted = false;
    this.orderDialog = true;
  }

  deleteSelectedorders() {
    this.deleteordersDialog = true;
  }
  editorder(id: string) {
    this.idSelected = id
    this.orderService.getOrderByID(id).subscribe(data=>{this.order=data})
    this.orderDialog = true;

  }


  deleteorder(id: string) {
    this.deleteorderDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deleteordersDialog = false;
    this.orderService.deleteOrder(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllordere() })
    this.selectedorders = [];
  }

  confirmDelete() {
    this.deleteorderDialog = false;
    this.orderService.deleteOrder(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllordere() })
    this.order = { ...this.order };
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
   
  }
  saveorder() {
    this.submitted = true;
   
    if(this.idSelected){
      let gc= {
        designation: this.order.designation,
  client: this.order.client,
  saleConditions: this.order.saleConditions,
  orderCategory: this.order.orderCategory,
  paymentMethod: this.order.paymentMethod,
  deliveryAddress: this.order.deliveryAddress,
  billingAddress: this.order.billingAddress}
    this.orderService.UpdateOrder(this.idSelected, gc).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'order a été modifié', life: 3000 }); this.getAllordere(); this.orderDialog  = false; this.ngOnInit(); })
    
       
      } else {
        //   this.order.image = 'order-placeholder.svg';
        // @ts-ignore
        // this.order.inventoryStatus = this.order.inventoryStatus ? this.order.inventoryStatus.value : 'INSTOCK';
        this.orders.push(this.order);
        this.orders = [...this.orders];
        this.order = { ...this.order };
        let ch = {
          designation: this.order.designation,
    client: this.order.client,
    saleConditions: this.order.saleConditions,
    orderCategory: this.order.orderCategory,
    paymentMethod: this.order.paymentMethod,
    deliveryAddress: this.order.deliveryAddress,
    billingAddress: this.order.billingAddress};
        this.orderService.createOrder(ch).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: ' votre order a été créé avec succès',
            life: 3000,
          });
          this.getAllordere();
          this.ngOnInit();
          this.orderDialog = false;
        });
        
      }
    }
  }