import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbDialogModule,
  NbTabsetModule, NbUserModule, NbMenuModule, NbIconModule, NbSpinnerModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrdersDialogComponent } from './orders-dialog/orders-dialog.component'
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    FlexLayoutModule
  ],
  declarations: [
    PagesComponent,
    CategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    OrdersDialogComponent,
  ],
  providers: [
    FormBuilder
  ]
})
export class PagesModule {
}
