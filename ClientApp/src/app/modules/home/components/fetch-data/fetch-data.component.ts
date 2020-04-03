import { Component, Inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from '../../models/weatherForecast';

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
