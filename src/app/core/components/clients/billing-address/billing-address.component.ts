import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BillingAddress } from 'src/app/shared/models/billingAddress';
import { Order } from 'src/app/shared/models/order';

import { BillingAddressService } from 'src/app/shared/service/billing-address.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {
  filtered:string=''
  billingAddressDialog: boolean = false;
  originalbillingAddresss:any[] = [];  
  filteredbillingAddresss!:any[]
  deletebillingAddressDialog: boolean = false;
  deletebillingAddresssDialog: boolean = false;
  billingAddresss: BillingAddress[] = [];
  
  billingAddress: BillingAddress = { id:"",

  address: "",
  order:[],
      }
  orders:Order[]=[] 
   order!:any[]
  selectedbillingAddresss: BillingAddress[] = [];
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
  
    constructor(private billingAddressService: BillingAddressService , 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private serviceorder :OrderService
   
      ) { }

  ngOnInit() {
     this.getAllBillingAderss()
      this.getallOrder();
      
      
  } 
  getAllBillingAderss(){
    this.billingAddressService.getAllbilling_address().subscribe(data=>{this.billingAddresss=data });
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
    this.billingAddress={
      id:"",
      address: "",
      order:[],}
          
      this.submitted = false;
      this.billingAddressDialog = true;
  }

  deleteSelectedbillingAddresss() {
      this.deletebillingAddresssDialog = true;
  }

  editbillingAddress(id:string ) {
    this.idSelected = id
    this.billingAddressService.getbilling_addressByID(id).subscribe(data=>{this.billingAddress=data

  })

    this.billingAddressDialog = true;
  }

  deletebillingAddress(id:string) {
      this.deletebillingAddressDialog = true;
      this.id = id;
  }

  confirmDeleteSelected() {
      this.deletebillingAddresssDialog = false;
      this.billingAddressService.deletebilling_address(this.id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'l\'address de facturation  a été supprimé', life: 3000 }); this.getAllBillingAderss() })
      this.selectedbillingAddresss = [];
  }

  confirmDelete() {
      this.deletebillingAddressDialog = false;
      this.billingAddressService.deletebilling_address(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllBillingAderss() })
      this.billingAddress = {...this.billingAddress};
  }

  hideDialog() {
      this.billingAddressDialog = false;
      this.submitted = false;
     
  }

  savebillingAddress() {
      this.submitted = true;
      if(this.idSelected){
        let gc={address: this.billingAddress.address,
          order: this.billingAddress.order,
       }
     
       
      this.billingAddressService.Updatebilling_address(this.idSelected, gc).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'l\'address a été modifié', life: 3000 });  this.billingAddressDialog = false;  this.getAllBillingAderss(); })
       
        this.billingAddressDialog = false;
          } else {
            
          let ch={address: this.billingAddress.address,
              order: this.billingAddress.order,
           }
             
                this.billingAddressService.createbilling_address(ch).subscribe((res)=> {console.log(res)
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'votre address a été créé avec succès', life: 3000 });  this.billingAddressDialog = false;  this.getAllBillingAderss(); })
                this.billingAddressDialog = false;
         
      }
    
    }
  }