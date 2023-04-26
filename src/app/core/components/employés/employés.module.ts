import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployésRoutingModule } from './employés-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TabViewModule } from 'primeng/tabview';
import {HttpClient,HttpClientModule}from '@angular/common/http';
import { SpecialityEmployeeComponent } from './speciality-employee/speciality-employee.component';
import { TrainingEmployeeComponent } from './training-employee/training-employee.component';
import { JobEmployeeComponent } from './job-employee/job-employee.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  declarations: [
    NewEmployeeComponent,
    ListEmployeeComponent,
    TrainingEmployeeComponent,
    SpecialityEmployeeComponent,
    JobEmployeeComponent,
    MenuComponent
  
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    EmployésRoutingModule,
    ButtonModule,
		TableModule,
		ProgressBarModule,
    FormsModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    ToastModule,
    ToolbarModule,
   RatingModule,
   RadioButtonModule,
   InputNumberModule,
   DialogModule,
   CalendarModule,
   Ng2SearchPipeModule,
   TabViewModule,
   HttpClientModule,
   ToggleButtonModule,
   SelectButtonModule,
   MultiSelectModule,
  
   MenubarModule
  ],
  providers:[MessageService,ConfirmationService,HttpClient ]
  
  
		
})
export class EmployésModule { }
