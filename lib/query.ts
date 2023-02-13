import openAi from "./chatGPT";
type Data = {
  prompt: string;
  chatId?: string;
  model: string;
};

const query = async ({ prompt, chatId, model }: Data) => {
  try {
    const res = await openAi.createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return res.data.choices[0].text;
  } catch (error: any) {
    return `Chat GPT unable to find an aswer for that! ${error.message}`;
  }
};

export default query;
