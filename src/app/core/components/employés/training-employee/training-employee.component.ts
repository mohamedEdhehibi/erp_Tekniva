import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Training } from 'src/app/shared/models/training';
import { TrainingService } from 'src/app/shared/service/training.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Employee} from 'src/app/shared/models/Employee';
import { EmployésService } from 'src/app/shared/service/employee.service';


@Component({
  selector: 'app-training-employee',
  templateUrl: './training-employee.component.html',
  styleUrls: ['./training-employee.component.scss'],
})
export class TrainingEmployeeComponent implements OnInit {
  trainingDialog: boolean = false;

  deleteTrainingDialog: boolean = false;

  deleteTrainingsDialog: boolean = false;

  trainings: Training[] = [];
  idSelected: string = '';
  training: Training = {
    training: '',
    date: '',
    employees: [] ,
  };
  edit=false
  selectedTrainings: Training[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  id!: string;
  filtered: string = '';
  originalTrainings: any[] = [];
  filteredTrainings!: any[];
  
  
  constructor(
    private trainingService: TrainingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService:EmployésService
  ) {}

  ngOnInit() {
    this.getAllTraining();
  }

  ////////////////////// CREATE NEW TRAINIG //////////////////
  createTraining() {
    if(this.edit){
      this.editTraining(this.training)
    }else {
      this.training.employees =[]
   
      this.trainingService.createTraining(this.training).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'la formation a été crée',
          life: 3000,
        });
        this.getAllTraining();
       this. trainingDialog = false
        console.log('training:', this.training);
      });
    }
   

   
  }

  ///////// OPEN POPUP ////////
  openNew() {
    this.submitted = false;
    this.trainingDialog = true;
  }

  deleteSelectedTrainings() {
    this.deleteTrainingsDialog = true;
  }

  ///////////////////// EDIT TRAINING /////////////
  editTraining(t : any) {
    this.trainingDialog = true;
    console.log('aaaaaaaa',t,t.id);
    
    this.trainingService.UpdateTraining(this.id, t).subscribe((data) => {
   
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'la formation a été modifiée avec sucée',
          life: 3000,
        });
          this.getAllTraining()
      });
  
      this.trainingDialog = false
  }

  //////////// CONFIRM DELETE SELECTED TRAINING /////////
 

  /////////////// CONFIRM DELETE TRAINING //////////////
 



  hideDialog() {
    this.trainingDialog = false;
    this.submitted = false;
  }

  ///////////// GET ALL TARININGS //////////////
  getAllTraining() {
    this.trainingService.getAllTraining().subscribe((data) => {
      this.trainings = data;
      console.log("msg:",this.trainings);
  
      
    });
  }

  

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // onGlobalFilter(table: Table, event: Event) {
  //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }

  /////////////////// FILTERED ////////
  filter() {
    if (!this.filtered) {
      this.trainings = [...this.originalTrainings];
    } else {
      this.filteredTrainings = this.originalTrainings.filter((a: any) => {
        return Object.values(a).some((val: any) => {
          if (val instanceof Date) {
            return val
              .toLocaleDateString()
              .toLowerCase()
              .includes(this.filtered.toLowerCase());
          } else {
            return val
              .toString()
              .toLowerCase()
              .includes(this.filtered.toLowerCase());
          }
        });
      });
      this.trainings = [...this.filteredTrainings];
    }
  } 
  
  getTrainingbyid(id:string) {this.edit=true
   this.trainingDialog= true;
   this.id=id
    this.trainingService.getTrainingByID(this.id).subscribe((data) => {
      console.log(data);
      this.training = data;
    });
  }

  deleteTraining(id: string) {
    this.idSelected = id
    this.deleteTrainingDialog = true;
  }
  confirmDelete() {
    this.deleteTrainingDialog = false;
    this.trainingService.deleteTraining(this.idSelected ).subscribe(data=>{    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });this.getAllTraining()})
  }
  confirmDeleteSelected() {
   
    this.trainings = this.trainings.filter(val => !this.selectedTrainings.includes(val));
    this.selectedTrainings.forEach((element) => {
      console.log(element.id );
      this.trainingService.deleteTraining(String(element.id) ).subscribe(data=>{
      
      })
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'les formations ont été supprimés ', life: 3000 });
    this.deleteTrainingsDialog = false;
    this.selectedTrainings = [];
  }



}
