
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
  _id: string;
  productName: string;
  price: string;
  stock: string;
  salePrice: string;
  discount: string;
  shortDesc: string;
  desc: string;
  category: string;

  constructor(obj?: IProductsModel) {
      this._id = obj && obj._id || null;
      this.productName = obj && obj.productName || null;
      this.price = obj && obj.price || null;
      this.stock = obj && obj.stock || null;
      this.salePrice = obj && obj.salePrice || null;
      this.discount = obj && obj.discount || null;
      this.shortDesc = obj && obj.shortDesc || null;
      this.desc = obj && obj.desc || null;
      this.category = obj && obj.category || null;
  }
}
