import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { ApiInvokeService } from '../../services/api-invoke.service';
import { ICategoriesModel } from '../../interfaces/rao-admin-model';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  loading = false;
  categories: ICategoriesModel;
  editableCategory: any;


  constructor(private apiInvokeService : ApiInvokeService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.loading = true;
    this.refreshCategories();
  }

  refreshCategories(): void {
      this.apiInvokeService.get(this.apiInvokeService.categoriesEndPointUrl).subscribe( (data: ICategoriesModel) => {
      this.categories = data;
      this.loading = false;
    });
  }

  open(): void {
    this.dialogService.open(DialogNamePromptComponent, { closeOnBackdropClick: false })
      .onClose.subscribe((category) => {
        category && this.postCategory(category);
      });
  }

  postCategory(category: string): void{
      this.loading = true;
    this.apiInvokeService.post(this.apiInvokeService.categoriesEndPointUrl, {category: category}).subscribe( (data) => {
      this.refreshCategories();
    });
  }

  editCategory(category: ICategoriesModel): void {
    this.editableCategory = category;
    this.dialogService.open(DialogNamePromptComponent, { closeOnBackdropClick: false })
      .onClose.subscribe((newcategory) => {
        if(newcategory){
          this.editableCategory["newcategory"] = newcategory;
            this.loading = true;
          this.apiInvokeService.update(this.apiInvokeService.categoriesEndPointUrl, this.editableCategory).subscribe( () => {
            this.refreshCategories();
          });
        }
      });
  }

  deleteCategory(category: ICategoriesModel): void {
      this.loading = true;
      this.apiInvokeService.delete(this.apiInvokeService.categoriesEndPointUrl, category).subscribe( () => {
        this.refreshCategories();
      });
  }

}
