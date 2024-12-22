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
      className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700 font-roboto">
        {question.question}
      </h2>
      <ul className="space-y-3 font-roboto">
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
              className="w-full bg-purple-500 p-3 rounded-md font-semibold text-white transition-colors duration-300 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
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

