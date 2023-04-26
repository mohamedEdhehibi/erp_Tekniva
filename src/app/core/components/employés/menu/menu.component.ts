import { Component,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  tieredItems: MenuItem[] = [];
  ngOnInit(){
    this.tieredItems = [
      {
          label: 'Liste employés',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/employé'],
          
      },
      // {
      //     label: 'Ajouter employé',
      //     icon: 'pi pi-fw pi-plus',
      //     routerLink: ['/employé/nouveau']
      // },
      {
          label: 'Formations',
          icon: 'pi pi-fw pi-desktop',
          routerLink: ['/employé/training']
      },
      {
          label: 'Spécialités',
          icon: 'pi pi-fw pi-sitemap',
          routerLink: ['/employé/speciality']
      },
      {
          label: 'Titres',
          icon: 'pi pi-fw pi-wrench',
          routerLink: ['/employé/job']
      },
    
      
  ];
  }
}
