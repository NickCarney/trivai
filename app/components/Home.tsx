"use client";
import { useEffect } from "react";

interface Trivia {
  id: number;
  question: string;
  answer: string;
}

const now = new Date();
const day = now.getDay();
const categories: string[] = [];
const questions: string[] = [];
const answers: string[] = [];
const facts: string[] = [];
const podcastText: string[] = [];

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
  const triviaFormatted = JSON.parse(trivia.split("```")[1]);
  //   console.log(
  //     "CATS:",
  //     categories,
  //     "QS:",
  //     questions,
  //     "ANSWERS:",
  //     answers,
  //     "FACTS:",
  //     facts
  //   );
  return triviaFormatted;
}

async function generatePodcastText() {
  const trivia = await getTrivia("hard");
  for (let i = 0; i < trivia.length; i++) {
    if (i < 20) {
      if (i % 5 == 0) {
        categories.push(trivia[i].category);
        podcastText.push("Category " + trivia[i].category + " ... ... ...");
      }
      questions.push(trivia[i].question);
      answers.push(trivia[i].answer);
      podcastText.push(
        `Question ${i + 1}: ` + trivia[i].question + " ... ... ..."
      );
      podcastText.push(`Answer ${i + 1}: ` + trivia[i].answer + " ... ... ...");
    } else {
      facts.push(trivia[i].fact);
      podcastText.push(`Fact: ` + trivia[i].fact + " ... ... ...");
    }
  }
  console.log("PODCAST TEXT" + podcastText);
  const response = await fetch(`/api/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: podcastText }),
  });
  const tts = await response.json();
  console.log("tts success");
}

// useEffect(() => {}, [day]);

export default function Homepage() {
  return (
    <div className="">
      <button onClick={generatePodcastText}>get Trivai</button>
    </div>
  );
}
