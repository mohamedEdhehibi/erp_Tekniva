import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostCle } from 'src/app/shared/models/post-cle';
import { PostCleService } from 'src/app/shared/service/post-cle.service';

@Component({
  selector: 'app-post-cle',
  templateUrl: './post-cle.component.html',
  styleUrls: ['./post-cle.component.scss']
})
export class PostCleComponent implements OnInit {
  post_cle:PostCle ={
    id:0,
    designation:"",
    code:0,
    priority:0
  }
  post_cleDialog: boolean = false;

  deletepost_cleDialog: boolean = false;

  deletepost_clesDialog: boolean = false;

  post_cles: PostCle[] = [];



  selectedpost_cles: PostCle[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  idSelected: string = '';
  rowsPerPageOptions = [5, 10, 20];
  filtered: string = '';
  originalpost_cles: any[] = [];
  filteredpost_cles!: any[];
  id!: string;
  constructor(
    private post_cleService: PostCleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAllPost();
 
  }
getAllPost(){
  this.post_cleService.getpost_cles().subscribe(data=>{
    this.post_cles=data;
  })
}
  
  openNew() {
    this.post_cle = {id:0,
      designation:"",
      code:0,
      priority:0 };
    this.submitted = false;
    this.post_cleDialog = true;
  }

  deleteSelectedpost_cles() {
    this.deletepost_clesDialog = true;
  }
  editpost_cle(id: string) {
    this.idSelected = id

  this.post_cleService.getpost_cleByID(id).subscribe(data=>{this.post_cle=data})
  
    this.post_cleDialog = true;

  }


  deletepost_cle(id: string) {
    this.deletepost_cleDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletepost_clesDialog = false;
    this.post_cleService.deletepost_cle(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllPost() })
    this.selectedpost_cles = [];
  }

  confirmDelete() {
    this.deletepost_cleDialog = false;
    this.post_cleService.deletepost_cle(this.id).subscribe(data => { this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe chaîne a été supprimé', life: 3000 }); this.getAllPost() })
    this.post_cle = { ...this.post_cle };
  }

  hideDialog() {
    this.post_cleDialog = false;
    this.submitted = false;
  }

  savepost_cle() {
    this.submitted = true;
    console.log();
    
    if(this.idSelected){
      let com={designation:this.post_cle.designation,code:this.post_cle.code,priority:this.post_cle.priority}
    this.post_cleService.Updatepost_cle(this.idSelected, com).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur a été modifié', life: 3000 }); this.getAllPost(); this.post_cleDialog  = false; })
        this.post_cleDialog = false;
      } else {
        //   this.post_cle.image = 'post_cle-placeholder.svg';
        // @ts-ignore
        // this.post_cle.inventoryStatus = this.post_cle.inventoryStatus ? this.post_cle.inventoryStatus.value : 'INSTOCK';
        this.post_cles.push(this.post_cle);

        this.post_cles = [...this.post_cles];

        this.post_cleDialog = false;
        this.post_cle = { ...this.post_cle };
      
        let ch ={designation:this.post_cle.designation,code:this.post_cle.code,priority:this.post_cle.priority};
        this.post_cleService.createpost_cle(ch).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'post_cle Created',
            life: 3000,
          });
          this.getAllPost();
        });
        
      }
    }
  }
  