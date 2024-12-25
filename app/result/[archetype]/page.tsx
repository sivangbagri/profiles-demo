import { Metadata } from "next";
import Result from "@/components/Result";
import { notFound, redirect } from "next/navigation";
import { cookies } from 'next/headers';

type Params = Promise<{ archetype: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { archetype } = await params;
  let imageUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFfbFMZUPw-9-fKkQEUfsY5EdaZMLHqipDw&s`;
  if (archetype === "Visionary")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-vis_bo9nml.png`;
  else if (archetype === "Guardian")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968058/card-guard_1_catlbz.png`;
  else if (archetype === "Explorer")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-explo_1_wfvygh.png`;
  else if (archetype === "Achiever")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968050/card-achie_arbq9x.png`;
  else if (archetype === "Strategist")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968062/card-stra_xwxjn0.png`;
  else if (archetype === "Challenger")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968060/card-challe_ulwzan.png`;
  else if (archetype === "Diplomat")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968051/card-diplo_cdygvc.png`;
  else if (archetype === "Thinker")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968048/card-think_c6gjqj.png`;
  else if (archetype === "Realist")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968045/card-real_jy5gnd.png`;
  else if (archetype === "Stoic")
    imageUrl = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968049/card-stoic_nsjxru.png`;
  //   const cacheBuster = `?t=${Date.now()}`
  //   imageUrl += cacheBuster
  return {
    title: `Your Personality Archetype: ${archetype}`,
    description: `Discover your personality archetype: ${archetype}. Take the survey now!`,
    openGraph: {
      title: `I'm a ${archetype}!`,
      description: `I just took the personality survey and discovered I'm a ${archetype}. What's your archetype?`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: `I'm a ${archetype}!`,
      description: `I just took the personality survey and discovered I'm a ${archetype}. What's your archetype?`,
      images: [imageUrl],
    },
  };
}

export default async function ResultPage({ params }: { params: Params }) {
  const { archetype } = await params;
   
  const validArchetypes = [
    "Visionary",
    "Strategist",
    "Diplomat",
    "Challenger",
    "Thinker",
    "Achiever",
    "Stoic",
    "Explorer",
    "Realist",
    "Guardian",
  ];

  if (!validArchetypes.includes(archetype)) {
    notFound();
  }
  
  // const cookieStore = await cookies();
  // const surveyCompletedCookie = cookieStore.get('surveyCompleted'); 

  // if (!surveyCompletedCookie) {
  //   return redirect('/'); 
  // }
  
  return <Result archetype={archetype} />;
}
