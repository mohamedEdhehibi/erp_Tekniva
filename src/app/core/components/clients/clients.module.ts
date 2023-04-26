import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ContactComponent } from './contact/contact.component';
import { OrderComponent } from './order/order.component';
import { SaleConditionsComponent } from './sale-conditions/sale-conditions.component';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { MenuOrderComponent } from './menu-order/menu-order.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    ListeClientComponent,
    ContactComponent,
    OrderComponent,
    SaleConditionsComponent,
    OrderCategoryComponent,
    PaymentMethodComponent,
    DeliveryAddressComponent,
    BillingAddressComponent,
    MenuOrderComponent,
    
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ButtonModule,
		TableModule,
		ProgressBarModule,
    FormsModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    DialogModule,
    Ng2SearchPipeModule,
    InputNumberModule,
    TabViewModule,
    ButtonModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		RadioButtonModule,
		
		CalendarModule,
		PanelModule,
		AccordionModule,
    TabMenuModule,
		StepsModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
   
   
  
  ],
  providers:[MessageService,ConfirmationService ]
})
export class ClientsModule { }