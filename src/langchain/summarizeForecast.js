import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  temperature: 0.5,
  modelName: "gpt-3.5-turbo",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a friendly and concise travel assistant. Given the city, date, and weather forecast, provide a helpful one-sentence packing recommendation.
    Do not say the forecast is unavailable. Always use the data provided.

    Examples:
    - "Expect rain in London on June 3rd. Pack an umbrella and waterproof shoes."
    - "Sunny skies in Rome — light clothing and sunglasses recommended."
    - "Mild rain in Tokyo — consider a raincoat and water-resistant shoes."

    Respond only with the recommendation sentence.`
  ],
  ["user", "{input}"]
]);

// Glues prompt + model into one chain
const chain = prompt.pipe(model);

// Formats forecast data into the prompt and invokes the LLM chain to produce a one-sentence packing recommendation.
export async function summarizeForecast(forecast, city, date) {

const input = ` City: ${city}
                Date: ${date}
                Condition: ${forecast.condition}
                Average Temp: ${forecast.temp}°C
                Max: ${forecast.maxTemp}°C / Min: ${forecast.minTemp}°C`;

// console.log("Input to GPT:", { city, date, forecast });

  try {
    const response = await chain.invoke({ input });
    // console.log("Response - ", response);
    return response.content.trim();
  } catch (error) {
    console.error("Forecast summary failed:", error);
    return "No summary available.";
  }
}
