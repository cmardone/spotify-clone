import Time from "@/icons/Time.tsx";
import type { Playlist, Song } from "@/lib/data";
import { usePlayerStore } from "@/stores/playerStore";
import { Play } from "./Player";

interface Props {
  playlist?: Playlist;
  songs: Song[];
}

const PlaylistTable = ({ playlist, songs } : Props) => {
  const { setCurrentMusic,currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state);

  const handlePlaySong = (song: Song) => {
    setCurrentMusic({playlist, songs, song});
    setIsPlaying(true);
  };

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead>
        <tr className="text-gray-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th></th>
          <th className="px-4 py-2 font-light">T&iacute;tulo</th>
          <th className="px-4 py-2 font-light">&Aacute;lbum</th>
          <th className="px-4 py-2 font-light"><Time /></th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => (
          <tr
            key={song.id}
            className="text-gray-300 text-sm font-light hover:bg-white/10 transition duration-300" onClick={() => handlePlaySong(song)}>
            <td className="px-4 py-2 rounded-l-md w-7">{index + 1}</td>
            <td className="w-5">
              {song.id === (currentMusic?.song?.id ?? -1) && isPlaying && <Play className="h-3 fill-gray-300" />}
            </td>
            <td className="px-4 py-2 flex items-center justify-start">
              <picture>
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-11 h-11 rounded-md"
                />
              </picture>
              <div className="flex flex-col ml-2">
                <h3>{song.title}</h3>
                <span>{song.artists.join(", ")}</span>
              </div>
            </td>
            <td className="px-4 py-2">{song.album}</td>
            <td className="px-4 py-2 rounded-r-md">{song.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlaylistTable
