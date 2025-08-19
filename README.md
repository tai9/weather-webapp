# Weather Webapp

Simple weather search web app built with React and TypeScript. Search a country to see its current weather and a 5‑day forecast (in 3‑hour intervals). Recent searches are stored locally for quick access.

## Features

- Current weather: temperature, description, humidity, wind, visibility
- 5‑day / 3‑hour forecast grouped by day
- Country search with suggestions and validation
- Recent search history with per‑item delete and clear‑all

## Tech Stack

- React 19, TypeScript, Vite 7
- React Router 7
- TanStack Query 5 (+ Devtools)
- Tailwind CSS 4
- Axios

## Requirements

- Node.js and pnpm

## Environment Variables

Create a `.env.local` at the project root with the following keys:

```bash
# Base URL for OpenWeather (or your proxy). The app appends /data/2.5 automatically.
VITE_VERCEL_API_URL=https://api.openweathermap.org

# OpenWeather API key (sent as appid in requests)
VITE_VERCEL_API_KEY=YOUR_OPENWEATHER_API_KEY

# Countries API base URL
VITE_COUNTRIES_API_URL=https://restcountries.com/v3.1
```

Notes:

- Weather endpoints are requested from `${VITE_VERCEL_API_URL}/data/2.5` with `appid=VITE_VERCEL_API_KEY`.
- Countries are fetched from `${VITE_COUNTRIES_API_URL}/all?fields=name,flags,latlng,cca2`.

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open the printed local URL in your browser.

## Scripts

```bash
# Start dev server
pnpm dev

# Type-check and build
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
pnpm lint:fix
```

## Project Structure

```
src/
  components/        # UI components (CurrentWeather, Forecast, SearchInput, etc.)
  hooks/             # Data fetching hooks (useCurrentWeather, useWeatherForecast, useCountries)
  pages/             # Routes: home/ and search/
  layouts/           # MainLayout
  configs/           # axios client
  constants/         # route constants
  utils/             # localStorage helpers for search history
```

## Conventions

- Use pnpm for dependency management.
- Build layouts with CSS flex/grid utilities; avoid using margin for page layout spacing.

## Credits

- Weather data by [OpenWeather](https://openweathermap.org/)
- Country data by [REST Countries](https://restcountries.com/)
