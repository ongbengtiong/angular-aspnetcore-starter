import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(weatherService: WeatherService) {
    weatherService.getWeather()
      .subscribe((results) => this.forecasts = results);

  }
}
