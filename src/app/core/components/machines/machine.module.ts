import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListeMachinesComponent } from './liste-machines/liste-machines.component';
import { FamilleMachinesComponent } from './famille-machines/famille-machines.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TypeMachineComponent } from './type-machine/type-machine.component';
import { ChaineMachineComponent } from './chaine-machine/chaine-machine.component';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [ListeMachinesComponent,FamilleMachinesComponent, TypeMachineComponent, ChaineMachineComponent],
  imports: [
    CommonModule,
    MachineRoutingModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		CalendarModule,
		Ng2SearchPipeModule,
		ChipsModule,
		MultiSelectModule,
		BreadcrumbModule
  ],
  providers:[MessageService,ConfirmationService ]
})
export class MachineModule { }
