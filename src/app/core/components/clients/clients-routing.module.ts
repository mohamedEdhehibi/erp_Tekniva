import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@fullcalendar/core/preact';

import { BillingAddressComponent } from './billing-address/billing-address.component';
import { ContactComponent } from './contact/contact.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';

import { ListeClientComponent } from './liste-client/liste-client.component';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { OrderComponent } from './order/order.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { SaleConditionsComponent } from './sale-conditions/sale-conditions.component';

const routes: Routes = [
  {path:'',component: ListeClientComponent},
  {path:'contacts',component: ContactComponent},
  {path:'order',component: OrderComponent},
  {path:'cat_command',component: OrderCategoryComponent},
  {path:'methode_pai',component: PaymentMethodComponent},
  {path:'address_liv',component: DeliveryAddressComponent},
  {path:'address_fac',component: BillingAddressComponent},
  {path:'condition_vente',component: SaleConditionsComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
