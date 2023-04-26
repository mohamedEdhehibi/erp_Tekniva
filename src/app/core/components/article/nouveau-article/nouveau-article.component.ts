import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article/article';
import { FamilleArticle } from 'src/app/shared/models/article/familleArticle';
import { Model } from 'src/app/shared/models/article/model';
import { SousFamilleArticle } from 'src/app/shared/models/article/souFamille-article';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { BrandService } from 'src/app/shared/service/article/brand.service';
import { ColorService } from 'src/app/shared/service/article/color.service';
import { ComplexityService } from 'src/app/shared/service/article/complexity.service';
import { DiscountService } from 'src/app/shared/service/article/discount.service';
import { FamilleArticleService } from 'src/app/shared/service/article/famille-article.service';
import { ModelService } from 'src/app/shared/service/article/model.service';
import { SeasonService } from 'src/app/shared/service/article/season.service';
import { SizeChartService } from 'src/app/shared/service/article/size-chart.service';
import { SizeService } from 'src/app/shared/service/article/size.service';
import { SousFamilleArticleService } from 'src/app/shared/service/article/sousFamille-article.service';
import { TvaService } from 'src/app/shared/service/article/tva.service';

import { NodeService } from 'src/app/shared/service/node.service';

interface Image {
  name: string;
  objectURL: string;
}

interface codebarre {
  code: string,
  size: string,
  color: string
}
@Component({
  selector: 'app-nouveau-article',
  templateUrl: './nouveau-article.component.html',
  styleUrls: ['./nouveau-article.component.scss']
})
export class NouveauArticleComponent {
  modelID: any
  model: Model = {
    designation: '',
    reference: '',
    // categorie_controle: 0,
    // AQL_critique: 0,
    // AQL_majeur: 0,
    // AQL_mineur: 0,
    // attachements: 0,
    brand: 0,
    complexity: 0,
    tva: 0,
    season: 0,
    discount: 0,
    sizeChart: 0,
    subFamily: 0
  }
  /////////////
  value!: number;
id:any
msg:string=''

  files1: any[] = [];

  files2: any[] = [];

  files3: any[] = [];

  selectedFiles1: any[] = [];

  selectedFiles2: any[] = [];

  selectedFiles3: any = {};

  cols: any[] = [];
  public qrCodeArray: any = [{ name: '' }];
  ////////////////
  phase: any[] = [];
  gamme: any[] = [];
  articleBase: any[] = [];
  //////////Article ////////////
  articles: any[] = [];
  articleSelect: any[] = [];
  //////////Family and SubFamily ////////////
  family: FamilleArticle[] = [];
  subFamily: any[] = [];
  famSelect: any[] = [];
  subFamSelect: any[] = [];
  //////////Family and SubFamily ////////////

  //////////Article ////////////

  complexity: any[] = [];
  complexitySelect: any[] = [];
  grid: any[] = [];
  gridSelect: any[] = [];
  size: any[] = [];
  sizeSelect: any[] = [];
  color: any[] = [];
  colorSelect: any[] = [];
  tva: any[] = [];
  tvaSelect: any[] = [];
  discount: any[] = [];
  discountSelect: any[] = [];
  brand: any[] = [];
  brandSelect: any[] = [];
  season: any[] = [];
  seasonSelect: any[] = [];
  modelL: any[] = [];
  modelSelect: any[] = [];
  mod:Model={
    designation: '',
    reference: '',
    brand: undefined,
    complexity: undefined,
    tva: undefined,
    season: undefined,
    discount: undefined,
    sizeChart: undefined,
    subFamily: undefined
  }

  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
  article: Article = {
    designation: '',
    reference: '',
    type: '',
    code: ''
  }
  codebarre: codebarre = {
    code: "0",
    size: "",
    color: ''
  }
  uploadedFiles = ['']
  listcode: codebarre[] = [{
    code: "",
    size: "",
    color: ''
  }]
  images!: Image[]
  update=false
  sabPhase: any[] = [
    { name: 'Sous Phase', value: 1 },
    { name: 'Sous Phase', value: 2 },
    { name: 'Sous Phase', value: 3 }
  ];
  constructor(private complexityService: ComplexityService,
    private articleService: ArticleService,
    private nodeService: NodeService,
    private modelService: ModelService,
    private famArticleService: FamilleArticleService,
    private suFamArticleService: SousFamilleArticleService,
    private sizeChartService: SizeChartService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private tvaService: TvaService,
    private discountService: DiscountService,
    private brandService: BrandService,
    private seasonService: SeasonService,
    private route:ActivatedRoute,
   
  ) { }
  ngOnInit() {
       this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.msg = "Editer Article";
    } else {
      this.msg = 'Ajouter un nouveau Article';
    }
    this.getModel()
    this.getSeason()
    this.getBrand()
    this.getTva()
    this.getSize()
    this.getColor()
    this.getDiscount()
    this.getBaseArticle()
    this.getGrid()
    this.getFamily()
    //this.getSubFamily()
    this.getComplexity()
    if (this.id !== undefined){
      this.update=true
      this.getArticleById(this.id)
    }


    this.nodeService.getFiles().then(files => this.files1 = files);
    this.nodeService.getFilesystem().then(files => this.files2 = files);
    this.nodeService.getFiles().then(files => {
      this.files3 = [{
        label: 'Root',
        children: files
      }];
    });
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ]
    this.gamme = [
      { label: 'Gamme 1', value: '1' },
      { label: 'Gamme 2', value: '2' },
      { label: 'Gamme 3', value: '3' }
    ];
    this.articleBase = [
      { label: 'Article de Base 1', value: '1' },
      { label: 'Article de Base 2', value: '2' },
      { label: 'Article de Base 3', value: '3' }
    ];
    this.phase = [
      { label: ' Phase 1', value: '1' },
      { label: ' Phase 2', value: '2' },
      { label: ' Phase 3', value: '3' }
    ];
  
  }
  getFamily() {
    this.famArticleService.getAllFamArticles().subscribe(data => {
      this.family = data;
      this.famSelect = this.family.map((r) => {
        return { label: r.designation, value: r.id };
      });
    })
  }
  getSubFamily(id:any){
    if(this.article.subFamilyArticleId !== undefined){
      this.suFamArticleService.getAllSubFamByFamilyArticles(id).subscribe(data=>{this.subFamily=data.subFamily
        this.subFamSelect = this.subFamily.map(r=>{
          return {label:r.designation , value : r.id}
        })
      }
        )
    }
    
  }
  // getSubFamily() {
  //   this.suFamArticleService.getAllSubFamArticles().subscribe(data => {
  //     this.subFamily = data;
  //     this.subFamSelect = this.subFamily.map((r) => {
  //       return { label: r.designation, value: r.id };
  //     });
  //   })
  // }
  getBaseArticle() {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
      this.articleSelect = this.articles.map((r) => {

        return { label: r.designation, value: r.id };
      });
    })
  }
  getModelById(id:any){
    if(id !== undefined){
      this.modelService.getModelByID(id).subscribe(data=>{this.mod=data,console.log(this.mod);
        
      })
    }
   
  }
  getArticleById(id:any){
    this.articleService.getArticleByID(id).subscribe(data=>this.article=data)
  }
  getComplexity() {
    this.complexityService.getAllComplexitys().subscribe(data => {
      this.complexity = data;
      this.complexitySelect = this.complexity.map((r) => {

        return { label: r.designation, value: r.id };
      });
    })
  }
  getGrid() {
    this.sizeChartService.getAllSizeCharts().subscribe(data => {
      this.grid = data;
      this.gridSelect = this.grid.map((r) => {
        return { label: r.designation, value: r.id };
      });
    })
  }
  getSize() {
    this.sizeService.getAllSize().subscribe(data => {
      this.size = data; console.log(data);

      this.sizeSelect = this.size.map((r) => {
        return { label: r.designation, value: r.id };
      });
    })
  }
  getColor() {
    this.colorService.getAllColors().subscribe(data => {
      this.color = data;this.colorSelect = this.color.map((r) => {
        return { label: r.designation, value: r.id };
      });
    })
  }
  getTva() {
    this.tvaService.getAllTVA().subscribe(data => {
      this.tva = data;
      this.tvaSelect = this.tva.map((r) => {
        return { label: r.designation, value: r.id };
      });
    })
  }
  getDiscount() {
    this.discountService.getAllDiscounts().subscribe(data => {
      this.discount = data; 
      this.discountSelect = this.discount.map((r) => {
        return { label: r.designation, value: r.id }
      });
    })
  }
  getBrand() {
    this. brandService.getAllBrands().subscribe(data => {
      this.brand = data; 
      this.brandSelect = this.brand.map((r) => {
        return { label: r.designation, value: r.id }
      });
    })
  }
  getSeason() {
    this. seasonService.getAllSeasons().subscribe(data => {
      this.season = data; 
      this.seasonSelect = this.season.map((r) => {
        return { label: r.designation, value: r.id }
      });
    })
  }
  getModel() {
    this. modelService.getAllModels().subscribe(data => {
      this.modelL = data; 
      this.modelSelect = this.modelL.map((r) => {
        return { label: r.designation, value: r.id }
      });
    })
  }
  onUpload(event: any) {
    for (let file of event.files) {
      this.images.push(file);
    }
  }
  onImageMouseOver(file: Image) {
    this.buttonEl.toArray().forEach(el => {
      el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
    })
  }
  onImageMouseLeave(file: Image) {
    this.buttonEl.toArray().forEach(el => {
      el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
    })
  }

  // removeImage(file: Image) {
  //   this.images = this.images.filter(i => i !== file);
  // }


  onUploadFile(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }
  AddCode() {

    this.listcode.push(this.codebarre);
    console.log('this', this.listcode);
    this.codebarre = {
      code: "0",
      size: "",
      color: ''
    }
    //  delete this.codebarre.code 
    console.log('thisiheb', this.codebarre.code);

  }
  public addQr(): void {
    this.qrCodeArray.push({ name: '' })
  }
  public deleteQr(index: any): void {
    this.qrCodeArray.splice(index, 1)
  }
  // addModel() {
  //   this.modelService.createModel(this.model).subscribe(data => {
  //     console.log(data);
  //   })
  // }
  // addArticle() {
  //   this.articleService.createArticle(this.article).subscribe(data => {
  //     console.log(data);
  //   })
  // }
  create() {
    console.log('art',this.article);
    console.log('model',this.model);
    
    if (this.article.model) {
      this.article.type='type example'
      this.articleService.createArticle(this.article).subscribe(data => {
        console.log(data);
      })
    }
    else {
      this.model.designation=this.article.designation
      this.model.reference=this.article.reference
      this.modelService.createModel(this.model).subscribe(data => {
        console.log(data); this.modelID = data.id;
        this.article.model = this.modelID
        this.articleService.createArticle(this.article).subscribe(data => {
          console.log(data);
        })
      })
    }
  }
  updateArticle(){
    this.articleService.UpdateArticle(this.id,this.article).subscribe(data=>console.log('update article',data)
    )
  }
}
