import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheService } from '../../../../services/cache.service';
import { ICategoriesModel } from '../../../../interfaces/rao-admin-model';

@Component({
  selector: 'ngx-product-prompt',
  templateUrl: './product-prompt.component.html',
  styleUrls: ['./product-prompt.component.scss']
})
export class ProductPromptComponent  implements OnInit {

  productForm: FormGroup;
  categories: ICategoriesModel;

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

  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if(this.productForm.valid){

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
