"use client";

import { useEffect, useState, useTransition } from "react";
import Question from "./Question";
import { useRouter } from "next/navigation";
import questions from "@/constants/questions.json";
import Cookies from "js-cookie";
import Form from "./Form";
import { submitGamingProfile } from "../actions";

export default function SurveyComponent() {
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

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showFormModal, setShowFormModal] = useState(false);
  const [calculatedArchetype, setCalculatedArchetype] = useState("");

  const handleNextQuestion = async (type: string) => {
    setResults((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const archetype = calculateArchetype(results);
      setCalculatedArchetype(archetype);
      setShowFormModal(true);
    }
  };
  const fetchTwitterProfile = async (username:FormDataEntryValue | null ) => {
    
    const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAABLsyAEAAAAAf2WS3XGXwOLtnRNag6veLqapkjQ%3DtQj2hyxfvnMfofpQB9lhdXxe8LdHOEIxt3E5BXppN9xwIkpgeO"; // Replace with your API token
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`;

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${BEARER_TOKEN}`,
            "access-control-allow-origin": "*"
            
        }
    });

    if (!response.ok) {
        console.error("Error fetching profile:", response.statusText);
        return;
    }

    const data = await response.json();
    console.log("Profile Image URL:", data.data.profile_image_url);
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsLoading(true);
    const result = await submitGamingProfile(formData);
    // if (result.success) {
    //   setFormSubmitted(true);
    // }
    // fetchTwitterProfile(formData.get("twitter"))
    startTransition(() => {
      router.push(`/result/${calculatedArchetype}?username=${formData.get("twitter")}`);
    });
    setIsLoading(false);
  };
  // 

  const calculateArchetype = (results: Results) => {
    const { O, C, E, A, N } = results;
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
      <p className="flex justify-center m-4 text-md font-mono font-bold ">
        {currentQuestion}/7
      </p>
      {showFormModal && (
        <Form
          handleSubmit={handleSubmit}
          archetype={calculatedArchetype}
          isLoading={isLoading}
        />
      )}
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/736x/65/dd/3b/65dd3b014ebf57b81f781cb2d2225c36.jpg"
              className="size-40"
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
