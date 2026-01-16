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
            y: '-10vh',
            opacity: 0,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            y: '110vh',
            opacity: [0, 0.8, 0.9, 0.8, 0.7, 0.5, 0],
            rotate: [0, 180, 360, 540, 720],
            scale: [0.5, 1, 1.1, 1, 0.9, 0.8, 0.6],
            x: [
              `${petal.x}vw`,
              `${petal.x + Math.sin(1) * 5}vw`,
              `${petal.x + Math.sin(2) * 8}vw`,
              `${petal.x + Math.sin(3) * 5}vw`,
              `${petal.x + Math.sin(4) * 8}vw`,
              `${petal.x + Math.sin(5) * 5}vw`,
            ],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'linear',
            x: {
              duration: petal.duration,
              repeat: 0,
              ease: 'easeInOut',
            },
            rotate: {
              duration: petal.duration,
              ease: 'linear',
            },
            opacity: {
              duration: petal.duration,
              times: [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
            },
          }}
          className="absolute"
          style={{ 
            fontSize: `${petal.size}px`,
            filter: 'drop-shadow(0 2px 4px rgba(236, 72, 153, 0.3))',
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingPetals



