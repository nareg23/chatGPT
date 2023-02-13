// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import openAi from "../../lib/chatGPT";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openAi.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => {
    return { value: model.id, label: model.id };
  });

  res.status(200).json({ modelOptions });
}
