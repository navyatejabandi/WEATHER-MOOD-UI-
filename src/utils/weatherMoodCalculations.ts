import { LiveWeatherData, MoodType } from '../types';

export interface HourlyForecastItem {
  hour: string;
  temp: number;
  cond: string;
  rainChance: number;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'sunset' | 'rain';
}

export interface DailyForecastItem {
  day: string;
  fullDate: string;
  high: number;
  low: number;
  cond: string;
  icon: string;
  rain: string;
}

export class WeatherMoodService {
  /**
   * Generates hourly weather items starting from current hour
   */
  static generateHourlyForecast(weather: LiveWeatherData): HourlyForecastItem[] {
    const currentHour = new Date().getHours();
    return [
      { hour: 'Now', temp: weather.temp, cond: weather.condition, rainChance: weather.precipitation || 0, icon: 'sun' },
      { hour: `${(currentHour + 1) % 24}:00`, temp: weather.temp, cond: 'Clear sky', rainChance: 5, icon: 'sun' },
      { hour: `${(currentHour + 2) % 24}:00`, temp: weather.temp - 1, cond: 'Gentle breeze', rainChance: 10, icon: 'cloud-sun' },
      { hour: `${(currentHour + 3) % 24}:00`, temp: weather.temp - 1, cond: 'Scattered clouds', rainChance: 15, icon: 'cloud' },
      { hour: `${(currentHour + 4) % 24}:00`, temp: weather.temp - 2, cond: 'Mild cooling', rainChance: 10, icon: 'cloud' },
      { hour: `${(currentHour + 5) % 24}:00`, temp: weather.temp - 3, cond: 'Night breeze', rainChance: 5, icon: 'sunset' },
      { hour: `${(currentHour + 6) % 24}:00`, temp: weather.temp - 4, cond: 'Starlit clear', rainChance: 5, icon: 'sun' },
    ];
  }

  /**
   * Generates 7-day forecast with ACCURATE weekday dates calculated from real current time!
   */
  static generate7DayForecast(weather: LiveWeatherData): DailyForecastItem[] {
    const now = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const items: DailyForecastItem[] = [];

    // Weather condition sequence variations
    const sequence = [
      { cond: weather.condition, icon: '☀️', rain: `${weather.precipitation || 0}%`, tempDeltaH: 0, tempDeltaL: 0 },
      { cond: 'Mostly Sunny', icon: '🌤️', rain: '10%', tempDeltaH: 1, tempDeltaL: 0 },
      { cond: 'Partly Cloudy', icon: '⛅', rain: '20%', tempDeltaH: -1, tempDeltaL: -1 },
      { cond: 'Scattered Showers', icon: '🌦️', rain: '45%', tempDeltaH: -2, tempDeltaL: -1 },
      { cond: 'Passing Clouds', icon: '🌤️', rain: '15%', tempDeltaH: 0, tempDeltaL: 0 },
      { cond: 'Bright & Warm', icon: '☀️', rain: '0%', tempDeltaH: 2, tempDeltaL: 1 },
      { cond: 'Sunny & Pleasant', icon: '☀️', rain: '5%', tempDeltaH: 1, tempDeltaL: 0 },
    ];

    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() + i);

      let dayLabel = '';
      if (i === 0) dayLabel = 'Today';
      else if (i === 1) dayLabel = 'Tomorrow';
      else dayLabel = daysOfWeek[targetDate.getDay()];

      const fullDate = `${targetDate.getDate()} ${months[targetDate.getMonth()]}`;
      const seq = sequence[i];

      items.push({
        day: dayLabel,
        fullDate,
        high: weather.high + seq.tempDeltaH,
        low: weather.low + seq.tempDeltaL,
        cond: seq.cond,
        icon: seq.icon,
        rain: seq.rain,
      });
    }

    return items;
  }

  /**
   * Calculates overall mood distribution of the day
   */
  static calculateTodayMoodDistribution(weather: LiveWeatherData) {
    // Dynamic calculation based on temp, condition, humidity
    const isSunny = /clear|sun/i.test(weather.condition);
    const isRain = /rain|shower/i.test(weather.condition);
    const isHot = weather.temp >= 33;
    const isMild = weather.temp >= 22 && weather.temp <= 30;

    let happy = 54;
    let calm = 22;
    let okay = 12;
    let sad = 8;
    let irritated = 4;

    if (isRain) {
      happy = 20;
      calm = 48;
      okay = 18;
      sad = 10;
      irritated = 4;
    } else if (isHot || weather.humidity > 75) {
      happy = 22;
      calm = 18;
      okay = 24;
      sad = 12;
      irritated = 24;
    } else if (isMild && isSunny) {
      happy = 58;
      calm = 24;
      okay = 10;
      sad = 5;
      irritated = 3;
    }

    const dominantMood: MoodType = (
      happy >= calm && happy >= okay && happy >= sad && happy >= irritated ? 'happy' :
      calm >= okay && calm >= sad && calm >= irritated ? 'calm' :
      irritated >= sad ? 'irritated' : 'sad'
    );

    return {
      happy,
      calm,
      okay,
      sad,
      irritated,
      dominantMood,
    };
  }

  /**
   * Calculates thermal heat index and behavioral changes
   */
  static calculateHeatBehavioralImpact(temp: number, humidity: number) {
    const tF = (temp * 9) / 5 + 32;
    const r = humidity;
    let hi = 0.5 * (tF + 61.0 + (tF - 68.0) * 1.2 + r * 0.094);

    if (hi >= 80) {
      hi =
        -42.379 +
        2.04901523 * tF +
        10.14333127 * r -
        0.22475541 * tF * r -
        0.00683783 * tF * tF -
        0.05481717 * r * r +
        0.00122874 * tF * tF * r +
        0.00085282 * tF * r * r -
        0.00000199 * tF * tF * r * r;
    }

    const heatIndexC = Math.round(((hi - 32) * 5) / 9);

    if (temp >= 38 || heatIndexC >= 42) {
      return {
        heatIndex: heatIndexC,
        stressCategory: 'Severe Danger',
        irritabilityRisk: 78,
        fatigueRisk: 86,
        primaryBehavior: 'Extreme Heat Wave: High probability of acute irritability and sluggish cognitive response.',
        copingAdvice: 'Stay in air-conditioned environments, hydrate every 20 minutes, minimize afternoon transit.',
      };
    } else if (temp >= 33 || heatIndexC >= 36) {
      return {
        heatIndex: heatIndexC,
        stressCategory: 'Heat Stress',
        irritabilityRisk: 58,
        fatigueRisk: 64,
        primaryBehavior: 'High Thermal Discomfort: Moderate probability of patience depletion and shorter attention span.',
        copingAdvice: 'Avoid direct sun between 12-4 PM, drink cold electrolytes, schedule focus tasks for evening.',
      };
    } else if (temp >= 28 || heatIndexC >= 30) {
      return {
        heatIndex: heatIndexC,
        stressCategory: 'Moderate',
        irritabilityRisk: 34,
        fatigueRisk: 38,
        primaryBehavior: 'Warm & Active: Optimal productivity during morning hours; mild dip during afternoon peak.',
        copingAdvice: 'Light cotton attire, regular water intake, take quick 5-min shade breaks.',
      };
    } else {
      return {
        heatIndex: heatIndexC,
        stressCategory: 'Comfort',
        irritabilityRisk: 14,
        fatigueRisk: 20,
        primaryBehavior: 'Ideal Thermal Zone: High mental clarity, balanced patience, and active mood stability.',
        copingAdvice: 'Great atmospheric window for outdoor walks, exercise, and demanding intellectual tasks.',
      };
    }
  }

  /**
   * Formats live time string
   */
  static getCurrentTimeString(date = new Date()): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /**
   * Formats live date string
   */
  static getCurrentDateString(date = new Date()): string {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }
}
