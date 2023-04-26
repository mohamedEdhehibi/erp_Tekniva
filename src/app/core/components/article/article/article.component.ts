import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Article } from 'src/app/shared/models/article/article';
import { Model } from 'src/app/shared/models/article/model';


import { ArticleService } from 'src/app/shared/service/article/article.service';
import { ModelService } from 'src/app/shared/service/article/model.service';
import { ProductService } from 'src/app/shared/service/product.service';
import * as XLSX from 'xlsx';
interface expandedRows {
  [key: string]: boolean;
  
}
export interface AllData {
  AQL_critique: string;
  AQL_majeur: string;
  
  AQL_mineur: string;
  article: {
    id: number;
    reference: string;
    code: string;
    designation: string;
    type: string;
    // add other properties as needed
  };
  articles: Array<{
    id: number;
    reference: string;
    code: string;
    designation: string;
    type: string;
    // add other properties as needed
  }>;
  attachements: string;
  bar_code: string;
  categorie_controle: string;
  createdAt: string;
  createdBy: number;
  designation: string;
  id: number;
  reference: string;
  type: string;
  updatedAt: string;
}
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  expandedRowIndex: number = -1;
  allData:AllData[]=[]
  isExpanded: boolean = false;
  transformedData:any = [];
  originalArticles!: any[];
  ArticleDialog: boolean = false;
  products: any[] = [];
  deleteArticleDialog: boolean = false;
  deleteModelDialog: boolean = false;
  deleteArticlesDialog: boolean = false;
  selectedArticle: Article[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  expandedRows: expandedRows = {};
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  articles: Article[] = [];
  models:any[]=[]
  idSelected:number=0
  idModel : number=0
  model:Model={
    id: '',
    designation: '',
    reference: '',
    brand: 0,
    complexity: 0,
    tva: 0,
    season: 0,
    discount: 0,
    sizeChart: 0,
    subFamily: 0
  }
  article: Article = {
    id: 0,
    designation: '',
    reference: '',
    brandId: 0,
    sizeChartId: 0,
    articleParentId: 0,
    picture: '',
    type: '',
    barCode: '',
    complexityId: '',
    categorieDecontrole: '',
    AQLCritique: '',
    AQLMajeur: '',
    AQLMineur: '',
    attachement: '',

    phase: 0,
    subFamilyArticleId: '',
    gamme: '',
    familyArticle: '',
    code: '',
    marque: '',
    temps: ''
  }
  filtered: string = ''
  filteredArticles!: any[];
  u: any;
  selectedId!: string;

  constructor(private modelService:ModelService,private productService: ProductService,private router:Router,private articleService: ArticleService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  
    this.getAllModel()
    this.expandedRows = {};
    this.isExpanded=false
  }
  
  EditNavigate(id: string) {
    this.router.navigateByUrl('/article/modele?id=' + id);
  }
  detailNavigate(id: string) {
    this.router.navigateByUrl('/article/detail?id='+ id);
  }
  EditNavigateModel(id: string) {
    this.router.navigateByUrl('/article/modele?idM='+id);
  }
  getAllModel(){
    this.modelService.getAllModels().subscribe(data=>{this.models=data;console.log(data);
    
    })
  }
  getAllArticle(){
    this.articleService.getAllArticles().subscribe(data=>{this.articles=data;console.log(data); 
    })
  }

  getArticlebyModel(id:string){
    if(this.expandedRows[id]) this.expandedRows={}
    else this.expandedRows={[id] : true};
    this.articleService.getArticlesByModel(id).subscribe(data=>{this.articles=data;    
    })
  }
  openNew() {
    this.submitted = false;
    this.ArticleDialog = true;
  }

  deleteSelectedArticles() {
    this.deleteArticlesDialog = true;
  }

  editArticle(id: string) {
 
    this.router.navigateByUrl('/article/add_article?id='+id)  
  }

  deleteArticle(id: number) {
    this.idSelected=id
    this.articleService.getArticleByID( this.idSelected).subscribe(data=>{this.article=data})
    this.deleteArticleDialog = true;
  }
  deleteModel(id: number) {
    this.idSelected=id 
    this.modelService.getModelByID( this.idSelected).subscribe(data=>{this.model=data;console.log(this.model.designation);
      this.deleteModelDialog = true;
    })
  }

  confirmDelete() {
    this.deleteArticleDialog = false;
   this.articleService.deleteArticle(this.idSelected).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Article a été supprimé', life: 3000 });this.getAllModel();})
  }
  confirmDeleteModel() {
    this.deleteModelDialog = false;
   this.modelService.deleteModel(this.idSelected).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Model a été supprimé', life: 3000 });this.getAllModel();})
  }
  hideDialog() {
    this.ArticleDialog = false;
    this.submitted = false;
  }

  exportToExcel(list: AllData[]) {
    let filename: string='article'
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer);
  }
  saveExcelFile(buffer: any) {
    let filename: string='article'
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.xlsx';
    link.click();
  }
  /////////////////////////////////////////
  expandAll() {
        this.expandedRows = {};
    this.isExpanded = !this.isExpanded;
    
}

}