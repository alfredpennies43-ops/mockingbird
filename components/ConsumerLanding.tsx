import Image from 'next/image'
import Link from 'next/link'
import LandingClient from './LandingClient'
import SongPreviewPlayer from './SongPreviewPlayer'
import StickyCta from './StickyCta'
import { Logo } from './Logo'

const DELIVERABLES = [
  {
    emoji: '✍️',
    title: 'Lyrics with their name',
    body: 'Written from your memories — inside jokes, milestones, and the details only you would know.',
  },
  {
    emoji: '🎵',
    title: 'Studio-quality MP3',
    body: 'A full song in the style you choose — pop, folk, R&B, rock, or any artist vibe you name.',
  },
  {
    emoji: '🔗',
    title: 'Shareable song page',
    body: 'A private link to play at the party, send in a text, or keep forever. Delivered to your inbox.',
  },
]

const FAQ = [
  {
    q: 'How long does it take?',
    a: 'Most songs arrive within 15 minutes of payment. You’ll get an email with a link to play and download the MP3.',
  },
  {
    q: 'What if they don’t like it?',
    a: 'We want genuine reactions — if something’s wrong with your order, email hello@mockingbird.ai and we’ll make it right.',
  },
  {
    q: 'Is my story private?',
    a: 'Yes. Your answers are only used to write your song. We don’t share or sell your personal details.',
  },
  {
    q: 'Can I pick the music style?',
    a: 'Absolutely. Name an artist or describe a vibe — “ acoustic Taylor Swift ”, “ 90s R&B ”, “ upbeat disco ” — and we match the feel.',
  },
]

export default function ConsumerLanding() {
  return (
    <>
      <LandingClient />
      <StickyCta />

      <nav>
        <Logo href="/" size="md" className="logo" />
        <ul className="nav-links">
          <li>
            <a href="#consumer-how" className="nav-link">
              How It Works
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </li>
          <li>
            <Link href="/create" className="btn-nav">
              Create a Song — $19
            </Link>
          </li>
        </ul>
      </nav>

      <section className="consumer-hero" id="consumer-hero">
        <div className="hero-bloom" aria-hidden="true" />

        <div className="consumer-inner">
          <div className="hero-copy">
            <p className="hero-overline">Personalised AI songs · Delivered in minutes</p>
            <h1 className="consumer-title">
              Turn their story into
              <br />
              <span className="pop">a song they&apos;ll never forget.</span>
            </h1>
            <p className="consumer-sub">
              Answer four quick questions. We write the lyrics, compose the track, and email you a
              shareable song page — usually within <strong>15 minutes</strong>. One price:{' '}
              <strong>$19</strong>.
            </p>
            <div className="consumer-actions">
              <Link href="/create" className="btn-primary btn-primary--pulse">
                Create My Song — $19 →
              </Link>
              <a href="#demo-preview" className="btn-ghost">
                Hear a demo ▶
              </a>
            </div>
            <ul className="hero-trust">
              <li>⏱ ~15 min delivery</li>
              <li>🔒 Secure Stripe checkout</li>
              <li>🎁 MP3 + share link</li>
            </ul>
            <div className="occasion-pills">
              {['🎂 Birthdays', '💍 Proposals', '💒 Weddings', '👶 New Baby', '🎓 Graduations', '🥳 Just Because'].map(
                (pill) => (
                  <Link key={pill} href="/create" className="pill pill--link">
                    {pill}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="hero-visual" id="demo-preview">
            <div className="hero-visual-main">
              <Image
                src="/lucidbloom/images/mushroom.png"
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
              <Image src="/lucidbloom/images/face.png" alt="" width={72} height={72} />
            </div>

            <div className="consumer-card consumer-card--glow">
              <span className="live-badge">● Live demo</span>
              <div className="card-top-label">Sample — Mia&apos;s 30th Birthday</div>
              <div className="song-preview">
                <div className="song-for">🎂 30th Birthday · For Mia</div>
                <div className="song-name">Thirty Looks Good on You</div>
                <div className="song-detail">Inspired by Taylor Swift · 2:54 · tap ▶ to listen</div>
                <div className="waveform" id="wf1" />
                <div className="song-footer">
                  <span className="song-style-tag">🎵 Pop / Indie Folk</span>
                  <SongPreviewPlayer />
                </div>
              </div>
              <div className="price-single">
                <div className="price-single-amount">$19</div>
                <div className="price-single-label">Everything included · No subscription</div>
              </div>
              <Link href="/create" className="card-cta">
                Start My Song — takes 3 min →
              </Link>
              <p className="card-microcopy">4 questions before checkout · Pay only when you&apos;re ready</p>
            </div>
          </div>
        </div>
      </section>

      <div className="consumer-proof">
        <div className="proof-item">
          <div className="proof-num">15 min</div>
          <div className="proof-label">Average delivery</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">$19</div>
          <div className="proof-label">Flat price, all in</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">4</div>
          <div className="proof-label">Questions to start</div>
        </div>
        <div className="proof-sep" />
        <div className="proof-item">
          <div className="proof-num">100%</div>
          <div className="proof-label">Original lyrics</div>
        </div>
      </div>

      <section className="deliverables-section">
        <div className="deliverables-inner reveal">
          <h2 className="section-title">
            What you get for
            <br />
            <em>$19.</em>
          </h2>
          <div className="deliverables-grid">
            {DELIVERABLES.map((item) => (
              <div key={item.title} className="deliverable-card">
                <span className="deliverable-emoji">{item.emoji}</span>
                <h3 className="deliverable-title">{item.title}</h3>
                <p className="deliverable-body">{item.body}</p>
              </div>
            ))}
          </div>
          <Link href="/create" className="btn-primary deliverables-cta">
            Create My Song →
          </Link>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {[
            '🎂 Birthdays', '💒 Weddings', '💍 Proposals', '💑 Anniversaries', '👶 New Baby',
            '🎓 Graduations', '🌅 Retirements', '💔 Breakups', '🥳 Just Because', '✈️ Farewells',
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
              { num: '01', emoji: '✍️', title: 'Tell us their story', body: 'Their name, the occasion, and what makes them special. The richer the detail, the better the lyrics.' },
              { num: '02', emoji: '🎨', title: 'Pick a style', body: 'Name an artist or vibe. We capture the feeling — not a copy, but the mood you’re going for.' },
              { num: '03', emoji: '💳', title: 'Pay $19 once', body: 'Secure checkout. No subscription, no upsells. Then we compose your song — usually within 15 minutes.' },
              { num: '04', emoji: '🎁', title: 'Send the link', body: 'Play it at the party, text the MP3, or watch their face when they hear their name in the chorus.' },
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

      <section className="compare-section reveal">
        <div className="compare-inner">
          <h2 className="section-title">
            Better than a card.
            <br />
            <em>Cheaper than flowers.</em>
          </h2>
          <div className="compare-grid">
            <div className="compare-card compare-card--muted">
              <div className="compare-label">Generic gift card</div>
              <ul>
                <li className="compare-no">Forgotten in a drawer</li>
                <li className="compare-no">Zero emotional impact</li>
                <li className="compare-no">Says “I had to get something”</li>
              </ul>
            </div>
            <div className="compare-card compare-card--hero">
              <div className="compare-label">Mockingbird song</div>
              <ul>
                <li className="compare-yes">Their name in the lyrics</li>
                <li className="compare-yes">Playable, shareable, forever</li>
                <li className="compare-yes">$19 · Ready in ~15 min</li>
              </ul>
              <Link href="/create" className="btn-primary compare-cta">
                Create My Song →
              </Link>
            </div>
            <div className="compare-card compare-card--muted">
              <div className="compare-label">Custom musician</div>
              <ul>
                <li className="compare-no">$500+ and weeks of waiting</li>
                <li className="compare-no">Hard to book last-minute</li>
                <li className="compare-no">Overkill for most occasions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
              { emoji: '🎂', title: 'Birthdays', desc: "Their name, their story, their artist's vibe — hits harder than any card." },
              { emoji: '💍', title: 'Proposals & Weddings', desc: 'Original music for the moment, the ceremony, or the first dance.' },
              { emoji: '👶', title: 'New Baby', desc: "A lullaby with their name. A gift parents keep forever." },
              { emoji: '🎓', title: 'Graduations', desc: 'A personalised anthem for the next chapter.' },
              { emoji: '💑', title: 'Anniversaries', desc: 'Your story set to music — delivered in minutes.' },
              { emoji: '🥳', title: 'Just Because', desc: 'The best gifts are the ones nobody saw coming.' },
            ].map((o) => (
              <Link key={o.title} href="/create" className="occasion-card occasion-card--link">
                <span className="occasion-emoji">{o.emoji}</span>
                <div className="occasion-title">{o.title}</div>
                <p className="occasion-desc">{o.desc}</p>
                <span className="occasion-cta">Create a song →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="c-testimonials">
        <div className="testimonials-wrap">
          <div className="featured-testi reveal">
            <div className="featured-testi-stars">★★★★★</div>
            <p className="featured-testi-text">
              &ldquo;Played it at my mum&apos;s 60th and the whole room went silent. She cried. I cried.
              My dad cried and he hasn&apos;t cried since 1987.&rdquo;
            </p>
            <p className="featured-testi-author">— Sarah M., Brisbane · Birthday song</p>
          </div>

          <h2 className="section-title reveal section-title--center">
            Real reactions.
            <br />
            <em>Real songs.</em>
          </h2>
          <div className="c-testi-grid reveal">
            {[
              { text: '"Used it for a proposal. She said yes. I\'m crediting Mockingbird in the wedding speech."', author: '— Tom R., Sydney' },
              { text: '"The Taylor Swift vibe was spot on and the lyrics mentioned things only her best friends would know."', author: '— James K., London' },
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

      <section className="faq-section" id="faq">
        <div className="faq-inner reveal">
          <h2 className="section-title">
            Questions
            <br />
            <em>before you buy.</em>
          </h2>
          <div className="faq-list">
            {FAQ.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="faq-footer">
            Still unsure?{' '}
            <a href="mailto:hello@mockingbird.ai">hello@mockingbird.ai</a> — we reply fast.
          </p>
        </div>
      </section>

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
          They&apos;ll remember this
          <br />
          <em>long after the cake.</em>
        </h2>
        <p className="footer-cta-sub">Four questions · $19 · In your inbox in ~15 minutes</p>
        <div className="footer-cta-btns">
          <Link href="/create" className="btn-primary btn-primary--pulse">
            Create My Song — $19 →
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
