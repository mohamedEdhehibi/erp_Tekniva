import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChainesRoutingModule } from './chaines-routing.module';
import { GroupeChainesComponent } from './groupe-chaines/groupe-chaines.component';
import { ListeChainesComponent } from './liste-chaines/liste-chaines.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CompanyComponent } from './company/company.component';
import { FiliereComponent } from './filiere/filiere.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { PostCleComponent } from './post-cle/post-cle.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuChaineComponent } from './menu-chaine/menu-chaine.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [
    GroupeChainesComponent,
    ListeChainesComponent,
    CompanyComponent,
    FiliereComponent,
    WorkshopComponent,
    PostCleComponent,
    MenuChaineComponent
  ],
  imports: [
    CommonModule,
    ChainesRoutingModule,
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
		MenubarModule,
		MultiSelectModule,
		CalendarModule,
		TabMenuModule,
		StepsModule,
		BreadcrumbModule,
		NgxFileDropModule ,
		NgxIntlTelInputModule,
		
		ReactiveFormsModule,
  ],
  providers:[MessageService,ConfirmationService,EmployésService ]
})
export class ChainesModule { }
