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

  getAllORDSData(dataType: string, offset: number, limit: number, year: number, round: number): Observable<ORDSData> {

    switch (dataType) {
      case 'RESULTSALL': {
        this.urlStr = 'https://apex.oracle.com/pls/apex/census_epd/bxsc/allResults?offset=' + offset + '&limit=' + limit;
        break;
      }
      case 'YEARSROUNDS': {
        this.urlStr = 'https://apex.oracle.com/pls/apex/census_epd/bxsc/getAllYearsRounds';
        break;
      }
      default: {
        //statements; 
        break;
      }
    }  
 
    return this.http.
      get<ORDSData>(this.urlStr);
  }

}
