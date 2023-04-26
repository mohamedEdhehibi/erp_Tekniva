import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilleMachinesComponent } from './famille-machines/famille-machines.component';
import { ListeMachinesComponent } from './liste-machines/liste-machines.component';
import { TypeMachineComponent } from './type-machine/type-machine.component';

const routes: Routes = [
  {path:'',component:ListeMachinesComponent},
  {path:'famille',component:FamilleMachinesComponent},
  {path:'type',component:TypeMachineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule { }
