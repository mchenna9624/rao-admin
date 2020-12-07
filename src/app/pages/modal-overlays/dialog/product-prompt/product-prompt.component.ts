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
  data: any = [];
  loading = false;

  constructor(protected ref: NbDialogRef<ProductPromptComponent>, private fb: FormBuilder, private cacheService: CacheService) {
    console.log(" constructor called");

  }


  settings = {
    actions: {
      edit: true,
      add: true,
      delete: true
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
      Id: {
        title: 'Id',
        type: 'number',
      },
      Quantity: {
        title: 'Quantity',
        type: 'string',
      },
      Price: {
        title: 'Price',
        type: 'string',
      },
      Margin: {
        title: 'Margin %',
        type: 'string',
      },
    },
  };

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
      pictures: ['', Validators.required]
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
      this.productForm.controls.pictures.setValue(this.editableProduct.pictures);
      if(this.editableProduct.slabs){
        this.data = this.editableProduct.slabs;
      }else{
        this.data = [];
      }

    }
  }

  onDeleteConfirm(event): void {
    var removeIndex = this.data.map(function(item) { return item.Quantity; }).indexOf(event.data.Quantity);
    this.data.splice(removeIndex, 1);
    event.confirm.resolve(event.source.data);
  }

  cancel() {
    this.ref.close(null);
  }

  submit() {
    if(this.productForm.valid){
      let tmpObj = this.productForm.value;
      tmpObj["slabs"] = this.data;
      this.ref.close(tmpObj);
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
