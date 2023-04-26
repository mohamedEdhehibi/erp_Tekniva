import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeliveryAddress } from 'src/app/shared/models/deliveryAddress';
import { Order } from 'src/app/shared/models/order';
import { DeliveryAddressService } from 'src/app/shared/service/delivery-address.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  filtered:string=''
  deliveryAddressDialog: boolean = false;
  originaldeliveryAddresss:any[] = [];  
  filtereddeliveryAddresss!:any[]
  deletedeliveryAddressDialog: boolean = false;
  deletedeliveryAddresssDialog: boolean = false;
  deliveryAddresss: DeliveryAddress[] = [];
  
  deliveryAddress: DeliveryAddress = {
   id:"",
  address: "",
  order:[],
      }
    orders:Order[]=[] 
   order!:any[]
  selecteddeliveryAddresss: DeliveryAddress[] = [];
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
 
  
    constructor(private deliveryAddressService: DeliveryAddressService , 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private serviceorder :OrderService
   
      ) { }

  ngOnInit() {
     this.getAlldiliveryAderss()
      this.getallOrder();
      
      
  } 
  getAlldiliveryAderss(){
    this.deliveryAddressService.getAlldelivery_address().subscribe(data=>{this.deliveryAddresss=data });
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
    this.deliveryAddress={id:"",
    address: "",
    order:[],}
          
      this.submitted = false;
      this.deliveryAddressDialog = true;
  }

  deleteSelecteddeliveryAddresss() {
      this.deletedeliveryAddresssDialog = true;
  }

  editdeliveryAddress(id:string  ) {
    this.idSelected = id
    this.deliveryAddressService.getdelivery_addressByID(id).subscribe(data=>{this.deliveryAddress=data})
  
      this.deliveryAddressDialog = true;
  }

  deletedeliveryAddress(id:string) {
      this.deletedeliveryAddressDialog = true;
      this.id=id
  }

  confirmDeleteSelected() {
      this.deletedeliveryAddresssDialog = false;
      this.deliveryAddressService.deletedelivery_address(this.id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'l\'address de vente  a été supprimé', life: 3000 }); this.getAlldiliveryAderss() })

  }

  confirmDelete() {
      this.deletedeliveryAddressDialog = false;
      this.deliveryAddressService.deletedelivery_address(this.id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'l\'address de vente  a été supprimé', life: 3000 }); this.getAlldiliveryAderss() })
     
  }

  hideDialog() {
      this.deliveryAddressDialog = false;
      this.submitted = false;
      this.deliveryAddress={id:"",
      address: "",
      order:[],}
  }

  savedeliveryAddress() {
    this.submitted = true;
    if(this.idSelected){
      let gc={address: this.deliveryAddress.address,
        order: this.deliveryAddress.order,
     }

   
     
    this.deliveryAddressService.Updatedelivery_address(this.idSelected, gc).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'l\'address a été modifié', life: 3000 });  this.deliveryAddressDialog = false;  this.getAlldiliveryAderss(); })
  
     
        } else {
          
        let ch={address: this.deliveryAddress.address,
            order: this.deliveryAddress.order,
         }
           
              this.deliveryAddressService.createdelivery_address(ch).subscribe((res)=> {console.log(res)
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'votre address a été créé avec succès', life: 3000 });  this.deliveryAddressDialog = false;  this.getAlldiliveryAderss(); })
             
    }
    
  }
}
