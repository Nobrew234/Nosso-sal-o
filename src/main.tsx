import { createRoot } from 'react-dom/client'
import { HeroPhoto } from '@/components/ui/hero-photo'
import './tailwind.css'

const host = document.querySelector('.hero-art')
if (host) createRoot(host).render(<HeroPhoto />)
