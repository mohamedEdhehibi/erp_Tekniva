import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { groupeChaine } from 'src/app/shared/models/groupe_chaine';
import { GroupeChaineService} from 'src/app/shared/service/Groupe_Chaine.service';

@Component({
  selector: 'app-groupe-chaines',
  templateUrl: './groupe-chaines.component.html',
  styleUrls: ['./groupe-chaines.component.scss'],
})
export class GroupeChainesComponent implements OnInit {
  groupe_chaineDialog: boolean = false;

  deletegroupe_chaineDialog: boolean = false;

  deletegroupe_chainesDialog: boolean = false;

  groupe_chaines: groupeChaine[] = [];

  groupe_chaine: groupeChaine = {
    id: '',
    name: '',
    designation: '',
    createdBy: '',
    isActive: true,
    createdAt: '',
    updateAt: '',
  };

  selectedgroupe_chaines: groupeChaine[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalgroupe_chaines: any[] = [];
  filteredgroupe_chaines!: any[];
  id!: string;
  constructor(
    private groupe_chaineService: GroupeChaineService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAllGroupChaine();
  }

  getAllGroupChaine() {
    this.groupe_chaineService.getGroupe_Chaines().subscribe(
      (data) => {
        this.groupe_chaines = data;
      
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.groupe_chaine = {  id: '',
    name: '',
    designation: '',
    createdBy: '',
    isActive: true,
    createdAt: '',
    updateAt: '',};
    this.submitted = false;
    this.groupe_chaineDialog = true;
  }

  deleteSelectedgroupe_chaines() {
    this.deletegroupe_chainesDialog = true;
  }
  editgroupe_chaine(id: string) {
    this.idSelected = id

  this.groupe_chaineService.getGroupe_ChaineByID(id).subscribe(data=>{this.groupe_chaine=data})
  
    this.groupe_chaineDialog = true;

  }


  deletegroupe_chaine(id: string) {
    this.deletegroupe_chaineDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletegroupe_chainesDialog = false;
    this.groupe_chaineService.deleteGroupe_Chaine(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllGroupChaine() })
    this.selectedgroupe_chaines = [];
  }

  confirmDelete() {
    this.deletegroupe_chaineDialog = false;
    this.groupe_chaineService.deleteGroupe_Chaine(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllGroupChaine() })
    this.groupe_chaine = { ...this.groupe_chaine };
  }

  hideDialog() {
    this.groupe_chaineDialog = false;
    this.submitted = false;
  }

  savegroupe_chaine() {
    this.submitted = true;
    console.log();
    
    if(this.idSelected){
      let gc={name:this.groupe_chaine.name,designation:this.groupe_chaine.designation}
    this.groupe_chaineService.UpdateGroupe_Chaine(this.idSelected, gc).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur a été modifié', life: 3000 }); this.getAllGroupChaine(); this.groupe_chaineDialog  = false; })
        this.groupe_chaineDialog = false;
      } else {
        //   this.groupe_chaine.image = 'groupe_chaine-placeholder.svg';
        // @ts-ignore
        // this.groupe_chaine.inventoryStatus = this.groupe_chaine.inventoryStatus ? this.groupe_chaine.inventoryStatus.value : 'INSTOCK';
        this.groupe_chaines.push(this.groupe_chaine);

        this.groupe_chaines = [...this.groupe_chaines];

        this.groupe_chaineDialog = false;
        this.groupe_chaine = { ...this.groupe_chaine };
       
        let ch = {
          name: this.groupe_chaine.name,
          designation: this.groupe_chaine.designation,
        };
        this.groupe_chaineService.creategroupeChaine(ch).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'groupe_chaine Created',
            life: 3000,
          });
          this.getAllGroupChaine();
        });
        
      }
    }
  }






