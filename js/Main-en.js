import{a as o,b as c,c as d,d as h}from"./chunk-O3OTVWYO.js";var g=h.bind(o),r=class extends c{render(){return m(this.renderVals()||{})}},p=class extends r{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(t=>{t.contains(a.target)||t.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let t=(window.scrollY||document.documentElement.scrollTop||0)>30;t!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:t})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},a=!!e.menuOpen;return{hdrCls:e.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Close menu":"Open menu",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=document.querySelector(".site");e&&(this._ro=new IntersectionObserver(a=>{let t=0;a.forEach(i=>{if(!i.isIntersecting)return;let l=i.target;this._ro.unobserve(l),l.style.transitionDelay=t++*80+"ms",l.classList.add("rv-go"),requestAnimationFrame(()=>l.classList.remove("rv-wait")),setTimeout(()=>{l.classList.remove("rv-go"),l.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),e.querySelectorAll(".rv").forEach(a=>{a.getBoundingClientRect().top<window.innerHeight*.92||(a.classList.add("rv-wait"),this._ro.observe(a))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}measure(){let e=this.track;if(!e)return;let a=e.scrollWidth-e.clientWidth,t=e.firstElementChild,i=t?t.getBoundingClientRect().width+32:1,l=e.children.length,n=Math.max(1,Math.round(e.clientWidth/i)),x=Math.min(l,Math.round(e.scrollLeft/i)+n);this.setState({p:a>0?e.scrollLeft/a:1,atStart:e.scrollLeft<=2,atEnd:e.scrollLeft>=a-2,idx:x,n:l})}slide(e){let a=this.track;if(!a)return;let t=a.firstElementChild,i=t?t.getBoundingClientRect().width+32:a.clientWidth,l=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.scrollBy({left:e*i,behavior:l?"auto":"smooth"})}renderVals(){let e=this.state||{},a=t=>String(t).padStart(2,"0");return{...this.navVals(),trackRef:this._trackRef||(this._trackRef=t=>{this.track=t,t&&setTimeout(()=>this.measure(),50)}),onScroll:()=>{cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this.measure())},prev:()=>this.slide(-1),next:()=>this.slide(1),down:t=>{t.pointerType!=="mouse"||!this.track||(this._drag={x:t.clientX,left:this.track.scrollLeft,moved:!1},this.track.style.scrollSnapType="none")},move:t=>{let i=this._drag;if(!i||!this.track)return;let l=t.clientX-i.x;Math.abs(l)>4&&(i.moved=!0),this.track.scrollLeft=i.left-l},up:t=>{let i=this._drag;if(!(!i||!this.track)&&(this._drag=null,this.track.style.scrollSnapType="",i.moved)){let l=n=>{n.preventDefault(),n.stopPropagation(),this.track.removeEventListener("click",l,!0)};this.track.addEventListener("click",l,!0)}},atStart:e.atStart===void 0?!0:e.atStart,atEnd:!!e.atEnd,prog:(e.p===void 0?0:e.p).toFixed(3),counter:a(e.idx||3)+" / "+a(e.n||5)}}};function m(s){return g`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${s.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/en" aria-label="BERK, go to the homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Choose language: English">EN <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Language"><a href="/" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en" hreflang="en" lang="en" aria-current="true">English<small>EN</small></a><a href="/de" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/en/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Book a call</a>
<button class="burger" type="button" onClick=${s.toggleMenu} aria-expanded=${s.menuExpanded} aria-controls="menu" aria-label=${s.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${s.menuCls} aria-hidden=${s.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Main menu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/en" aria-current="page" onClick=${s.closeMenu}><small>01</small>Home</a></li><li><a href="/en/services" onClick=${s.closeMenu}><small>02</small>Services</a></li><li><a href="/en/why-live" onClick=${s.closeMenu}><small>03</small>Why live</a></li><li><a href="/en/work" onClick=${s.closeMenu}><small>04</small>Work</a></li><li><a href="/en/about" onClick=${s.closeMenu}><small>05</small>About</a></li><li><a href="/en/contact" onClick=${s.closeMenu}><small>06</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Language"><a href="/" hreflang="nl" lang="nl">NL</a><a href="/en" hreflang="en" lang="en" aria-current="true">EN</a><a href="/de" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="position: relative; overflow: hidden; min-height: 760px; display: flex; align-items: flex-end">
<img class="hero-img" src="/assets/43961b6008b5434aee2fd74d9a674b26.webp" alt="BERK camera operator filming at the cable park in Knokke-Heist" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover" />
<div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(22,22,22,0.94) 0%, rgba(22,22,22,0.7) 45%, rgba(22,22,22,0.2) 100%)"></div>
<div class="wrap" style="position: relative; width: 100%; padding-top: 120px; padding-bottom: 72px; display: flex; flex-direction: column; gap: 28px">
<span class="eyebrow" style="color: #EFEFEF"><span class="dot"></span>Live production and video · Apeldoorn</span>
<h1 class="h-black hero-h" style="font-size: clamp(34px, 5.4vw, 104px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; text-wrap: initial"><span class="hl">A bigger audience</span> <span class="hl">than the <span style="color: #FF5F57">sidelines</span>.</span></h1>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #D8D8D8">Livestreams, podcasts and large multicam productions, plus the clips that keep working afterwards. With a fixed price, a test day and footage that’s yours.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/en/contact">Explore the possibilities <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="/en/work">See our work</a>
</div>
</div>
</section>

<section aria-label="Feedback from Lakeside Paradise" style="background: #EFEFEF; color: #161616; padding: clamp(40px, 5vw, 64px) 0; border-bottom: 2px solid #161616">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px clamp(32px, 5vw, 80px)">
<figure style="flex: 1 1 560px; margin: 0; display: flex; flex-direction: column; gap: 14px">
<span class="eyebrow" style="color: #555555"><span class="dot"></span>What the organiser says</span>
<blockquote class="h-black" style="margin: 0; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.08; max-width: 920px">“Highly recommended for anyone looking for a reliable partner who thinks along with you and keeps their promises.”</blockquote>
<figcaption style="font-size: 16px; line-height: 1.4; color: #3C3C3C"><b style="font-family: 'Archivo', sans-serif; font-weight: 700; color: #161616">Arno Dhont</b> · Lakeside Paradise, Knokke-Heist · translated from Dutch</figcaption>
</figure>
<div style="flex: 0 1 auto; display: flex; flex-direction: column; gap: 10px; align-items: flex-start">
<div style="display: flex; align-items: center; gap: 28px; background: #FFFFFF; border: 2px solid #161616; box-shadow: 6px 6px 0 #FF5F57; padding: 16px 24px">
<img src="/assets/f161dd2314cd642e4c66f09cff8b7d31.webp" alt="International Waterski & Wakeboard Federation (IWWF)" style="height: 56px; width: auto; max-width: 150px; object-fit: contain" />
<span aria-hidden="true" style="width: 2px; align-self: stretch; background: #DDDDDD"></span>
<img src="/assets/246c8d3f0bef37b94332530540a732ce.webp" alt="Lakeside Paradise" style="height: 56px; width: auto; max-width: 150px; object-fit: contain" />
</div>
<span style="font-size: 13px; color: #6B6B6B">IWWF Europe & Africa Open Cable Wake Championships, 2026</span>
</div>
</div>
</section>


<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 56px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px">
<div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">What we make</span><h2 class="h-black" style="font-size: clamp(40px, 5.6vw, 84px); line-height: 0.95; text-wrap: initial">Video keeps working<br />after the last <span style="color: #D93A33">heat</span></h2></div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px"><button class="sbtn" type="button" onClick=${s.prev} disabled=${s.atStart} aria-label="Previous service">←</button><button class="sbtn" type="button" onClick=${s.next} disabled=${s.atEnd} aria-label="Next service">→</button><a class="btn dark" href="/en/services" style="margin-left: 8px">All services <span aria-hidden="true">→</span></a></div>
</div>
<div class="rv" style="display: flex; flex-direction: column; gap: 24px">
<div class="slider" ref=${s.trackRef} onScroll=${s.onScroll} onPointerDown=${s.down} onPointerMove=${s.move} onPointerUp=${s.up} onPointerLeave=${s.up} tabindex="0" role="region" aria-label="Services, scroll horizontally">
<a class="card slide" href="/en/services" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Livestreams</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam directing, replay, custom graphics and the stream to YouTube or your own site.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/en/services" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Podcasts</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multi-camera recording, in the studio or on location, ready for YouTube and Spotify.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/en/services" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Large productions</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam for conferences and events: directing, recording and the stream, with one point of contact.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/en/services" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">04</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Aftercare</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">After each competition day, our AI pulls the highlights from the footage. We approve everything before it goes online.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
</div>
<div style="display: flex; align-items: center; gap: 20px"><span style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.08em; font-variant-numeric: tabular-nums">${s.counter}</span><div class="sbar" style="flex: 1"><span style="transform: scaleX(${s.prog})"></span></div></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 520px; position: relative">
<img src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="The BERK production team on the jetty at Lakeside Paradise" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #000000; box-shadow: 12px 12px 0 #FF5F57" />
</div>
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Featured · European championship · 1–3 October 2026</span>
<div style="display: flex; flex-direction: column; gap: 10px"><h2 class="h-black" style="font-size: clamp(36px, 4.2vw, 64px); line-height: 0.95; color: #FFFFFF">European Cable Wakeboard Championships 2026</h2><span style="font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 17px; color: #FF5F57">IWWF Europe & Africa Open Cable Wake Championships</span></div>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">Three days live on the IWWF YouTube channel from Lakeside Paradise, Knokke-Heist. With replay, custom overlays, live scores and a commentary studio.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 20px 16px; border-top: 1px solid #333333; padding-top: 20px">
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">30,000+</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">views</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">395</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">viewers at the same time at peak</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">5,300</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">hours of watch time</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">22</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">hours live</span></div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 14px"><a class="btn ghost" href="/en/work">See the case <span aria-hidden="true">→</span></a><a class="btn ghost" href="/en/why-live#bewijs">All the numbers</a></div>
</div>
</div>
</section>

<section style="background: #000000; padding: clamp(80px, 9vw, 140px) 0; border-top: 1px solid #2A2A2A">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px"><div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Why live</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 900px">A niche sport, an international audience</h2></div><a class="btn" href="/en/why-live">Read why live works <span aria-hidden="true">→</span></a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">65%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">new viewers on day 1 of the European Championships</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">83%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">of watch time came from non-subscribers</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">1/3</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">of watch time on the living room TV</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">25–44</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">years old: the age of 58 to 68% of viewers</span></div>
</div>
<span style="font-size: 14px; color: #8C8C8C">European Cable Wakeboard Championships 2026 · YouTube Analytics</span>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">How we work</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">From intake to live in four steps</h2></div>
<ol style="margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">01</span><h3 class="h-black" style="font-size: 24px">Intake</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">The event, the location and where the feed needs to go.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">02</span><h3 class="h-black" style="font-size: 24px">Quote</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Cameras, crew and schedule, with a custom price. Always free of obligation.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">03</span><h3 class="h-black" style="font-size: 24px">Test day</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">We run the whole chain beforehand: internet, directing and stream.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: #D93A33">04</span><h3 class="h-black" style="font-size: 24px">Live</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">We run the show. You get the recordings and the replay.</p></li>
</ol>
</div>
</section>


<section style="background: #161616; padding: clamp(96px, 10vw, 160px) 0">
<div class="wrap rv" style="display: flex; flex-direction: column; align-items: flex-start; gap: 32px">
<h2 class="h-black" style="font-size: clamp(56px, 9vw, 150px); line-height: 0.9; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Ready to go <span style="color: #FF5F57">live</span>?</h2>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Tell us what you want to shoot. Within two working days you’ll have a custom quote, free of obligation.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/en/contact">Explore the possibilities <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="mailto:wouter@berk.productions">wouter@berk.productions</a>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 64px 0 32px">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 72px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 56px; font-size: 16px; line-height: 1.9">
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Services</span><a href="/en/services">Livestreams</a><a href="/en/services">Podcasts</a><a href="/en/services">Aftercare</a><a href="/en/services">Large productions</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">BERK</span><a href="/en/why-live">Why live</a><a href="/en/work">Work</a><a href="/en/about">About</a><a href="/en/contact">Contact</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Contact</span><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 1px solid #2A2A2A; padding-top: 20px; font-size: 14px; color: #8C8C8C"><span>© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. [NUMBER]</span><span>Instagram · YouTube · LinkedIn</span></div>
</div>
</footer>

</div>`}var f=document.getElementById("app");f.textContent="";d(o(p,{}),f);
