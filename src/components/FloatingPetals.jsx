import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FloatingPetals = () => {
  const [petalList, setPetalList] = useState([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // 监听开始樱花飘落事件
    const handleStart = () => {
      setIsActive(true)
    }

    window.addEventListener('startCherryBlossoms', handleStart)

    const createPetal = () => {
      if (isActive) {
        const petal = {
          id: Math.random(),
          emoji: '🌸',
          x: Math.random() * 100,
          duration: 8 + Math.random() * 4,
          delay: 0,
          size: 24 + Math.random() * 12,
        }
        setPetalList(prev => [...prev, petal])

        setTimeout(() => {
          setPetalList(prev => prev.filter(p => p.id !== petal.id))
        }, petal.duration * 1000)
      }
    }

    // 每3秒创建一片樱花
    const interval = setInterval(createPetal, 3000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('startCherryBlossoms', handleStart)
    }
  }, [isActive])

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



