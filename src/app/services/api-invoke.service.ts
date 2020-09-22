import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICategoriesModel } from '../interfaces/rao-admin-model';

@Injectable()
export class ApiInvokeService {

  //categoriesEndPointUrl: string = "https://rao-admin-node.herokuapp.com/categories";
  categoriesEndPointUrl: string = "http://localhost:5000/categories";
  //productsEndPointUrl: string = "https://rao-admin-node.herokuapp.com/products";
  productsEndPointUrl: string = "http://localhost:5000/products";

  constructor(private http: HttpClient) { }

  get(getUrl: string): Observable<any>  {
     const contentHeader = new HttpHeaders({ "Content-Type": "application/json" });
     return this.http.get<any>(getUrl);
 }

 post(getUrl: string, category: ICategoriesModel): Observable<any>  {
    const contentHeader = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>(getUrl, category);
}

delete(getUrl: string, category: ICategoriesModel): Observable<any>  {
   const options = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
     body: category
   };
   return this.http.delete<any>(getUrl, options);
}

update(getUrl: string, category: any): Observable<any>  {
   const options = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
     body: category
   };
   return this.http.put<any>(getUrl, options);
}

}
