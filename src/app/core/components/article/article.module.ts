import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';
import { FamilleComponent } from './famille/famille.component';
import { SousFamilleComponent } from './sous-famille/sous-famille.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NouveauArticleComponent } from './nouveau-article/nouveau-article.component';
import { TabViewModule } from 'primeng/tabview';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

import { SelectButtonModule } from 'primeng/selectbutton';
import { ModeleArticleComponent } from './modele-article/modele-article.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
@NgModule({
  declarations: [
    ArticleComponent,SousFamilleComponent,
    FamilleComponent,
    NouveauArticleComponent,
    ParametrageComponent,
    ModeleArticleComponent,
    DetailsArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
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
		FileUploadModule,
		NgxBarcodeModule,
		TreeModule,
		TreeTableModule, ReactiveFormsModule,

		FormsModule,
		SelectButtonModule

  ],
  providers:[MessageService,ConfirmationService ]

})
export class articleModule { }


