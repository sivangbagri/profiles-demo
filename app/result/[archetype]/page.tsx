import { Metadata } from 'next'
import Result from '@/components/Result'
import { notFound } from 'next/navigation'

interface ResultPageProps {
  params: { archetype: string }
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const archetype = params.archetype
  const imageUrl = `https://i.pinimg.com/236x/14/59/21/145921300153fe71e241a79c16f1c8fc.jpg`

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

export default function ResultPage({ params }: ResultPageProps) {
  const validArchetypes = ['Visionary', 'Strategist', 'Diplomat', 'Challenger', 'Thinker', 'Achiever', 'Stoic', 'Explorer', 'Realist', 'Guardian']
  
  if (!validArchetypes.includes(params.archetype)) {
    notFound()
  }

  return <Result archetype={params.archetype} />
}

