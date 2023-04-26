import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GammeComponent } from './gamme/gamme.component';
import { OPGammeComponent } from './op-gamme/op-gamme.component';
import { OperationComponent } from './operation/operation.component';

const routes: Routes = [
  {path:'catalogue',component:OperationComponent},
  {path:'gamme',component:GammeComponent},
  {path:'op-gamme',component:OPGammeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodeRoutingModule { }
