import React from "react";
import { motion } from "framer-motion";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  archetype: string;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({ handleSubmit, archetype, isLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 px-4">
      {/* Animated Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-black-900 p-5 rounded-lg max-w-md w-full border border-gray-700/50 font-mono shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white font-mono">
          Almost there...
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" id="archetype" name="archetype" value={archetype} />

          <div className="space-y-2">
            <label htmlFor="game" className="block text-left">
              Which game do you play the most?
            </label>
            <motion.input
              required
              type="text"
              id="game"
              name="game"
              className="w-full bg-white/10 rounded p-3 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter game name"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="frequency" className="block text-left">
              How often do you play?
            </label>
            <motion.select
              required
              id="frequency"
              name="frequency"
              className="w-full bg-white/10 rounded p-3 focus:outline-none focus:ring-2 focus:ring-white/50"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Few times a week</option>
              <option value="monthly">Few times a month</option>
              <option value="rarely">Rarely</option>
            </motion.select>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400 text-left">Social Handles (don’t miss out anything 😉)</p>

            <div className="space-y-2">
              <label htmlFor="twitter" className="block text-left">Twitter Handle</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">@</span>
                <motion.input
                  type="text"
                  id="twitter"
                  name="twitter"
                  className="w-full bg-white/10 rounded p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="username"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="instagram" className="block text-left">Instagram Handle</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">@</span>
                <motion.input
                  required
                  type="text"
                  id="instagram"
                  name="instagram"
                  className="w-full bg-white/10 rounded p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="username"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-white text-black rounded p-3 hover:bg-gray-200 transition-colors"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Cooking... ⌛" : "Submit"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Form;
