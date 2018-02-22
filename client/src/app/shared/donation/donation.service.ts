import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class DonationService {
  public API = environment.production ? 'https://donate-at-iterate-api.herokuapp.com/api' : 'http://localhost:8080/api';
  public DONATE_MONEY_API = this.API + '/donate-money';
  public DONATE_TIME_API = this.API + '/donate-time';

  constructor(private http: HttpClient) {
  }

  getStats() {
    return this.http.get(this.API + '/cool-stats');
  }

  save(donation: any): Observable<any> {
    const endpoint = (donation.type === 'money') ? this.DONATE_MONEY_API : this.DONATE_TIME_API;
    return this.http.post(endpoint, donation);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
