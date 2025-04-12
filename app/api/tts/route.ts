import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();
const speechFile = path.resolve("./speech.mp3");

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const text = JSON.stringify(prompt);

  try {
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      input: text,
      instructions: "Speak in a cheerful and positive tone.",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    return Response.json(buffer);
  } catch (error) {
    console.error("openai tts error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
