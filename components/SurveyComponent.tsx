"use client";

import { useEffect, useState } from "react";
import Question from "./Question";
import { useRouter } from "next/navigation";
import questions from "@/constants/questions.json";
import Cookies from "js-cookie";
export default function SurveyComponent() {
  const deleteCookie = async () => {
    await fetch('/api/delete-cookie', { method: 'POST' });
  };

  useEffect(()=>{
    deleteCookie();
  },[])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  type Results = {
    O: number;
    C: number;
    E: number;
    A: number;
    N: number;
  };
  const [results, setResults] = useState<Results>({
    O: 0,
    C: 0,
    E: 0,
    A: 0,
    N: 0,
  });
  const router = useRouter();
  const handleNextQuestion = async (type: string) => {
    setResults((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const archetype = calculateArchetype(results);
      Cookies.set('surveyCompleted','true');
      router.push(`/result/${archetype}`);

    }
  };

  const calculateArchetype = (results: Results) => {
    const { O, C, E, A, N } = results;
    // const total = 7;
    // const normO = O / total
    // const normC = C / total
    // const normE = E / total
    // const normA = A / total
    // const normN = N / total

    const archetypeScores = {
      Visionary: 1.5 * O + 1.0 * C + 1.2 * E + 0.2 * A - 0.5 * N,
      Strategist: 1.4 * C + 1.1 * O - 0.8 * E + 0.3 * N - 0.4 * A,
      Diplomat: 1.4 * A + 1.0 * O + 0.9 * C - 0.7 * E - 0.3 * N,
      Challenger: 1.3 * E + 1.0 * O + 0.8 * C - 0.5 * A - 0.3 * N,
      Thinker: 1.5 * O + 1.0 * C - 0.5 * E - 0.2 * A - 0.3 * N,
      Achiever: 1.2 * C + 1.3 * E + 1.0 * O - 0.4 * A - 0.2 * N,
      Stoic: 1.0 * N + 0.9 * O + 0.8 * C - 0.4 * E - 0.2 * A,
      Explorer: 1.4 * O + 1.2 * E + 1.0 * C - 0.3 * A - 0.2 * N,
      Realist: 1.3 * C + 1.0 * O + 1.1 * A - 0.5 * E - 0.2 * N,
      Guardian: 1.4 * A + 1.2 * C + 0.4 * O - 0.3 * E - 0.2 * N,
    };

    return Object.entries(archetypeScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
  };

  return (
    <div>
      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}
    </div>
  );
}
