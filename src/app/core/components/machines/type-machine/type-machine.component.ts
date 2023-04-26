import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Type } from 'src/app/shared/models/type';
import { TypeService } from 'src/app/shared/service/type.service';

@Component({
  selector: 'app-type-machine',
  templateUrl: './type-machine.component.html',
  styleUrls: ['./type-machine.component.scss']
})
export class TypeMachineComponent implements OnInit{
  constructor(private typeSercie:TypeService, private messageService: MessageService){}
  types:Type[]=[]
  filtered: string = ''
  typeDialog: boolean = false;
  originalMachines: any[] = [];
  filteredType!: any[]
  deleteTypeDialog: boolean = false;
  type:Type={typeMachine:'',machine_type:[]}
  submitted: boolean = false;
  edit: boolean = false;
  selectedType: any[] = [];
  one=false


  ngOnInit(){

    this.getAllType();
    
  }
  //// get All Type ///////
  getAllType(){
    this.typeSercie.getAllType().subscribe(data=>{this.types=data,console.log(data);
    })
  }


  openNew() {
    this.type={typeMachine:'',machine_type:[]}
    this.type = { ...this.type };
    this.submitted = false;
    this.typeDialog = true;
}

// deleteSelectedTypes() {
   
//     this.deleteTypeDialog = true;
// }

editType(type: Type) {
    this.type = { ...type };
    this.typeDialog = true;
    this.edit=true
    
}

// deleteType(mach: Type) {
//     this.deleteTypeDialog = false;
//     this.type = { ...mach };
// }

deleteSelectedType() {
    this.deleteTypeDialog = true;
    this.one=false

}
// confirmDeleteSelected() {
//     this.deleteTypeDialog = false;
//     this.types = this.types.filter(val => !this.selectedType.includes(val));
//     console.log('testtt',this.selectedType);
    
//     this.selectedType.forEach(element => {
//         this.typeSercie.deleteType (element.id).subscribe(data=>{console.log("deleted");
//     this.getAllType()
//         })
//     });
//     this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'les Types ', life: 3000 });
//     this.selectedType = [];
// }

// confirmDeleteF() {
//     this.deleteTypeDialog = false;
//     this.types = this.types.filter(val => val.id !== this.type.id);
//     this.typeSercie.deleteType(this.type.id+'').subscribe(data=>{console.log("deleted"), this.getAllType()})
   
//     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'aaaaaaaaaaaaa', life: 3000 });
  
//   } 
// confirmDelete() {
//     this.deleteTypeDialog = false;
//     this.types = this.types.filter(val => val.id !== this.type.id);
//     this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Types Supprimé', life: 3000 });
//     this.types = { ...this.types };
    
// }
deleteType(typ: Type) {
  this.deleteTypeDialog = true;
  this.one=true
  this.type = { ...typ };
}
confirmDeleteSelected() {
  this.deleteTypeDialog = false;
  console.log(this.types);
  console.log(this.selectedType);
  
 
  this.types = this.types.filter(val => !this.selectedType.includes(val));
  this.selectedType.forEach(element => {
      this.typeSercie.deleteType(element.id+'').subscribe(data=>{console.log("deleted");
      })
  });
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Types Supprimés', life: 3000 });
  
  this.selectedType = [];
}
confirmDeleteF() {
this.deleteTypeDialog = false; 
this.types = this.types.filter(val => val.id !== this.type.id);
this.typeSercie.deleteType(this.type.id+'').subscribe(data=>{console.log("deleted")
 this.getAllType()})
this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Type a été supprimé', life: 3000 });
} 


hideDialog() {
    this.typeDialog = false;
    this.submitted = false;
    this.type={typeMachine:'',machine_type:[]}
}

 saveType() {

     this.submitted = true;
     if (!this.type.typeMachine) {
        return;
      }
      else{
      if(this.edit){
        
          this.updateType(this.type,this.type.id)
      }
      else{
        this.typeSercie.AddType (this.type).subscribe(data=>{console.log("created",data);
        this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Type crée', life: 3000 });
        this.getAllType()
        })
      }
      this.typeDialog=false

    }
  }
  //////////filter /////////////
  filter() {
    if (!this.filtered) {
        this.types = [...this.originalMachines];
    } else {
        this.filteredType = this.originalMachines.filter((a: any) => {
            return Object.values(a).some((val: any) => {
                if (val instanceof Date) {
                    return val.toLocaleDateString().toLowerCase().includes(this.filtered.toLowerCase());
                } else {
                    return val.toString().toLowerCase().includes(this.filtered.toLowerCase());
                }
            });
        });
        this.types = [...this.filteredType];
    }
}
updateType(type:Type,id:any){
  this.typeSercie.updateType(type,id).subscribe(data=>{
        this.getAllType()
  })
}

}

