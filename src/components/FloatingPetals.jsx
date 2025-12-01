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
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 2,
        size: 25 + Math.random() * 20,
        rotation: Math.random() * 360,
        windStrength: (Math.random() - 0.5) * 30, // 风力强度
      }
      setPetalList(prev => [...prev, petal])

      setTimeout(() => {
        setPetalList(prev => prev.filter(p => p.id !== petal.id))
      }, (petal.duration + petal.delay) * 1000)
    }

    const interval = setInterval(createPetal, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalList.map(petal => {
        // 计算风力影响的路径
        const windPath = [
          petal.x,
          petal.x + petal.windStrength * 0.3,
          petal.x + petal.windStrength * 0.6,
          petal.x + petal.windStrength * 0.4,
        ]

        return (
          <motion.div
            key={petal.id}
            initial={{
              x: `${petal.x}vw`,
              y: -50,
              opacity: 0,
              rotate: petal.rotation,
              scale: 0.5,
            }}
            animate={{
              y: '100vh',
              opacity: [0, 0.8, 1, 0.8, 0],
              rotate: petal.rotation + 360 + (Math.random() - 0.5) * 180,
              scale: [0.5, 1, 1.2, 1, 0.8],
              x: windPath.map(x => `${x}vw`),
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: [0.25, 0.1, 0.25, 1], // 自定义缓动，模拟重力
              times: [0, 0.2, 0.5, 0.8, 1], // 关键帧时间点
            }}
            className="absolute text-2xl"
            style={{ 
              fontSize: `${petal.size}px`,
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
              willChange: 'transform',
            }}
          >
            {petal.emoji}
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingPetals
