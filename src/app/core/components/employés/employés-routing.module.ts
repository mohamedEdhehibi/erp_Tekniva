import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobEmployeeComponent } from './job-employee/job-employee.component';
import { ListEmployeeComponent} from './list-employee/list-employee.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { SpecialityEmployeeComponent } from './speciality-employee/speciality-employee.component';
import { TrainingEmployeeComponent } from './training-employee/training-employee.component';

const routes: Routes = [
  {path:'',component:ListEmployeeComponent},
  {path:'nouveau',component:NewEmployeeComponent},
  {path:'training',component:TrainingEmployeeComponent},
  {path:'speciality',component:SpecialityEmployeeComponent},
  {path:'job',component:JobEmployeeComponent},
];

@NgModule({
  imports:
   [RouterModule.forChild(routes),
  ],
 
  exports:
   [RouterModule]
})

export class EmployésRoutingModule { }

     
  