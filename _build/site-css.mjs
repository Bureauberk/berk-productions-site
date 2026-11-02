// Site-wide style overrides, added to every page by prerender.mjs and kennisbank.mjs.
// The page styles come from Claude Design with inline sizes, hence !important.

// The logo sits inside the header bar: no pop-in animation, no overhang, no shrinking on scroll.
const LOGO = '.hdr,.hdr.scrolled{height:80px!important}'
  + '.logo-link{width:auto!important;height:auto!important;display:flex!important;align-items:center}'
  + '.logo,.hdr.scrolled .logo{position:static!important;height:46px!important;width:auto;transform:none!important;animation:none!important;transition:none!important}'
  + '@media (max-width:560px){.hdr,.hdr.scrolled{height:68px!important}.logo,.hdr.scrolled .logo{height:36px!important}}';

// One calmer size for the page title in the hero, on every page except the homepages.
const HERO = 'h1.h-black{font-size:clamp(34px,4.8vw,68px)!important;line-height:1!important;hyphens:auto!important;-webkit-hyphens:auto!important;overflow-wrap:break-word}';

// Phones: the design's fixed-basis columns and big headings may shrink and hyphenate instead of widening the page.
const MOBILE = '@media (max-width:560px){'
  + '.site [style*="flex: 1 1"]{min-width:0}'
  + '.site [style*="justify-content: space-between"]>:first-child{min-width:0}'
  + '.site .h-black{overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}'
  + '.site [style*="flex: 0 1 auto"]{min-width:0;max-width:100%}'
  + '.site [style*="flex: 0 1 auto"]>div{max-width:100%;box-sizing:border-box;flex-wrap:wrap}'
  + '.site [style*="align-items: flex-start"]>*{max-width:100%}'
  + '.site .btn{max-width:100%;box-sizing:border-box}'
  + '.site .slider{margin-right:calc(-1 * clamp(16px,4vw,72px))!important}'
  + '}';

export const siteCss = (isHome) => `<style id="site-css">${LOGO}${MOBILE}${isHome ? '' : HERO}</style>`;
