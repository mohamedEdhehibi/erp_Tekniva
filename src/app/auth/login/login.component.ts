import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../service/auth.service';
import { HttpClient} from '@angular/common/http';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;
            
            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent {

    user: User = {
        email: '',
        password: '',login:''
    }
    users: any;

    constructor(public http:HttpClient,public router: Router, private authService: AuthService,private messageService:MessageService) { }

    signin() {
        this.authService.login(this.user.email, this.user.password).subscribe(
            data => {
                console.log(data);localStorage.setItem('access_token',data.access_token+'');localStorage.setItem('currentUser',data.login+'')
                
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Connexion ressite', life: 3000 });
            if (data) {
                this.router.navigate(['/']);
            }
        },
            error => {
               
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la connexion', life: 3000 });      
            }
        );

       
    }
}


