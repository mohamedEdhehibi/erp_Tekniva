import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Gamme } from 'src/app/shared/models/methode/gamme';
import { GammeService } from 'src/app/shared/service/methode/gamme.service';

@Component({
  selector: 'app-gamme',
  templateUrl: './gamme.component.html',
  styleUrls: ['./gamme.component.scss']
})
export class GammeComponent {
  originalGammes!: any[];
  GammeDialog: boolean = false;
  deleteGammeDialog: boolean = false;
  deleteGammesDialog: boolean = false;
  selectedGamme: Gamme[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  Gammes: Gamme[] = [];
  gme: Gamme = {
    designation: '',
    timeTotlal: '',
    FamilyID: '',
    SubFamilyID: '',
    operationTotal: 0,
    season: ''
  }
 
  filtered: string = ''
  filteredGammes!: any[];
  u: any;
  machine: any[] = [];
  family: any[] = [];
  status: any[] = [];
  element: any[] = [];
  equipment: any[] = [];
ms:number=0
s:number=0


  constructor(private GammeService: GammeService, private messageService: MessageService) { }

  ngOnInit() {
    this.GammeService.getAllGammes()
      .then(data => {console.log(data)
        this.Gammes = data;
        this.originalGammes = [...data];
        this.Gammes = this.Gammes.map(gamme => ({
          ...gamme,
          prodH: Number(gamme.timeTotlal) * 60,
          ms: Number(gamme.timeTotlal) * 100,
          s: Number(gamme.timeTotlal)*60
        }));
      })
      .catch(error => console.error(error));
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  
    this.machine = [
      { label: 'Machine 1', value: 'Machine 1' },
      { label: 'Machine 2', value: 'Machine 2' },
      { label: 'Machine 3', value: 'Machine 3' }
    ];
    this.family = [
      { label: 'Famille 1', value: 'Famille 1' },
      { label: 'Famille 2', value: 'Famille 2' },
      { label: 'Famille 3', value: 'Famille 3' }
    ];
    this.equipment = [
      { label: 'Equipment 1', value: 'Equipment 1' },
      { label: 'Equipment 2', value: 'Equipment 2' },
      { label: 'Equipment 3', value: 'Equipment 3' }
    ];
    this.element = [
      { label: 'Element 1', value: 'Element 1' },
      { label: 'Element 2', value: 'Element 2' },
      { label: 'Element 3', value: 'Element 3' }
    ];
    this.status = [
      { label: 'active', value: 'instock' },
      { label: 'non active', value: 'lowstock' },
    ];
  }
  updateTimeValues(): void {
    this.ms = Number(this.gme.timeTotlal) * 100;
    this.s = Number(this.gme.timeTotlal) * 60;
  }
  onTimeTotalChange(event: any): void {
    this.updateTimeValues();
  }
  gmenNew() {
    this.gme = {
      designation: '',
    timeTotlal: '',
    FamilyID: '',
    SubFamilyID: '',
    operationTotal: 0,
    season: ''
    }
    this.submitted = false;
    this.GammeDialog = true;
  }

  deleteSelectedGammes() {
    this.deleteGammesDialog = true;
  }

  editGamme(gme: Gamme) {
    console.log(gme);

    this.gme = { ...gme };
    this.GammeDialog = true;
  }

  deleteGamme(gme: Gamme) {
    this.deleteGammeDialog = true;
    this.gme = { ...gme };
  }

  confirmDeleteSelected() {
    this.Gammes = this.Gammes.filter(val => !this.selectedGamme.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gammes ont été supprimés', life: 3000 });
    this.selectedGamme = [];
    this.deleteGammesDialog = false;
  }

  confirmDelete() {
    this.deleteGammeDialog = false;
    this.Gammes = this.Gammes.filter(val => val.GammeID !== this.gme.GammeID);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gamme a été supprimé', life: 3000 });

  }

  hideDialog() {
    this.GammeDialog = false;
    this.submitted = false;
  }

  saveGamme() {
    this.submitted = true;

    if (!this.gme.designation) {
      return;
    }

    if (this.gme.GammeID) {
      this.Gammes[this.findIndexById(this.gme.GammeID)] = this.gme;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gamme a été modifié', life: 3000 });
    } else {
      this.gme.GammeID = Number(this.createId())
    
      this.Gammes.push(this.gme);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gamme a été créer', life: 3000 });
    }

    this.Gammes = [...this.Gammes];
    this.GammeDialog = false;
    this.Gammes = this.Gammes.map(gamme => ({
      ...gamme,
      prodH: Number(gamme.timeTotlal) * 60,
      ms: Number(gamme.timeTotlal) * 100,
      s: Number(gamme.timeTotlal)*60
    }));
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.Gammes.length; i++) {
      if (this.Gammes[i].GammeID === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  filter() {
    if (!this.filtered) {
      this.Gammes = [...this.originalGammes];
    } else {
      this.filteredGammes = this.originalGammes.filter(a => {
        return Object.values(a).some((val: any) => {
          if (val instanceof Date) {
            return val.toLocaleDateString().toLowerCase().includes(this.filtered.toLowerCase());
          } else {
            return val.toString().toLowerCase().includes(this.filtered.toLowerCase());
          }
        });
      });
      this.Gammes = [...this.filteredGammes];
    }
  }


}