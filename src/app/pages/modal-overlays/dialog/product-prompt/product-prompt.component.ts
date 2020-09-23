import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheService } from '../../../../services/cache.service';
import { ICategoriesModel, IProductsModel} from '../../../../interfaces/rao-admin-model';

@Component({
  selector: 'ngx-product-prompt',
  templateUrl: './product-prompt.component.html',
  styleUrls: ['./product-prompt.component.scss']
})
export class ProductPromptComponent  implements OnInit {

  productForm: FormGroup;
  categories: ICategoriesModel;
  products: IProductsModel;
  editableProduct: IProductsModel;

  constructor(protected ref: NbDialogRef<ProductPromptComponent>, private fb: FormBuilder, private cacheService: CacheService) {
    console.log(" constructor called");

  }

  ngOnInit() {
    console.log(" init called");
    this.categories = this.cacheService.getCategories();
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      salePrice: ['', Validators.required],
      discount: ['', Validators.required],
      shortDesc: ['', Validators.required],
      desc: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.editableProduct = this.cacheService.getEditableProduct();
    if(null != this.editableProduct){
      this.productForm.controls.productName.setValue(this.editableProduct.productName);
      this.productForm.controls.price.setValue(this.editableProduct.price);
      this.productForm.controls.stock.setValue(this.editableProduct.stock);
      this.productForm.controls.salePrice.setValue(this.editableProduct.salePrice);
      this.productForm.controls.discount.setValue(this.editableProduct.discount);
      this.productForm.controls.shortDesc.setValue(this.editableProduct.shortDesc);
      this.productForm.controls.desc.setValue(this.editableProduct.desc);
      this.productForm.controls.category.setValue(this.editableProduct.category);
    }
  }

  cancel() {
    this.ref.close(null);
  }

  submit() {
    if(this.productForm.valid){
      this.ref.close(this.productForm.value);
    }else{
      this.markFormGroupTouched(this.productForm);
    }

  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
