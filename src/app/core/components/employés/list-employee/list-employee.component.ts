import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/Employee';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste-employe',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  filtered: string = '';
  employeeDialog: boolean = false;
  detailDialog: boolean = false;
  deleteEmployeeDialog: boolean = false;
  deleteEmployeesDialog: boolean = false;
  selectedEmployee: Employee[] = [];
  employes: Employee[] = [];
  employe: Employee = {
    id: '',
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
  };
  id: string = '';
  originalemployes: any[] = [];
  filteredemployes!: any[];
  selectedEmployes: Employee[] = [];
  submitted: boolean = false;
  rowsPerPageOptions = [5, 10, 20];
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private EmployesService: EmployésService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getAllEmployees();
    this.breadcrumbItems = [
      { label: 'List des employés ', routerLink: '/employé' },
      { label: 'nouveau employé ', routerLink: '/employé/nouveau' }
    
  ];
  }
  //////////////////////////////  DELETE EMPLOYEE     ///////////////////////////

  DeleteEmployee(id: string) {
    this.deleteEmployeeDialog = true;
    this.id = id;
    this.EmployesService.getEmployeeByID(this.id).subscribe((data) => {
      this.employe = data;
    });
  }
  EditEmployee(id: string) {
    this.router.navigateByUrl('/employé/nouveau?id=' + id);
  }
 ////////////////////////////// CONFIRM DELETE EMPLOYEE     ///////////////////////////
  
 confirmDelete() {
    console.log(this.id);
    this.EmployesService.deleteEmployee(this.id).subscribe((data) => {
      this.deleteEmployeeDialog = false;
      this.getAllEmployees();
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Employé a été supprimé',
      life: 3000,
    });
  }
  ////////////////////////////// FUNCTION FILTRE     ///////////////////////////
  
////////////////////////////// GET ALL EMPLOYEES     ///////////////////////////
  getAllEmployees() {
    this.EmployesService.getAllEmployees().subscribe((data) => {
      this.employes = data;
    });
  }
  confirmDeleteSelected() {
    console.log('aa');  
    this.employes = this.employes.filter(val => !this.selectedEmployes.includes(val));
    this.selectedEmployes.forEach((element) => {
      console.log(element.id );
      this.EmployesService.deleteEmployee(String(element.id) ).subscribe(data=>{
      
      })
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Rôles ont été supprimés ', life: 3000 });
    this.deleteEmployeesDialog = false;
    this.selectedEmployes = [];
  }
}
