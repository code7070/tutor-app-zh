import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export default function VideoIntro({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  function handleBtn() {
    if (play) {
      setPlay(false);
      videoRef.current?.pause();
    } else {
      setPlay(true);
      videoRef.current?.play();
    }
  }

  return (
    <div className="relative w-full aspect-[2/1] bg-app-pink/10">
      <video
        src={src}
        ref={videoRef}
        className="size-full object-cover"
      ></video>
      <button
        onClick={handleBtn}
        className="absolute bottom-4 right-4 size-12 rounded-full border-2 border-black bg-app-pink-shade flex items-center justify-center p-1"
      >
        {play ? (
          <Pause size={20} className="fill-black" />
        ) : (
          <Play size={20} className="fill-black" />
        )}
      </button>
    </div>
  );
}
