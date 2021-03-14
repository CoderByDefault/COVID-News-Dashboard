import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-13-2021.csv`;
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(
      map(result => {
        let data : GlobalDataSummary[] = [];
        let rows = result.split('\n');
        rows.splice(0 , 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          data.push({
            country_region : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10],
            incident_rate : +cols[12],
            case_fatality_ratio : +cols[13]
          })
        })

        console.log(data);
        return [];
      })
    )
  }
}
