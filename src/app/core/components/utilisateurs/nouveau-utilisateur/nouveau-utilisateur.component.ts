import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-nouveau-utilisateur',
  templateUrl: './nouveau-utilisateur.component.html',
  styleUrls: ['./nouveau-utilisateur.component.scss']
})
export class NouveauUtilisateurComponent implements OnInit { 
  user:User={

    email: '',
    password: '',
    login:''
  
  }
  constructor(public router: Router,private userService:UserService,private messageService:MessageService) {}
  ngOnInit() {
  }
  addUser(){
    this.userService.createUser(this.user).subscribe(
       data => {
           this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur est créer', life: 3000 });
       },
       error => {
           if(error.status === 409) {
               this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email existe déjà', life: 3000 });
           } if(this.user.password.length<5) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mot de passe non sécurisé', life: 3000 });
          }else {
           } if(this.user.password.length<1||this.user.email.length<1||this.user.login.length<1) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'le champ ne peut pas être vide', life: 3000 });
          }else {
               this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la création', life: 3000 });
           }
       }
    );
   }
}