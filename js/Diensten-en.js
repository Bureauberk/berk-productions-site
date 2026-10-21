import{a as i,b as c,c as p,d}from"./chunk-O3OTVWYO.js";var m=d.bind(i),n=class extends c{render(){return f(this.renderVals()||{})}},o=class extends n{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(s=>{s.contains(e.target)||s.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let l=()=>{let s=(window.scrollY||document.documentElement.scrollTop||0)>30;s!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:s})};this._navScroll=l,document.addEventListener("scroll",l,{capture:!0,passive:!0}),l()}navVals(){let l=this.state||{},e=!!l.menuOpen;return{hdrCls:l.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Close menu":"Open menu",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let l=document.querySelector(".site");l&&(this._ro=new IntersectionObserver(e=>{let s=0;e.forEach(r=>{if(!r.isIntersecting)return;let t=r.target;this._ro.unobserve(t),t.style.transitionDelay=s++*80+"ms",t.classList.add("rv-go"),requestAnimationFrame(()=>t.classList.remove("rv-wait")),setTimeout(()=>{t.classList.remove("rv-go"),t.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),l.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function f(a){return m`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${a.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/en" aria-label="BERK, go to the homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Choose language: English">EN <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Language"><a href="/diensten" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/services" hreflang="en" lang="en" aria-current="true">English<small>EN</small></a><a href="/de/leistungen" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/en/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Book a call</a>
<button class="burger" type="button" onClick=${a.toggleMenu} aria-expanded=${a.menuExpanded} aria-controls="menu" aria-label=${a.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${a.menuCls} aria-hidden=${a.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Main menu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/en" onClick=${a.closeMenu}><small>01</small>Home</a></li><li><a href="/en/services" aria-current="page" onClick=${a.closeMenu}><small>02</small>Services</a></li><li><a href="/en/why-live" onClick=${a.closeMenu}><small>03</small>Why live</a></li><li><a href="/en/work" onClick=${a.closeMenu}><small>04</small>Work</a></li><li><a href="/en/about" onClick=${a.closeMenu}><small>05</small>About</a></li><li><a href="/en/contact" onClick=${a.closeMenu}><small>06</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Language"><a href="/diensten" hreflang="nl" lang="nl">NL</a><a href="/en/services" hreflang="en" lang="en" aria-current="true">EN</a><a href="/de/leistungen" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0 clamp(56px, 6vw, 88px)">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Services</span>
<h1 class="h-black" style="font-size: clamp(52px, 8vw, 124px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1100px">Live, recorded and still <span style="color: #FF5F57">seen</span> after</h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Four services, one team. All with a custom price and a no-obligation quote up front.</p>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(80px, 9vw, 140px)">

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/8de8495379f82c55f0196e41bed0a4d1.webp" alt="BERK’s control room with the vision mixer during a livestream" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">01</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Livestreams</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">We handle the cameras, directing, replay, graphics and the stream. You handle the event.</p>
<ul class="ticks"><li>Manned and unmanned cameras, mixed live</li><li>Replay within seconds, custom overlays and live scores</li><li>Stream to YouTube, your own site or multiple platforms</li><li>A test day beforehand, and Starlink if there’s no internet</li><li>Drone footage as an option: €1,400 per day</li></ul>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-left: 4px solid #FF5F57; padding-left: 14px">The European Cable Wakeboard Championships has passed 30,000 views, from all over Europe. <a href="/en/why-live" style="color: #D93A33; font-weight: 600">Why live works →</a></p>
<span class="price">Base package from €2,750 per day</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="BERK commentary studio with two presenters at the desk" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">02</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Podcasts</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">A podcast that looks good on YouTube too. In the studio or on location at your place.</p>
<ul class="ticks"><li>Multi-camera recording with good microphones</li><li>Editing for YouTube and Spotify</li><li>Short social clips from every episode</li></ul>
<span class="price">Price: [PRICE PER EPISODE]</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/4b4ba22a10248f001ac397a1b0e7930d.webp" alt="BERK camera operator behind a camera on a tripod" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">03</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Large productions</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Multicam for conferences and large events. Directing, recording and stream, with one point of contact.</p>
<ul class="ticks"><li>Several rooms or stages at once</li><li>Separate recordings of every feed</li><li>A production proposal with clear agreements</li></ul>
<span class="price">Custom pricing</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/de4ba877c3ada9391766ea4638d6bd3f.webp" alt="Two editors working on an edit in the evening" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">04</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Aftercare</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">After each competition day, our AI pulls the highlights from the footage. We check everything before it goes online.</p>
<ul class="ticks"><li>Daily highlights</li><li>Clips per athlete, to share with sponsors</li><li>Vertical for Instagram and TikTok</li><li>All from the production’s own footage</li></ul>
<span class="price">Custom</span>
</div>
</article>

</div>
</section>

<section id="geen-aftermovies" style="background: #EFEFEF; color: #161616; padding: 0 0 clamp(80px, 9vw, 140px)">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; gap: clamp(28px, 4vw, 64px); align-items: flex-start; border-top: 2px solid #161616; padding-top: clamp(40px, 5vw, 72px)">
<div style="flex: 1 1 360px; display: flex; flex-direction: column; gap: 14px"><span class="eyebrow" style="color: #555555">Good to know</span><h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">Why we don’t make aftermovies</h2></div>
<div style="flex: 2 1 520px; display: flex; flex-direction: column; gap: 16px; font-size: 18px; line-height: 1.6; color: #3C3C3C">
<p style="margin: 0">An aftermovie needs a completely different way of filming. A filmmaker roams freely all day with their own camera and their own plan: atmosphere, details, the crowd, the people behind the scenes. That kind of footage doesn’t come out of a control room.</p>
<p style="margin: 0">We point all our cameras at the competition and the broadcast. From that footage we make highlights and clips per athlete: fast, honest and ready to use for your channels and your sponsors.</p>
<p style="margin: 0">Want an aftermovie as well? We’re happy to recommend a filmmaker who specialises in them, and we’ll coordinate with them on the day.</p>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 32px; border: 2px solid #EFEFEF; box-shadow: 10px 10px 0 #FF5F57; padding: clamp(28px, 4vw, 56px); margin-right: 10px; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 14px; max-width: 760px">
<h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 1; color: #FFFFFF">Custom pricing, always free of obligation</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.6; color: #CFCFCF">Prices shown are indicative and exclude VAT. Travel costs and, where needed, accommodation, food and drinks are charged separately. You always get a no-obligation quote first.</p>
</div>
<a class="btn" href="/en/contact">Request a quote <span aria-hidden="true">→</span></a>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. [NUMBER]</span></div>
</div>
</footer>

</div>`}var h=document.getElementById("app");h.textContent="";p(i(o,{}),h);
