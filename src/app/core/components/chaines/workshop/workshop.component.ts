import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Filiere } from 'src/app/shared/models/filiere';
import { Workshop } from 'src/app/shared/models/workshop';
import { FiliereService } from 'src/app/shared/service/filiere.service';

import { WorkshopService } from 'src/app/shared/service/workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  workshop:Workshop ={
    id:0,
    codeWorkshop:"",
    designation:"",
    createdBy:"",
    idActive:false,
    createdAt:"",
    UpdateAt:"",
    filiere:0,
  }
  workshopDialog: boolean = false;

  deleteworkshopDialog: boolean = false;

  deleteworkshopsDialog: boolean = false;

  workshops: Workshop[] = [];

  filiere:any[]=[];
 
  selectedworkshops: Workshop[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalworkshops: any[] = [];
  filteredworkshops!: any[];
  id!: string;
  fil!: Filiere[];
  
  constructor(
    private workshopService: WorkshopService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _servicesFiliere: FiliereService
  ) {}

  ngOnInit() {
    this.getAllGroupChaine();
    this.getallFiliere();
  }

  getallFiliere(){
    this._servicesFiliere.getfilieres().subscribe(data=>{
        this.fil=data
        console.log(this.fil);
        
   
     this.filiere=this.fil.map((fi)=>{
      console.log(fi);
      
       return{label: fi.designation,value:fi.id}
    })
    })
}

  getAllGroupChaine() {
    this.workshopService.getworkshops().subscribe(
      (data) => {
        this.workshops = data;
   
      
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.workshop = { ...this.workshop };
    this.submitted = false;
    this.workshopDialog = true;
  }

  deleteSelectedworkshops() {
    this.deleteworkshopsDialog = true;
  }
  editworkshop(id: string) {
    this.idSelected = id

  this.workshopService.getworkshopByID(id).subscribe(data=>{this.workshop=data})
  
    this.workshopDialog = true;

  }


  deleteworkshop(id: string) {
    this.deleteworkshopDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deleteworkshopsDialog = false;
    this.workshopService.deleteworkshop(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllGroupChaine() })
    this.selectedworkshops = [];
  }

  confirmDelete() {
    this.deleteworkshopDialog = false;
    this.workshopService.deleteworkshop(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllGroupChaine() })
    this.workshop = { ...this.workshop };
  }

  hideDialog() {
    this.workshopDialog = false;
    this.submitted = false;
  }

  saveworkshop() {
    this.submitted = true;
    console.log();
    
    if(this.idSelected){
      let com={designation:this.workshop.designation,codeWorkshop:this.workshop.codeWorkshop,filiere:this.workshop.filiere}
    this.workshopService.Updateworkshop(this.idSelected, com).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur a été modifié', life: 3000 }); this.getAllGroupChaine(); this.workshopDialog  = false; })
        this.workshopDialog = false;
      } else {
        //   this.workshop.image = 'workshop-placeholder.svg';
        // @ts-ignore
        // this.workshop.inventoryStatus = this.workshop.inventoryStatus ? this.workshop.inventoryStatus.value : 'INSTOCK';
        this.workshops.push(this.workshop);

        this.workshops = [...this.workshops];

        this.workshopDialog = false;
        this.workshop = { ...this.workshop };
      
        let com={designation:this.workshop.designation,codeWorkshop:this.workshop.codeWorkshop,filiere:this.workshop.filiere}
       
       
        this.workshopService.createworkshop(com).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'workshop Created',
            life: 3000,
          });
          this.getAllGroupChaine();
        });
        
      }
    }
  }