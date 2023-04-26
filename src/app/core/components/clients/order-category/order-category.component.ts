import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Order } from 'src/app/shared/models/order';
import { OrderCategory } from 'src/app/shared/models/orderCategory';
import { OrderCategoryService } from 'src/app/shared/service/order-category.service';

import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-order-category',
  templateUrl: './order-category.component.html',
  styleUrls: ['./order-category.component.scss'],
})
export class OrderCategoryComponent implements OnInit {
  filtered: string = '';
  orderCategoryDialog: boolean = false;
  originalorderCategorys: any[] = [];
  filteredorderCategorys!: any[];
  deleteorderCategoryDialog: boolean = false;
  deleteorderCategorysDialog: boolean = false;
  orderCategorys: OrderCategory[] = [];

  orderCategory: OrderCategory = {
    id: '',
    designation: '',
    order: [],
    createdAt: '',
    updatedAt: '',
  };
  orders: Order[] = [];
  order!: any[];
  selectedorderCategorys: OrderCategory[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  groupe: any[] = [];
  poste: any[] = [];
  etat: any[] = [];
  atelier: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  contact!: any[];
  idSelected: any;
  id!: string;
  constructor(
    private orderCategoryService: OrderCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private serviceorder: OrderService
  ) {}

  ngOnInit() {
    this.getAllOrderCategory();
    this.getallOrder();
  }
  getAllOrderCategory() {
    this.orderCategoryService.getAllorderCategory().subscribe((data) => {
      this.orderCategorys = data;
    });
  }
  getallOrder() {
    this.serviceorder.getAllOrder().subscribe((data) => {
      this.orders = data;

      this.order = this.orders.map((co) => {
        return { label: co.designation, value: co.id };
      });
    });
  }

  openNew() {
    this.orderCategory = {
      id: '',
      designation: '',
      order: [],
      createdAt: '',
      updatedAt: '',
    };

    this.submitted = false;
    this.orderCategoryDialog = true;
  }

  editorderCategory(id: string) {
    this.idSelected = id;
    this.orderCategoryService.getorderCategoryByID(id).subscribe((data) => {
      this.orderCategory = data;
    });

    this.orderCategoryDialog = true;
  }
  deleteSelectedorderCategorys(){
    // to do
  }
  deleteorderCategory(id: string) {
    this.deleteorderCategoryDialog = true;
    this.id = id;
  }

  confirmDeleteSelected() {
    this.deleteorderCategorysDialog = false;
    this.orderCategoryService.deleteorderCategory(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "l'address de facturation  a été supprimé",
        life: 3000,
      });
      this.getAllOrderCategory();
    });
    this.selectedorderCategorys = [];
  }

  confirmDelete() {
    this.deleteorderCategoryDialog = false;
    this.orderCategoryService.deleteorderCategory(this.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: "le catégorie d\'orde a été supprimé",
        life: 3000,
      });
      this.getAllOrderCategory();
    });
    this.orderCategory = { ...this.orderCategory };
  }

  hideDialog() {
    this.orderCategoryDialog = false;
    this.submitted = false;
  }

  saveorderCategory() {
    this.submitted = true;
    if (this.idSelected) {
      let gc = {
        designation: this.orderCategory.designation,
        order: this.orderCategory.order,
      };


      this.orderCategoryService
        .UpdateorderCategory(this.idSelected, gc)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: "le catégorie d\'ordea été modifié",
            life: 3000,
          });
          this.orderCategoryDialog = false;
          this.getAllOrderCategory();
        });

      this.orderCategoryDialog = false;
    } else {
      let ch = {
        designation: this.orderCategory.designation,
        order: this.orderCategory.order,
      };

      this.orderCategoryService.createorderCategory(ch).subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'votre catégorie  a été créé avec succès',
          life: 3000,
        });
        this.orderCategoryDialog = false;
        this.getAllOrderCategory();
      });
      this.orderCategoryDialog = false;
    }
  }
}
