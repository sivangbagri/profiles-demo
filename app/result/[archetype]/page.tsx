import { Metadata } from 'next'
import Result from '@/components/Result'
import { notFound } from 'next/navigation'

type Params = Promise<{ archetype: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { archetype } = await params
  const imageUrl = `https://s.yimg.com/ny/api/res/1.2/ElIqX101haK6aTL3TYpdnw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQwMw--/https://media.zenfs.com/en/zacks.com/30e90ac213ebedcfe9ef1b79c529169c`

  return {
    title: `Your Personality Archetype: ${archetype}`,
    description: `Discover your personality archetype: ${archetype}. Take the survey now!`,
    openGraph: {
      title: `I'm a ${archetype}!`,
      description: `I just took the personality survey and discovered I'm a ${archetype}. What's your archetype?`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm a ${archetype}!`,
      description: `I just took the personality survey and discovered I'm a ${archetype}. What's your archetype?`,
      images: [imageUrl],
    },
  }
}

export default async function ResultPage({ params }: { params: Params }) {
  const { archetype } = await params
  const validArchetypes = ['Visionary', 'Strategist', 'Diplomat', 'Challenger', 'Thinker', 'Achiever', 'Stoic', 'Explorer', 'Realist', 'Guardian']
  
  if (!validArchetypes.includes(archetype)) {
    notFound()
  }

  return <Result archetype={archetype} />
}

