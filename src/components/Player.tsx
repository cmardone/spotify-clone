import PlayerControls from "@/components/PlayerControls";
import { Slider } from "@/components/Slider";
import VolumeIcon from "@/icons/VolumeIcon";
import type { Song } from "@/lib/data";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef, useState } from "react";

export const Play = ({className}: {className?: string}) => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16" className={`h-5 ${className}`}>
  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
</svg>)

export const Pause = () => (<svg role="img" aria-hidden="true" viewBox="0 0 16 16" className="h-5">
  <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>)

const CurrentSong = ({image, title, artists}: Song) =>{
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">
          {artists.join(', ')}
        </span>
      </div>
    </div>
  )
}

const Player = () => {
  const {
    currentMusic,
    isPlaying,
    previousVolume,
    setVolume,
    volume,
  } = usePlayerStore(state => state);
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.volume = volume;
  }, [volume])

  useEffect(() => {
    const { song, playlist } = currentMusic ?? {};
    if (song) {
      const src = `/music/${playlist?.id}/0${song?.id}.mp3`;
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.volume = volume;
        audioRef.current.play();
      }
    }
  }, [currentMusic])


  const handlePlayerMuteClick = () =>
    setVolume(volume === 0 ? previousVolume : 0);

  const handleTrackTimeChange = () => {
    const { currentTime, duration: currentDuration } = audioRef.current ?? {};
    if (duration !== currentDuration) {
      setDuration(currentDuration ?? 0);
    }
    setCurrentTime(currentTime ?? 0);
  }

  const handleTimeChange = (currentTime: number) => {
    if (audioRef.current)
      audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  }

  return (
    <div className="flex flex-row justify-stretch w-full px-4 h-[72px] items-center z-50">
      <div className="flex-1">
        {currentMusic?.song && <CurrentSong {...currentMusic.song} />}
      </div>
      <div className="gap-4 flex-1 border-white">
        <PlayerControls duration={duration} currentTime={currentTime} onSliderChange={handleTimeChange} />
      </div>
      <div className="flex justify-end items-center gap-x-2 w-[120px] flex-1">
        <button onClick={handlePlayerMuteClick}>
          <VolumeIcon volume={volume} />
        </button>
        <Slider
          value={[volume * 100]}
          min={0}
          max={100}
          className="w-[95px]"
          onValueChange={(value: number[]) => {
            const [newVolume] = value;
            const volumeValue = newVolume / 100;
            setVolume(volumeValue);
          }} />
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTrackTimeChange}></audio>
    </div>
  )
}

export default Player
