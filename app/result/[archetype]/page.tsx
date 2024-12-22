import { Metadata } from 'next'
import Result from '@/components/Result'
import { notFound } from 'next/navigation'

type Params = Promise<{ archetype: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { archetype } = await params
  const imageUrl = `https://i.pinimg.com/474x/4a/ee/3c/4aee3c981faa9f217ae377b5471308c1.jpg`

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

