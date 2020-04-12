// https://davembush.github.io/where-to-store-angular-configurations/
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl: string;
  
  constructor(@Inject('BASE_URL') private defaultBaseUrl: string) { }
  get apiUrl() {
    return `${this.defaultBaseUrl}api`; 
  }
}
