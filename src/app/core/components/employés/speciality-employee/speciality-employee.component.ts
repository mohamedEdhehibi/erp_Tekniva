import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { Speciality } from 'src/app/shared/models/speciality';
import { SpecialiteService } from 'src/app/shared/service/speciality.service';
@Component({
  selector: 'app-speciality-employee',
  templateUrl: './speciality-employee.component.html',
  styleUrls: ['./speciality-employee.component.scss'],
})
export class SpecialityEmployeeComponent implements OnInit {
  specialityDialog: boolean = false;

  deleteSpecialityDialog: boolean = false;

  deleteSpecialitysDialog: boolean = false;

  specialitys: Speciality[] = [];

  speciality: Speciality = {
    speciality: '',
    employees: [],
  };
  edit = false;
  selectedSpecialitys: Speciality[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  id!: string;
  filtered: string = '';
  originalSpecialitys: any[] = [];
  filteredSpecialitys!: any[];
  idSelected: string = '';

  constructor(
    private specialityService: SpecialiteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployésService
  ) {}

  ngOnInit() {
    this.getAllSpeciality();
  }

  ////////////////////// CREATE NEW SPECIALITY //////////////////
  createSpeciality() {
    if (this.edit) {
      this.editSpeciality(this.speciality);
    } else {
      // this.speciality.employees =[]

      this.specialityService
        .createSpecialite(this.speciality)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'la spécialité a été crée',
            life: 3000,
          });
          this.getAllSpeciality();
          this.specialityDialog = false;
          console.log('speciality:', this.speciality);
        });
    }
  }

  ///////// OPEN POPUP ////////
  openNew() {
    this.submitted = false;
    this.specialityDialog = true;
  }

  deleteSelectedSpecialitys() {
    this.deleteSpecialitysDialog = true;
  }

  ///////////////////// EDIT SPECIALITY /////////////
  editSpeciality(t: any) {
    this.specialityDialog = true;
    console.log('aaaaaaaa', t, t.id);

    this.specialityService.UpdateSpeciality(this.id, t).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'la spécialité a été modifiée avec sucée',
        life: 3000,
      });
    });
    this.getAllSpeciality();
    this.specialityDialog = false;
  }

  hideDialog() {
    this.specialityDialog = false;
    this.submitted = false;
  }

  ///////////// GET ALL TARININGS //////////////
  getAllSpeciality() {
    this.specialityService.getAllSpeciality().subscribe((data) => {
      this.specialitys = data;
      console.log('msg:', this.specialitys);
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

  /////////////////// FILTERED ////////
  filter() {
    if (!this.filtered) {
      this.specialitys = [...this.originalSpecialitys];
    } else {
      this.filteredSpecialitys = this.originalSpecialitys.filter((a: any) => {
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
      this.specialitys = [...this.filteredSpecialitys];
    }
  }

  getSpecialitybyid(id: string) {
    this.edit = true;
    this.specialityDialog = true;
    this.id = id;
    this.specialityService.getSpecialityByID(this.id).subscribe((data) => {
      console.log(data);
      this.speciality = data;
    });
  }

  deleteSpeciality(id: string) {
    this.idSelected = id;
    this.deleteSpecialityDialog = true;
  }
  /////////////// CONFIRM DELETE SPECIALITY //////////////
  confirmDelete() {
    this.deleteSpecialityDialog = false;
    this.specialityService
      .deleteSpeciality(this.idSelected)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
        this.getAllSpeciality();
      });
  }

  //////////// CONFIRM DELETE SELECTED SPECIALITY /////////

  confirmDeleteSelected() {
    this.specialitys = this.specialitys.filter(
      (val) => !this.selectedSpecialitys.includes(val)
    );
    this.selectedSpecialitys.forEach((element) => {
      console.log(element.id);
      this.specialityService
        .deleteSpeciality(String(element.id))
        .subscribe((data) => {});
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Specialités ont été supprimés ',
      life: 3000,
    });
    this.deleteSpecialitysDialog = false;
    this.selectedSpecialitys = [];
  }
}
