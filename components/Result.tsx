"use client";

import Image from "next/image";
import { TwitterShareButton } from "next-share";
import Link from "next/link";
import { submitGamingProfile } from "../actions";
import { useState, useEffect } from "react";
import InteractiveButton from "./InteractiveButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";
import Marquee from "react-fast-marquee";

import Tilt from "react-parallax-tilt";

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
const gameImages = [
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742576975/35289427-0e5f-4907-85aa-df08d7af922e_tiowrw.jpg",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739862/Screenshot_2025-03-23_195323_pzuqbu.png",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739861/Screenshot_2025-03-23_195311_sagfmw.png",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739272/60bfad6b-8ec1-4bc5-a14e-94de94934236_tofgzc.jpg",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742577496/bf237122-83e6-4588-a556-f92589bdfa82_bzujb0.jpg",

  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739495/bf18977f-4688-40b9-90df-35c86546725d_cl5eal.jpg",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739861/Screenshot_2025-03-23_195345_ltguoa.png",

  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739496/3d0a7f25-472f-4aa6-bdf1-893e6e02f8e9_lscu4r.jpg",
  "https://res.cloudinary.com/dekobspwg/image/upload/v1742739861/Screenshot_2025-03-23_195358_siggdb.png",
];
export default function Result({ archetype }: ResultProps) {
  const shareUrl = `https://my-gaming-profile.vercel.app/result/${archetype}`;
  const imageUrl = archetypeImages[archetype as Archetype];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ImageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState<string>("");
  function getUsernameFromURL(): void {
    if (typeof window === "undefined" || !window) return;
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get("username");
    console.log("X usrname ", usernameParam);
    if (usernameParam === null || typeof usernameParam !== "string") return;
    setUsername(usernameParam);
  }
  const fetchXProfile = async (username: string) => {
    if (!username) return;

    // setLoading(true);

    fetch(`/api/get-twitter-pfp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile image");
        return res.json();
      })
      .then((data) => {
        setImageUrl(data.profileImageUrl);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        // setLoading(false);
      });
  };
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
    getUsernameFromURL();
    fetchXProfile(username);
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [username, getUsernameFromURL]);
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 20, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <>
      <div className="fixed inset-0 overflow-hidden -z-10 opacity-20">
        <Marquee className="mb-8" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={idx}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-60 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
        <Marquee direction="right" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={`row2-${idx}`}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-60 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
        <Marquee speed={135}>
          {gameImages.map((img, idx) => (
            <img
              key={`row3-${idx}`}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-40 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
        <Marquee direction="right" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={`row3-${idx}`}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-40 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6 sm:p-8 font-mono ">
        <div className="w-full max-w-xl mx-auto text-center bg-black/90 rounded-lg border border-white/10 p-3 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Your Gaming Profile is Ready !
          </h1>
          <Confetti
            recycle={false}
            width={window.innerWidth}
            numberOfPieces={1000}
            initialVelocityY={{ min: 25, max: 70 }}
            colors={["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]}
          />

          <p className="text-xl sm:text-2xl mb-6">
            The {alias[archetype as Archetype]}
          </p>
          <div className="relative w-full h-32 sm:w-full sm:h-60 mb-2 mx-auto">
            <Tilt>
              {" "}
              <img
                src={imageUrl}
                alt={`${archetype} archetype`}
                className="rounded-md w-full h-full object-cover"
                onLoad={() => setIsImageLoaded(true)}
              />
              {ImageUrl && (
                <div className="absolute bottom-1 right-1 z-10">
                  <img
                    src={ImageUrl}
                    className="size-8 sm:size-12 rounded-md border-2 border-white/80 shadow-purple-600 shadow-sm"
                    alt="Profile"
                  />
                </div>
              )}
            </Tilt>
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
    </>
  );
}
