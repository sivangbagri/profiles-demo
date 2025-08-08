import SurveyComponent from "@/components/SurveyComponent";
import Head from "next/head";
import Marquee from "react-fast-marquee";

export default function Home() {
  const gameImages = [
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-vis_bo9nml.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968058/card-guard_1_catlbz.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968061/card-explo_1_wfvygh.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968050/card-achie_arbq9x.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968062/card-stra_xwxjn0.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1740680136/card-unknown_2_t3ztmz.png",

    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968060/card-challe_ulwzan.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968051/card-diplo_cdygvc.png",

    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968048/card-think_c6gjqj.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968045/card-real_jy5gnd.png",
    "https://res.cloudinary.com/dekobspwg/image/upload/v1734968049/card-stoic_nsjxru.png",
  ];
  return (
    <>
      <div className="fixed inset-0 overflow-hidden -z-10 opacity-20">
        <Marquee className="mb-8" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={idx}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-40 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
        <Marquee direction="right" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={`row2-${idx}`}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-40 w-full object-cover mx-2"
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
        <Marquee className="mb-8" speed={130}>
          {gameImages.map((img, idx) => (
            <img
              key={idx}
              src={img || "/placeholder.svg"}
              alt=""
              className="h-40 w-full object-cover mx-2"
            />
          ))}
        </Marquee>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <h1 className="text-3xl font-bold mb-8 font-mono">
          Whats your gaming personality ?
        </h1>

        <SurveyComponent />
      </main>
    </>
  );
}
