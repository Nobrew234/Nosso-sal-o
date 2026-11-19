const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;
const running = new Set();

function setupMotion() {
  observer?.disconnect();
  for (const animation of running) animation.cancel();
  running.clear();
  if (motionPreference.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const entrances = new Map();
  function register(selector, frames, duration, stagger = 0, delay = 0) {
    document.querySelectorAll(selector).forEach((element, index) => {
      entrances.set(element, { frames, duration, delay: delay + index * stagger });
    });
  }

  const rise = [
    { opacity: 0, transform: 'translateY(22px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ];
  for (const selector of [
    '.nav > *', '.hero-copy > *', '.experience-copy > *', '.section-top > *',
    '.care-card', '.care-bottom > *', '.visit > div:first-child > *',
    '.visit-details > div', '.footer-inner > *', '.footer-bottom > *'
  ]) register(selector, rise, 570, 65);

  register('.hero-art, .experience-image', [
    { scale: '.45' }, { scale: '1' }
  ], 1600);
  register('.image-label, .round-stamp, .photo-tag', [
    { opacity: 0, scale: '.75' }, { opacity: 1, scale: '1' }
  ], 440, 0, 380);
  register('.ticker > *', rise, 510, 35);

  observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      // A focused control should be immediately readable during keyboard navigation.
      if (target.matches(':focus-within')) continue;
      const { frames, duration, delay } = entrances.get(target);
      const animation = target.animate(frames, {
        duration, delay, easing: 'cubic-bezier(.22,.7,.2,1)', fill: 'backwards'
      });
      running.add(animation);
      animation.onfinish = animation.oncancel = () => running.delete(animation);
    }
  }, { threshold: .06 });
  entrances.forEach((_, element) => observer.observe(element));
}

document.addEventListener('focusin', event => {
  for (const animation of running) {
    if (animation.effect.target.contains(event.target)) animation.finish();
  }
});
motionPreference.addEventListener('change', setupMotion);
setupMotion();
