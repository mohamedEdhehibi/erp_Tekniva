import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/shared/api/product';
import { Machine } from 'src/app/shared/models/machine';
import { User } from 'src/app/shared/models/user';
import { FamillesMachineService } from 'src/app/shared/service/familleMachine.service';
import { MachineService } from 'src/app/shared/service/machine.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { TypeService } from 'src/app/shared/service/type.service';
import {Type}from 'src/app/shared/models/type'
import { TypeMachineService } from 'src/app/shared/service/type-machine.service';

@Component({
    selector: 'app-liste-machines',
    templateUrl: './liste-machines.component.html',
    styleUrls: ['./liste-machines.component.scss'],

})
export class ListeMachinesComponent implements OnInit {

    filtered: string = ''
    machineDialog: boolean = false;
    originalMachines: any[] = [];
    originalTypes: any[] = [];
    filteredMachines!: any[]
    filteredTypes!: any[]
    deleteMachineDialog: boolean = false;

    deleteMachinesDialog: boolean = false;
    user!: any
    machines: any[] = [];
    machine  : Machine={
        designation: '',         
    code: '',
    barcode: 0,
    nSerie:0,
    purchaseDate:'',
    price:0,
    supplier:'',
    photo:'',
    machineFamily: '',
  chaine_machine: [],
  machine_type: []
    };
    selectedMachines: Machine[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    selectedType:any

    rowsPerPageOptions = [5, 10, 20];
    u: any;
    edit=false;
    familles:any=[];
    types:any[]=[]
    allType!:Type[]
    breadcrumbItems: MenuItem[] = [];

    constructor(private machineService: MachineService, 
        private messageService: MessageService,
         private confirmationService: ConfirmationService ,
         private famille:FamillesMachineService,
         private typeMachineService:TypeMachineService,
         private typeService:TypeService) { }

    ngOnInit() {
        this.getAllMachine()
        this.getAllFamille()
        this.getAllType()
        this.breadcrumbItems = [
            { label: 'List des Machines ', routerLink: '/machine' },
            { label: 'Famille des machines ', routerLink: '/machine/famille' }
          
        ];
        // this.machineService.getAllFakeMachine().then(data => this.machines = data);
        // this.cols = [
        //     { field: 'chaine', header: 'chaine' },
        //     { field: 'price', header: 'Price' },
        //     { field: 'category', header: 'Category' },
        //     { field: 'rating', header: 'Reviews' },
        //     { field: 'inventoryStatus', header: 'Status' }
        // ];

        // this.statuses = [
        //     { label: 'Tournage', value: 'tournage' },
        //     { label: 'Fraisage', value: 'fraisage' },
        //     { label: 'Pliage', value: 'pliage' }
        // ];
    }
    getAllMachine(){
    this.machineService.getAllMachine().subscribe(data=>{this.machines=data, console.log('data',data);
    }) 
    }
    openNew() {
        this.machine = { ...this.machine };

        this.submitted = false;
        this.machineDialog = true;
        this.machine={
            designation: '',
                
        code: '',
        barcode: 0,
        nSerie:0,
        purchaseDate:'',
        price:0,
        supplier:'',
        photo:'',
   
        machineFamily: '',
      chaine_machine: [],
      machine_type: []
        };
    }
    deleteSelectedMachine() {
        this.deleteMachineDialog = true;
    }
    editMachine(machine: Machine) {
        this.machine = { ...machine };
        this.machineDialog = true;
        this.edit=true;
    }

    deleteMachine(mach: Machine) {
        this.deleteMachinesDialog = true;
        this.machine = { ...mach };
    }
    confirmDeleteSelected() {
        this.deleteMachineDialog = false;
        console.log(this.machines);
        console.log(this.selectedMachines);
        
       
        this.machines = this.machines.filter(val => !this.selectedMachines.includes(val));
        this.selectedMachines.forEach(element => {
            this.machineService.deleteMachine(element.id+'').subscribe(data=>{console.log("deleted");
            })
        });
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'machines Supprimés', life: 3000 });
        
        this.selectedMachines = [];
    }
    confirmDeleteF() {
    this.deleteMachinesDialog = false; 
    this.machines = this.machines.filter(val => val.idMachine !== this.machine.id);
    this.machineService.deleteMachine(this.machine.id+'').subscribe(data=>{console.log("deleted")
       this.getAllMachine()})
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'machine a été supprimé', life: 3000 });
      } 
    hideDialog() {
        this.machineDialog = false;
        this.submitted = false;
    //     this.machine={
    //         designation: '',
    //         id:'',           
    //     code: '',
    //     barcode: 0,
    //     nSerie:0,
    //     purchaseDate:'',
    //     price:0,
    //     supplier:'',
    //     photo:'',
    //     createdBy:'',
    //     createAt:'',
    //     isActive:'',
    //     updateAt:'',
    //     machineFamily: '',
    //   chaine_machine: '1',
    //   machine_type: '1'
    //     };
    } 
    saveMachine() {
        this.submitted = true;
       //console.log("save",this.machine);
       if (!this.machine.designation || !this.machine.code) {
        return;
      }
      else{
        if (!this.edit) {
           //console.log("dataaaaa",this.machine);
           
            this.machineService.AddMachine(this.machine).subscribe(data=>{
                //console.log("data created",data);
                this.machine.machine_type.forEach(element => {
                    
                    this.typeMachineService.AddTypeMachine({machine:data.id,type:element}).subscribe(data=>{console.log("typa machine",data);
                    })
                });
            this.getAllMachine()
         })
            
        }else{
            this.updateMachine(this.machine.id)

        }
        this.machineDialog = false
    }
    //     if (!this.machine.designation) {
    //       return;
    //     }
    
    //     if (this.machine.idMachine) {
    //       this.machines[this.findIndexById(this.machine.idMachine)] = this.machine;
    //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'machine a été modifié', life: 3000 });
    //     } else {
    //       this.machine.idMachine = Number(this.createId());
    //       this.machine.createAt=new Date()
    //       this.machine.createdBy=this.u.fullName
    //       this.machines.push(this.machine);
    //       console.log('aaaaaa',this.machine.createdAt);
          
    //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'machine a été créer', life: 3000 });
    //     }
       
         this.machines = [...this.machines];
         
      
    
      }
     
    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.machines.length; i++) {
          if (this.machines[i].idMachine === id) {
            index = i;
            break;
          }
        }
        console.log("test",)
        
        return id;
    }
    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    filter() {
        if (!this.filtered) {
            this.machines = [...this.originalMachines];
        } else {
            this.filteredMachines = this.originalMachines.filter((a: any) => {
                return Object.values(a).some((val: any) => {
                    if (val instanceof Date) {
                        return val.toLocaleDateString().toLowerCase().includes(this.filtered.toLowerCase());
                    } else {val
                        return val.toString().toLowerCase().includes(this.filtered.toLowerCase());
                    }
                });
            });
            this.machines = [...this.filteredMachines];
        }
    }
    getAllFamille(){
      this.famille.getAllfamille().subscribe(data=>{this.familles=data, console.log('famille',this.familles);
    //    this.statuses = [
    //         { code: 'Tournage', value: 'tournage' },
    //     ];
})
    }
    updateMachine(id:any){
        this.machineService.updateMachine(this.machine,id).subscribe(data=>{console.log("update",data);
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'chaine Updated', life: 3000 });
        this.getAllMachine()
        })
      
    }
    getAllType(){
        
        this.typeService.getAllType().subscribe(data=>{this.allType=data
            // console.log(this.allType.);
            
        })
    }
    onChange(event:any){
       
           
            
        // if (event.key) {
            
        // }
        // if(this.types.length !== 0){
        // this.types = [...this.originalTypes];
        // } else {
        //     this.filteredTypes = this.originalTypes.filter((a: any) => {
        //         return Object.values(a).some((val: any) => {
        //             if (val instanceof Date) {
        //                 return val.toLocaleDateString().toLowerCase().includes(event.key.toLowerCase());
        //             } else {val
        //                 return val.toString().toLowerCase().includes(event.key.toLowerCase());
        //             }
        //         });
        //     });
        //     this.types = [...this.filteredTypes];
        // }
    }

}
