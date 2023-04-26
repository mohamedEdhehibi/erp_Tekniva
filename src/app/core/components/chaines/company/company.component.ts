import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from 'src/app/shared/models/company';
import { CompanyService } from 'src/app/shared/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneForm = new FormGroup<any>({
    phone: new FormControl('', [Validators.required]),
  });
  company: Company = {
    id: 0,
    name: '',
    email: '',
    address: '',
    phone: '',
    logo: '',
    registrationNumber: '',
    header: '',
    footer: '',
    cretedBy: 0,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  };
  companyDialog: boolean = false;
  deletecompanyDialog: boolean = false;
  deletecompanysDialog: boolean = false;
  companys: Company[] = [];
  selectedFile!: File;
  selectedcompanys: Company[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalcompanys: any[] = [];
  filteredcompanys!: any[];
  id!: string;
  constructor(
    private companyService: CompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAllGroupChaine();
  }

  getAllGroupChaine() {
    this.companyService.getcompanys().subscribe(
      (data) => {
        this.companys = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.company = {
      id: 0,
      name: '',
      email: '',
      address: '',
      phone: '',
      logo: '',
      registrationNumber: '',
      header: '',
      footer: '',
      cretedBy: 0,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    };
    this.submitted = false;
    this.companyDialog = true;
  }

  deleteSelectedcompanys() {
    this.deletecompanysDialog = true;
  }
  editcompany(id: string) {
    this.idSelected = id;

    this.companyService.getcompanyByID(id).subscribe((data) => {
      this.company = data;
    });

    this.companyDialog = true;
  }

  deletecompany(id: string) {
    this.deletecompanyDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletecompanysDialog = false;
    this.companyService.deletecompany(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Groupe chaîne a été supprimé',
        life: 3000,
      });
      this.getAllGroupChaine();
    });
    this.selectedcompanys = [];
  }

  confirmDelete() {
    this.deletecompanyDialog = false;
    this.companyService.deletecompany(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Groupe chaîne a été supprimé',
        life: 3000,
      });
      this.getAllGroupChaine();
    });
    this.company = { ...this.company };
  }

  hideDialog() {
    this.companyDialog = false;
    this.submitted = false;
  }

  savecompany() {
    this.submitted = true;
    console.log();

    if (this.idSelected) {
      let com = {
        name: this.company.name,
        email: this.company.email,
        address: this.company.address,
        phone: this.phoneForm.value.phone.internationalNumber,
        logo: this.company.logo,
        registrationNumber: this.company.registrationNumber,
        header: this.company.header,
        footer: this.company.footer,
      };
      this.companyService
        .Updatecompany(this.idSelected, com)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Utilisateur a été modifié',
            life: 3000,
          });
          this.getAllGroupChaine();
          this.companyDialog = false;
        });
      this.companyDialog = false;
    } else {
      //   this.company.image = 'company-placeholder.svg';
      // @ts-ignore
      // this.company.inventoryStatus = this.company.inventoryStatus ? this.company.inventoryStatus.value : 'INSTOCK';
      this.companys.push(this.company);
      this.companys = [...this.companys];
      this.companyDialog = false;
      this.company = { ...this.company };
      console.log(this.phoneForm.value.phone.internationalNumber);
      
      let ch = {
        name: this.company.name,
        email: this.company.email,
        address: this.company.address,
        phone: this.phoneForm.value.phone.internationalNumber,
        logo: this.selectedFile.name,
        registrationNumber: this.company.registrationNumber,
        header: this.company.header,
        footer: this.company.footer,
      };
      console.log(ch);
      
      this.companyService.createcompany(ch).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'company Created',
          life: 3000,
        });
        this.getAllGroupChaine();
      });
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
