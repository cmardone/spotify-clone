import type { Playlist, Song } from "@/lib/data";
import { create } from "zustand";

interface CurrentMusic {
  playlist?: Playlist
  song?: Song
  songs?: Song[]
}

interface PlayerState {
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  currentMusic?: CurrentMusic,
  setCurrentMusic: (currentMusic: CurrentMusic) => void,
  volume: number,
  previousVolume: number,
  setVolume: (volume: number) => void,
  currentTime: number,
  setCurrentTime: (currentTime: number) => void
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  currentMusic: undefined,
  setCurrentMusic: (currentMusic: CurrentMusic) => set({ currentMusic }),
  volume: 0.5,
  previousVolume: 0.5,
  setVolume: (volume: number) => { set((state) => ({ previousVolume: state.volume, volume: volume })) },
  currentTime: 0,
  setCurrentTime: (currentTime: number) => set({ currentTime })
}));
