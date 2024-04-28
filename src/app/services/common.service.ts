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
}