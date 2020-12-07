import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICategoriesModel } from '../interfaces/rao-admin-model';

@Injectable()
export class ApiInvokeService {

  categoriesEndPointUrl: string = "https://rao-admin-node.herokuapp.com/categories";
  productsEndPointUrl: string = "https://rao-admin-node.herokuapp.com/products";
  inprogressOrdersUrl: string = "http://realchoice-node-dev.ap-southeast-1.elasticbeanstalk.com/order";
  orderHistoryURL: string = "http://realchoice-node-dev.ap-southeast-1.elasticbeanstalk.com/order_history";
  //inprogressOrdersUrl: string = "http://localhost:5000/order";
  //orderHistoryURL: string = "http://localhost:5000/order_history";
  //categoriesEndPointUrl: string = "http://localhost:5000/categories";
  //productsEndPointUrl: string = "http://localhost:5000/products";

  constructor(private http: HttpClient) { }

  get(getUrl: string): Observable<any>  {
     const contentHeader = new HttpHeaders({ "Content-Type": "application/json" });
     return this.http.get<any>(getUrl);
 }

 post(getUrl: string, data: any): Observable<any>  {
    const contentHeader = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>(getUrl, data);
}

delete(getUrl: string, data: any): Observable<any>  {
   const options = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
     body: data
   };
   return this.http.delete<any>(getUrl, options);
}

update(getUrl: string, data: any): Observable<any>  {
   const options = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
     body: data
   };
   return this.http.put<any>(getUrl, options);
}

}
