import Image from 'next/image'
import Link from 'next/link'
import LandingClient from './LandingClient'
import SongPreviewPlayer from './SongPreviewPlayer'
import { Logo } from './Logo'

export default function ConsumerLanding() {
  return (
    <>
      <LandingClient />

      <nav>
        <Logo href="/" size="md" className="logo" />
        <ul className="nav-links">
          <li>
            <a href="#consumer-how" className="nav-link">
              How It Works
            </a>
          </li>
          <li>
            <a href="#occasions" className="nav-link">
              Occasions
            </a>
          </li>
          <li>
            <Link href="/create" className="btn-nav">
              Create a Song
            </Link>
          </li>
        </ul>
      </nav>

      <section className="consumer-hero" id="consumer-hero">
        <div className="hero-bloom" aria-hidden="true" />

        <div className="consumer-inner">
          <div>
            <p className="hero-overline">Personalised AI songs</p>
            <h1 className="consumer-title">
              The gift that
              <br />
              <span className="pop">hits different.</span>
            </h1>
            <p className="consumer-sub">
              A one-of-a-kind song in your inbox in 15 minutes — $19, no subscriptions.
            </p>
            <div className="consumer-actions">
              <Link href="/create" className="btn-primary">
                Create a Song →
              </Link>
              <a href="#consumer-how" className="btn-ghost">
                See How It Works
              </a>
            </div>
            <div className="occasion-pills">
              <span className="pill">🎂 Birthdays</span>
              <span className="pill">💍 Proposals</span>
              <span className="pill">💒 Weddings</span>
              <span className="pill">👶 New Baby</span>
              <span className="pill">🎓 Graduations</span>
              <span className="pill">💔 Breakups</span>
              <span className="pill">🥳 Just Because</span>
              <span className="pill">👴 Retirements</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-main">
              <Image
                src="/lucidbloom/images/face.png"
                alt=""
                fill
                priority
                sizes="(max-width: 960px) 100vw, 420px"
                className="hero-visual-img"
              />
            </div>
            <div className="hero-float hero-float--eye">
              <Image src="/lucidbloom/images/eye.png" alt="" width={88} height={88} />
            </div>
            <div className="hero-float hero-float--mushroom">
              <Image src="/lucidbloom/images/mushroom.png" alt="" width={72} height={72} />
            </div>

            <div className="consumer-card">
              <div className="card-top-label">Song Preview — Mia&apos;s 30th Birthday</div>
              <div className="song-preview">
                <div className="song-for">🎂 30th Birthday · For Mia</div>
                <div className="song-name">Thirty Looks Good on You</div>
                <div className="song-detail">Inspired by Taylor Swift · 2:54 · tap ▶ for demo</div>
                <div className="waveform" id="wf1" />
                <div className="song-footer">
                  <span className="song-style-tag">🎵 Pop / Indie Folk</span>
                  <SongPreviewPlayer />
                </div>
              </div>
              <div className="price-single">
                <div className="price-single-amount">$19</div>
                <div className="price-single-label">One personalised song · MP3 · ~15 min delivery</div>
              </div>
              <Link href="/create" className="card-cta">
                Create My Song for $19 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="consumer-proof">
        <div className="proof-item">
          <div className="proof-num">15 min</div>
          <div className="proof-label">Average delivery time</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">$19</div>
          <div className="proof-label">One song, all in</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">4.9 ★</div>
          <div className="proof-label">Average rating</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">100%</div>
          <div className="proof-label">Satisfaction guarantee</div>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {[
            '🎂 Birthdays', '💒 Weddings', '💍 Proposals', '💑 Anniversaries', '👶 New Baby',
            '🎓 Graduations', '🌅 Retirements', '💔 Breakups', '🥳 Just Because', '✈️ Farewells',
            '🏆 Promotions', '🏠 New Home', '🎄 Christmas', '💐 Mother\'s Day',
          ].flatMap((item) => [item, item]).map((item, i) => {
            const [emoji, ...rest] = item.split(' ')
            return (
              <span key={i} className="ticker-item">
                <span className="ticker-emoji">{emoji}</span>
                {rest.join(' ')}
              </span>
            )
          })}
        </div>
      </div>

      <div id="consumer-how">
        <div className="consumer-steps">
          <h2 className="section-title reveal">
            From story to song
            <br />
            <em>in four steps.</em>
          </h2>
          <div className="c-steps reveal">
            {[
              { num: '01', emoji: '✍️', title: 'Tell us their story', body: 'Answer a few questions — their name, the occasion, a memory or two, and what makes them special. The more detail, the better the song.' },
              { num: '02', emoji: '🎨', title: 'Pick a style', body: "Name an artist you love or pick a vibe — indie folk, pop, R&B, classic rock. We'll capture the feeling, not just the sound." },
              { num: '03', emoji: '💳', title: 'Pay $19 and wait', body: "We'll compose your song and deliver it straight to your inbox — usually within 15 minutes." },
              { num: '04', emoji: '🎁', title: 'Watch their reaction', body: 'Send the song link, play it at the party, or drop the MP3 in a voice message. Prepare for the kind of reaction gift cards never get.' },
            ].map((step) => (
              <div key={step.num} className="c-step">
                <div className="c-step-num">Step {step.num}</div>
                <span className="c-step-emoji">{step.emoji}</span>
                <div className="c-step-title">{step.title}</div>
                <p className="c-step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="occasions-section" id="occasions">
        <div className="occasions-inner">
          <div className="occasions-header reveal">
            <div>
              <h2 className="section-title">
                Every occasion.
                <br />
                <em>Every feeling.</em>
              </h2>
            </div>
            <div className="occasions-art">
              <Image
                src="/lucidbloom/images/fractal.png"
                alt=""
                width={280}
                height={280}
                className="occasions-art-img"
              />
            </div>
          </div>
          <div className="occasions-grid reveal">
            {[
              { emoji: '🎂', title: 'Birthdays', desc: "Milestone or everyday — a song with their name, their story, and their favourite artist's vibe hits harder than any card." },
              { emoji: '💍', title: 'Proposals & Weddings', desc: 'Commission a song for the moment, the ceremony, or the first dance. Completely original. Completely yours.' },
              { emoji: '👶', title: 'New Baby', desc: "A lullaby with their name in it. A song about the day they arrived. A gift for the parents they'll keep forever." },
              { emoji: '🎓', title: 'Graduations', desc: 'Celebrate the years, the late nights, the achievement. A personalised anthem for the next chapter.' },
              { emoji: '💑', title: 'Anniversaries', desc: "The story of how you met, where you've been, what they mean to you — set to music, delivered in minutes." },
              { emoji: '🥳', title: 'Just Because', desc: 'No occasion needed. Sometimes the best gifts are the ones nobody saw coming. A song for a random Tuesday hits different.' },
            ].map((o) => (
              <div key={o.title} className="occasion-card">
                <span className="occasion-emoji">{o.emoji}</span>
                <div className="occasion-title">{o.title}</div>
                <p className="occasion-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="c-testimonials">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="section-title reveal">
            Songs that made them
            <br />
            <em>actually cry.</em>
          </h2>
          <div className="c-testi-grid reveal">
            {[
              { text: '"Played it at my mum\'s 60th and the whole room went silent. She cried. I cried. My dad cried and he hasn\'t cried since 1987."', author: '— Sarah M., Brisbane' },
              { text: '"Used it for a proposal. She said yes. I\'m crediting Mockingbird in the wedding speech and I am not joking."', author: '— Tom R., Sydney' },
              { text: '"The Taylor Swift vibe was spot on and the lyrics mentioned things only her best friends would know. I don\'t know how it works but it works."', author: '— James K., London' },
            ].map((t) => (
              <div key={t.author} className="c-testi">
                <div className="c-testi-stars">★★★★★</div>
                <p className="c-testi-text">{t.text}</p>
                <p className="c-testi-author">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="footer-cta">
        <div className="footer-cta-glow" />
        <Image
          src="/lucidbloom/images/marble.png"
          alt=""
          width={320}
          height={320}
          className="footer-cta-art"
        />
        <h2 className="footer-cta-title">
          Give them something
          <br />
          they&apos;ll <em>actually remember.</em>
        </h2>
        <div className="footer-cta-btns">
          <Link href="/create" className="btn-primary">
            Create a Song — $19
          </Link>
        </div>
      </section>

      <footer>
        <Logo href="/" size="sm" className="footer-logo" />
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="mailto:hello@mockingbird.ai">hello@mockingbird.ai</a></li>
        </ul>
        <div className="footer-copy">© 2026 Mockingbird.ai</div>
      </footer>
    </>
  )
}
