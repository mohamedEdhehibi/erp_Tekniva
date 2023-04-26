import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Client } from 'src/app/shared/models/client';
import { Contact } from 'src/app/shared/models/contact';
import { ClientService } from 'src/app/shared/service/client.service';
import { ContactService } from 'src/app/shared/service/contact.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.scss'],
})
export class ListeClientComponent implements OnInit {
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
  countries: any[] = [];
  filtered: string = '';
  clientDialog: boolean = false;
  originalclients: any[] = [];
  filteredclients!: any[];
  deleteclientDialog: boolean = false;
  deleteclientsDialog: boolean = false;
  clients: Client[] = [];
  client: Client = {
    id: '',
    code: '',
    name: '',
    nationality: '',
    registrationNumber: '',
    phone: '',
  };
  contacts: Contact[] = [];
  selectedclients: Client[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  groupe: any[] = [];
  poste: any[] = [];
  etat: any[] = [];
  atelier: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  contact!: any[];
  idSelected!: string;
  id!: string;

  selectedCountryPhoneCode!: string;
  cl!: any;
  codenationalite!: string;
  nations!: any;
  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private serviceContact: ContactService
  ) {}

  ngOnInit() {
    this.getAllClient();
    this.getallContact();

    this.countries = [
      { name: 'Afghanistan', code: 'AF', cle: '+93' },
      { name: 'Afrique du Sud', code: 'ZA', cle: '+27' },
      { name: 'Albanie', code: 'AL', cle: '+355' },
      { name: 'Algérie', code: 'DZ', cle: '+213' },
      { name: 'Allemagne', code: 'DE', cle: '+49' },
      { name: 'Andorre', code: 'AD', cle: '+376' },
      { name: 'Angola', code: 'AO', cle: '+244' },
      { name: 'Anguilla', code: 'AI', cle: '+1-264' },
      { name: 'Antarctique', code: 'AQ', cle: '+672' },
      { name: 'Antigua-et-Barbuda', code: 'AG', cle: '+1-268' },
      { name: 'Arabie saoudite', code: 'SA', cle: '+966' },
      { name: 'Argentine', code: 'AR', cle: '+54' },
      { name: 'Arménie', code: 'AM', cle: '+374' },
      { name: 'Aruba', code: 'AW', cle: '+297' },
      { name: 'Australie', code: 'AU', cle: '+61' },
      { name: 'Autriche', code: 'AT', cle: '+43' },
      { name: 'Azerbaïdjan', code: 'AZ', cle: '+994' },
      { name: 'Bahamas', code: 'BS', cle: '+1-242' },
      { name: 'Bahreïn', code: 'BH', cle: '+973' },
      { name: 'Bangladesh', code: 'BD', cle: '+880' },
      { name: 'Barbade', code: 'BB', cle: '+1-246' },
      { name: 'Bélarus', code: 'BY', cle: '+375' },
      { name: 'Belgique', code: 'BE', cle: '+32' },
      { name: 'Belize', code: 'BZ', cle: '+501' },
      { name: 'Bénin', code: 'BJ', cle: '+229' },
      { name: 'Bermudes', code: 'BM', cle: '+1-441' },
      { name: 'Bhoutan', code: 'BT', cle: '+975' },
      { name: 'Bolivie', code: 'BO', cle: '+591' },
      { name: 'Bosnie-Herzégovine', code: 'BA', cle: '+387' },
      { name: 'Botswana', code: 'BW', cle: '+267' },
      { name: 'Brésil', code: 'BR', cle: '+55' },
      { name: 'Brunéi Darussalam', code: 'BN', cle: '+673' },
      { name: 'Bulgarie', code: 'BG', cle: '+359' },
      { name: 'Burkina Faso', code: 'BF', cle: '+226' },
      { name: 'Burundi', code: 'BI', cle: '+257' },
      { name: 'Costa Rica', code: 'CR', cle: '+506' },
      { name: "Côte d'Ivoire", code: 'CI', cle: '+225' },
      { name: 'Croatie', code: 'HR', cle: '+385' },
      { name: 'Cuba', code: 'CU', cle: '+53' },
      { name: 'Curaçao', code: 'CW', cle: '+599' },
      { name: 'Danemark', code: 'DK', cle: '+45' },
      { name: 'Djibouti', code: 'DJ', cle: '+253' },
      { name: 'Dominique', code: 'DM', cle: '+1-767' },
      { name: 'Égypte', code: 'EG', cle: '+20' },
      { name: 'El Salvador', code: 'SV', cle: '+503' },
      { name: 'Émirats arabes unis', code: 'AE', cle: '+971' },
      { name: 'Équateur', code: 'EC', cle: '+593' },
      { name: 'Érythrée', code: 'ER', cle: '+291' },
      { name: 'Espagne', code: 'ES', cle: '+34' },
      { name: 'Estonie', code: 'EE', cle: '+372' },
      { name: 'État de la Cité du Vatican', code: 'VA', cle: '+39-06' },
      { name: 'États-Unis', code: 'US', cle: '+1' },
      { name: 'Éthiopie', code: 'ET', cle: '+251' },
      { name: 'Fidji', code: 'FJ', cle: '+679' },
      { name: 'Finlande', code: 'FI', cle: '+358' },
      { name: 'France', code: 'FR', cle: '+33' },
      { name: 'Gabon', code: 'GA', cle: '+241' },
      { name: 'Gambie', code: 'GM', cle: '+220' },
      { name: 'Géorgie', code: 'GE', cle: '+995' },
      { name: 'Algérie', code: 'DZ', cle: '+213' },
      { name: 'Arabie Saoudite', code: 'SA', cle: '+966' },
      { name: 'Bahreïn', code: 'BH', cle: '+973' },
      { name: 'Djibouti', code: 'DJ', cle: '+253' },
      { name: 'Egypte', code: 'EG', cle: '+20' },
      { name: 'Emirats Arabes Unis', code: 'AE', cle: '+971' },
      { name: 'Irak', code: 'IQ', cle: '+964' },
      { name: 'Jordanie', code: 'JO', cle: '+962' },
      { name: 'Koweït', code: 'KW', cle: '+965' },
      { name: 'Liban', code: 'LB', cle: '+961' },
      { name: 'Libye', code: 'LY', cle: '+218' },
      { name: 'Maroc', code: 'MA', cle: '+212' },
      { name: 'Mauritanie', code: 'MR', cle: '+222' },
      { name: 'Oman', code: 'OM', cle: '+968' },
      { name: 'Palestine', code: 'PS', cle: '+970' },
      { name: 'Qatar', code: 'QA', cle: '+974' },
      { name: 'Somalie', code: 'SO', cle: '+252' },
      { name: 'Soudan', code: 'SD', cle: '+249' },
      { name: 'Syrie', code: 'SY', cle: '+963' },
      { name: 'Tunisie', code: 'TN', cle: '+216' },
      { name: 'Yémen', code: 'YE', cle: '+967' },
    ];
  }

  getAllClient() {
    this.clientService.getAllClient().subscribe((data) => {
      this.clients = data;
      this.nations = Object.values(data[1]);
    });
  }
  getallContact() {
    this.serviceContact.getAllcontact().subscribe((data) => {
      this.contacts = data;
      this.contact = this.contacts.map((co) => {
        return { label: co.name, value: co.id };
      });
    });
  }

  openNew() {
    this.client = { ...this.client };
    this.submitted = false;
    this.clientDialog = true;
  }

  deleteSelectedclients() {
    this.deleteclientsDialog = true;
  }

  editclient(id: string) {
    this.idSelected = id;
    this.clientService.getClientByID(id).subscribe((data) => {
      this.client = data;
    });

    this.clientDialog = true;
  }

  deleteclient(id: string) {
    this.deleteclientDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deleteclientsDialog = false;
    this.clientService.deleteClient(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'la méthode de paiement  a été supprimé',
        life: 3000,
      });
      this.getAllClient();
    });
    this.selectedclients = [];
  }

  confirmDelete() {
    this.deleteclientDialog = false;
    this.clientService.deleteClient(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'la méthode de paiement a été supprimé',
        life: 3000,
      });
      this.getAllClient();
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }
  remplir_cl(nationality: any) {
    this.nations = Object.values(nationality)[0];
    this.codenationalite = String(Object.values(nationality)[1]);
    this.cl = Object.values(nationality)[2];
  }

  saveclient() {
    this.submitted = true;
    if (this.idSelected) {
      let gc = {
        name: this.client.name,
        code: this.client.code,
        nationality: this.nations,
        phone: this.phoneForm.value.phone.internationalNumber,
        registrationNumber: this.client.registrationNumber,
      };
      this.clientService.UpdateClient(this.idSelected, gc).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'la méthode de paiement été modifié',
          life: 3000,
        });
        this.clientDialog = false;
        this.getAllClient();
      });

      this.clientDialog = false;
    } else {
      // console.log(this.phoneForm.value.phone.internationalNumber);

      let ch = {
        name: this.client.name,
        code: this.client.code,
        nationality: this.nations,
        registrationNumber: this.client.registrationNumber,
        phone: this.phoneForm.value.phone.internationalNumber,
      };
      this.clientService.createClient(ch).subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'votre méthode de paiement  a été créé avec succès',
          life: 3000,
        });
        this.clientDialog = false;
        this.getAllClient();
      });
      this.clientDialog = false;
    }
  }
  exportToExcel(list: Client[]) {
    let filename: string = 'client';
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer);
  }
  saveExcelFile(buffer: any) {
    let filename: string = 'client';
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.xlsx';
    link.click();
  }
  getNationalityCode(nationality: string) {
    return this.countries
      .filter((item) => item.name === nationality)
      .map((elem) => elem.code)[0];
  }
}
