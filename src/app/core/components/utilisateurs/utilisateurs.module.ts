import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { NouveauUtilisateurComponent } from './nouveau-utilisateur/nouveau-utilisateur.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { RolesComponent } from './roles/roles.component';
import { CalendarModule } from 'primeng/calendar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    NouveauUtilisateurComponent,
    ListeUtilisateursComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
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
export class UtilisateursModule { }
