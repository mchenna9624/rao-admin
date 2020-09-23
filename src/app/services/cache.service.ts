import { Injectable } from '@angular/core';
import { ICategoriesModel, IProductsModel } from '../interfaces/rao-admin-model'

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private categories: ICategoriesModel;
  private product: IProductsModel;

  constructor() { }

  setCategoreis(categories: ICategoriesModel): void{
    this.categories = categories;
  }

  getCategories(): ICategoriesModel{
    return this.categories;
  }

  setEditableProduct(product: IProductsModel): void {
    this.product = product;
  }

  getEditableProduct(): IProductsModel {
    return this.product;
  }

}
