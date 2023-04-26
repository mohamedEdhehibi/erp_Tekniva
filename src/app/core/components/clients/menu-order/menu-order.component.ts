import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-order',
  templateUrl: './menu-order.component.html',
  styleUrls: ['./menu-order.component.scss'],
})
export class MenuOrderComponent implements OnInit {
  routeItems: MenuItem[] = [];

  ngOnInit() {
    this.routeItems = [
      {
        label: 'Address de facturation ',
        icon: 'fa-solid fa-shop',
        routerLink: ['/client/address_fac/'],
      },
      {
        label: 'Address de Livraision',
        icon: 'fa-solid fa-house-flag',
        routerLink: ['/client/address_liv/'],
      },
     
      {
        label: 'Categorie commande ',
        icon: 'fa-sharp fa-solid fa-braille',
        routerLink: ['/client/cat_command/'],
      },
 
      {
        label: 'Condition de vente ',
        icon: 'fa-sharp fa-solid fa-bars',
        routerLink: ['/client/condition_vente/'],
      },
      {
        label: 'Méthode de paiment ',
        icon: 'fa-solid fa-sack-dollar',
        routerLink: ['/client/methode_pai/'],
      },
      {
        label: 'Order',
        icon: 'pi pi-fw pi-chevron-right',
        routerLink: ['/client/order'],
      },
      {
        label: 'Client',
        icon: 'pi pi-fw pi-chevron-right',
        routerLink: ['/client'],
      }
    ];
  }
}
