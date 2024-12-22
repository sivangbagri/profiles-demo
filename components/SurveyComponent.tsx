'use client'

import { useState } from 'react'
import Question from './Question'
import { useRouter } from 'next/navigation'
import questions from '@/constants/questions.json'

export default function SurveyComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  type Results = {
    O: number;
    C: number;
    E: number;
    A: number;
    N: number;
  };
  const [results, setResults] =  useState<Results>({
    O: 0,
    C: 0,
    E: 0,
    A: 0,
    N: 0,
  })
  const router = useRouter()

  const handleNextQuestion = (type: string) => {
    setResults((prev) => ({ ...prev, [type]: prev[type as keyof typeof prev] + 1 }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      const archetype = calculateArchetype(results)
      router.push(`/result/${archetype}`)
    }
  }

  const calculateArchetype = (results :Results ) => {
    const { O, C, E, A, N } = results
    const total = 7;
    const normO = O / total
    const normC = C / total
    const normE = E / total
    const normA = A / total
    const normN = N / total

    const archetypeScores = {
      Visionary: 0.4 * normO + 0.3 * normC + 0.2 * normE - 0.2 * normA - 0.2 * normN,
      Strategist: 0.3 * normO + 0.4 * normC + 0.1 * normE + 0.1 * normA - 0.2 * normN,
      Diplomat: 0.2 * normO + 0.3 * normC + 0.2 * normE + 0.4 * normA - 0.3 * normN,
      Challenger: 0.3 * normO + 0.2 * normC + 0.3 * normE - 0.1 * normA + 0.3 * normN,
      Thinker: 0.5 * normO + 0.4 * normC - 0.1 * normE + 0.1 * normA - 0.3 * normN,
      Achiever: 0.2 * normO + 0.4 * normC + 0.3 * normE + 0.2 * normA - 0.2 * normN,
      Stoic: 0.1 * normO + 0.4 * normC - 0.2 * normE + 0.2 * normA - 0.1 * normN,
      Explorer: 0.5 * normO + 0.2 * normC + 0.4 * normE - 0.1 * normA + 0.1 * normN,
      Realist: 0.3 * normO + 0.3 * normC + 0.1 * normE + 0.2 * normA - 0.3 * normN,
      Guardian: 0.1 * normO + 0.5 * normC - 0.1 * normE + 0.3 * normA - 0.4 * normN,
    }

    return Object.entries(archetypeScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]
  }

  return (
    <div>
      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}
    </div>
  )
}

