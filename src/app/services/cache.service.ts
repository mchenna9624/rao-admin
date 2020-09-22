import { Injectable } from '@angular/core';
import { ICategoriesModel } from '../interfaces/rao-admin-model'

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private categories: ICategoriesModel;

  constructor() { }

  setCategoreis(categories: ICategoriesModel): void{
    this.categories = categories;
  }

  getCategories(): ICategoriesModel{
    return this.categories;
  }

}
