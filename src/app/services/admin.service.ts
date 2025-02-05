import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private dataSource = new BehaviorSubject<Array<any>>([]);
  currentData = this.dataSource.asObservable();

  // Function to update the data
  changeData(data:any) {
    console.log(data,'welcome');
    
    this.dataSource.next(data);
  }

  post(route: any, data: any): Observable<any> {
    return this.http.post<any>('http://13.232.224.31/api' + route, data);
  }

  get(route: any): Observable<any> {
    return this.http.get<any>('http://13.232.224.31/api' + route);
  }

  getCustomerData(route: string, id: string): Observable<any> {
    return this.http.get<any>(`http://13.232.224.31/api${route}?id=${id}`);
  }
  getJuristicData(route: string, id: string): Observable<any> {
    return this.http.get<any>(`http://13.232.224.31/api${route}?id=${id}`);
  }
  

  // gets(url:any,search?: string, limit?: number, offset?: number): Observable<any> {
  //   let params = new HttpParams();

  //   if (search) {
  //     params = params.set('moileNumber', search);
  //   }
  //   if (limit) {
  //     params = params.set('limit', limit.toString());
  //   }
  //   if (offset || offset == 0) {
  //     params = params.set('offset', offset.toString());
  //   }

  //   return this.http.get<any>('http://localhost:3000/api/' + url ,{ params });
  // }

  gets(
    url: any,
    customerName?: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<any> {
    const params: any = {
      limit: limit.toString(),
      offset: offset.toString(),
    };
    if (customerName) {
      params.fullName = customerName;
    }
    return this.http.get<any>('http://localhost:3000/api/' + url, { params });
  }

  getCutomer(
    url: any,
    customerName?: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<any> {
    const params: any = {
      limit: limit.toString(),
      offset: offset.toString(),
    };
    if (customerName) {
      params.fullName = customerName;
    }
    return this.http.get<any>('http://localhost:3000/api/' + url, { params });
  }

  getLaon(
    url: any,
    customerName?: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<any> {
    const params: any = {
      limit: limit.toString(),
      offset: offset.toString(),
    };
    if (customerName) {
      params.fullName = customerName;
    }
    return this.http.get<any>('http://localhost:3000/api/' + url, { params });
  }

  getCredit(
    url: any,
    customerName?: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<any> {
    const params: any = {
      limit: limit.toString(),
      offset: offset.toString(),
    };
    if (customerName) {
      params.fullName = customerName;
    }
    return this.http.get<any>('http://localhost:3000/api/' + url, { params });
  }
}
