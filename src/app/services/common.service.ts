import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    save_data_operation(value:any):Observable<any>{
        return this.http.post<any[]>(`${this.apiUrl}/db_operation`,value);
    }
    
    getData_common(value:any):Observable<any>{
        return this.http.post<any[]>(`${this.apiUrl}/getData_common`,value);
    }

    delete_data_operation(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/db_operation`, payload);
    }

    search_user(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/searchUser`, payload);
    }
    search_book(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/searchBook`, payload);
    }
    issue_book(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/issue_book`, payload);
    }
    calculate_fine(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/calculate_fine`, payload);
    }
    submit_fine(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/submit_fine`, payload);
    }
    // submit_book(payload: any): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/submit_book`, payload);
    // }
    generateBarCode(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/generateBarCode`, payload);
    }
    download_Barcode(payload: any): Observable<Blob> {
        return this.http.post(`${this.apiUrl}/download_Barcode`, payload, {
            responseType: 'blob'
        });
    }  
    sidebarConfig(id:any){
        return this.http.post<any>(`${this.apiUrl}/sidebarMenuConfig`,id);
      }   
      
      submitbook(value:any){
        return this.http.post<any>(`${this.apiUrl}/submitbook`,value);
      }
    
}