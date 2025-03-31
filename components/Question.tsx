import { motion } from 'framer-motion'

interface QuestionProps {
  question: {
    question: string
    answerOptions: Array<{ text: string; type: string; value: number }>
  }
  onAnswerClick: (type: string) => void
}

export default function Question({ question, onAnswerClick }: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-black/90 rounded-lg border border-white/10 p-4 sm:p-6  mx-auto w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white font-mono">
        {question.question}
      </h2>
      <ul className="space-y-2 sm:space-y-3 font-mono">
        {question.answerOptions.map((ele) => (
          <motion.li
            key={ele.text}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <motion.button
              className="w-full bg-white/10 p-2 sm:p-3 rounded-md font-semibold text-sm sm:text-base text-white transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswerClick(ele.type)}
            >
              {ele.text}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

