import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role } from 'src/app/shared/models/role';
import { ProductService } from 'src/app/shared/service/product.service';
import { RoleService } from 'src/app/shared/service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  originalRoles!: any[];
  roleDialog: boolean = false;
  deleteRoleDialog: boolean = false;
  deleteRolesDialog: boolean = false;
  selectedRole: Role[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rolesID:any=[]
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  roles: Role[] = [];
  rol: Role = {
    designation: '',

    createdBy: ''
  }
  selectAll: boolean = false;
  filtered: string = ''
  filteredRoles!: any[];
  u: any;
  userString: string ='';
  id: string='';



  constructor(private roleService: RoleService, private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllRoles()
    this.userString = localStorage.getItem('currentUser')+'';
   
    
    this.cols = [{ field: 'designation', header: 'Designation' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'createdBy', header: 'Created By' },];
  }
getAllRoles(){
  this.roleService.getAllRole().subscribe(data=>{this.roles=data;
  })
}
  openNew() {
    this.rol = {
    
      designation: '',

      createdBy: ''
    }
    this.submitted = false;
    this.roleDialog = true;
  }

  deleteSelectedRoles() {
    this.deleteRolesDialog = true;
  }
  editRole(id: string) {
    this.roleDialog = true;
    console.log(id);
    
    this.id=id
    this.roleService.getRoleByID(this.id).subscribe(data=>{this.rol=data})
  }
  deleteRole(id: string) {
    this.deleteRoleDialog = true;
 this.id=id
    
  }
confirmDeleteSelected() {
  
  this.roles = this.roles.filter(val => !this.selectedRole.includes(val));
  this.selectedRole.forEach(element => {
    this.roleService.deleteRole(String(element.id)).subscribe(data=>{
    })
  });
  this.messageService.add({ severity: 'success', summary: 'Réussi', detail: 'machines Supprimés', life: 3000 });
  
  this.deleteRolesDialog = false;
  this.selectedRole = [];
}

  confirmDelete() {
   
   this.roleService.deleteRole(this.id).subscribe(data=>{
   ;this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Rôle a été supprimé', life: 3000 });
   ;this.deleteRoleDialog = false;
   this.ngOnInit()
   
  })


  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;

    if (!this.rol.designation) {
      return;
    }

    if (this.rol.id) {
    this.roleService.UpdateRole(this.id,this.rol).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été modifié', life: 3000 });this.getAllRoles()})   
    } else {
      // this.rol.createdBy=this.userString 

     this.roleService.createRole(this.rol.designation).subscribe(data=>{ this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role a été créer', life: 3000 });this.getAllRoles()})
    }
    this.getAllRoles()
    this.roleDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
 
}