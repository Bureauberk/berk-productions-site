import{a as o,b as d,c,d as h}from"./chunk-O3OTVWYO.js";var g=h.bind(o),r=class extends d{render(){return m(this.renderVals()||{})}},p=class extends r{navInit(){this._ddClose||(this._ddClose=s=>{document.querySelectorAll("details.lang-dd[open]").forEach(t=>{t.contains(s.target)||t.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let t=(window.scrollY||document.documentElement.scrollTop||0)>30;t!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:t})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},s=!!e.menuOpen;return{hdrCls:e.scrolled||s?"hdr scrolled":"hdr",menuCls:s?"menu open":"menu",menuExpanded:s?"true":"false",menuHidden:s?"false":"true",menuLabel:s?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!s}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=document.querySelector(".site");e&&(this._ro=new IntersectionObserver(s=>{let t=0;s.forEach(i=>{if(!i.isIntersecting)return;let l=i.target;this._ro.unobserve(l),l.style.transitionDelay=t++*80+"ms",l.classList.add("rv-go"),requestAnimationFrame(()=>l.classList.remove("rv-wait")),setTimeout(()=>{l.classList.remove("rv-go"),l.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),e.querySelectorAll(".rv").forEach(s=>{s.getBoundingClientRect().top<window.innerHeight*.92||(s.classList.add("rv-wait"),this._ro.observe(s))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}measure(){let e=this.track;if(!e)return;let s=e.scrollWidth-e.clientWidth,t=e.firstElementChild,i=t?t.getBoundingClientRect().width+32:1,l=e.children.length,n=Math.max(1,Math.round(e.clientWidth/i)),x=Math.min(l,Math.round(e.scrollLeft/i)+n);this.setState({p:s>0?e.scrollLeft/s:1,atStart:e.scrollLeft<=2,atEnd:e.scrollLeft>=s-2,idx:x,n:l})}slide(e){let s=this.track;if(!s)return;let t=s.firstElementChild,i=t?t.getBoundingClientRect().width+32:s.clientWidth,l=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;s.scrollBy({left:e*i,behavior:l?"auto":"smooth"})}renderVals(){let e=this.state||{},s=t=>String(t).padStart(2,"0");return{...this.navVals(),trackRef:this._trackRef||(this._trackRef=t=>{this.track=t,t&&setTimeout(()=>this.measure(),50)}),onScroll:()=>{cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this.measure())},prev:()=>this.slide(-1),next:()=>this.slide(1),down:t=>{t.pointerType!=="mouse"||!this.track||(this._drag={x:t.clientX,left:this.track.scrollLeft,moved:!1},this.track.style.scrollSnapType="none")},move:t=>{let i=this._drag;if(!i||!this.track)return;let l=t.clientX-i.x;Math.abs(l)>4&&(i.moved=!0),this.track.scrollLeft=i.left-l},up:t=>{let i=this._drag;if(!(!i||!this.track)&&(this._drag=null,this.track.style.scrollSnapType="",i.moved)){let l=n=>{n.preventDefault(),n.stopPropagation(),this.track.removeEventListener("click",l,!0)};this.track.addEventListener("click",l,!0)}},atStart:e.atStart===void 0?!0:e.atStart,atEnd:!!e.atEnd,prog:(e.p===void 0?0:e.p).toFixed(3),counter:s(e.idx||3)+" / "+s(e.n||5)}}};function m(a){return g`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${a.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en" hreflang="en" lang="en">English<small>EN</small></a><a href="/de" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${a.toggleMenu} aria-expanded=${a.menuExpanded} aria-controls="menu" aria-label=${a.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${a.menuCls} aria-hidden=${a.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" aria-current="page" onClick=${a.closeMenu}><small>01</small>Home</a></li><li><a href="/diensten" onClick=${a.closeMenu}><small>02</small>Diensten</a></li><li><a href="/prijscalculator" onClick=${a.closeMenu}><small>03</small>Prijscalculator</a></li><li><a href="/waarom-live" onClick=${a.closeMenu}><small>04</small>Waarom live</a></li><li><a href="/werk" onClick=${a.closeMenu}><small>05</small>Werk</a></li><li><a href="/over" onClick=${a.closeMenu}><small>06</small>Over</a></li><li><a href="/contact" onClick=${a.closeMenu}><small>07</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en" hreflang="en" lang="en">EN</a><a href="/de" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="position: relative; overflow: hidden; min-height: 760px; display: flex; align-items: flex-end">
<img class="hero-img" src="/assets/43961b6008b5434aee2fd74d9a674b26.webp" alt="Cameraman van BERK filmt aan de kabelbaan in Knokke-Heist" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover" />
<div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(22,22,22,0.94) 0%, rgba(22,22,22,0.7) 45%, rgba(22,22,22,0.2) 100%)"></div>
<div class="wrap" style="position: relative; width: 100%; padding-top: 120px; padding-bottom: 72px; display: flex; flex-direction: column; gap: 28px">
<span class="eyebrow" style="color: #EFEFEF"><span class="dot"></span>Live productie en video · Apeldoorn</span>
<h1 class="h-black hero-h" style="font-size: clamp(34px, 5.4vw, 104px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; text-wrap: initial"><span class="hl">Meer publiek dan er</span> <span class="hl">langs de <span style="color: #FF5F57">kant</span> staat.</span></h1>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #D8D8D8">Livestreams, podcasts en grote multicamproducties, plus de clips die erna blijven werken. Met een vaste prijs, een testdag en beelden die van jou zijn.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/contact">Ontdek de mogelijkheden <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="/werk">Bekijk ons werk</a>
</div>
</div>
</section>

<section aria-label="Feedback van Lakeside Paradise" style="background: #EFEFEF; color: #161616; padding: clamp(40px, 5vw, 64px) 0; border-bottom: 2px solid #161616">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px clamp(32px, 5vw, 80px)">
<figure style="flex: 1 1 560px; margin: 0; display: flex; flex-direction: column; gap: 14px">
<span class="eyebrow" style="color: #555555"><span class="dot"></span>Wat de organisatie zegt</span>
<blockquote class="h-black" style="margin: 0; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.08; max-width: 920px">„Een absolute aanrader voor iedereen die op zoek is naar een betrouwbare partner die meedenkt en zijn afspraken nakomt.”</blockquote>
<figcaption style="font-size: 16px; line-height: 1.4; color: #3C3C3C"><b style="font-family: 'Archivo', sans-serif; font-weight: 700; color: #161616">Arno Dhont</b> · Lakeside Paradise, Knokke-Heist</figcaption>
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
<div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Wat we maken</span><h2 class="h-black" style="font-size: clamp(40px, 5.6vw, 84px); line-height: 0.95; text-wrap: initial">Video blijft werken<br />na de laatste <span style="color: #D93A33">heat</span></h2></div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px"><button class="sbtn" type="button" onClick=${a.prev} disabled=${a.atStart} aria-label="Vorige dienst">←</button><button class="sbtn" type="button" onClick=${a.next} disabled=${a.atEnd} aria-label="Volgende dienst">→</button><a class="btn dark" href="/diensten" style="margin-left: 8px">Alle diensten <span aria-hidden="true">→</span></a></div>
</div>
<div class="rv" style="display: flex; flex-direction: column; gap: 24px">
<div class="slider" ref=${a.trackRef} onScroll=${a.onScroll} onPointerDown=${a.down} onPointerMove=${a.move} onPointerUp=${a.up} onPointerLeave=${a.up} tabindex="0" role="region" aria-label="Diensten, scroll horizontaal">
<a class="card slide" href="/diensten" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Livestreams</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam-regie, replay, eigen graphics en de stream naar YouTube of je eigen site.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/diensten" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Podcasts</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Opname met meerdere camera’s, in de studio of op locatie, klaar voor YouTube en Spotify.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/diensten" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Grote producties</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam voor congressen en events: regie, opname en de stream, met één aanspreekpunt.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/diensten" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">04</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Aftercare</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Na elke wedstrijddag haalt onze AI de hoogtepunten uit de opnames. Wij keuren alles goed voordat het online gaat.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
</div>
<div style="display: flex; align-items: center; gap: 20px"><span style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.08em; font-variant-numeric: tabular-nums">${a.counter}</span><div class="sbar" style="flex: 1"><span style="transform: scaleX(${a.prog})"></span></div></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 520px; position: relative">
<img src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="Het productieteam van BERK op de steiger bij Lakeside Paradise" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #000000; box-shadow: 12px 12px 0 #FF5F57" />
</div>
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Uitgelicht · Europees kampioenschap · 1–3 oktober 2026</span>
<div style="display: flex; flex-direction: column; gap: 10px"><h2 class="h-black" style="font-size: clamp(36px, 4.2vw, 64px); line-height: 0.95; color: #FFFFFF">EK Cable Wakeboard 2026</h2><span style="font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 17px; color: #FF5F57">IWWF Europe & Africa Open Cable Wake Championships</span></div>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">Drie dagen live op het YouTube-kanaal van de IWWF vanuit Lakeside Paradise, Knokke-Heist. Met replay, eigen overlays, live scores en een commentatorenstudio.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 20px 16px; border-top: 1px solid #333333; padding-top: 20px">
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">30.000+</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">weergaven</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">395</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">kijkers tegelijk op het hoogtepunt</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">5.300</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">uur kijktijd</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">22</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">uur live</span></div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 14px"><a class="btn ghost" href="/werk">Bekijk de case <span aria-hidden="true">→</span></a><a class="btn ghost" href="/waarom-live#bewijs">Alle cijfers</a></div>
</div>
</div>
</section>

<section style="background: #000000; padding: clamp(80px, 9vw, 140px) 0; border-top: 1px solid #2A2A2A">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px"><div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Waarom live</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 900px">Een nichesport, een internationaal publiek</h2></div><a class="btn" href="/waarom-live">Lees waarom live werkt <span aria-hidden="true">→</span></a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">65%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">nieuwe kijkers op dag 1 van het EK</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">83%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">van de kijktijd kwam van niet-abonnees</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">1/3</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">van de kijktijd op de tv in de huiskamer</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">25–44</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">jaar: de leeftijd van 58 tot 68% van de kijkers</span></div>
</div>
<span style="font-size: 14px; color: #8C8C8C">EK Cable Wakeboard 2026 · YouTube Analytics</span>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Zo werken we</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">Van intake tot live in vier stappen</h2></div>
<ol style="margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">01</span><h3 class="h-black" style="font-size: 24px">Intake</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Event, locatie en waar het beeld heen moet.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">02</span><h3 class="h-black" style="font-size: 24px">Offerte</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Camera’s, crew en planning, met een prijs op maat. Altijd vrijblijvend.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">03</span><h3 class="h-black" style="font-size: 24px">Testdag</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">De hele keten draait vooraf: internet, regie en stream.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: #D93A33">04</span><h3 class="h-black" style="font-size: 24px">Live</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Wij draaien. Jij krijgt de opnames en de terugkijkversie.</p></li>
</ol>
</div>
</section>


<section style="background: #161616; padding: clamp(96px, 10vw, 160px) 0">
<div class="wrap rv" style="display: flex; flex-direction: column; align-items: flex-start; gap: 32px">
<h2 class="h-black" style="font-size: clamp(56px, 9vw, 150px); line-height: 0.9; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Klaar om <span style="color: #FF5F57">live</span> te gaan?</h2>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Vertel wat je wil draaien. Binnen twee werkdagen heb je een vrijblijvende offerte op maat.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/contact">Ontdek de mogelijkheden <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="mailto:wouter@berk.productions">wouter@berk.productions</a>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 64px 0 32px">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 72px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 56px; font-size: 16px; line-height: 1.9">
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Diensten</span><a href="/diensten">Livestreams</a><a href="/diensten">Podcasts</a><a href="/diensten">Aftercare</a><a href="/diensten">Grote producties</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">BERK</span><a href="/prijscalculator">Prijscalculator</a><a href="/waarom-live">Waarom live</a><a href="/werk">Werk</a><a href="/over">Over</a><a href="/contact">Contact</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Contact</span><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 1px solid #2A2A2A; padding-top: 20px; font-size: 14px; color: #8C8C8C"><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK [NUMMER]</span><span>Instagram · YouTube · LinkedIn</span></div>
</div>
</footer>

</div>`}var f=document.getElementById("app");f.textContent="";c(o(p,{}),f);
