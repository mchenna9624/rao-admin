import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ProductPromptComponent } from '../modal-overlays/dialog/product-prompt/product-prompt.component';
import { ApiInvokeService } from '../../services/api-invoke.service';
import { CacheService } from '../../services/cache.service';
import { IProductsModel, ICategoriesModel } from '../../interfaces/rao-admin-model';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  loading = false;
  products: IProductsModel;
  editableProduct: any;


  constructor(private apiInvokeService : ApiInvokeService, private dialogService: NbDialogService, private cacheService: CacheService) { }

  ngOnInit(): void {
    this.loading = true;
    this.refreshProducts();
    this.refreshCategories();
    this.cacheService.setEditableProduct(null);
  }

  refreshCategories(): void {
    this.apiInvokeService.get(this.apiInvokeService.categoriesEndPointUrl).subscribe( (data: ICategoriesModel) => {
      console.log(data);
      this.cacheService.setCategoreis(data);
    });
  }

  refreshProducts(): void {
      this.apiInvokeService.get(this.apiInvokeService.productsEndPointUrl).subscribe( (data: IProductsModel) => {
      this.products = data;
      this.loading = false;
    });
  }

  open(): void {
    this.dialogService.open(ProductPromptComponent, { closeOnBackdropClick: false })
      .onClose.subscribe((product) => {
        product && this.postProduct(product);
      });
  }

  postProduct(product: IProductsModel): void{
      this.loading = true;
      this.apiInvokeService.post(this.apiInvokeService.productsEndPointUrl, product).subscribe( (data) => {
      this.refreshProducts();
    });
  }

  editProduct(product: IProductsModel): void {
    this.editableProduct = product;
    this.cacheService.setEditableProduct(product);
    this.dialogService.open(ProductPromptComponent)
      .onClose.subscribe((newProduct) => {
        this.cacheService.setEditableProduct(null);
        if(newProduct){
          this.editableProduct["newProduct"] = newProduct;          
          this.loading = true;
          this.apiInvokeService.update(this.apiInvokeService.productsEndPointUrl, this.editableProduct).subscribe( () => {
            this.refreshProducts();
          });
        }
      });
  }

  deleteProduct(product: IProductsModel): void {
      this.loading = true;
      this.apiInvokeService.delete(this.apiInvokeService.productsEndPointUrl, product).subscribe( () => {
        this.refreshProducts();
      });
  }

}
