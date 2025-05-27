import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  temperature: 0, // fully deterministic responses
  modelName: "gpt-3.5-turbo",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

// Define a prompt template
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a location assistant. Convert country or state names into a major city in that region for travel planning.
    If it's already a city, just return the city.
    Return only the city name.`
  ],
  ["user", "{input}"]
]);

const chain = prompt.pipe(model);

export async function normalizePlaceName(name) {
  try {
    const response = await chain.invoke({ input: name });
    return response.content.trim();
  } catch (err) {
    console.error("Normalization failed:", err);
    return name; // fallback to original
  }
}
