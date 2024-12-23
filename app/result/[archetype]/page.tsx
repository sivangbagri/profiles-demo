import { Metadata } from 'next'
import Result from '@/components/Result'
import { notFound } from 'next/navigation'

type Params = Promise<{ archetype: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { archetype } = await params
  let imageUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFfbFMZUPw-9-fKkQEUfsY5EdaZMLHqipDw&s`
  if(archetype==="Visionary") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968061/Y2FyZC12aXNfYm85bm1s/drilldown`;
  else if(archetype==="Guardian") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968058/Y2FyZC1ndWFyZF8xX2NhdGxieg==/drilldown`;
  else if(archetype==="Explorer") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968061/Y2FyZC1leHBsb18xX3dmdnlnaA==/drilldown`;
  else if(archetype==="Achiever") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968050/Y2FyZC1hY2hpZV9hcmJxOXg=/drilldown`;
  else if(archetype==="Strategist") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968062/Y2FyZC1zdHJhX3h3eGpuMA==/drilldown`;
  else if(archetype==="Challenger") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968060/Y2FyZC1jaGFsbGVfdWx3emFu/drilldown`;
  else if(archetype==="Diplomat") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968051/Y2FyZC1kaXBsb19jZHlndmM=/drilldown`;
  else if(archetype==="Thinker") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968048/Y2FyZC10aGlua19jNmdqcWo=/drilldown`;
  else if(archetype==="Realist") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968045/Y2FyZC1yZWFsX2p5NWduZA==/drilldown`;
  else if(archetype==="Stoic") imageUrl=`https://res-console.cloudinary.com/dekobspwg/thumbnails/v1/image/upload/v1734968049/Y2FyZC1zdG9pY19uc2p4cnU=/drilldown`;

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

