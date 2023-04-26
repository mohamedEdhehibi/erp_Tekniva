import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import { Chaine } from 'src/app/shared/models/chaine';
import { Employee } from 'src/app/shared/models/Employee';
import { groupeChaine } from 'src/app/shared/models/groupe_chaine';
import { Machine } from 'src/app/shared/models/machine';
import { MachineChaine } from 'src/app/shared/models/machine-chaine';
import { ChaineMachineService } from 'src/app/shared/service/chaine-machine.service';

import { ChaineService } from 'src/app/shared/service/chaine.service';
import { EmployésService } from 'src/app/shared/service/employee.service';
import { GroupeChaineService } from 'src/app/shared/service/Groupe_Chaine.service';
import { MachineService } from 'src/app/shared/service/machine.service';
import { PostCleService } from 'src/app/shared/service/post-cle.service';
import { WorkshopService } from 'src/app/shared/service/workshop.service';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-liste-chaines',
  templateUrl: './liste-chaines.component.html',
  styleUrls: ['./liste-chaines.component.scss'],
})
export class ListeChainesComponent implements OnInit {
  idSelected: string = '';
  filtered: string = '';
  chaineDialog: boolean = false;
  originalchaines: any[] = [];
  filteredchaines!: any[];
  deletechaineDialog: boolean = false;
  deletechainesDialog: boolean = false;
  chaines: Chaine[] = [];
  id_Group_chain!: groupeChaine;
  chaine: Chaine = {
    id: 0,
    designation: '',
    code: 0,

    barCode: 0,
    type: '',
    qualityGoal: '',
    performanceGoal: '',
    availabilityDate: '',
    groupeChaine: 0,
    chaine_machine: [],
    employee_chaine:[],
    workshop: 0,
    posteCle: 0,
  };

  selectedchaines: Chaine[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  groupe: any[] = [];
  poste: any[] = [];
  etat: any[] = [];
  atelier: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  grs!: groupeChaine[];
  ChaineMachine: MachineChaine = {
    chaine: 0,
    machine: 0,
  };
  machines: Machine[] = [];
  id!: string;
  emploiyes!:Employee[];

  constructor(
    private chaineService: ChaineService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _service_groupe: GroupeChaineService,
    private _servicePost: PostCleService,
    private _serviceAteliere: WorkshopService,
    private _servicChaineMachine: ChaineMachineService,
    private _serviceMachine: MachineService,
    private _servicecemploiyee:EmployésService
  ) {}

  ngOnInit() {
   this.getAllChaine();
      this.getallGroup_Chaine();
      this.getallWorkshope();
      this.getallPost_cle();
      this.getAllMachine();
      this.getAllEmploiyee();
    
  }
  getAllChaine(){
    this.chaineService.getChaines().subscribe((data) => {
        this.chaines = data;})
  }
  getallGroup_Chaine() {
    this._service_groupe.getGroupe_Chaines().subscribe((data) => {
      this.grs = data;

      this.groupe = this.grs.map((gr) => {
        return { label: gr.name, value: gr.id };
      });
    });
  }
  getallPost_cle() {
    this._servicePost.getpost_cles().subscribe((data) => {
      this.poste = data;
      console.log();

      this.poste = this.poste.map((po) => {
        return { label: po.designation, value: po.id };
      });
    });
  }

  getallWorkshope() {
    this._serviceAteliere.getworkshops().subscribe((data) => {
      this.atelier = data;
      console.log();

      this.atelier = this.atelier.map((at) => {
        return { label: at.designation, value: at.id };
      });
    });
  }

  openNew() {
    this.chaine = {
      id: 0,
      designation: '',
      code: 0,

      barCode: 0,
      type: '',
      qualityGoal: '',
      performanceGoal: '',
      availabilityDate: '',
      groupeChaine: 0,
      chaine_machine: [],
      employee_chaine:[],
      workshop: 0,
      posteCle: 0,
    };

    this.submitted = false;
    this.chaineDialog = true;
  }

  editchaine(id: string) {
    this.idSelected = id;
    this.chaineService.getChaineByID(id).subscribe((data) => {
      this.chaine = data;
    });

    this.chaineDialog = true;
  }
  deleteSelectedchaines() {
    // to do
  }
  deletechaine(id: string) {
    this.deletechaineDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deletechainesDialog = false;
    this.chaineService.deleteChaine(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'état de vente  a été supprimé',
        life: 3000,
      });
      this.getallGroup_Chaine();
    });
    this.selectedchaines = [];
  }

  confirmDelete() {
    this.deletechaineDialog = false;
    this.chaineService.deleteChaine(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'état de vente a été supprimé',
        life: 3000,
      });
      this.getAllChaine();
    });
    this.chaine = { ...this.chaine };
  }

  hideDialog() {
    this.chaineDialog = false;
    this.submitted = false;
  }

  savechaine() {
    this.submitted = true;

    if (this.chaine.designation?.trim()) {
      if (this.chaine.id) {
        // @ts-ignore

        let ch = {
          designation: this.chaine.designation,
          code: this.chaine.code,
          barCode: this.chaine.barCode,
          type: this.chaine.type,
          qualityGoal: this.chaine.qualityGoal,
          performanceGoal: this.chaine.performanceGoal,
          availabilityDate: this.chaine.availabilityDate,
          groupeChaine: this.chaine.groupeChaine,
          chaine_machine: this.chaine.chaine_machine,
          workshop: this.chaine.workshop,
          posteCle: this.chaine.posteCle,
          employee_chaine:this.chaine.employee_chaine
        };
        console.log(ch);

        this.chaineService
          .UpdateChaine(this.idSelected, ch)
          .subscribe((data) => {this.getAllChaine();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'le chaîne a été modifié',
              life: 3000,
            });
           
            this.chaineDialog = false;
          });
       
      } else {
      
      let ch = {
        designation: this.chaine.designation,
        code: this.chaine.code,
        barCode: this.chaine.barCode,
        type: this.chaine.type,
        qualityGoal: this.chaine.qualityGoal,
        performanceGoal: this.chaine.performanceGoal,
        availabilityDate: this.chaine.availabilityDate,
        groupeChaine: this.chaine.groupeChaine,
        chaine_machine: this.chaine.chaine_machine,
        workshop: this.chaine.workshop,
        posteCle: this.chaine.posteCle,
        employee_chaine: this.chaine.employee_chaine
      };
     

      // this.chaineService.createChaine(this.chaine).subscribe((res)=> console.log(res)
      this.chaineService.createChaine(ch).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: ' votre chaîne a été créé avec succès',
          life: 3000,
        });
        this.chaineDialog = false;
        this.getAllChaine()
     
      });
    }
    }

  }

  getAllMachine() {
    this._serviceMachine
      .getAllMachine()
      .subscribe((data) => (this.machines = data));
  }
  getAllEmploiyee(){
    this._servicecemploiyee.getAllEmployees().subscribe(data=>{this.emploiyes=data})

  }

}
