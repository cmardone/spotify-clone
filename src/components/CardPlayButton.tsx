import { Pause, Play } from '@/components/Player';
import { type Playlist, type Song } from '@/lib/data';
import { usePlayerStore } from '@/stores/playerStore';

interface Props {
  id: string,
  size: string
}

const CardPlayButton = ({ id, size = 'small' } : Props) => {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    const response = await fetch(`/api/get-info-playlist.json?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const { songs, playlist } : { songs: Song[], playlist: Playlist} = data;
    setIsPlaying(true);
    setCurrentMusic({ songs, playlist, song: songs[0] });
  };
  return (
    <button onClick={handleClick} className="card-play-button bg-green-600 p-3 rounded-full hover:scale-105 transition hover:bg-green-500">
      {isPlayingPlaylist ? <Pause /> : <Play /> }
    </button>
  )
}

export default CardPlayButton
