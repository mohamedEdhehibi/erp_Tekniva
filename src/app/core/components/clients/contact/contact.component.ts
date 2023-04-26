import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/shared/models/client';
import { Contact } from 'src/app/shared/models/contact';
import { ClientService } from 'src/app/shared/service/client.service';
import { ContactService } from 'src/app/shared/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactDialog: boolean = false;

  deletecontactDialog: boolean = false;

  deletecontactsDialog: boolean = false;

  contacts: Contact[] = [];

  contact: Contact = {
    id:"", 
    name:"",
    email:"",
    phone:"",
    client:0,
    createdAt:"",
    updatedAt:""
  };
  
customer: any[] = [];
  selectedcontacts: Contact[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalcontacts: any[] = [];
  filteredcontacts!: any[];
  id!: string;
  customers!:Client[]
  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private serviceClient:ClientService
  ) {}

  ngOnInit() {
    this.getAllContacte();
    this.getallClient();
  }
  getallClient(){
    this.serviceClient.getAllClient().subscribe(data=>{
        this.customers=data
    
  
     this.customer=this.customers.map((co)=>{
   
      console.log(co.id);
      
       return{label: co.name,value:co.id}
    })
    })
}

  getAllContacte() {
    this.contactService.getAllcontact().subscribe(
      (data) => {
        this.contacts = data;
        console.log(data);
        
      
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.contact = { ...this.contact };
    this.submitted = false;
    this.contactDialog = true;
  }

  deleteSelectedcontacts() {
    this.deletecontactsDialog = true;
  }
  editcontact(id: string) {
    this.idSelected = id

  this.contactService.getcontactByID(id).subscribe(data=>{this.contact=data})
  
    this.contactDialog = true;

  }


  deletecontact(id: string) {
    this.deletecontactDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletecontactsDialog = false;
    this.contactService.deletecontact(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllContacte() })
    this.selectedcontacts = [];
  }

  confirmDelete() {
    this.deletecontactDialog = false;
    this.contactService.deletecontact(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllContacte() })
    this.contact = { ...this.contact };
  }

  hideDialog() {
    this.contactDialog = false;
    this.submitted = false;
    this.contact={
    id:"", 
    name:"",
    email:"",
    phone:"",
    client:0,
    createdAt:"",
    updatedAt:""}
  }

  savecontact() {
    this.submitted = true;
    console.log();
    
    if(this.idSelected){
      let gc={name:this.contact.name,email:this.contact.email,phone:this.contact.phone,client:this.contact.client}
    this.contactService.Updatecontact(this.idSelected, gc).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur a été modifié', life: 3000 }); this.getAllContacte(); this.contactDialog  = false; })
        this.contactDialog = false;
      } else {
        //   this.contact.image = 'contact-placeholder.svg';
        // @ts-ignore
        // this.contact.inventoryStatus = this.contact.inventoryStatus ? this.contact.inventoryStatus.value : 'INSTOCK';
        this.contacts.push(this.contact);

        this.contacts = [...this.contacts];

        this.contactDialog = false;
        this.contact = { ...this.contact };
       
        let ch = {name:this.contact.name,email:this.contact.email,phone:this.contact.phone,client:this.contact.client};
   
        
        this.contactService.createcontact(ch).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'contact Created',
            life: 3000,
          });
          this.getAllContacte();
        });
        
      }
    }
  }