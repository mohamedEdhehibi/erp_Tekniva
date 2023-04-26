import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SousFamilleArticle } from 'src/app/shared/models/article/souFamille-article';
import { FamilleArticleService } from 'src/app/shared/service/article/famille-article.service';
import { SousFamilleArticleService } from 'src/app/shared/service/article/sousFamille-article.service';

@Component({
  selector: 'app-sous-famille',
  templateUrl: './sous-famille.component.html',
  styleUrls: ['./sous-famille.component.scss']
})
export class SousFamilleComponent {
  originalFamilys!: any[];
  familyDialog: boolean = false;
  deleteFamilyDialog: boolean = false;
  deleteFamilysDialog: boolean = false;
  selectedFamily: SousFamilleArticle[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  FamilysID:any=[]
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Familys: SousFamilleArticle[] = [];
  family: SousFamilleArticle = {
    designation: '',
    code: 0,
    familyArticle: ''
  }
  selectAll: boolean = false;
  famSelect: any[] = [];
  filtered: string = ''
  filteredFamilys!: any[];
  u: any;
  userString: string ='';
  id: string='';
  famList: any;
  constructor(private famService:FamilleArticleService,private FamilyService: SousFamilleArticleService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllFamilys()
    this.getFamilyList()
   
   
    
    this.cols = [{ field: 'designation', header: 'Designation' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'createdBy', header: 'Created By' },];
  }
  getFamilyList() {
    this.famService.getAllFamArticles().subscribe(data => { this.famList = data;
      this.famSelect = this.famList.map((r:any) => {
        return { label: r.designation, value: r.id };});
     })
  }
getAllFamilys(){
  this.FamilyService.getAllSubFamArticles().subscribe(data=>{this.Familys=data;
  })
}
  openNew() {
    this.family = {
      id:'',
      designation: '',
      code: 0,
      familyArticle: ''
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
    this.FamilyService.getSubFamArticleByID(this.id).subscribe(data=>{this.family=data})
  }
  deleteRole(id: string) {
    this.deleteFamilyDialog = true;
 this.id=id
    
  }
confirmDeleteSelected() {
  
  this.Familys = this.Familys.filter(val => !this.selectedFamily.includes(val));
  this.selectedFamily.forEach(element => {
    this.FamilyService.deleteSubFamArticle(String(element.id)).subscribe(data=>{
    })
  });
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'machines Supprimés', life: 3000 });
  
  this.deleteFamilysDialog = false;
  this.selectedFamily = [];
}

  confirmDelete() {
   
   this.FamilyService.deleteSubFamArticle(this.id).subscribe(data=>{
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
    this.FamilyService.UpdateSubFamArticle(this.id,this.family).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été modifié', life: 3000 });this.getAllFamilys()})   
    } else {
      // this.rol.createdBy=this.userString 

     this.FamilyService.createSubFamArticle(this.family).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été créer', life: 3000 });this.getAllFamilys()})
    }
    this.getAllFamilys()
    this.familyDialog = false;
  }
}