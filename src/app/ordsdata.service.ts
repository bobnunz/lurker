import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ORDSData } from './ordsdata';

@Injectable({
  providedIn: 'root'
})
export class ORDSDataService {

  private urlStr: string;

  constructor(private http: HttpClient) { }

  getAllORDSData(offset: number, limit: number): Observable<ORDSData> {

  
    this.urlStr = 'https://apex.oracle.com/pls/apex/census_epd/bxsc/allResults?offset=' + offset + '&limit=' + limit;
 
    return this.http.
      get<ORDSData>(this.urlStr);
  }

}
