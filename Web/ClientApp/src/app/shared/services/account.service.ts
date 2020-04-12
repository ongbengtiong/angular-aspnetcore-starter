// https://davembush.github.io/where-to-store-angular-configurations/
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token: any;
    tokenExpiration: any;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private configService: ConfigService) { }

  login(credentials): Observable<boolean> {
    const url = `${this.configService.apiUrl}/account/createToken`;
    return this.http.post(url, credentials).pipe(
      map((response: any) => {
        this.token = response.token;
        this.tokenExpiration = response.expiration;
        return true;
      })
    );

  }
}
