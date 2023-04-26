import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { FiliereComponent } from './filiere/filiere.component';
import { GroupeChainesComponent } from './groupe-chaines/groupe-chaines.component';
import { ListeChainesComponent } from './liste-chaines/liste-chaines.component';
import { PostCleComponent } from './post-cle/post-cle.component';
import { WorkshopComponent } from './workshop/workshop.component';

const routes: Routes = [
  {path:'',component:ListeChainesComponent},
  {path:'groupe-chaine',component:GroupeChainesComponent},
  {path:'entreprise',component:CompanyComponent},
  {path:'filiere',component:FiliereComponent},
  {path:'atelier',component:WorkshopComponent},
  {path:'post_cle',component:PostCleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChainesRoutingModule { }
