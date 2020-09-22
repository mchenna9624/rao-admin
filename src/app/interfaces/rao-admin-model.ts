
export interface ICategoriesModel {
    _id?: string;
    category: string;
}


export interface IProductsModel {
    _id?: string;
    productName: string;
    price: string;
    stock: string;
    salePrice: string;
    discount: string;
    shortDesc: string;
    desc: string;
    category: string;
}

export class ProductsModel implements IProductsModel{
  
}
