import { Configuration, OpenAIApi } from "openai";
const API_KEY = process.env.OPENAI_KEY;
if (!API_KEY) {
  console.log("NO API KEY OPENAI");
}

const config = new Configuration({
  apiKey: API_KEY,
});

const openAi = new OpenAIApi(config);

export default openAi;
