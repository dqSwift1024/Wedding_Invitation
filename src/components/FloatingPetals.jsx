import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🌿']

const FloatingPetals = () => {
  const [petalList, setPetalList] = useState([])

  useEffect(() => {
    const createPetal = () => {
      const petal = {
        id: Math.random(),
        emoji: petals[Math.floor(Math.random() * petals.length)],
        x: Math.random() * 100,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 2,
        size: 20 + Math.random() * 15,
      }
      setPetalList(prev => [...prev, petal])

      setTimeout(() => {
        setPetalList(prev => prev.filter(p => p.id !== petal.id))
      }, (petal.duration + petal.delay) * 1000)
    }

    const interval = setInterval(createPetal, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalList.map(petal => (
        <motion.div
          key={petal.id}
          initial={{
            x: `${petal.x}vw`,
            y: -50,
            opacity: 0.7,
            rotate: 0,
          }}
          animate={{
            y: '100vh',
            opacity: [0.7, 1, 0.7, 0],
            rotate: 360,
            x: `${petal.x + (Math.random() - 0.5) * 20}vw`,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'linear',
          }}
          className="absolute text-2xl"
          style={{ fontSize: `${petal.size}px` }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingPetals



