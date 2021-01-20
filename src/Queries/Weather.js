import gql from "graphql-tag";

import { WeatherFragments } from "./WeatherFragments";

export const CURRENT_WEATHER_BY_CITY = gql`
  query CurrentWeatherByCity($city: String!, $unit: Units) {
    currentWeatherByCity(city: $city, unit: $unit) {
      id
      cityInfo {
        ...cityInfo
      }
      weather {
        dt
        condition
        description
        feelsLike
        icon
        temperature {
          ...temperature
        }
        humidity
      }
    }
  }
  ${WeatherFragments.temperature}
  ${WeatherFragments.cityInfo}
`;

export const DAILY_FORECAST = gql`
  query DailyForecast($city: String!, $unit: Units) {
    dailyForecast(city: $city, unit: $unit) {
      id
      cityInfo {
        ...cityInfo
      }
      forecastList {
        dt
        condition
        icon
        temperature {
          ...temperature
        }
        humidity
        wind
        rain
      }
    }
  }
  ${WeatherFragments.temperature}
  ${WeatherFragments.cityInfo}
`;
