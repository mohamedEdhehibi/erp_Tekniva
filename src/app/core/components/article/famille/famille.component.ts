import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FamilleArticle } from 'src/app/shared/models/article/familleArticle';
import { FamilleArticleService } from 'src/app/shared/service/article/famille-article.service';


@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent {
  originalFamilys!: any[];
  familyDialog: boolean = false;
  deleteFamilyDialog: boolean = false;
  deleteFamilysDialog: boolean = false;
  selectedFamily: FamilleArticle[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  FamilysID:any=[]
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Familys: FamilleArticle[] = [];
  family: FamilleArticle = {
    designation: '',
    code:''
  }
  selectAll: boolean = false;
  filtered: string = ''
  filteredFamilys!: any[];
  u: any;
  userString: string ='';
  id: string='';
  constructor(private FamilyService: FamilleArticleService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllFamilys()
    this.userString = localStorage.getItem('currentUser')+'';
   
    
    this.cols = [{ field: 'designation', header: 'Designation' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'createdBy', header: 'Created By' },];
  }
getAllFamilys(){
  this.FamilyService.getAllFamArticles().subscribe(data=>{this.Familys=data;
  })
}
  openNew() {
    this.family = {
    designation: '',
    }
    this.submitted = false;
    this.familyDialog = true;
  }

  deleteSelectedFamilys() {
    this.deleteFamilysDialog = true;
  }
  editRole(id: string) {
    this.familyDialog = true;
    console.log(id);
    
    this.id=id
    this.FamilyService.getFamArticleByID(this.id).subscribe(data=>{this.family=data})
  }
  deleteRole(id: string) {
    this.deleteFamilyDialog = true;
 this.id=id
    
  }
confirmDeleteSelected() {
  
  this.Familys = this.Familys.filter(val => !this.selectedFamily.includes(val));
  this.selectedFamily.forEach(element => {
    this.FamilyService.deleteFamArticle(String(element.id)).subscribe(data=>{
    })
  });
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'machines Supprimés', life: 3000 });
  
  this.deleteFamilysDialog = false;
  this.selectedFamily = [];
}

  confirmDelete() {
   
   this.FamilyService.deleteFamArticle(this.id).subscribe(data=>{
   ;this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Rôle a été supprimé', life: 3000 });
   ;this.deleteFamilyDialog = false;
   this.ngOnInit()
   
  })
  }

  hideDialog() {
    this.familyDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;

    if (!this.family.designation) {
      return;
    }

    if (this.family.id) {
    this.FamilyService.UpdateFamArticle(this.id,this.family).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été modifié', life: 3000 });this.getAllFamilys()})   
    } else {
      // this.rol.createdBy=this.userString 

     this.FamilyService.createFamArticle(this.family).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été créer', life: 3000 });this.getAllFamilys()})
    }
    this.getAllFamilys()
    this.familyDialog = false;
  }
}