import { ArrowDownRight } from 'lucide-react'

export const photo = 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250'
export const sizes = '(max-width: 800px) 90vw, (max-width: 1450px) 44vw, 620px'
export const sources = [640, 960, 1440].map(w => `${photo}?auto=format&fit=crop&w=${w}&q=90 ${w}w`).join(', ')

export function HeroPhoto() {
  return <div className="hero-scene">
    <div className="arch-frame">
      <img src={photo + '?auto=format&w=960&q=90'} srcSet={sources} sizes={sizes} fetchPriority="high" alt="Interior de um salão de beleza" onError={event => { event.currentTarget.hidden = true }} />
    </div>
    <div className="scene-outline" aria-hidden="true" />
    <div className="round-stamp">NOSSO SALÃO · SEU MOMENTO ·</div>
    <a className="image-label" href="#galeria">NOSSO SALÃO<br/><em>Ver mais fotos <ArrowDownRight size={18} aria-hidden="true"/></em></a>
  </div>
}
