import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { NouveauUtilisateurComponent } from './nouveau-utilisateur/nouveau-utilisateur.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {path:'',component:ListeUtilisateursComponent},
  {path:'nouveau',component:NouveauUtilisateurComponent},
  {path:'role',component:RolesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
