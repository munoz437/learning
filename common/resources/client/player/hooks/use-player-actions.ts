import { useContext, useMemo } from 'react';
import { PlayerStoreContext } from '@common/player/player-context';
import { MediaItem } from '@common/player/media-item';

export function usePlayerActions() {
  const store = useContext(PlayerStoreContext);

  return useMemo(() => {
    const s = store.getState();

    const overrideQueueAndPlay = async (
      mediaItems: MediaItem[],
      queuePointer?: number
    ) => {
      s.stop();
      await s.overrideQueue(mediaItems, queuePointer);
      return s.play();
    };

    const setPlaybackSpeed = (speed: number) => {
      // Verifica si el reproductor admite la configuración de la velocidad de reproducción
      if (s.setPlaybackRate) {
        // Actualiza la velocidad de reproducción del reproductor con el valor proporcionado
        s.setPlaybackRate(speed);
      } else {
        // Si el reproductor no admite la configuración de la velocidad de reproducción,
        // muestra una advertencia o implementa una lógica alternativa según tus necesidades
        console.warn('El reproductor no admite la configuración de la velocidad de reproducción.');
      }
    };
    
    

    return {
      play: s.play,
      playNext: s.playNext,
      playPrevious: s.playPrevious,
      pause: s.pause,
      subscribe: s.subscribe,
      emit: s.emit,
      getCurrentTime: s.getCurrentTime,
      seek: s.seek,
      toggleRepeatMode: s.toggleRepeatMode,
      toggleShuffling: s.toggleShuffling,
      getState: store.getState,
      setVolume: s.setVolume,
      setMuted: s.setMuted,
      appendToQueue: s.appendToQueue,
      removeFromQueue: s.removeFromQueue,
      enterFullscreen: s.enterFullscreen,
      exitFullscreen: s.exitFullscreen,
      toggleFullscreen: s.toggleFullscreen,
      enterPip: s.enterPip,
      exitPip: s.exitPip,
      setTextTrackVisibility: s.setTextTrackVisibility,
      setCurrentTextTrack: s.setCurrentTextTrack,
      setIsSeeking: s.setIsSeeking,
      setControlsVisible: s.setControlsVisible,
      cue: s.cue,
      overrideQueueAndPlay,
      overrideQueue: s.overrideQueue,
      setPlaybackRate: s.setPlaybackRate,
      setPlaybackQuality: s.setPlaybackQuality,
      setPlaybackSpeed,
    };
  }, [store]);
}
