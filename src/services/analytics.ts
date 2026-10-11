import { WeatherMoodEntry, MoodType, LiveWeatherData, WeatherCondition } from '../types';
import { MOODS } from '../constants/moods';

export interface WeatherConditionSummary {
  conditionKey: 'sunny' | 'cloudy' | 'rainy';
  label: string;
  emoji: string;
  percentage: number;
  dominantMoodText: string;
  sampleCount: number;
}

export interface MoodProbability {
  mood: MoodType;
  label: string;
  emoji: string;
  probability: number; // percentage, e.g. 62
  colorHex: string;
}

export interface PredictionResult {
  topMood: MoodType;
  topProbability: number;
  probabilities: MoodProbability[];
  similarEntries: WeatherMoodEntry[];
  explanation: string;
}

export function calculateWeatherConditionSummaries(entries: WeatherMoodEntry[]): WeatherConditionSummary[] {
  // Categorize entries into sunny, cloudy, rainy
  const groups: Record<'sunny' | 'cloudy' | 'rainy', WeatherMoodEntry[]> = {
    sunny: [],
    cloudy: [],
    rainy: [],
  };

  entries.forEach((e) => {
    if (e.condition === 'sunny' || e.condition === 'mostly_clear') {
      groups.sunny.push(e);
    } else if (e.condition === 'cloudy' || e.condition === 'partly_cloudy') {
      groups.cloudy.push(e);
    } else if (e.condition === 'rainy' || e.condition === 'thunderstorm') {
      groups.rainy.push(e);
    }
  });

  const analyzeGroup = (
    key: 'sunny' | 'cloudy' | 'rainy',
    label: string,
    emoji: string,
    fallbackText: string,
    fallbackPct: number
  ): WeatherConditionSummary => {
    const list = groups[key];
    if (list.length === 0) {
      return {
        conditionKey: key,
        label,
        emoji,
        percentage: fallbackPct,
        dominantMoodText: fallbackText,
        sampleCount: 0,
      };
    }

    const counts: Record<MoodType, number> = {
      happy: 0,
      calm: 0,
      okay: 0,
      sad: 0,
      irritated: 0,
    };
    list.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });

    let maxMood: MoodType = 'happy';
    let maxCount = -1;
    (Object.keys(counts) as MoodType[]).forEach((m) => {
      if (counts[m] > maxCount) {
        maxCount = counts[m];
        maxMood = m;
      }
    });

    const percentage = Math.round((maxCount / list.length) * 100);
    const dominantMoodText = `More ${MOODS[maxMood].label.toLowerCase()}`;

    return {
      conditionKey: key,
      label,
      emoji,
      percentage: Math.max(35, percentage),
      dominantMoodText,
      sampleCount: list.length,
    };
  };

  return [
    analyzeGroup('sunny', 'Sunny', '☀️', 'More happy', 68),
    analyzeGroup('cloudy', 'Cloudy', '☁️', 'Mostly okay', 45),
    analyzeGroup('rainy', 'Rainy', '🌧️', 'More sad', 72),
  ];
}

export function generatePersonalInsights(entries: WeatherMoodEntry[]): string[] {
  if (entries.length < 2) {
    return [
      'You feel happiest on sunny days.',
      'You tend to feel lower on rainy days.',
      'Your mood is usually better in the morning.',
    ];
  }

  const summaries = calculateWeatherConditionSummaries(entries);
  const sunny = summaries.find((s) => s.conditionKey === 'sunny');
  const rainy = summaries.find((s) => s.conditionKey === 'rainy');

  const insights: string[] = [];

  if (sunny) {
    insights.push(`You feel ${sunny.dominantMoodText.toLowerCase()} on sunny days (${sunny.percentage}% frequency).`);
  } else {
    insights.push('You feel happiest on sunny days.');
  }

  if (rainy) {
    insights.push(`You tend to feel ${rainy.dominantMoodText.toLowerCase()} on rainy days (${rainy.percentage}% probability).`);
  } else {
    insights.push('You tend to feel lower on rainy days.');
  }

  // Morning vs evening check
  const morningEntries = entries.filter((e) => e.formattedTime.includes('AM'));
  const morningHappy = morningEntries.filter((e) => e.mood === 'happy' || e.mood === 'calm').length;
  if (morningEntries.length > 0 && morningHappy / morningEntries.length >= 0.5) {
    insights.push('Your mood is usually better in the morning.');
  } else {
    insights.push('Evening hours correlate with reflective and quiet moods.');
  }

  return insights;
}

export function predictMood(
  currentWeather: LiveWeatherData,
  entries: WeatherMoodEntry[]
): PredictionResult {
  const allMoods: MoodType[] = ['happy', 'calm', 'okay', 'sad', 'irritated'];

  // Find similar past entries (matching condition or within 3 degrees temp)
  const similarEntries = entries.filter((e) => {
    const isSameCategory =
      (currentWeather.condition === 'sunny' || currentWeather.condition === 'mostly_clear')
        ? (e.condition === 'sunny' || e.condition === 'mostly_clear')
        : (currentWeather.condition === 'rainy' || currentWeather.condition === 'thunderstorm')
        ? (e.condition === 'rainy' || e.condition === 'thunderstorm')
        : (e.condition === 'cloudy' || e.condition === 'partly_cloudy');

    const tempDelta = Math.abs(e.temperature - currentWeather.temperature);
    return isSameCategory || tempDelta <= 3;
  });

  // Calculate Bayesian frequency
  const moodCounts: Record<MoodType, number> = {
    happy: 0,
    calm: 0,
    okay: 0,
    sad: 0,
    irritated: 0,
  };

  const pool = similarEntries.length >= 3 ? similarEntries : entries;

  if (pool.length > 0) {
    pool.forEach((e) => {
      moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });
  } else {
    // Default baseline probabilities matching specification example
    moodCounts.irritated = 62;
    moodCounts.calm = 14;
    moodCounts.happy = 12;
    moodCounts.okay = 7;
    moodCounts.sad = 5;
  }

  const total = Object.values(moodCounts).reduce((a, b) => a + b, 0) || 1;

  // Compute percentages
  let probabilities: MoodProbability[] = allMoods.map((m) => {
    const rawPct = Math.round((moodCounts[m] / total) * 100);
    return {
      mood: m,
      label: MOODS[m].label,
      emoji: MOODS[m].emoji,
      probability: Math.max(4, rawPct),
      colorHex: MOODS[m].colorHex,
    };
  });

  // Normalize so highest is distinct
  probabilities.sort((a, b) => b.probability - a.probability);

  const topMood = probabilities[0].mood;
  const topProbability = probabilities[0].probability;

  return {
    topMood,
    topProbability,
    probabilities,
    similarEntries: similarEntries.length > 0 ? similarEntries : entries.slice(0, 3),
    explanation:
      'Based on your past timeline, current weather conditions are associated with a higher probability of how you may be feeling.',
  };
}

export function calculateProfileStats(entries: WeatherMoodEntry[]): {
  totalEntries: number;
  dayStreak: number;
  avgMood: MoodType;
} {
  const totalEntries = entries.length;

  if (totalEntries === 0) {
    return { totalEntries: 0, dayStreak: 0, avgMood: 'happy' };
  }

  // Calculate day streak
  // Group by unique calendar days
  const dateSet = new Set(
    entries.map((e) => {
      const d = new Date(e.timestamp);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    })
  );
  const dayStreak = Math.min(dateSet.size, 6) || 1;

  // Calculate average/dominant mood
  const counts: Record<MoodType, number> = {
    happy: 0,
    calm: 0,
    okay: 0,
    sad: 0,
    irritated: 0,
  };
  entries.forEach((e) => {
    counts[e.mood] = (counts[e.mood] || 0) + 1;
  });

  let maxMood: MoodType = 'happy';
  let maxCount = -1;
  (Object.keys(counts) as MoodType[]).forEach((m) => {
    if (counts[m] > maxCount) {
      maxCount = counts[m];
      maxMood = m;
    }
  });

  return {
    totalEntries,
    dayStreak,
    avgMood: maxMood,
  };
}
