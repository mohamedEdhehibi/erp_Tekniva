import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/models/Employee';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { Chaine } from 'src/app/shared/models/chaine';
import { ChaineService } from 'src/app/shared/service/chaine.service';
import { Speciality } from 'src/app/shared/models/speciality';
import { SpecialiteService } from 'src/app/shared/service/speciality.service';
import { Training } from 'src/app/shared/models/training';
import { TrainingService } from 'src/app/shared/service/training.service';
import { Job } from 'src/app/shared/models/Employee-job';
import { JobService } from 'src/app/shared/service/job.service';
import { Document } from 'src/app/shared/models/document';
import { DocumentService } from 'src/app/shared/service/document.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-nouveau-employe',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  employee: Employee = {
    lastName: '',
    firstName: '',
    birthDate: '',
    registrationNumber: '',
    hireDate: '',
    gender: '',
    phone: '',
    address: '',
    typeContrart: '',
    photo: '',
    speed: 0,
    salaryType: '',
    salary: 0,
    childrenNumber: 0,
    familySituation: '',
    cin: '',
    cnss: '',
    passport: '',
    bank: '',
    rib: '',
    state: '',
    status: '',
    job: '',
    user: '',
    specialities: [],
    chaines: [],
  };

  msg = '';

  chaine:Chaine[]=[{
   
    designation: "",
    code: 0,
    barCode: 0,
    type: "",
    qualityGoal: "",
    performanceGoal: "",
    availabilityDate: "",
    createdBy: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    groupeChaine: 0,
    chaine_machine: [],
    employee_chaine:[],
    workshop: 0,
    posteCle: 0,
  }]

  selectedChaine: any[] = [];
  job: Job = {
    designation: '',
    description: '',
  };
  selectedJob: any[] = [];
  specialities: Speciality[] = [
    {
      speciality: '',
      employees: [],
    },
  ];
  SpecialiteSelect: any[] = [];

  trainingg: Training = {
    training: '',
    date: '',
    employees: [],
  };

  selectedTraining: any[] = [];
  document: Document = {
    nameDocument: '',
    endDate: '',
    motif: '',
    type: '',
    state: '',
    attachement: '',
    employee: [],
  };
  documents: [] = [];
  user: User = {
    email: '',
    password: '',
    login: '',
  };
  ch: string = '';
  selectedDocument: any[] = [];
  selectedUser: any[] = [];
  deleteEmployeeDialog: boolean = false;
  id!: string;
  submitted: boolean = false;
  employes: Employee[] = [];
  genres = ['male', 'female'];
  contrats = ['cdd', 'cdi'];
  salarys = ['montiel', 'employee'];
  familys = ['single', 'married', 'divorced'];
  statuus = ['active', 'inactive', 'leave'];
  uploadedFiles = [''];
  edit = false;
  constructor(
    private EmployesService: EmployésService,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private _chaineService: ChaineService,
    private _specieliteService: SpecialiteService,
    private _trainingService: TrainingService,
    private _jobService: JobService,
    private _documentService: DocumentService,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.msg = "Editer l'employé";
    } else {
      this.msg = 'Ajouter un nouveau employé';
    }
    this.getemployeebyid();
    this.getAllEmployees();
    this.getChaine();
    this.getSpeciality();
    this.getTraining();
    this.getJob();
  
  }
  ///////////////////// CREATE NEW EMPLOYEE AND UPDATE /////////////////////
  createEmployee() {

    if (this.id) { 
      this.EmployesService.UpdateEmployee(this.id, this.employee).subscribe(
        (data) => {
          
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'employé a été modifié avec sucée',
            life: 3000,
          });
          console.log(data);
        }
      );
    } else {
      this.msg = 'ajouter un nouveau employé';

      console.log(this.employee.chaines);
      this.EmployesService.createEmploye(this.employee).subscribe((data) => {
        //        this.trainingg.employees= data.id;
        // console.log("training ",this.trainingg);

        //           this._trainingService.createTraining(this.trainingg).subscribe((data) =>{
        //           })
        //this._trainingService.UpdateTraining(this.employee.trainings,this.trainingg.date).subscribe()
         this.document.employee = data.id;
        this._documentService.createDocument(this.document).subscribe((data) => {
          console.log(data);
          
        });

        // this._documentService.createDocument(this.document).subscribe((data)=>{

        // })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'employé a été crée',
          life: 3000,
        });
        console.log('employé:', this.employee);
      });
    }

    this.router.navigateByUrl('/employé');
  }
  /////////////////////////////// GET EMPLOYEE BY ID ////////////
  getemployeebyid() {
    this.EmployesService.getEmployeeByID(this.id).subscribe((data) => {
      this.employee = data;
    });
  }

  ////////////////// GET ALL EMPLOYEES ///////////
  getAllEmployees() {
    this.EmployesService.getAllEmployees().subscribe((data) => {
      this.employes = data;
    });
  }

  ////////////// GET CHAINE PAR EMPLOYEE /////////
  getChaine() {
    this._chaineService.getChaines().subscribe((data) => {
      this.chaine = data;
      this.selectedChaine = this.chaine.map((x) => {
        console.log({ label: x.designation, value: x.id });

        return { label: x.designation, value: x.id };
      });
    });
  }
  ///////// GET SPECIALITY //////////////
  getSpeciality() {
    this._specieliteService.getAllSpeciality().subscribe((data) => {
      this.specialities = data;

      this.SpecialiteSelect = this.specialities.map((r) => {
        return { label: r.speciality, value: r.id };
      });
    });
  }
  ////////////////GET TRAINING /////////////
  getTraining() {
    this._trainingService.getAllTraining().subscribe((data) => {
      console.log(data);

      this.selectedTraining = data.map((r) => {
        return { label: r.training, value: r.id };
      });
    });
  }
  getJob() {
    this._jobService.getAllJob().subscribe((data) => {
      console.log(data);

      this.selectedJob = data.map((r) => {
        return { label: r.designation, value: r.id };
      });
    });
  }
  //////////// UPLOAD FILE //////////
  onUploadFile(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  ///////// CREATE DOCUMENT /////////
  createDocument() {
    
    if (this.edit) {
      this.editDocument(this.document);
    } else {
       this.document.employee=[8]
      this._documentService.createDocument(this.document).subscribe((data) => {
        console.log('document:', data);

       
      });
    }
  }


  ///////////////////// EDIT DOCUMENT /////////////
  editDocument(t: any) {
    this._documentService.UpdateDocument(this.id, t).subscribe((data) => {
      // this.getAllTraining()
    });
  }
}
