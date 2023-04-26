import { Component,OnInit } from '@angular/core';
import { removeElement } from '@fullcalendar/core/internal';
import { type } from 'os';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { delayWhen, find, findIndex, firstValueFrom, lastValueFrom } from 'rxjs';
import { Product } from 'src/app/shared/api/product';
import { FamilleMachine } from 'src/app/shared/models/familleMachine';
import { FamillesMachineService } from 'src/app/shared/service/familleMachine.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-famille-machines',
  templateUrl: './famille-machines.component.html',
  styleUrls: ['./famille-machines.component.scss']
})
export class FamilleMachinesComponent  implements OnInit {

    filtered: string = ''
    machineDialog: boolean = false;
    originalMachines: any[] = [];
    filteredMachines!: any[]
    deleteMachineDialog: boolean = false;

    deleteMachinesDialog: boolean = false;
    user!: any
    machines: FamilleMachine[] = [];
    machine: FamilleMachine = {
        designation: '',
        id: 0,
        code: 0
    }

    selectedMachines: FamilleMachine[] = [];

    submitted: boolean = false;

    cols: any[] = [];
    
    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    edit=false;
    breadcrumbItems: MenuItem[] = [];

    constructor(private machineService: FamillesMachineService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
       this.getAllFamilleMachine()
       this.breadcrumbItems = [
        { label: 'List des Machines ', routerLink: '/machine' },
        { label: 'Famille des machines ', routerLink: '/machine/famille' }
      
    ];
        
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
    getAllFamilleMachine(){
      
        this.machineService.getAllfamille().subscribe(data => {this.machines = data
            console.log('all',this.machines);
            
    //    this.machines.forEach(element => {
    //     if (element.isActive === true) {
    //         //let a = "active"
    //         element.isActive="active"
    //     }else{
    //       element.isActive="InActive" 
    //     }
    //    });
    
    });
    }


    openNew() {
        this.machine={designation:'',code:0}
        this.machine = { ...this.machine };

        this.submitted = false;
        this.machineDialog = true;
    }

    deleteSelectedMachines() {
       
        this.deleteMachinesDialog = true;
    }

    editMachine(machine: FamilleMachine) {
        this.machine = { ...machine };
        this.machineDialog = true;
        this.edit=true
        
    }

    deleteMachine(mach: FamilleMachine) {
        this.deleteMachineDialog = true;
        this.machine = { ...mach };
    }
    
    deleteSelectedMachine() {
        this.deleteMachinesDialog = true;

    }
    confirmDeleteSelected() {
        this.deleteMachinesDialog = false;
        this.machines = this.machines.filter(val => !this.selectedMachines.includes(val));
        this.cols.forEach(element => {
            this.machineService.DeleteFamille(element).subscribe(data=>{console.log("deleted");
            })
        });
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Familles Supprimé', life: 3000 });
        this.selectedMachines = [];
    }
   
    confirmDeleteF() {
        this.deleteMachineDialog = false;
        this.machines = this.machines.filter(val => val.id !== this.machine.id);
        this.machineService.DeleteFamille(this.machine.id+'').subscribe(data=>{console.log("deleted")})
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'famille a été supprimé', life: 3000 });
      
      } 
    confirmDelete() {
        this.deleteMachineDialog = false;
        this.machines = this.machines.filter(val => val.id !== this.machine.id);
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Chaines Supprimé', life: 3000 });
        this.machines = { ...this.machines };
        
    }

    hideDialog() {
        this.machineDialog = false;
        this.submitted = false;
        this.machine={designation:'',code:0}
    }

     saveMachine() {

         this.submitted = true;
         if (!this.machine.designation || !this.machine.code) {
            return;
          }
          else{
          if(this.edit){
            console.log('edit',this.machine);
              this.updateFamille(this.machine.id)
          }
          else{
            this.machineService.AddFamille(this.machine).subscribe(data=>{console.log("created",data);
            this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'famille cree', life: 3000 });
            this.getAllFamilleMachine()
            })
          }
          this.machineDialog=false

        }
        
        
        // if (this.machine.designation?.trim()) {
        //     if (this.machine.id) {
        //         // @ts-ignore
        //         this.chaine.inventoryStatus = this.chaine.inventoryStatus.value ? this.chaine.inventoryStatus.value : this.chaine.inventoryStatus;
        //         this.machines[this.findIndexById(Number(this.machine.id))] = this.machine;
        //         this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'chaine Updated', life: 3000 });
        //         this.machineDialog = false
        //     } else {
               
        //         this.machine.id = Number(this.createId());
        //         this.machine.createAt = String(new Date());
        //         this.machine.createdBy = this.user.fullName
                 
        //         //   this.chaine.image = 'chaine-placeholder.svg';
        //         // @ts-ignore

        //         this.machines.push(this.machine);
        //         this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'chaine Created', life: 3000 });

        //     }

        //     this.machines = [...this.machines];
        //     this.machineDialog = false;
        //     this.machine = { ...this.machine };
        // }
        

    }
     i =0
     a=''
    findIndexById(id: any) {
        
        this.i++
        if(id.designation==='' && this.i === 1){
            this.machines.forEach(element=>{
                this.cols.push(element.id)
            })
          
        
        }else if(id.designation==='' && this.i === 2) {
            this.i=0
            this.cols=[]
        } else if(id.designation===undefined ) {
             this.i=0
            if (this.cols.includes(id) === false) {
               this.cols.push(JSON.parse(JSON.stringify(id)))
            } else  if (this.cols.includes(id) === true) {
               // console.log('ok33',this.cols.findIndex(x => x === id));
                   this.cols[this.cols.findIndex(x => x === id)]=''
              this.cols=this.cols.filter(x=> x !== '')
               
           }
        }
        this.cols=[...new Set(this.cols)]


        
        console.log('iddd',this.cols);
        
       // console.log('a',this.a,id);
        
        // let index = -1;
        // for (let i = 0; i < this.machines.length; i++) {
        //     if (this.machines[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        // return index;
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
                    } else {
                        return val.toString().toLowerCase().includes(this.filtered.toLowerCase());
                    }
                });
            });
            this.machines = [...this.filteredMachines];
        }
    }

    updateFamille(id:any){
        this.machineService.updateFamille(this.machine,id).subscribe(data=>{console.log("update",data);
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'chaine Updated', life: 3000 });
        this.getAllFamilleMachine()
        })
        this.machine={designation:'',code:0}
    }

}