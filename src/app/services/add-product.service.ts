import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  GetProductform(): Observable<any[]> {
    return this.http.get<any[]>('./assets/Addproduct.json');
  }
  getProductDetails(productId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getproduct/${productId}`);
  }

  addProduct(productData: any) {
    return this.http.post<any[]>(`${this.apiUrl}/addproduct`, productData);
  }
  getProductData() {
    return this.http.get<any[]>(`${this.apiUrl}/getproducts`);
  }
  getProductById(productId: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/get_productby_id?id=${productId}`
    );
  }
  deleteProduct(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/db_operation`, payload);
  }

  addData_db_operations(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/db_operation`,payload)
  }

  getData(payload:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/getdata_for_all`,payload)
  }
  get_products_by_category(value:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/get_products_by_category`,value)
  }

  product_sales(value:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/product_sales`,value)
  }

  save_bill(value:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/save_order`,value)
  }
}