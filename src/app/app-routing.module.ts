import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '',data: { breadcrumb: 'CRM  | Tableau de bord' }, loadChildren: () => import('./core/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'utilisateur', loadChildren: () => import('./core/components/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
            { path: 'employé', loadChildren: () => import('./core/components/employés/employés.module').then(m => m.EmployésModule) },
            { path: 'chaine', loadChildren: () => import('./core/components/chaines/chaines.module').then(m => m.ChainesModule) },
            { path: 'client',data: { breadcrumb: 'CRM  | Liste Client' }, loadChildren: () => import('./core/components/clients/clients.module').then(m => m.ClientsModule) },
            { path: 'machine', loadChildren: () => import('./core/components/machines/machine.module').then(m => m.MachineModule) },
            { path: 'article',data: { breadcrumb: 'CRM  | article' }, loadChildren: () => import('./core/components/article/article.module').then(m => m.articleModule) },
            { path: 'methode', loadChildren: () => import('./core/components/methodes/methode.module').then(m => m.MethodeModule) },
        ]
    },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
