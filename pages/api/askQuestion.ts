// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/query";
import adminDB from "../../lib/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt || !chatId || !session) {
    console.log("not passing");
    return res.status(400).json({ answer: "Please provide chat id" });
  }

  try {
    const response = await query({ prompt, chatId, model });

    const message: IMessage = {
      text: response || "Chat GPT was unable to find an answer for that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "CHAPTGPT",
        name: "CHATGPT",
        avatar:
          "https://gravatar.com/avatar/02bb8083df5a92c8fb16d29585011c94?s=400&d=robohash&r=x",
      },
    };
    await adminDB
      .collection("users")
      .doc(session?.user?.email!)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    return res.status(200).json({ answer: message.text });
  } catch (error: any) {
    return res.status(500).json({ answer: error.message });
  }
}
