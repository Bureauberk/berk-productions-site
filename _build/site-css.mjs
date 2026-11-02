// Site-wide style overrides, added to every page by prerender.mjs and kennisbank.mjs.
// The page styles come from Claude Design with inline sizes, hence !important.

// The logo sits inside the header bar: no pop-in animation, no overhang, no shrinking on scroll.
const LOGO = '.hdr,.hdr.scrolled{height:80px!important}'
  + '.logo-link{width:auto!important;height:auto!important;display:flex!important;align-items:center}'
  + '.logo,.hdr.scrolled .logo{position:static!important;height:46px!important;width:auto;transform:none!important;animation:none!important;transition:none!important}'
  + '@media (max-width:560px){.hdr,.hdr.scrolled{height:68px!important}.logo,.hdr.scrolled .logo{height:36px!important}}';

// One calmer size for the page title in the hero, on every page except the homepages.
const HERO = 'h1.h-black{font-size:clamp(34px,4.8vw,68px)!important;line-height:1!important;hyphens:auto!important;-webkit-hyphens:auto!important;overflow-wrap:break-word}';

export const siteCss = (isHome) => `<style id="site-css">${LOGO}${isHome ? '' : HERO}</style>`;
