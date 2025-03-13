"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Archetype } from "./Result"
 import { alias } from "./Result"
interface InteractiveButtonProps {
  archetype: string
   
}

export default function InteractiveButton({
  archetype,
 }: InteractiveButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [questions, setQuestions] = useState<{ id: number; text: string; position: { x: number; y: number } }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const gamingQuestions = [
    "Which game should I play?",
    "Which gaming genre suits me best?",
    "Which iconic game character is like me?",
    "What’s my biggest strength?",
    "What kind of opponent secretly fears me?",
    "How many gamers are like me?",
    "What’s most relevant to me in gaming?",
    "If my skills were ranked, what tier am I?",
    "What’s holding me back from getting better?",
    "Current gaming news?"
  ]

  useEffect(() => {
    if (isHovering) {
      const timer = setInterval(() => {
        if (questions.length < 5) {
          const buttonRect = buttonRef.current?.getBoundingClientRect()

          if (buttonRect) {
            // Create a random position around the button
            const randomAngle = Math.random() * Math.PI * 2
            const distance = 50 + Math.random() * 100
            const x = Math.cos(randomAngle) * distance
            const y = Math.sin(randomAngle) * distance

            setQuestions((prev) => [
              ...prev,
              {
                id: Date.now(),
                text: gamingQuestions[Math.floor(Math.random() * gamingQuestions.length)],
                position: { x, y },
              },
            ])
          }
        }
      }, 600)

      return () => clearInterval(timer)
    } else {
      setQuestions([])
    }
  }, [isHovering, questions.length])

  return (
    <div className="relative flex items-center  w-full">
      <AnimatePresence>
        {questions.map((question) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: question.position.x,
              y: question.position.y,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute pointer-events-none bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap z-10"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {question.text}
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        ref={buttonRef}
        className="font-bold glow-on-hover py-2 px-4 text-white bg-white/10 rounded-lg border-none outline-none cursor-pointer relative z-20 w-full text-sm sm:text-base"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Interact with {alias[archetype as Archetype]}
      </button>
    </div>
  )
}

