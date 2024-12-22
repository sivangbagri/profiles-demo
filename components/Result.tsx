'use client'

import Image from 'next/image'
import { TwitterShareButton } from 'next-share'
import Link from 'next/link'

interface ResultProps {
  archetype: string
}

export default function Result({ archetype }: ResultProps) {
  const shareUrl = `https://profiles-demo-1iwz.vercel.app/result/${archetype}`
  const imageUrl = `https://i.pinimg.com/736x/0d/e1/be/0de1be2ac7fc25c8d6756b479dabd486.jpg`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Your Personality Archetype</h1>
      <p className="text-2xl mb-6">{archetype}</p>
      <div className="relative w-60 h-60 mb-6">
        {/* <Image
          src={imageUrl}
          alt={`${archetype} archetype`}
          width={240}
          height={240}
          className="rounded-lg"
        /> */}
      </div>
      <TwitterShareButton
        url={shareUrl}
        title={`I am a ${archetype}! Take the personality survey and discover your archetype.`}
        className="mb-4"
      >
        <p className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Share on Twitter
        </p>
      </TwitterShareButton>
      <Link href="/">
        <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
          Take the Survey Again
        </button>
      </Link>
    </div>
  )
}

