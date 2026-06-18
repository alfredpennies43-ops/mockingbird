'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const DEMO_SRC = '/demo/mia-preview.mp3'

export default function SongPreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const syncWaveform = useCallback((active: boolean) => {
    document.getElementById('wf1')?.classList.toggle('waveform--playing', active)
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      syncWaveform(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
      syncWaveform(true)
    } catch {
      setPlaying(false)
      syncWaveform(false)
    }
  }, [playing, syncWaveform])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => {
      setPlaying(false)
      syncWaveform(false)
    }
    const onPause = () => {
      if (audio.ended) return
      setPlaying(false)
      syncWaveform(false)
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('pause', onPause)
    }
  }, [syncWaveform])

  return (
    <>
      <audio ref={audioRef} src={DEMO_SRC} preload="metadata" />
      <button
        type="button"
        className={`play-btn${playing ? ' play-btn--active' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause song preview' : 'Play song preview'}
        aria-pressed={playing}
      >
        {playing ? (
          <span className="play-btn-pause" aria-hidden="true">
            <span />
            <span />
          </span>
        ) : (
          '▶'
        )}
      </button>
    </>
  )
}
