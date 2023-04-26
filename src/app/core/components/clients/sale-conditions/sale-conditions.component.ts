import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Order } from 'src/app/shared/models/order';
import { SaleConditions } from 'src/app/shared/models/saleConditions';
import { OrderService } from 'src/app/shared/service/order.service';
import { SaleConditionsService } from 'src/app/shared/service/sale-conditions.service';

@Component({
  selector: 'app-sale-conditions',
  templateUrl: './sale-conditions.component.html',
  styleUrls: ['./sale-conditions.component.scss']
})
export class SaleConditionsComponent implements OnInit {
  filtered:string=''
  saleConditionsDialog: boolean = false;
  originalsaleConditionss:any[] = [];  
  filteredsaleConditionss!:any[]
  deletesaleConditionsDialog: boolean = false;
  deletesaleConditionssDialog: boolean = false;
  saleConditionss: SaleConditions[] = [];
  
  saleConditions: SaleConditions = { 
    id:"",
    designation: "",
    order:[],
      }
    orders:Order[]=[] 
   order!:any[]
  selectedsaleConditionss: SaleConditions[] = [];
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
 
  
    constructor(private saleConditionsService: SaleConditionsService , 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private serviceorder :OrderService
   
      ) { }

  ngOnInit() {
     this.getAllsaleConditions()
      this.getallOrder();
      
      
  } 
  getAllsaleConditions(){
    this.saleConditionsService.getAllsale_conditions().subscribe(data=>{this.saleConditionss=data });
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
    this.saleConditions={id:"",
    designation: "",
    order:[],}
          
      this.submitted = false;
      this.saleConditionsDialog = true;
  }

  editsaleConditions(id: string) {
    this.idSelected = id;
    this.saleConditionsService.getsale_conditionsByID(id).subscribe((data) => {
      this.saleConditions = data;
    });

    this.saleConditionsDialog = true;
  }
  deleteSelectedsaleConditionss(){
    // to do
  }
  deletesaleConditions(id: string) {
    this.deletesaleConditionsDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletesaleConditionssDialog = false;
    this.saleConditionsService.deletesale_conditions(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "état de vente  a été supprimé",
        life: 3000,
      });
      this.getAllsaleConditions();
    });
    this.selectedsaleConditionss = [];
  }

  confirmDelete() {
    this.deletesaleConditionsDialog = false;
    this.saleConditionsService.deletesale_conditions(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "état de vente a été supprimé",
        life: 3000,
      });
      this.getAllsaleConditions();
    });
    this.saleConditions = { ...this.saleConditions };
  }

  hideDialog() {
    this.saleConditionsDialog = false;
    this.submitted = false;
  }

  savesaleConditions() {
    this.submitted = true;
    if (this.idSelected) {
      let gc = {
        designation: this.saleConditions.designation,
        order: this.saleConditions.order,
      };


      this.saleConditionsService
        .Updatesale_conditions(this.idSelected, gc)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: "état de vente été modifié",
            life: 3000,
          });
          this.saleConditionsDialog = false;
          this.getAllsaleConditions();
        });

      this.saleConditionsDialog = false;
    } else {
      let ch = {
        designation: this.saleConditions.designation,
        order: this.saleConditions.order,
      };

      this.saleConditionsService.createsale_conditions(ch).subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'état de vente  a été créé avec succès',
          life: 3000,
        });
        this.saleConditionsDialog = false;
        this.getAllsaleConditions();
      });
      this.saleConditionsDialog = false;
    }
  }
}
