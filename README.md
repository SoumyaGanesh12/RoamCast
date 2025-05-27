# 🌦️RoamCast

**RoamCast** is a React-based web application using modern APIs to transform trip planning into a streamlined experience, combining accurate weather forecasts with AI-driven packing suggestions for travel-ready insights at a glance. Users enter destinations and travel dates; RoamCast then retrieves and summarizes weather data to assist with packing and preparation.

## Features

* **Multi-stop Itinerary**: Add multiple cities with travel dates (up to a 14-day forecast range).
* **Accurate Forecasts**: Retrieve weather forecasts via WeatherAPI.
* **AI-Powered Summaries**: Generate actionable recommendations using the OpenAI API with LangChain integration.
* **Dynamic UI**: Responsive card-based layout for inputs and forecast display.
* **Error Handling**: Inline validation and per-stop error messaging for failed lookups.

## Tech Stack

* **React** with **Vite** for fast frontend development.
* **WeatherAPI** for reliable multi-day weather forecasts.
* **OpenAI API** driven by **LangChain** for natural language summaries.
* **JavaScript (ES6+)** for application logic.
* **CSS Variables & Grid** for responsive styling.

## Technical Concepts

* **LangChain**: Manages prompt templates, function calling, and output parsing.
* **Few-Shot Prompting**: Provides examples to guide AI output consistency.
* **Structured Output Parsing**: Converts AI responses into typed JavaScript objects.
* **CSS Grid & Variables**: Achieves responsive, theme-driven design.
* **Error Handling Patterns**: Implements client-side validation and API error capture.

## App Flow 

    User Input (City & Date)    
            ↓    
    LangChain Orchestration    
            ↓    
    1. Geocode via OpenWeatherMap    
    2. Fetch Forecast via WeatherAPI    
    3. Generate Summary via OpenAI    
            ↓    
    Display Forecast & Recommendations in UI Cards    

## Required API Keys Overview

| Service        | Purpose                     | Environment Variable  | Notes                        |
| -------------- | --------------------------- | --------------------- | ---------------------------- |
| OpenWeatherMap | Geocoding (city to lat/lon) | `VITE_OW_API_KEY`     | Used for location lookup     |
| WeatherAPI     | 14-day weather forecasts    | `VITE_WEATHERAPI_KEY` | Used for forecast retrieval  |
| OpenAI         | Generate weather summaries  | `VITE_OPENAI_API_KEY` | Used with structured prompts |

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/SoumyaGanesh12/RoamCast.git
   cd RoamCast
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure environment variables by creating a `.env` file in the project root with:

   ```env
   VITE_OW_API_KEY=<OpenWeatherMap API key>
   VITE_WEATHERAPI_KEY=<WeatherAPI key>
   VITE_OPENAI_API_KEY=<OpenAI API key>
   ```
4. Launch the development server:

   ```bash
   npm run dev
   ```
5. Access the application by opening `http://localhost:5173` in a browser.

This project focuses on demonstrating the integration of modern APIs and AI for enhanced trip planning experience.
