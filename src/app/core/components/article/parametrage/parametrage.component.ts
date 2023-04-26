import { Component,HostListener, Pipe } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom, Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/article/brand';
import { Color } from 'src/app/shared/models/article/color';
import { Complexity } from 'src/app/shared/models/article/complexity';
import { Discount } from 'src/app/shared/models/article/discount';
import { Season } from 'src/app/shared/models/article/season';
import { Size } from 'src/app/shared/models/article/size';
import { SizeChart } from 'src/app/shared/models/article/size-chart';
import { Tva } from 'src/app/shared/models/article/tva';
import { BrandService } from 'src/app/shared/service/article/brand.service';
import { ColorService } from 'src/app/shared/service/article/color.service';
import { ComplexityService } from 'src/app/shared/service/article/complexity.service';
import { DiscountService } from 'src/app/shared/service/article/discount.service';
import { SeasonService } from 'src/app/shared/service/article/season.service';
import { SizeChartService } from 'src/app/shared/service/article/size-chart.service';
import { SizeService } from 'src/app/shared/service/article/size.service';
import { TvaService } from 'src/app/shared/service/article/tva.service';


@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent {

  products: any;
  show=false
  edit=false
  colorDialog=false
  deletecolorDialog=false;
  msg="Ajouter"
  complexityDialog=false;
 

  observable: Observable<any> | undefined;
  @HostListener('click') onHostClicked() : void {    
this.getAllSizeChart()
this.getAllColor();
this.getAllComplexity()
this.getAllSize();
this.getAllSeason()
this.getAllBrand();
this.getAllTva();
this.getAllDiscount();
// if(this.Size.sizeChart !== undefined){
//   console.log('aaa',this.Size.sizeChart);
  
//   this.getSizeById(this.Size.sizeChart)
// }
} 

  constructor(
    private colorService:ColorService,
    private  messageService: MessageService,
    private sizeChartService:SizeChartService,
    private sizeService:SizeService,
    private complexityService:ComplexityService,
    private SeasonService : SeasonService,
    private BrandService : BrandService,
    private tvaService:TvaService,
    private discountService:DiscountService,
    
    ) {
      
      //this.observable = this.getSizeById(this.Size.sizeChart);
    }

 ngOnInit(){
 }


///////// Complexity part //////////
allComplexity:Complexity[]=[];
complexity:Complexity={
  designation: '',
  taux:0
};

 getAllComplexity(){
  this.complexityService.getAllComplexitys().subscribe(data=>this.allComplexity=data)
 }
 AddComplexity(){
  this.complexityService.createComplexity(this.complexity).subscribe(data=>{console.log("create",data)
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Complexité crée', life: 3000 });
 }
 UpdateComplexity(id:any,data:Complexity){
  this.complexityService.UpdateComplexity(id,data).subscribe(data=>{console.log("update",data), 
  this.msg="Ajouter"
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Complexité modifie', life: 3000 });
})
 }
 DeleteComplexity(id:any){
  this.complexityService.deleteComplexity(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Complexité supprimé', life: 3000 });
 }
 
 d=""
  l=0
 editComplexity(complexity: Complexity) {
  this.l++
  this.complexity = { ...complexity };
  this.complexityDialog = true;
  
  
   if(this.d === complexity.id && this.l%2 === 0){
    this.edit=false
    this.d = complexity.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Ajouter"
    this.complexity={ designation: '',
    taux: 0}
  }
  else{
       this.d = complexity.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Edit"
    this.edit=true
  }
  
}
SubmitComplexity(){
  if(this.edit===false){
   this.AddComplexity()
  }else{
    this.UpdateComplexity(this.complexity.id,this.complexity)
  }
  this.complexity={ designation: '',
  taux: 0}
}


///////// color part //////////

allColor:Color[]=[];
color:Color={
  designation: '',
  code: ''
};

 getAllColor(){
  this.colorService.getAllColors().subscribe(data=>this.allColor=data)
 }
 AddColor(){
  this.colorService.createColor(this.color).subscribe(data=>{console.log("create",data)

 
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Couleur crée', life: 3000 });
 }
 UpdateColor(id:any,data:Color){
  this.colorService.UpdateColor(id,data).subscribe(data=>{console.log("update",data), 
  this.msg="Ajouter"
  
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Couleur modifié', life: 3000 });
})
 
 }
 DeleteColor(id:any){
  this.colorService.deleteColor(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Couleur supprimé', life: 3000 });
 }
  a=""
  i=0
 editColor(color: Color) {
  this.i++
  this.color = { ...color };
  this.colorDialog = true;

  
   if(this.a === color.id && this.i%2 === 0){
    this.a = color.id
    this.edit=false
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Ajouter"
    this.color={ designation: '',
    code: ''}
  }
  else{
       this.a = color.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Edit"
    this.edit=true
  }
  
}
Submit(){
  if(this.edit===false){
   this.AddColor()
  }else{
    this.UpdateColor(this.color.id,this.color)
  }
  this.color={ designation: '',
  code: ''}
}



//////////// size chart part  ///////

allSizeChart:SizeChart[]=[];
SizeChart:SizeChart={
  designation: '',
  code: ''
};
SizeChartDialog=false
 getAllSizeChart(){
  this.sizeChartService.getAllSizeCharts().subscribe(data=>{this.allSizeChart=data})
 
 }
 AddSizeChart(){
  this.sizeChartService.createSizeChart(this.SizeChart).subscribe(data=>{console.log("create",data)
 
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Grille des Tailles crée', life: 3000 });
 }
 UpdateSizeChart(id:any,data:SizeChart){
  this.sizeChartService.UpdateSizeChart(id,data).subscribe(data=>{console.log("update",data), 
 
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Grille des modifieé', life: 3000 });
})
 
 }
 DeleteSizeChart(id:any){
  this.sizeChartService.deleteSizeChart(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'grille des tailles supprimé', life: 3000 });
 }
 b=""
  j=0
 editSizeChart(SizeChart: SizeChart) {
  this.j++
  this.SizeChart = { ...SizeChart };
  this.SizeChartDialog = true;

  
   if(this.b === SizeChart.id && this.j%2 === 0){
     this.edit=false
     this.msg="Ajouter"
    this.SizeChart={ designation: '',
    code: ''}
  }
  else{ 
    this.msg="Edit"
    JSON.parse(JSON.stringify(this.msg))
    this.b = SizeChart.id
    this.edit=true
  }
  
  
}
SubmitSizeChart(){
  if(this.edit===false){
   this.AddSizeChart()
  }else{
    this.UpdateSizeChart(this.SizeChart.id,this.SizeChart)
    this.msg="Ajouter"
  }
  this.SizeChart={ designation: '',
  code: ''}
}

////////////////////// Sizes ////////////////////

allSize:Size[]=[];
Size:Size={
  designation: '',
  size_order: '',
  sizeChart: 0
};
SizeDialog=false
 getAllSize(){
  this.sizeService.getAllSize().subscribe(data=>this.allSize=data)
 }
 AddSize(){
  this.sizeService.createSize(this.Size).subscribe(data=>{console.log("create",data)
 
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Taille  crée', life: 3000 });
 }
 UpdateSize(id:any,data:Size){
  this.sizeService.UpdateSize(id,data).subscribe(data=>{console.log("update",data), 
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Taillee  modifieé', life: 3000 });
})
 
 }
 DeleteSize(id:any){
  this.sizeService.deleteSize(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Taille supprimé', life: 3000 });
 }
 m=""
  k=0
  select='Selectionner'
 editSize(Size: any) {
  this.k++
  this.Size = { ...Size};
  this.SizeDialog = true; 
   if(this.m === Size.id && this.k%2 === 0){
    this.select='selectionner'
     this.edit=false
     this.m = Size.id
     this.msg="Ajouter"
 
    this.Size={ designation: '',size_order: '',
    sizeChart: 0}
  }
  else{
    this.Size.sizeChart=Size.sizeChart.code
    console.log('dataaaaaaa',this.Size.sizeChart);
    this.msg="Edit"
    this.m = Size.id
    this.edit=true
    this.Size.sizeChart=Size.sizeChart.id
  }
  
}
SubmitSize(){
  if(this.edit===false){
    this.AddSize()
  }else{
    console.log('ediiiit',this.Size);
    
    this.UpdateSize(this.Size.id,this.Size)
    this.msg="Ajouter"
  }
  this.Size={ designation: '',
  size_order: '',
  sizeChart: 0}
}
// sizeId!:any
//  getSizeById(id : number){
//     (this.sizeChartService.getSizeChartByID(id+"").subscribe(data=>{
//       console.log('tesst',data.code);
//       this.sizeId={label:data.code,value:data.id}
//     }))
// }

//////////////season Part /////////

allSeason:Season[]=[];
Season:Season={
  designation: '',
  code: ''
};
SeasonDialog=false
 getAllSeason(){
  this.SeasonService.getAllSeasons().subscribe(data=>this.allSeason=data)
 }
 AddSeason(){
  this.SeasonService.createSeason(this.Season).subscribe(data=>{console.log("create",data)
  
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Saison  crée', life: 3000 });
 }
 UpdateSeason(id:any,data:Season){
  this.SeasonService.UpdateSeason(id,data).subscribe(data=>{console.log("update",data), 

  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Saison  modifieé', life: 3000 });
})
 
 }
 DeleteSeason(id:any){
  this.SeasonService.deleteSeason(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Saison supprimé', life: 3000 });
 }
  c=""
  p=0
 editSeason(Season: Season) {
  this.p++
  this.Season = { ...Season };
  this.SeasonDialog = true;
  
  
   if(this.c === Season.id && this.p%2 === 0){
     this.edit=false
     this.c = Season.id
     this.msg="Ajouter"
     JSON.parse(JSON.stringify(this.msg));
    this.Season={ designation: '',code:''}
  }
  else{
    
    this.msg="Edit"
    JSON.parse(JSON.stringify(this.msg))
    this.c = Season.id
    this.edit=true


  }
  
}
SubmitSeason(){
  if(this.edit===false){
    this.AddSeason()
  }else{
    this.UpdateSeason(this.Season.id,this.Season)
    this.msg="Ajouter"

  }
  this.Season={ designation: '',
  code: ''}
}
//////////////  Brand  Part /////////
allBrands:Season[]=[];
brand:Brand={
  designation: '',
  code: ''
};
BrandDialog=false
 getAllBrand(){
  this.BrandService.getAllBrands().subscribe(data=>this.allBrands=data)
 }
 AddBrand(){
  this.BrandService.createBrand(this.brand).subscribe(data=>{console.log("create",data)

})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Marque  crée', life: 3000 });
 }
 UpdateBrand(id:any,data:Brand){
  this.BrandService.UpdateBrand(id,data).subscribe(data=>{console.log("update",data), 
 
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Marque  modifieé', life: 3000 });
})
 
 }
 DeleteBrand(id:any){
  this.BrandService.deleteBrand(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Marque supprimé', life: 3000 });
 }
  f=""
  q=0
 editBrand(brand: Brand) {
  this.q++
  this.brand = { ...brand};
  this.SeasonDialog = true;
  
  
   if(this.f === brand.id && this.q%2 === 0){
     this.edit=false
     this.c = brand.id
     this.msg="Ajouter"
    this.brand={ designation: '',code:''}
  }
  else{
    this.msg="Edit"
    this.f = brand.id
    this.edit=true
    
  }
}
SubmitBrand(){
  if(this.edit===false){
    this.AddBrand()
  }else{
    this.UpdateBrand(this.brand.id,this.brand)
    this.msg="Ajouter"
  }
  this.brand={ designation: '',
  code: ''}
}
///////////////// Tva Part //////////
allTva:Tva[]=[];
Tva:Tva={
  designation: '',
  taux:0
};

 getAllTva(){
  this.tvaService.getAllTVA().subscribe(data=>this.allTva=data)
 }
 AddTva(){
  this.tvaService.createTVA(this.Tva).subscribe(data=>{console.log("create",data)

 
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Tva crée', life: 3000 });
 }
 UpdateTva(id:any,data:Tva){
  this.tvaService.UpdateTVA(id,data).subscribe(data=>{console.log("update",data), 
  this.msg="Ajouter"

  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Tva modifie', life: 3000 });
})
 
 }
 DeleteTva(id:any){
  this.tvaService.deleteTVA(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Tva supprimé', life: 3000 });
 }
  n=""
  x=0
 editTva(tva: Tva) {
  this.x++
  this.Tva = { ...tva }; 
   if(this.n === tva.id && this.x%2 === 0){
    this.edit=false
    this.n = tva.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Ajouter"
    this.Tva={ designation: '',
    taux: 0}
  }
  else{
       this.n = tva.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Edit"
    this.edit=true
  }
  
}
SubmitTva(){
  if(this.edit===false){
    this.AddTva()
  }else{
    this.UpdateTva(this.Tva.id,this.Tva)
    this.msg="Ajouter"
    this.edit=false
  }
  this.Tva={ designation: '',
  taux: 0}
}

///////////////// discount Part //////////
allDiscount:Discount[]=[];
discount:Discount={
  designation: '',
  taux:0
};

 getAllDiscount(){
  this.discountService.getAllDiscounts().subscribe(data=>this.allDiscount=data)
 }
 AddDiscount(){
  this.discountService.createDiscount(this.discount).subscribe(data=>{console.log("create",data)

 
})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Remise crée', life: 3000 });
 }
 UpdateDiscount(id:any,data:Discount){
  this.discountService.UpdateDiscount(id,data).subscribe(data=>{console.log("update",data), 
  this.msg="Ajouter"

  this.edit=false
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Remise modifie', life: 3000 });
})
 
 }
 DeleteDiscount(id:any){
  this.discountService.deleteDiscount(id).subscribe(data=>{console.log("delete",data)})
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'Remise supprimé', life: 3000 });
 }
  s=""
  v=0
 editDiscount(disc: Discount) {
  this.v++
  this.discount = { ...disc }; 
   if(this.s === disc.id && this.v%2 === 0){
    this.edit=false
    this.s = disc.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Ajouter"
    this.discount=Object.assign({})
  }
  else  {
       this.s = disc.id
    JSON.parse(JSON.stringify(this.msg))
    this.msg="Edit"
    this.edit=true
  }
  
}
SubmitDiscount(){
  console.log(this.edit,this.discount);
  
  if(this.edit===false){
    this.AddDiscount()
    this.discount=Object.assign({})
  }else{
    this.UpdateDiscount(this.discount.id,this.discount)
    this.msg="Ajouter"
    this.discount=Object.assign({})
  }

}



}

