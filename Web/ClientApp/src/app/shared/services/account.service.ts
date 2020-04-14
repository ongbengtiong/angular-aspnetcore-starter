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
  
  private token: string = "";
  private tokenExpiration: Date = new Date();
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private configService: ConfigService) { }


  isLoginRequired(): boolean {
    return (this.token.length == 0 || this.tokenExpiration > new Date());
  }

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
  getToken() {
    return this.token;
  }
}
