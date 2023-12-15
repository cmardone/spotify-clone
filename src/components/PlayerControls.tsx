import { Pause, Play } from "@/components/Player";
import { Slider } from "@/components/Slider";
import Next from "@/icons/Next";
import Previous from "@/icons/Previous";
import { usePlayerStore } from "@/stores/playerStore";
import TimeFormatter from "./TimeFormatter";

interface Props {
  currentTime: number;
  duration: number;
  onSliderChange?: (value: number) => void;
}

const PlayerControls = ({ currentTime, duration, onSliderChange }: Props) => {
  const {
    currentMusic,
    isPlaying,
    setCurrentMusic,
    setIsPlaying,
  } = usePlayerStore(state => state);

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextTrackClick = () => {
    if (!currentMusic?.song) return;
    const currentIndex = currentMusic.songs?.findIndex(song => song.id === currentMusic?.song?.id) ?? 0;
    const nextIndex = currentIndex + 1;
    let  nextSong = currentMusic.songs?.at(nextIndex);
    if (!nextSong) {
      nextSong = currentMusic.songs?.at(0);
    }
    setCurrentMusic({...currentMusic, song: nextSong})
  }

  const handlePrevTrackClick = () => {
    if (!currentMusic?.song) return;
    const currentIndex = currentMusic.songs?.findIndex(song => song.id === currentMusic?.song?.id) ?? 0;
    const prevIndex = currentIndex - 1;
    let  prevSong = currentMusic.songs?.at(prevIndex);
    if (!prevSong) {
      prevSong = currentMusic.songs?.at(currentMusic.songs.length - 1);
    }
    setCurrentMusic({...currentMusic, song: prevSong})
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center gap-5">
        <button className="fill-slate-200 hover:fill-white" onClick={handlePrevTrackClick}>
          <Previous />
        </button>
        <button className="bg-white rounded-full p-2" onClick={handleClick}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className="fill-slate-200 hover:fill-white" onClick={handleNextTrackClick}>
          <Next />
        </button>
      </div>
      <div className="flex justify-center items-center gap-x-1">
        <div className="w-[36px] float-left">
          <TimeFormatter className="text-xs opacity-50" time={currentTime} />
        </div>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          className="mx-3"
          onValueChange={(value: number[]) => {
            const [newTime] = value;
            onSliderChange?.(newTime);
          }} />
        <div className="w-[36px] float-right">
          <TimeFormatter className="text-xs opacity-50" time={duration} />
        </div>
      </div>
    </div>
  )
}

export default PlayerControls
