import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { truncateSync } from 'fs';
import { Model } from 'src/app/shared/models/article/model';
import { SizeChart } from 'src/app/shared/models/article/size-chart';
import { BrandService } from 'src/app/shared/service/article/brand.service';
import { ComplexityService } from 'src/app/shared/service/article/complexity.service';
import { DiscountService } from 'src/app/shared/service/article/discount.service';
import { FamilleArticleService } from 'src/app/shared/service/article/famille-article.service';
import { ModelService } from 'src/app/shared/service/article/model.service';
import { SeasonService } from 'src/app/shared/service/article/season.service';
import { SizeChartService } from 'src/app/shared/service/article/size-chart.service';
import { SousFamilleArticleService } from 'src/app/shared/service/article/sousFamille-article.service';
import { TvaService } from 'src/app/shared/service/article/tva.service';

@Component({
  selector: 'app-modele-article',
  templateUrl: './modele-article.component.html',
  styleUrls: ['./modele-article.component.scss']
})
export class ModeleArticleComponent{
model:Model={
  designation: "",
    reference: "",
    categorie_controle: "",
    AQL_critique: "",
    AQL_majeur: "",
    AQL_mineur: "",
    attachements: "",
    brand: undefined,
    complexity: undefined,
    tva: undefined,
    season: undefined,
    discount: undefined,
    sizeChart: undefined,
    subFamily: undefined
}
 update=false
  tvaSelect!:any[];
  discountSelect!: any[];
  brandSelect!: any[];
  subFamSelect!: any[];
  seasonSelect!: any[];
  complexitySelect!: any[];
  gridSelect!: any[];
constructor(private ModeleService : ModelService,
   private brandService:BrandService ,
   private tvaService :TvaService,
    private discountService : DiscountService,
    private suFamArticleService:SousFamilleArticleService,
    private seasonService : SeasonService,
    private complexityService : ComplexityService,
    private sizeChartService : SizeChartService,
    private route : ActivatedRoute
    ){}
uploadedFiles = ['']
images = ['']
id!:any
ngOnInit(){
  this.id=this.route.snapshot.params['idM']
this.getBrand();
this.getDiscount();
this.getTva();
this.getComplexity();
this.getGrid();
this.getSubFamily();
this.getSeason();
if(this.id!==undefined){
  this.update=true
  this.getModelById()
}

}


getModelById(){
  this.ModeleService.getModelByID(this.id).subscribe(data=>this.model=data)
}

onUploadFile(event: any) {
  for (const file of event.files) {
    this.uploadedFiles.push(file);
  }

}
onUpload(event: any) {
  for (let file of event.files) {
    this.images.push(file);
  }
}
createModel(){
  this.ModeleService.createModel(this.model).subscribe(data=>{console.log("data",data);
  })
}
getTva() {
  this.tvaService.getAllTVA().subscribe(data => {
   console.log('dataa',data);
   
    this.tvaSelect =data.map((r) => {
      return { label: r.taux, value: r.id };
    });
  })
}
getDiscount() {
  this.discountService.getAllDiscounts().subscribe(data => {
    this.discountSelect = data.map((r) => {
      return { label: r.taux, value: r.id }
    });
  })
}
getBrand() {
  this. brandService.getAllBrands().subscribe(data => {
    this.brandSelect =data.map((r) => {
      return { label: r.designation, value: r.id }
    });
  })
}

getSubFamily(){
  
    this.suFamArticleService.getAllSubFamArticles().subscribe(data=>{
      this.subFamSelect = data.map(r=>{
        return {label:r.designation , value : r.id}
      })
    }
      )
  
  
}
getSeason() {
  this. seasonService.getAllSeasons().subscribe(data => {
    this.seasonSelect = data.map((r) => {
      return { label: r.designation, value: r.id }
    });
  })
}
getComplexity() {
  this.complexityService.getAllComplexitys().subscribe(data => {
   
    this.complexitySelect = data.map((r) => {

      return { label: r.designation, value: r.id };
    });
  })
}
getGrid() {
  this.sizeChartService.getAllSizeCharts().subscribe(data => {
    this.gridSelect = data.map((r) => {
      return { label: r.designation, value: r.id };
    });
  })
}

updateModele(){
this.ModeleService.UpdateModel(this.id,this.model).subscribe(data=>{console.log('update modele',data);
})
}

}
