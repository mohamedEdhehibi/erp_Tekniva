import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Operation } from 'src/app/shared/models/methode/operation';
import { OperationService } from 'src/app/shared/service/methode/operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
  originalOperations!: any[];
  OperationDialog: boolean = false;
  deleteOperationDialog: boolean = false;
  deleteOperationsDialog: boolean = false;
  selectedOperation: Operation[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Operations: Operation[] = [];
  ope: Operation = {
    designation: '',
    code: '',
    temps: '',
    FamilyID: '',
    machineID: '',
    type: '',
    equipmentID: '',
    productElementID: '',
    departement:''
  }
 
  filtered: string = ''
  filteredOperations!: any[];
  u: any;
  machine: any[] = [];
  family: any[] = [];
  status: any[] = [];
  element: any[] = [];
  equipment: any[] = [];
  departement: any[] = [];



  constructor(private OperationService: OperationService, private messageService: MessageService) { }

  ngOnInit() {
    
    this.OperationService.getAllOperation()
      .then(data => {
        this.Operations = data;
        this.originalOperations = [...data];
      })
      .catch(error => console.error(error));

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  
    this.machine = [
      { label: 'Machine 1', value: 'Machine 1' },
      { label: 'Machine 2', value: 'Machine 2' },
      { label: 'Machine 3', value: 'Machine 3' }
    ];
    this.family = [
      { label: 'Famille 1', value: 'Famille 1' },
      { label: 'Famille 2', value: 'Famille 2' },
      { label: 'Famille 3', value: 'Famille 3' }
    ];
    this.equipment = [
      { label: 'Equipment 1', value: 'Equipment 1' },
      { label: 'Equipment 2', value: 'Equipment 2' },
      { label: 'Equipment 3', value: 'Equipment 3' }
    ];
    this.element = [
      { label: 'Element 1', value: 'Element 1' },
      { label: 'Element 2', value: 'Element 2' },
      { label: 'Element 3', value: 'Element 3' }
    ];
    this.status = [
      { label: 'avec', value: 'instock' },
      { label: 'sans', value: 'lowstock' },
    ];
    this.departement = [
      { label: 'Direction', value: 'Direction' },
      { label: 'Production', value: 'Production' },
      { label: 'Magasin', value: 'Magasin' },
    ];
  }

  openNew() {
    this.ope = {
      designation: '',
      code: '',
      temps: '',
      FamilyID: '',
      machineID: '',
      type: '',
      equipmentID: '',
      productElementID: '',
      departement:''
    }
    this.submitted = false;
    this.OperationDialog = true;
  }

  deleteSelectedOperations() {
    this.deleteOperationsDialog = true;
  }

  editOperation(ope: Operation) {
    console.log(ope);

    this.ope = { ...ope };
    this.OperationDialog = true;
  }

  deleteOperation(ope: Operation) {
    this.deleteOperationDialog = true;
    this.ope = { ...ope };
  }

  confirmDeleteSelected() {
    this.Operations = this.Operations.filter(val => !this.selectedOperation.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Opération a été supprimé', life: 3000 });
    this.selectedOperation = [];
    this.deleteOperationsDialog = false;
  }

  confirmDelete() {
    this.deleteOperationDialog = false;
    this.Operations = this.Operations.filter(val => val.OperationID !== this.ope.OperationID);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Opération a été supprimé', life: 3000 });

  }

  hideDialog() {
    this.OperationDialog = false;
    this.submitted = false;
  }

  saveOperation() {
    this.submitted = true;

    if (!this.ope.designation) {
      return;
    }

    if (this.ope.OperationID) {
      this.Operations[this.findIndexById(this.ope.OperationID)] = this.ope;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Operation a été modifié', life: 3000 });
    } else {
      this.ope.OperationID = Number(this.createId())
    
      this.Operations.push(this.ope);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Operation a été créer', life: 3000 });
    }

    this.Operations = [...this.Operations];
    this.OperationDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.Operations.length; i++) {
      if (this.Operations[i].OperationID === id) {
        index = i;
        break;
      }
    }

    return index;
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
      this.Operations = [...this.originalOperations];
    } else {
      this.filteredOperations = this.originalOperations.filter(a => {
        return Object.values(a).some((val: any) => {
          if (val instanceof Date) {
            return val.toLocaleDateString().toLowerCase().includes(this.filtered.toLowerCase());
          } else {
            return val.toString().toLowerCase().includes(this.filtered.toLowerCase());
          }
        });
      });
      this.Operations = [...this.filteredOperations];
    }
  }


}
