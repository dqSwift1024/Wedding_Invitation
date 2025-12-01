import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loadedImages, setLoadedImages] = useState(new Set())

  const photos = [
    { id: 1, url: '/images/wedding-1.jpg', alt: '婚纱照1' },
    { id: 2, url: '/images/wedding-2.jpg', alt: '婚纱照2' },
    { id: 3, url: '/images/wedding-3.jpg', alt: '婚纱照3' },
    { id: 4, url: '/images/wedding-4.jpg', alt: '婚纱照4' },
    { id: 5, url: '/images/wedding-5.jpg', alt: '婚纱照5' },
    { id: 6, url: '/images/wedding-6.jpg', alt: '婚纱照6' },
  ]

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 bg-gradient-rose relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-rose-gold-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-rose-gold-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant"
          >
            Gallery
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-rose-gold-600 text-lg"
          >
            美好瞬间
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="pb-12"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo.id} className="!w-auto">
                <motion.div
                  variants={itemVariants}
                  className="mx-2 overflow-hidden rounded-2xl shadow-2xl group relative"
                  whileHover={{ 
                    scale: 1.05,
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {/* 加载占位 */}
                  {!loadedImages.has(photo.id) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-rose-gold-100 to-rose-gold-200 flex items-center justify-center"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: loadedImages.has(photo.id) ? 0 : 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="w-12 h-12 border-4 border-rose-gold-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}

                  {/* 图片 */}
                  <motion.img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ 
                      scale: loadedImages.has(photo.id) ? 1 : 1.2,
                      opacity: loadedImages.has(photo.id) ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onLoad={() => handleImageLoad(photo.id)}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x600/f9a8d4/ffffff?text=${photo.alt}`
                      handleImageLoad(photo.id)
                    }}
                  />

                  {/* 悬浮遮罩 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-semibold text-lg">{photo.alt}</p>
                    </div>
                  </motion.div>

                  {/* 光效 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
