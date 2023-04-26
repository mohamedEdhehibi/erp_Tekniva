import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-chaine',
  templateUrl: './menu-chaine.component.html',
  styleUrls: ['./menu-chaine.component.scss'],
})
export class MenuChaineComponent implements OnInit {
  routeItems: MenuItem[] = [];

  ngOnInit() {
    this.routeItems = [
      {
        label: 'Entreprise',
        icon: 'fa-solid fa-hotel',
        routerLink: ['/chaine/entreprise'],
      },
      {
        label: 'Filiere',
        icon: 'fa-solid fa-plant-wilt',
        routerLink: ['/chaine/filiere'],
      },
      {
        label: 'Atelier',
        icon: 'fa-solid fa-house-circle-check',
        routerLink: ['/chaine/atelier'],
      },
      {
        label: 'Groupe Chaine',
        icon: 'pi pi-fw pi-chevron-right',
        routerLink: ['/chaine/groupe-chaine'],
      },
      {
        label: 'Poste clé',
        icon: 'fa-solid fa-people-arrows',
        routerLink: ['/chaine/post_cle'],
      },
      {
        label: 'Liste Chaine',
        icon: 'pi pi-fw pi-bars',
        routerLink: ['/chaine'],
      },
    ];
  }
}
