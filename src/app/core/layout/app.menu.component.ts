import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  styles: [
    `
      :host ::ng-deep {
        .c-icons {
          width: 25px;
          height: 25px;
        }

        .client {
            background-image: url(../../../assets/layout/images/crm12.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
        .plan {
            background-image: url(../../../assets/layout/images/plani.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
        .methode{
            background-image: url(../../../assets/layout/images/methode.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
        .montrice{
            background-image: url(../../../assets/layout/images/monitrice.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
        .rh{
            background-image: url(../../../assets/layout/images/rh.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
        .maint{
            background-image: url(../../../assets/layout/images/maint1.png);
                      /* background-position: center; */
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    `,
  ],
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    // this.model = [
    //     {
    //         label: 'Dashboards',
    //         icon: 'pi pi-home',
    //         routerLink: ['/']
    //     },
    //     {
    //         label: 'Gestion des Utilisateurs',
    //         icon: 'pi pi-user-edit',
    //         items: [
    //             {
    //                 label: 'Liste Utilisateurs',
    //                 icon: 'pi pi-fw pi-users',
    //                 routerLink:['utilisateur']
    //             },
    //             {
    //                 label: 'Rôle',
    //                 icon: 'pi pi-fw pi-wrench',
    //                 routerLink: ['utilisateur/role']
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Gestion des Articles',
    //         icon: 'pi pi-shopping-bag',
    //         items: [
    //             {
    //                 label: 'Liste Articles',
    //                 icon: 'pi pi-fw pi-list',
    //                 routerLink:['article']
    //             },
    //             {
    //                 label: 'Famille',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['article/famille']
    //             },
    //             {
    //                 label: 'Sous Famille',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['article/sous-famille']
    //             }
    //             ,
    //             {
    //                 label: 'Nouveau Article',
    //                 icon: 'pi pi-fw pi-fw pi-plus',
    //                 routerLink: ['article/add_article']
    //             }
    //             ,
    //             {
    //                 label: 'Paramétrage',
    //                 icon: 'pi pi-fw pi-fw pi-cog',
    //                 routerLink: ['article/parametrage']
    //             },
    //             {
    //                 label: 'Modele',
    //                 icon: 'pi pi-fw pi-fw pi-cog',
    //                 routerLink: ['article/modele']
    //             }
    //         ]
    //     },{
    //         label: 'Méthodes',
    //         icon: 'pi pi-fw  pi-desktop',
    //         items: [
    //             {
    //                 label: 'Catalogue',
    //                 icon: 'pi pi-fw pi-briefcase',
    //                 routerLink: ['/methode/catalogue']
    //             },
    //             {
    //                 label: 'Gamme',
    //                 icon: 'pi pi-fw pi-cog',
    //                 routerLink: ['/methode/gamme']
    //             },
    //         ]
    //     },
    //     {
    //         label: 'gestion des chaines de production',
    //         // icon: 'pi pi-cog',
    //        icon: 'fa-solid fa-people-line',
    //         items: [
    //             {
    //                 label: 'Liste des chaines',
    //                 icon: 'pi pi-fw pi-bars',
    //                 routerLink: ['chaine']
    //             },
    //             {
    //                 label: 'groupe des chaines',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['/chaine/groupe-chaine']
    //             },
    //             {
    //                 label: 'entreprise',
    //                 icon: 'fa-solid fa-hotel',
    //                 routerLink: ['/chaine/entreprise']
    //             },
    //             {
    //                 label: 'filiere',
    //                 icon: 'fa-solid fa-plant-wilt',
    //                 routerLink: ['/chaine/filiere']
    //             },
    //             {
    //                 label: 'atelier',
    //                 icon: 'fa-solid fa-house-circle-check',
    //                 routerLink: ['/chaine/atelier']
    //             },
    //             {
    //                 label: 'post_cle',
    //                 icon: 'fa-solid fa-people-arrows',
    //                 routerLink: ['/chaine/post_cle']
    //             },
    //         ]
    //     },
    //     {
    //         label: 'gestion  des machines',
    //           icon: 'fa-solid fa-plug-circle-bolt',
    //           items: [

    //             {
    //                 label: 'Liste des machines',
    //                 icon: 'pi pi-fw pi-bars',
    //                 routerLink: ['machine']
    //             },
    //             {
    //                 label: 'Famille des machines',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['/machine/famille']
    //             },
    //             {
    //                 label: 'Type des machines',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['/machine/type']
    //             }

    //         ]
    //     },
    //     { separator: true },
    //     {
    //         label: 'Gestion des employés',
    //         icon: 'pi pi-fw pi-users',
    //         items: [
    //             {
    //                 label: 'Liste employées',
    //                 icon: 'pi pi-fw pi-list',
    //                 routerLink: ['employé']
    //             },
    //             {
    //                 label: 'Nouveau Employées',
    //                 icon: 'pi pi-fw pi-plus',
    //                 routerLink: ['employé/nouveau']

    //             },
    //             {
    //                 label: 'Formations',
    //                 icon: 'pi pi-fw pi-desktop',
    //                 routerLink: ['employé/training']

    //             },
    //             {
    //                 label: 'Specialité',
    //                 icon: 'pi pi-fw pi-sitemap',
    //                 routerLink: ['employé/speciality']
    //             },
    //             {
    //                 label: 'Titre',
    //                 icon: 'pi pi-fw pi-wrench',
    //                 routerLink: ['employé/job']
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Gestion des clients',
    //         icon: 'pi pi-fw pi-id-card',
    //         items: [
    //             {
    //                 label: 'List client',
    //                 icon: 'pi pi-fw pi-list',
    //                 routerLink: ['/client']
    //             },
    //             {
    //                 label: 'contacts',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['/client/contacts']
    //             },

    //             {
    //                 label: 'Order',
    //                 icon: 'pi pi-fw pi-chevron-right',
    //                 routerLink: ['/client/order'],

    //             },

    //         ]
    //     },
    //     { separator: true },

    // ]
    this.model = [
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'CRM',
            icon: 'c-icons client',
            items: [
              {
                label: 'tableau de bord',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/'],
              },
              {
                label: 'Article',
                icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/article'],
              },
              {
                label: 'Article de base',
                icon: 'fa-solid fa-cart-shopping',
                routerLink: ['/article/sous-famille'],
              },
              {
                label: 'List client',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/client'],
              },
            ],
          },
        ],
      },
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Planification',
            icon: 'c-icons plan',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
        ],
      },
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Méthode',
            icon: 'c-icons methode',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
        ],
      },
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Monitrice',
            icon: 'c-icons montrice',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
        ],
      },
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'RH',
            icon: 'c-icons rh',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
        ],
      },
      {
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Maintenance',
            icon: 'c-icons maint',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-image',
                routerLink: ['/apps/blog/list'],
              },
              {
                label: 'Detail',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/blog/detail'],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/apps/blog/edit'],
              },
            ],
          },
        ],
      },
    ];
  }
}
