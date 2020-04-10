
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { WeatherForecast } from '../models/weatherForecast';



@Injectable({
  providedIn: 'root',
})
export class WeatherService {


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getWeather(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast')
      .pipe(       
        map(results => results),
        tap(results => console.log("results:", results)),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );

  }
}
