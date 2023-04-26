import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../service/auth.service';

@Component({
	templateUrl: './register.component.html'
})
export class RegisterComponent {
user:User={
	email: '',
	password: '',login:''
}
confirmed: boolean = false;
constructor(public router: Router,private authService:AuthService,private messageService:MessageService) {}

///////////////////////////////Backend////////////////////////////////////////////////////////////
signup() {
	this.authService.register(this.user).subscribe(
		(data) => {
			this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Création ressite', life: 3000 });this.router.navigate(['auth/login'])
		},
		(error) => {
			if(this.user.password.length<5) {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mot de passe non sécurisé', life: 3000 });
			}else{
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de connexion', life: 3000 })};
		}
	);
}

}
