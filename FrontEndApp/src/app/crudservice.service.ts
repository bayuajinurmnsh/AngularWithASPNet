import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient,HttpClientModule,HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Crudservice {

  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http : HttpClient) { }

  postData(data: any) {
    return this.http.post<any>("http://localhost:4000/users", data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  getData() {
    return this.http.get<any>("http://localhost:4000/users")
    .pipe(map((res:any) => {
      return res;
    }))
  }

  updateData(data: any, id: number) {
    return this.http.put<any>("http://localhost:4000/users/"+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  deleteData(id: number) {
    return this.http.delete<any>("http://localhost:4000/users/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}