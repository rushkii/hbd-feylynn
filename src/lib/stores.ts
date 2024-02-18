import { writable } from "svelte/store";

export const playState = writable<{
  audio: HTMLAudioElement | null,
  video: HTMLVideoElement | null,
  isLoading: boolean
}>({
  audio: null,
  video: null,
  isLoading: true
})
