import { kv } from '@/lib/kv'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { SongPage } from '@/lib/types'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const song = await kv.get<SongPage>(`song:${id}`)
  if (!song) return { title: 'Song not found' }
  return {
    title: `A song for ${song.recipientName} 🎵`,
    description: `A personalised ${song.occasion} song made just for ${song.recipientName}.`,
    openGraph: {
      title: `A song for ${song.recipientName} 🎵`,
      description: `A personalised ${song.occasion} song — made with Mockingbird.ai`,
    },
  }
}

export default async function SongPageView({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const song = await kv.get<SongPage>(`song:${id}`)
  if (!song) notFound()

  const barHeights = [20, 35, 28, 45, 32, 50, 38, 55, 42, 48, 35, 52, 40, 46, 30, 44, 36, 50, 28, 42]

  return (
    <>
      <style>{`
        html, body { margin:0; padding:0; background:#0E0322; color:#FBF5FF; font-family:var(--lb-font-body),var(--font-outfit),sans-serif; }
        .page { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2rem; text-align:center; position:relative; overflow:hidden; }
        .glow { position:fixed; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(126,59,255,0.2) 0%,transparent 65%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .song-logo { position:fixed; top:1.5rem; left:1.5rem; z-index:10; }
        .occasion-badge { display:inline-block; background:rgba(126,59,255,0.18); border:1px solid rgba(165,123,255,0.35); border-radius:999px; padding:6px 16px; font-size:0.75rem; font-weight:600; color:#FFD23F; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:1.5rem; }
        .recipient { font-family:var(--lb-font-display),serif; font-size:clamp(2.5rem,8vw,5rem); font-weight:400; line-height:0.95; letter-spacing:-0.01em; margin-bottom:0.5rem; }
        .recipient em { font-style:normal; background:linear-gradient(135deg,#7E3BFF,#FF2BB1,#FF8A2A); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .artist-style { font-size:0.85rem; font-weight:600; color:#8E7BB8; margin-bottom:3rem; letter-spacing:0.02em; }
        .waveform { display:flex; align-items:center; justify-content:center; gap:3px; height:48px; margin-bottom:2.5rem; }
        .wbar { width:4px; border-radius:2px; background:linear-gradient(180deg,#7E3BFF,#FF2BB1); animation:wv 1s ease-in-out infinite; opacity:0.7; }
        @keyframes wv { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1)} }
        .players { display:flex; flex-direction:column; gap:1rem; width:100%; max-width:480px; margin-bottom:3rem; }
        .player-card { background:#2A0F66; border:1px solid rgba(165,123,255,0.22); border-radius:16px; padding:1.2rem 1.5rem; box-shadow:0 30px 60px -30px rgba(0,0,0,0.6); }
        .player-label { font-size:0.72rem; font-weight:600; color:#8E7BB8; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.6rem; text-align:left; }
        audio { width:100%; height:40px; accent-color:#7E3BFF; }
        .made-with { font-size:0.8rem; color:#8E7BB8; }
        .made-with a { color:#A57BFF; text-decoration:none; }
        @media(max-width:540px) { .page{padding:5rem 1.2rem 2rem;} }
      `}</style>

      <div className="page">
        <div className="glow" />
        <Logo href="/" size="sm" className="song-logo" />

        <div className="occasion-badge">{song.occasion}</div>

        <h1 className="recipient">
          A song for
          <br />
          <em>{song.recipientName}</em>
        </h1>
        <p className="artist-style">{song.artistStyle}</p>

        <div className="waveform">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="wbar"
              style={{
                height: h,
                animationDelay: `${i * 0.06}s`,
                animationDuration: `${0.7 + (i % 5) * 0.12}s`,
              }}
            />
          ))}
        </div>

        <div className="players">
          {song.songUrls.map((url, i) => (
            <div key={i} className="player-card">
              <div className="player-label">
                {song.songUrls.length > 1 ? `Version ${i + 1}` : 'Your Song'}
              </div>
              <audio controls src={url} preload="metadata" />
            </div>
          ))}
        </div>

        <p className="made-with">
          Made with <Link href="/">Mockingbird.ai</Link> — the gift that hits different
        </p>
      </div>
    </>
  )
}
