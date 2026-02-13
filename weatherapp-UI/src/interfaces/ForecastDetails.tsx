export interface ForecastDetails {
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon:string;
        };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
  error:{
    message:string;
  }
}
