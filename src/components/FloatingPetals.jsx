import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🌿']

const FloatingPetals = () => {
  const [petalList, setPetalList] = useState([])
  const [isStorm, setIsStorm] = useState(false)

  useEffect(() => {
    // 监听樱花暴雨事件
    const handleStorm = () => {
      setIsStorm(true)
      // 创建大量樱花
      const stormPetals = []
      for (let i = 0; i < 100; i++) {
        const petal = {
          id: Math.random(),
          emoji: '🌸',
          x: Math.random() * 100,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 0.5,
          size: 25 + Math.random() * 20,
        }
        stormPetals.push(petal)
      }
      setPetalList(prev => [...prev, ...stormPetals])
      
      // 3秒后结束暴雨
      setTimeout(() => {
        setIsStorm(false)
      }, 3000)
      
      // 清理暴雨樱花
      setTimeout(() => {
        setPetalList(prev => prev.filter(p => !stormPetals.find(sp => sp.id === p.id)))
      }, 6000)
    }

    window.addEventListener('triggerCherryBlossomStorm', handleStorm)

    const createPetal = () => {
      if (!isStorm) {
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
    }

    const interval = setInterval(createPetal, 2000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('triggerCherryBlossomStorm', handleStorm)
    }
  }, [isStorm])

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



