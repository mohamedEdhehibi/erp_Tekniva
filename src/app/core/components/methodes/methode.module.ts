import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodeRoutingModule } from './methode-routing.module';
import { GammeComponent } from './gamme/gamme.component';
import { OPGammeComponent } from './op-gamme/op-gamme.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OperationComponent } from './operation/operation.component';



@NgModule({
  declarations: [
    GammeComponent,
    OPGammeComponent,
    OperationComponent,
  ],
  imports: [
    CommonModule,
    MethodeRoutingModule,
    CommonModule,
		ButtonModule,
		TableModule,
	 	ProgressBarModule,
    FormsModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		SelectButtonModule,
		CalendarModule,
		Ng2SearchPipeModule,

  
  ],
  providers:[MessageService,ConfirmationService ]
})
export class MethodeModule { }
