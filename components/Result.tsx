"use client";

import Image from "next/image";
import { TwitterShareButton } from "next-share";
import Link from "next/link";
import { submitGamingProfile } from "../actions";
import { useState, useEffect } from "react";
import InteractiveButton from "./InteractiveButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";

interface ResultProps {
  archetype: string;
}
export type Archetype =
  | "Visionary"
  | "Guardian"
  | "Explorer"
  | "Achiever"
  | "Strategist"
  | "Challenger"
  | "Diplomat"
  | "Thinker"
  | "Realist"
  | "Stoic";

const archetypeImages: Record<Archetype, string> = {
  Visionary:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-vis_bo9nml.png",
  Guardian:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968058/card-guard_1_catlbz.png",
  Explorer:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-explo_1_wfvygh.png",
  Achiever:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968050/card-achie_arbq9x.png",
  Strategist:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968062/card-stra_xwxjn0.png",
  Challenger:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968060/card-challe_ulwzan.png",
  Diplomat:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968051/card-diplo_cdygvc.png",
  Thinker:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968048/card-think_c6gjqj.png",
  Realist:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968045/card-real_jy5gnd.png",
  Stoic:
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968049/card-stoic_nsjxru.png",
};
export const alias: Record<Archetype, string> = {
  Visionary: "Futurist",
  Guardian: "Defender",
  Explorer: "Explorer",
  Achiever: "Overlord",
  Strategist: "Warlord",
  Challenger: "Ironheart",
  Diplomat: "Peacemaker",
  Thinker: "Logician",
  Realist: "Realist",
  Stoic: "Titan",
};
export default function Result({ archetype }: ResultProps) {
  const shareUrl = `https://my-gaming-profile.vercel.app/result/${archetype}`;
  const imageUrl = archetypeImages[archetype as Archetype];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await submitGamingProfile(formData);
    if (result.success) {
      setFormSubmitted(true);
    }
  }
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-vis_bo9nml.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 25000); // 25 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 sm:p-8 font-mono">
      <div className="w-full max-w-lg mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Your Gaming Profile is Ready !
        </h1>
        <Confetti recycle={false} width={window.innerWidth} numberOfPieces={600} initialVelocityY={{ min: 10, max: 50 }} colors={["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]}  />
        {/* <DotLottieReact
          src="https://lottie.host/493157dd-0b44-416e-bef1-8650312810c3/SslflVFC1Q.lottie"
          autoplay
          loop
        /> */}
        <p className="text-xl sm:text-2xl mb-6">
          The {alias[archetype as Archetype]}
        </p>
        <div className="relative w-full h-32 sm:w-full sm:h-60 mb-2 mx-auto">
          <Image
            src={imageUrl}
            alt={`${archetype} archetype`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
          <button
            onClick={handleDownload}
            disabled={!isImageLoaded}
            className="absolute top-2 right-2 bg-white/30 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 grid-col-1 md:gap-2 gap-1 my-5 ">
          <TwitterShareButton
            url={shareUrl}
            title={`I just found my gaming personality —I'm a ${
              alias[archetype as Archetype]
            }. What's yours? Unlock your gaming personality and quote it now ! 😎`}
            className="mb-4 w-full"
          >
            <p className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base">
              Share on X
            </p>
          </TwitterShareButton>
          <InteractiveButton archetype={archetype} />

          <Link href="/" className="col-span-2">
            <button className="w-full mb-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base">
              Not you ? Start again
            </button>
          </Link>
        </div>

        {!formSubmitted ? (
          <form action={handleSubmit} className="space-y-6">
            <input
              type="hidden"
              id="archetype"
              name="archetype"
              value={archetype}
            />
            <div className="space-y-2">
              <label htmlFor="game" className="block text-left">
                Which game do you play the most?
              </label>
              <input
                required
                type="text"
                id="game"
                name="game"
                className="w-full bg-white/10 rounded p-3 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter game name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="frequency" className="block text-left">
                How often do you play?
              </label>
              <select
                required
                id="frequency"
                name="frequency"
                className="w-full bg-white/10 rounded p-3 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Few times a week</option>
                <option value="monthly">Few times a month</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 text-left">
                Social Handles (donot miss out anything 😉)
              </p>

              <div className="space-y-2">
                <label htmlFor="twitter" className="block text-left">
                  Twitter Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">@</span>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    className="w-full bg-white/10 rounded p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="instagram" className="block text-left">
                  Instagram Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">@</span>
                  <input
                    required
                    type="text"
                    id="instagram"
                    name="instagram"
                    className="w-full bg-white/10 rounded p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black rounded p-3 hover:bg-gray-200 transition-colors "
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-green-400">
            <p>
              Congrats! Now you are part of something big ! Join our{" "}
              <a
                href="https://chat.whatsapp.com/FeRRcQO4OKKASAoFlbYrqG"
                className="text-blue-500"
              >
                gaming community
              </a>{" "}
            </p>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed bottom-0 right-0 transform -translate-x-1/2 mb-4 bg-white text-black p-4 rounded-full shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <span className="font-bold">
              {10 + Math.floor(Math.random() * 100)} gamers just posted on X
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
