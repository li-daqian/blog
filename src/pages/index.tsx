import type { ReactNode } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Hero from '@site/src/components/landing/Hero'
import Particles from '@site/src/components/magicui/particles'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <Particles className="absolute inset-0" quantity={100} ease={80} color="#ffffff" refresh />
      </main>
    </Layout>
  )
}
