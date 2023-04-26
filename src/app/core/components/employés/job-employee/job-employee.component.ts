import { Component,OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Job } from 'src/app/shared/models/Employee-job';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { JobService } from 'src/app/shared/service/job.service';
@Component({
  selector: 'app-job-employee',
  templateUrl: './job-employee.component.html',
  styleUrls: ['./job-employee.component.scss']
})
export class JobEmployeeComponent implements OnInit{
jobDialog: boolean = false;
  deleteJobDialog: boolean = false;
  deleteJobsDialog: boolean = false;
  jobs: Job[] = [];
  job: Job = {
    designation: '',
    description: ''
  };
  edit=false
  selectedJobs: Job[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  id!: string;
  filtered: string = '';
  originalJobs: any[] = [];
  filteredJobs!: any[];
  breadcrumbItems: MenuItem[] = [];
  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}
  ngOnInit() {
    this.getAllJob();
  }
  ////////////////////// CREATE NEW Job //////////////////
  createJob() {
    if(this.edit){
      this.editJob(this.job)
    }else {
      this.jobService.createJob(this.job).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'le métier a été cré',
          life: 3000,
        });
        this.getAllJob();
       this. jobDialog = false
        console.log('job:', this.job);
      });
    }
  }
  ///////// OPEN POPUP ////////
  openNew() {
    this.submitted = false;
    this.jobDialog = true;
  }
  deleteSelectedJobs() {
    this.deleteJobsDialog = true;
  }
  ///////////////////// EDIT Job /////////////
  editJob(t : any) {
    this.jobDialog = true;
    console.log('aaaaaaaa',t,t.id);
    this.jobService.updateJob(this.id, t).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'le métier a été modifié avec sucée',
          life: 3000,
        });
      });
      this.getAllJob()
      this.jobDialog = false
  }
  //////////// CONFIRM DELETE SELECTED SPECIALITY /////////
  confirmDeleteSelected() {
    this.deleteJobsDialog = false;
    this.jobs = this.jobs.filter(
      (val) => !this.selectedJobs.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'métiers supprimées',
      life: 3000,
    });
    this.selectedJobs = [];
  }
  /////////////// CONFIRM DELETE JOB //////////////
  confirmDelete() {
    console.log(this.id);
    this.jobService.deleteJob(this.id).subscribe((data) => {
      this.deleteJobDialog = false;
      this.getAllJob()
  });
  this.messageService.add({
    severity: 'success',
    summary: 'Successful',
    detail: 'le métier a été supprimé',
    life: 3000,
  });
  }
  hideDialog() {
    this.jobDialog = false;
    this.submitted = false;
  }
  ///////////// GET ALL JOB//////////////
  getAllJob() {
    this.jobService.getAllJob().subscribe((data) => {
      this.jobs = data;
      console.log("msg:",this.jobs);
    });
  }
  //////////////// DELETE JOB //////////////
  deleteJob(id: string) {
    this.deleteJobDialog = true;
    this.id = id;
    console.log("controlleur:",this.job);
    this.jobService.getJobByID(this.id).subscribe((data) => {
      this.job = data;
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
      this.jobs = [...this.originalJobs];
    } else {
      this.filteredJobs = this.originalJobs.filter((a: any) => {
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
      this.jobs = [...this.filteredJobs];
    }
  }
  getJobbyid(id:string) {this.edit=true
   this.jobDialog= true;
   this.id=id
    this.jobService.getJobByID(this.id).subscribe((data) => {
      console.log(data);
      this.job = data;
    });
  }
}