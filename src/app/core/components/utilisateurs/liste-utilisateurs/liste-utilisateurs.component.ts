import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user';
import { RoleService } from 'src/app/shared/service/role.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.scss']
})
export class ListeUtilisateursComponent {
  value!: number;
  paymentOptions: any[] = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3 }
  ];
  originalusers: any[] = [];
  filtered: string = ''
  users: User[] = []
  userDialog: boolean = false;
  user: User = {

    email: '',
    password: '', login: ''
  }
  i: any
  selectAll: boolean = false;
  selectedRole: any
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;
  selectedUsers: User[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  role: Role[] = []
  pass: any
  roleSelect: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  idSelected: string = '';
  filteredusers!: any[];
  userID: any = [];
  constructor(private roleService: RoleService, private messageService: MessageService, private router: Router, private userService: UserService) { }
  ngOnInit() {
    this.allUser()
    this.getRoles()
  }

 // This function deletes selected users
deleteSelectedUsers() {
  console.log(this.selectedUsers); // Log the selected users to the console
  this.deleteUsersDialog = true; // Set the deleteUsersDialog to true
}

// This function gets all users
allUser() {
  this.userService.getAllUser().subscribe(
      data => {
          this.users = data; // Set the users data
      },
      error => {
          console.log(error); // Log any errors to the console
      }
  );
}

// This function gets all roles
getRoles() {
  this.roleService.getAllRole().subscribe(data => {
      this.role = data; // Set the role data
      this.roleSelect = this.role.map((r) => {
          return { label: r.designation, value: r.id }; // Create a new array of role labels and ids
      });
  })
}

// This function opens a new user dialog
openNew() {
  this.submitted = false; // Set the submitted status to false
  this.userDialog = true; // Set the user dialog to true
  this.user = { // Set the user object properties
      email: '',
      password: '',
      login: ''
  }
}

// This function edits a user
editUser(id: string) {
  this.idSelected = id; // Set the selected user id
  this.userService.getUserByID(this.idSelected).subscribe(data => { this.user = data }) // Get the user data and set it to the user object
  this.userDialog = true; // Set the user dialog to true
}

/**
 * Saves the user by either updating or creating a new one
 */
saveUser() {
  this.submitted = true;
  
  // Check if the user has entered a login
  if (!this.user.login) {
    return;
  }

  // If the user already exists, update their information
  if (this.user.id) {
    this.user.role = [Number(this.user.role)];
    let us = {
      email: this.user.email,
      login: this.user.login,
      role: this.user.role,
      password: this.user.password,
    };
    console.log(us);
    this.userService.UpdateUser(this.idSelected, us).subscribe(
      (data) => {
        // Display success message to the user
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Utilisateur a été modifié",
          life: 3000,
        });
        // Retrieve all users
        this.allUser();
        // Hide the user dialog
        this.userDialog = false;
      }
    );
  } 
  // If the user does not exist, create a new one
  else {
    // Set the user's password and role
    this.user.password = this.pass;
    this.user.role = [Number(this.user.role)];
    
    // Send a request to create the user
    this.userService.createUser(this.user).subscribe(
      (data) => {
        // Display success message to the user
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Création ressite",
          life: 3000,
        }); 
        
        // Retrieve all users
        this.allUser();
      },
      // Handle errors
      (error) => {
        console.log(error);
        // If the password is not strong enough, display an error message
        if (error.status === 400 && error.error.message[0] === "password is not strong enough") {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Mot de passe non sécurisé",
            life: 3000,
          });
        }
        // If the email is invalid or empty, display an error message
        if (error.status === 400 && (error.error.message[0] === "mail must be an email" || error.error.message[0] === "email should not be empty")) {
          console.log('cc');

          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Champs doit être un email correct",
            life: 3000,
          });
        } 
        // For any other error, display a generic error message
        else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Erreur lors de connexion ",
            life: 3000,
          });
        }
      }
    );
  }
  
  // Retrieve all users
  this.allUser();
  // Hide the user dialog
  this.userDialog = false;
}

/**
 * Hides the user dialog and resets the submitted flag
 */
hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

/**
 * Sets the ID of the user to be deleted and displays the delete user dialog
 * @param id - The ID of the user to be deleted
 */
deleteUser(id: string) {
  this.idSelected = id
  this.deleteUserDialog = true;
}

/**
 * Confirms deletion of a single user and makes a DELETE request to the server.
 * Displays a success message and updates the user list on success.
 */
confirmDelete() {
  this.deleteUserDialog = false;
  this.userService.deleteUser(this.idSelected).subscribe(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User deleted',
        life: 3000
      });
      this.allUser();
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete user: ' + error.message,
        life: 3000
      });
    }
  );
}

/**
 * Confirms deletion of multiple selected users and makes a DELETE request to the server for each of them.
 * Displays a success message and updates the user list on success.
 */
confirmDeleteSelected() {
  this.users = this.users.filter(val => !this.selectedUsers.includes(val));
  let requests = this.selectedUsers.map((element) => {
    console.log(element.id);
    return this.userService.deleteUser(String(element.id)).toPromise();
  });
  Promise.all(requests).then(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Selected users deleted',
        life: 3000
      });
      this.allUser();
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete users: ' + error.message,
        life: 3000
      });
    }
  );
  this.deleteUsersDialog = false;
  this.selectedUsers = [];
}

}