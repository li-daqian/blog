import { type Variants, motion } from 'framer-motion'

import HeroSvg from './img/hero.svg'

import SocialLinks from '@site/src/components/SocialLinks'
import styles from './styles.module.css'

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function Circle() {
  return <div className={styles.circle} />
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
      }}
    >
      你好! 我是
      <span
        className={styles.name}
        onMouseMove={(e) => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        李大骞
      </span>
      <span className="ml-1">👋</span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          我是一名拥有 10 年经验的 Java 开发者，目前主要在做 AI Agent
          相关方向，关注智能应用落地、工程化能力以及复杂系统在真实业务中的可用性。
        </motion.p>
        <motion.p custom={3} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          过去也长期使用 Kotlin、TypeScript / JavaScript、Go、Rust
          等多种语言。这些博客会记录我的技术实践、踩坑复盘与产品探索。
        </motion.p>
        <motion.div custom={4} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks />
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        <HeroSvg />
        <Circle />
      </motion.div>
    </motion.div>
  )
}
