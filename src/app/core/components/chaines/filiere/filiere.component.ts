import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from 'src/app/shared/models/company';
import { Filiere } from 'src/app/shared/models/filiere';
import { CompanyService } from 'src/app/shared/service/company.service';
import { FiliereService } from 'src/app/shared/service/filiere.service';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss'],
})
export class FiliereComponent implements OnInit {
  filiere: Filiere = {
    id: 0,
    designation: '',
    address: '',
    phone: 0,
    email: '',
    createdBy: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    company: 0,
  };
  filiereDialog: boolean = false;
  deletefiliereDialog: boolean = false;
  deletefilieresDialog: boolean = false;
  filieres: Filiere[] = [];
  company: any[] = [];
  selectedfilieres: Filiere[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalfilieres: any[] = [];
  filteredfilieres!: any[];
  id!: string;
  com!: Company[];
  constructor(
    private filiereService: FiliereService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private companyService:CompanyService,

  ) {}

  ngOnInit() {
    this.getAllfiliere();
    this.getallCompany();
  }
  getallCompany(){
    this.companyService.getcompanys().subscribe(data=>{
        this.com=data
       
  console.log(data);
  
     this.company=this.com.map((co)=>{
   
      console.log(co.id);
      
       return{label: co.name,value:co.id}
    })
    })
}

  getAllfiliere() {
    this.filiereService.getfilieres().subscribe(
      (data) => {
        this.filieres = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.filiere = { id: 0,
      designation: '',
      address: '',
      phone: 0,
      email: '',
      createdBy: '',
      isActive: false,
      createdAt: '',
      updatedAt: '',
      company: 0,};
    this.submitted = false;
    this.filiereDialog = true;
  }

  deleteSelectedfilieres() {
    this.deletefilieresDialog = true;
  }
  editfiliere(id: string) {
    this.idSelected = id;
    this.filiereService.getfiliereByID(id).subscribe((data) => {
      this.filiere = data;
    });

    this.filiereDialog = true;
  }

  deletefiliere(id: string) {
    this.deletefiliereDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletefilieresDialog = false;
    this.filiereService.deletefiliere(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Groupe chaîne a été supprimé',
        life: 3000,
      });
      this.getAllfiliere();
    });
    this.selectedfilieres = [];
  }

  confirmDelete() {
    this.deletefiliereDialog = false;
    this.filiereService.deletefiliere(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Groupe chaîne a été supprimé',
        life: 3000,
      });
      this.getAllfiliere();
    });
    this.filiere = { ...this.filiere };
  }

  hideDialog() {
    this.filiereDialog = false;
    this.submitted = false;
  }

  savefiliere() {
    this.submitted = true;
    console.log();

    if (this.idSelected) {
      let com = {
        designation: this.filiere.designation,
        email: this.filiere.email,
        address: this.filiere.address,
        phone: this.filiere.phone,
        company: this.filiere.company,
      };
      this.filiereService
        .Updatefiliere(this.idSelected, com)
        .subscribe((data) => {
          this.messageService.add({
           
            summary: 'Successful',
            detail: 'Utilisateur a été modifié',
            life: 3000,
          });
          this.getAllfiliere();
          this.filiereDialog = false;
        });
      this.filiereDialog = false;
    } else {
      //   this.filiere.image = 'filiere-placeholder.svg';
      // @ts-ignore
      // this.filiere.inventoryStatus = this.filiere.inventoryStatus ? this.filiere.inventoryStatus.value : 'INSTOCK';
      this.filieres.push(this.filiere);

      this.filieres = [...this.filieres];

      this.filiereDialog = false;
      this.filiere = { ...this.filiere };
      
      let ch = {
        designation: this.filiere.designation,
        email: this.filiere.email,
        address: this.filiere.address,
        phone: this.filiere.phone,
        company: this.filiere.company,
      };
      console.log(ch);
      
      this.filiereService.createfiliere(ch).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'filiere Created',
          life: 3000,
        });
        this.getAllfiliere();
      });
    }
  }
}
