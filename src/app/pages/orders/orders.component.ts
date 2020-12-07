import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiInvokeService } from '../../services/api-invoke.service';
import { NbDialogService } from '@nebular/theme';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  data: any = [];
  loading = false;

  settings = {
     hideSubHeader: true,
    actions: {
      edit: false,
      add: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      ORDER_ID: {
        title: 'ORDER ID',
        type: 'string',
      },
      FIRST_NAME: {
        title: 'First Name',
        type: 'string',
      },
      LAST_NAME: {
        title: 'Last Name',
        type: 'string',
      },
      STREET_ADDRESS: {
        title: 'Street Address',
        type: 'string',
      },
      CITY_ADDRESS: {
        title: 'City',
        type: 'string',
      },
      STATE_ADDRESS: {
        title: 'State',
        type: 'string',
      },
      ZIP_ADDRESS: {
        title: 'Zip',
        type: 'string',
      },
      EMAIL_ADDRESS: {
        title: 'Email',
        type: 'string',
      },
      PHONE: {
        title: 'Phone',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private apiInvokeService: ApiInvokeService, private dialogService: NbDialogService) {
    this.refreshData();
  }

  ngOnInit(): void {

  }

  onDeleteConfirm(event): void {
    this.loading = true;
    this.apiInvokeService.delete(this.apiInvokeService.inprogressOrdersUrl, {ORDER_ID: event.data.ORDER_ID }).subscribe( (data) => {
      console.log(data);
      this.data = data;
      this.updateOrderHistory(event.data);
      this.refreshData();
    });
  }

  updateOrderHistory(data: any): void {
    let tmp = {};
    tmp["ORDER_DETAIL"] = JSON.stringify(data);
    this.apiInvokeService.update(this.apiInvokeService.orderHistoryURL, tmp).subscribe( (data) => {
      this.loading = false;
    });
  }

  refreshData(): void {
    this.loading = true;
    this.apiInvokeService.get(this.apiInvokeService.inprogressOrdersUrl).subscribe( (data) => {
      console.log(data);
      this.data = data;
      this.loading = false;
    });
  }

  onUserRowSelect(event): void {
    console.log(event.data);
    this.dialogService.open(OrdersDialogComponent, {
      context: {
        orderInfo: event.data
      },
      hasBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      dialogClass: 'model-full'
    });
  }




}
