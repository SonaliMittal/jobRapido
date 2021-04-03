import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  getApiData(item):Observable<IModel[]> {
    return this.http.get<IModel[]>("https://jsonplaceholder.typicode.com/comments?q="+item);
    // return this.http.get<IModel[]>("https://jsonplaceholder.typicode.com/comments?q=q");
  }
}
