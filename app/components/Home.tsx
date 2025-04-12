"use client";
import { useEffect } from "react";

const now = new Date();
const day = now.getDay();

async function getTrivia(level: string) {
  const prompt = `You are a trivia host.
You will generate 20 ${level} trivia questions that are in 4 categories. 
For example, one category might be music and you ask 5 questions in this and 5 questions in 3 other categories. 
You will provide the questions in their answers in JSON format within triple backticks - more specifically like this: 
\`\`\`
[
{
"id":"1",
"cateogory":"Sports"
"question":"Who won the masters in 2005?",
"answer":"Tiger Woods"
}
and so on for 20 questions. 
For ID 21-23 you will provide 3 random trivia facts unrelated to the categories in the format:
{
"id":"23",
"fact":"Honey never spoils and has been found in ancient Egyptian tombs still edible."
}
\`\`\`
]`;
  const response = await fetch(`/api/generateTrivia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });
  const trivia = await response.json();

  //   console.log(trivia);

  return trivia;
}

// useEffect(() => {}, [day]);

export default function Homepage() {
  return (
    <div className="">
      <button onClick={() => getTrivia("Hard")}>get Trivai</button>
    </div>
  );
}
