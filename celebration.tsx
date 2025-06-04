"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CelebrationProps {
  show: boolean
  onComplete: () => void
}

export function Celebration({ show, onComplete }: CelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])

  useEffect(() => {
    if (show) {
      const emojis = ["🎉", "✨", "🎊", "🌟", "💫", "🎈", "🏆", "👏"]
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        onComplete()
        setParticles([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl"
              initial={{
                x: particle.x,
                y: particle.y,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                y: particle.y - 200,
                scale: [0, 1.5, 1],
                rotate: 360,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-green-600">Task Completed!</h3>
              <p className="text-gray-600">Great job! Keep it up!</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
