import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { FamilleComponent } from './famille/famille.component';
import { ModeleArticleComponent } from './modele-article/modele-article.component';
import { NouveauArticleComponent } from './nouveau-article/nouveau-article.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { SousFamilleComponent } from './sous-famille/sous-famille.component';
import { DetailsArticleComponent } from './details-article/details-article.component';

const routes: Routes = [
  {path:'',component:ArticleComponent},
  {path:'add_article',component:NouveauArticleComponent},
  {path:'sous-famille',data: { breadcrumb: ' | sous-famille' },component:SousFamilleComponent},
  {path:'famille',component:FamilleComponent},
  {path:'parametrage',component:ParametrageComponent},
  {path:'modele',component:ModeleArticleComponent},
  {path:'modele/:idM',component:ModeleArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
