import{a as t,b as r,c as d,d as c}from"./chunk-O3OTVWYO.js";var x=c.bind(t),n=class extends r{render(){return f(this.renderVals()||{})}},o=class extends n{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(e.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let a=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=a,document.addEventListener("scroll",a,{capture:!0,passive:!0}),a()}navVals(){let a=this.state||{},e=!!a.menuOpen;return{hdrCls:a.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Close menu":"Open menu",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let a=document.querySelector(".site");a&&(this._ro=new IntersectionObserver(e=>{let l=0;e.forEach(p=>{if(!p.isIntersecting)return;let i=p.target;this._ro.unobserve(i),i.style.transitionDelay=l++*80+"ms",i.classList.add("rv-go"),requestAnimationFrame(()=>i.classList.remove("rv-wait")),setTimeout(()=>{i.classList.remove("rv-go"),i.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),a.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function f(s){return x`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${s.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/en" aria-label="BERK, go to the homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Choose language: English">EN <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Language"><a href="/waarom-live" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/why-live" hreflang="en" lang="en" aria-current="true">English<small>EN</small></a><a href="/de/warum-live" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/en/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Book a call</a>
<button class="burger" type="button" onClick=${s.toggleMenu} aria-expanded=${s.menuExpanded} aria-controls="menu" aria-label=${s.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${s.menuCls} aria-hidden=${s.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Main menu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/en" onClick=${s.closeMenu}><small>01</small>Home</a></li><li><a href="/en/services" onClick=${s.closeMenu}><small>02</small>Services</a></li><li><a href="/en/why-live" aria-current="page" onClick=${s.closeMenu}><small>03</small>Why live</a></li><li><a href="/en/work" onClick=${s.closeMenu}><small>04</small>Work</a></li><li><a href="/en/about" onClick=${s.closeMenu}><small>05</small>About</a></li><li><a href="/en/contact" onClick=${s.closeMenu}><small>06</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Language"><a href="/waarom-live" hreflang="nl" lang="nl">NL</a><a href="/en/why-live" hreflang="en" lang="en" aria-current="true">EN</a><a href="/de/warum-live" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Why live</span>
<h1 class="h-black" style="font-size: clamp(44px, 6.4vw, 100px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1300px">Your event deserves a bigger audience than the <span style="color: #FF5F57">sidelines</span></h1>
<p style="margin: 0; max-width: 680px; font-size: 20px; line-height: 1.6; color: #CFCFCF">Why a livestream makes sense for smaller sports in particular. First what research shows, then what we saw ourselves at the European Cable Wakeboard Championships.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px"><a class="btn" href="#bewijs">See our own numbers <span aria-hidden="true">↓</span></a></div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">The problem</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">A weekend of work. An audience the size of the stands.</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Fans are at home</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Family, clubmates and followers outside the region see nothing of what happens.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Sponsors get little back</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">A banner along the course only reaches whoever is there that day.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">On Sunday it’s over</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">No footage, no replay, nothing to sell the next edition with.</p></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">What research shows</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1100px">Live works, for smaller sports too</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Reach</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">Kabaddi and Gaelic games reached fans worldwide through streams and drew new participants that way.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, Sept. 2026</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">89%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">of 18- to 24-year-olds worldwide watch YouTube at least monthly.</p><span style="font-size: 14px; color: #8C8C8C">Ampere Analysis, via Streaming Media, Mar. 2025</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">67%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">of live video watch time happens after the broadcast. An older figure, but the direction is clear.</p><span style="font-size: 14px; color: #8C8C8C">TwentyThree, State of Online Video 2017</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Free</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">For smaller sports, free access works better than a paywall. The money comes from sponsorship.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, Sept. 2026</span></div>
</div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 460px"><img src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="Commentators live on camera in front of the sponsor walls" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616" /></div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px">
<span class="eyebrow" style="color: #555555">Sponsors</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 68px); line-height: 0.95">Sponsors want to see what they get</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">At the end of 2024, sponsorship decision-makers named unclear streaming numbers as one of their biggest concerns. Your own stream solves that. <span style="color: #555555">(The Sponsor, July 2025)</span></p>
<div style="display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Logo on screen</b> in the overlay for every run, heat or competition</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Hard numbers</b> on viewers, watch time and region</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">A report afterwards</b> that helps you sell again next year</p>
</div>
</div>
</div>
</section>

<section id="bewijs" style="background: #000000; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Our own numbers · European Cable Wakeboard Championships 2026</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1200px">A niche sport, an international audience</h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #CFCFCF">IWWF Europe & Africa Open Cable Wake Championships, Lakeside Paradise, Knokke-Heist, 1–3 October 2026. Three days live on YouTube.</p></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">30,000+</span><span style="font-size: 17px; color: #BDBDBD">views</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">5,300</span><span style="font-size: 17px; color: #BDBDBD">hours of watch time</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">395</span><span style="font-size: 17px; color: #BDBDBD">concurrent viewers at the peak</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">22</span><span style="font-size: 17px; color: #BDBDBD">hours of live broadcast</span></div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">65%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Mostly new viewers</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">On day 1, 65% of viewers were new. More than 83% of watch time came from people who weren’t subscribed.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">44–51%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">YouTube did the work</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">of views came from recommendations. Others came via Instagram, the scoring platform, WhatsApp and sporza.be.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">1/3</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">On the big screen</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">29 to 35% of watch time was on TV. The rest split roughly evenly between mobile and computer.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">EU</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">From all over Europe</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">Top 5: Belgium, Italy, Germany, France and the Netherlands. On day 3, Poland made the list too.</p></div>
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; gap: 12px 40px; font-size: 17px; line-height: 1.6; color: #CFCFCF; border-top: 1px solid #333333; padding-top: 22px">
<span>12 to 17 minutes average view duration</span><span>534 chat messages during the broadcasts</span><span>28,500 extra views on the channel in 28 days (<a href="#na-afloop" style="color: #FF5F57">see after the event</a>)</span><span><b style="color: #FFFFFF">For sponsors:</b> 58 to 68% of viewers were aged 25 to 44</span>
</div>
<span style="font-size: 14px; color: #8C8C8C">Source: YouTube Analytics. Views: as of 21 October 2026, and still counting. Other figures up to and including 14 October 2026.</span>
</div>
</section>

<section id="na-afloop" style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 56px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">After the event</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">After the last heat, the <span style="color: #D93A33">second life</span> begins</h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #3C3C3C">The stream stops, the content doesn’t. From the same footage we make new pieces that keep bringing in reach for weeks, for the event and for the sponsors.</p></div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 0; border-top: 2px solid #161616">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 24px 24px 0; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">During</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Live</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Fans watch along on YouTube, your site or TV. Sponsors are in the overlay.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Same evening</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Daily highlights</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">A short recap of the day, ready for YouTube and your website.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">The days after</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Clips and social</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Every rider gets their own run to share. Vertical for Instagram and TikTok, with the sponsors on screen.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 0 24px 24px"><span class="eyebrow" style="color: #D93A33">Weeks later</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Replay</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">The full broadcast stays online. YouTube keeps recommending it to new viewers.</p></div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 18px">
<span class="eyebrow" style="color: #555555">European Cable Wakeboard Championships 2026</span>
<h3 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">After the event, more views came in than the streams got themselves</h3>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Together, the three streams got 27,508 views. In the 28 days after, the channel added another 28,500 views. The count has since passed 30,000 views. Research points the same way: most live video watch time happens after the broadcast.</p>
<span style="font-size: 14px; color: #555555">Sources: YouTube Analytics, figures up to and including 14 October 2026 · TwentyThree, State of Online Video 2017</span>
</div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px; background: #FFFFFF; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616; padding: clamp(24px, 3vw, 40px)">
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">During the livestreams</span><span class="h-black" style="font-size: 28px">27,508</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 49%; background: #161616"></div></div></div>
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">Added in the 28 days after</span><span class="h-black" style="font-size: 28px; color: #D93A33">+28,500</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 51%; background: #FF5F57"></div></div></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-top: 2px solid #161616; padding-top: 16px"><b class="h-black" style="font-size: 22px">±51%</b> of all views came after the event.</p>
</div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="h-black" style="font-size: clamp(44px, 6vw, 96px); line-height: 0.92; max-width: 1000px">Take your next event live</h2>
<div style="display: flex; flex-wrap: wrap; gap: 16px"><a class="btn" href="/en/contact" style="background: #161616; color: #FFFFFF">Explore the possibilities <span aria-hidden="true">→</span></a><a class="btn" href="/en/services" style="background: #FFFFFF">See the services</a></div>
</div>
</section>

<section style="background: #161616; padding: 48px 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.6; color: #A8A8A8">
<span class="eyebrow" style="color: #FFFFFF">Sources</span>
<span>The Broadcast Bridge, September 2026 · Ampere Analysis via Streaming Media, March 2025 · TwentyThree, State of Online Video 2017 · The Sponsor, “Will the sports streaming shift hurt sponsorship value and visibility?”, July 2025 · Own figures: YouTube Analytics, European Cable Wakeboard Championships 2026.</span>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. [NUMBER]</span></div>
</div>
</footer>

</div>`}var h=document.getElementById("app");h.textContent="";d(t(o,{}),h);
