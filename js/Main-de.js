import{a as r,b as d,c,d as h}from"./chunk-O3OTVWYO.js";var u=h.bind(r),o=class extends d{render(){return g(this.renderVals()||{})}},p=class extends o{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(t=>{t.contains(a.target)||t.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let t=(window.scrollY||document.documentElement.scrollTop||0)>30;t!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:t})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},a=!!e.menuOpen;return{hdrCls:e.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Men\xFC schlie\xDFen":"Men\xFC \xF6ffnen",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=document.querySelector(".site");e&&(this._ro=new IntersectionObserver(a=>{let t=0;a.forEach(l=>{if(!l.isIntersecting)return;let i=l.target;this._ro.unobserve(i),i.style.transitionDelay=t++*80+"ms",i.classList.add("rv-go"),requestAnimationFrame(()=>i.classList.remove("rv-wait")),setTimeout(()=>{i.classList.remove("rv-go"),i.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),e.querySelectorAll(".rv").forEach(a=>{a.getBoundingClientRect().top<window.innerHeight*.92||(a.classList.add("rv-wait"),this._ro.observe(a))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect(),cancelAnimationFrame(this._raf)}measure(){let e=this.track;if(!e)return;let a=e.scrollWidth-e.clientWidth,t=e.firstElementChild,l=t?t.getBoundingClientRect().width+32:1,i=e.children.length,n=Math.max(1,Math.round(e.clientWidth/l)),x=Math.min(i,Math.round(e.scrollLeft/l)+n);this.setState({p:a>0?e.scrollLeft/a:1,atStart:e.scrollLeft<=2,atEnd:e.scrollLeft>=a-2,idx:x,n:i})}slide(e){let a=this.track;if(!a)return;let t=a.firstElementChild,l=t?t.getBoundingClientRect().width+32:a.clientWidth,i=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.scrollBy({left:e*l,behavior:i?"auto":"smooth"})}renderVals(){let e=this.state||{},a=t=>String(t).padStart(2,"0");return{...this.navVals(),trackRef:this._trackRef||(this._trackRef=t=>{this.track=t,t&&setTimeout(()=>this.measure(),50)}),onScroll:()=>{cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame(()=>this.measure())},prev:()=>this.slide(-1),next:()=>this.slide(1),down:t=>{t.pointerType!=="mouse"||!this.track||(this._drag={x:t.clientX,left:this.track.scrollLeft,moved:!1},this.track.style.scrollSnapType="none")},move:t=>{let l=this._drag;if(!l||!this.track)return;let i=t.clientX-l.x;Math.abs(i)>4&&(l.moved=!0),this.track.scrollLeft=l.left-i},up:t=>{let l=this._drag;if(!(!l||!this.track)&&(this._drag=null,this.track.style.scrollSnapType="",l.moved)){let i=n=>{n.preventDefault(),n.stopPropagation(),this.track.removeEventListener("click",i,!0)};this.track.addEventListener("click",i,!0)}},atStart:e.atStart===void 0?!0:e.atStart,atEnd:!!e.atEnd,prog:(e.p===void 0?0:e.p).toFixed(3),counter:a(e.idx||3)+" / "+a(e.n||5)}}};function g(s){return u`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${s.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/de" aria-label="BERK, zur Startseite"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Sprache wählen: Deutsch">DE <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Sprache"><a href="/" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en" hreflang="en" lang="en">English<small>EN</small></a><a href="/de" hreflang="de" lang="de" aria-current="true">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/de/kontakt" style="min-height: 46px; padding: 0 20px; font-size: 13px">Gespräch vereinbaren</a>
<button class="burger" type="button" onClick=${s.toggleMenu} aria-expanded=${s.menuExpanded} aria-controls="menu" aria-label=${s.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${s.menuCls} aria-hidden=${s.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hauptmenü"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/de" aria-current="page" onClick=${s.closeMenu}><small>01</small>Start</a></li><li><a href="/de/leistungen" onClick=${s.closeMenu}><small>02</small>Leistungen</a></li><li><a href="/de/warum-live" onClick=${s.closeMenu}><small>03</small>Warum live</a></li><li><a href="/de/projekte" onClick=${s.closeMenu}><small>04</small>Projekte</a></li><li><a href="/de/ueber-uns" onClick=${s.closeMenu}><small>05</small>Über uns</a></li><li><a href="/de/kontakt" onClick=${s.closeMenu}><small>06</small>Kontakt</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Sprache"><a href="/" hreflang="nl" lang="nl">NL</a><a href="/en" hreflang="en" lang="en">EN</a><a href="/de" hreflang="de" lang="de" aria-current="true">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Kontakt</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="position: relative; overflow: hidden; min-height: 760px; display: flex; align-items: flex-end">
<img class="hero-img" src="/assets/43961b6008b5434aee2fd74d9a674b26.webp" alt="Kameramann von BERK filmt an der Wakeboardanlage in Knokke-Heist" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover" />
<div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(22,22,22,0.94) 0%, rgba(22,22,22,0.7) 45%, rgba(22,22,22,0.2) 100%)"></div>
<div class="wrap" style="position: relative; width: 100%; padding-top: 120px; padding-bottom: 72px; display: flex; flex-direction: column; gap: 28px">
<span class="eyebrow" style="color: #EFEFEF"><span class="dot"></span>Liveproduktion und Video · Apeldoorn</span>
<h1 class="h-black hero-h" style="font-size: clamp(34px, 5.4vw, 104px); line-height: 0.95; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; text-wrap: initial"><span class="hl">Mehr Publikum, als</span> <span class="hl">am <span style="color: #FF5F57">Rand</span> steht.</span></h1>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #D8D8D8">Livestreams, Podcasts und große Multicam-Produktionen, dazu die Clips, die danach weiterwirken. Mit festem Preis, einem Testtag und Bildmaterial, das Ihnen gehört.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/de/kontakt">Möglichkeiten entdecken <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="/de/projekte">Unsere Projekte ansehen</a>
</div>
</div>
</section>

<section aria-label="Feedback von Lakeside Paradise" style="background: #EFEFEF; color: #161616; padding: clamp(40px, 5vw, 64px) 0; border-bottom: 2px solid #161616">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px clamp(32px, 5vw, 80px)">
<figure style="flex: 1 1 560px; margin: 0; display: flex; flex-direction: column; gap: 14px">
<span class="eyebrow" style="color: #555555"><span class="dot"></span>Was der Veranstalter sagt</span>
<blockquote class="h-black" style="margin: 0; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.08; max-width: 920px">„Absolut empfehlenswert für alle, die einen zuverlässigen Partner suchen, der mitdenkt und seine Zusagen einhält.“</blockquote>
<figcaption style="font-size: 16px; line-height: 1.4; color: #3C3C3C"><b style="font-family: 'Archivo', sans-serif; font-weight: 700; color: #161616">Arno Dhont</b> · Lakeside Paradise, Knokke-Heist · aus dem Niederländischen übersetzt</figcaption>
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
<div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Was wir machen</span><h2 class="h-black" style="font-size: clamp(40px, 5.6vw, 84px); line-height: 0.95; text-wrap: initial">Video wirkt weiter<br />nach dem letzten <span style="color: #D93A33">Heat</span></h2></div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px"><button class="sbtn" type="button" onClick=${s.prev} disabled=${s.atStart} aria-label="Vorherige Leistung">←</button><button class="sbtn" type="button" onClick=${s.next} disabled=${s.atEnd} aria-label="Nächste Leistung">→</button><a class="btn dark" href="/de/leistungen" style="margin-left: 8px">Alle Leistungen <span aria-hidden="true">→</span></a></div>
</div>
<div class="rv" style="display: flex; flex-direction: column; gap: 24px">
<div class="slider" ref=${s.trackRef} onScroll=${s.onScroll} onPointerDown=${s.down} onPointerMove=${s.move} onPointerUp=${s.up} onPointerLeave=${s.up} tabindex="0" role="region" aria-label="Leistungen, horizontal scrollen">
<a class="card slide" href="/de/leistungen" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Livestreams</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam-Regie, Replay, eigene Grafiken und der Stream zu YouTube oder auf Ihre eigene Website.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/de/leistungen" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Podcasts</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Aufnahme mit mehreren Kameras, im Studio oder vor Ort, fertig für YouTube und Spotify.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/de/leistungen" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Großproduktionen</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Multicam für Kongresse und Events: Regie, Aufnahme und Stream, mit einem festen Ansprechpartner.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
<a class="card slide" href="/de/leistungen" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; color: #161616"><span class="h-black" style="font-size: 18px; color: #D93A33">04</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Aftercare</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Nach jedem Wettkampftag holt unsere KI die Highlights aus den Aufnahmen. Wir geben alles frei, bevor es online geht.</p><span class="arrow" aria-hidden="true" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 20px">→</span></a>
</div>
<div style="display: flex; align-items: center; gap: 20px"><span style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.08em; font-variant-numeric: tabular-nums">${s.counter}</span><div class="sbar" style="flex: 1"><span style="transform: scaleX(${s.prog})"></span></div></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 520px; position: relative">
<img src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="Das Produktionsteam von BERK auf dem Steg bei Lakeside Paradise" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #000000; box-shadow: 12px 12px 0 #FF5F57" />
</div>
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Im Fokus · Europameisterschaft · 1.–3. Oktober 2026</span>
<div style="display: flex; flex-direction: column; gap: 10px"><h2 class="h-black" style="font-size: clamp(36px, 4.2vw, 64px); line-height: 0.95; color: #FFFFFF">EM Cable Wakeboard 2026</h2><span style="font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 17px; color: #FF5F57">IWWF Europe & Africa Open Cable Wake Championships</span></div>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">Drei Tage live auf dem YouTube-Kanal der IWWF aus Lakeside Paradise, Knokke-Heist. Mit Replay, eigenen Overlays, Live-Scores und einem Kommentatorenstudio.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 20px 16px; border-top: 1px solid #333333; padding-top: 20px">
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">30.000+</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">Aufrufe</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FFFFFF">395</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">Zuschauer gleichzeitig zur Spitze</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">5.300</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">Stunden Wiedergabezeit</span></div>
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: clamp(28px, 2.6vw, 40px); color: #FF5F57">22</span><span style="font-size: 14px; line-height: 1.35; color: #A8A8A8">Stunden live</span></div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 14px"><a class="btn ghost" href="/de/projekte">Case ansehen <span aria-hidden="true">→</span></a><a class="btn ghost" href="/de/warum-live#bewijs">Alle Zahlen</a></div>
</div>
</div>
</section>

<section style="background: #000000; padding: clamp(80px, 9vw, 140px) 0; border-top: 1px solid #2A2A2A">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 24px"><div style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Warum live</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 900px">Ein Nischensport, ein internationales Publikum</h2></div><a class="btn" href="/de/warum-live">Warum live funktioniert <span aria-hidden="true">→</span></a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">65%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">neue Zuschauer an Tag 1 der EM</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">83%</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">der Wiedergabezeit kam von Nicht-Abonnenten</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">1/3</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">der Wiedergabezeit auf dem Fernseher im Wohnzimmer</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 3px solid #FF5F57; padding-top: 18px"><span class="h-black" style="font-size: clamp(44px, 4.4vw, 68px); line-height: 1; color: #FFFFFF">25–44</span><span style="font-size: 16px; line-height: 1.5; color: #BDBDBD">Jahre: das Alter von 58 bis 68% der Zuschauer</span></div>
</div>
<span style="font-size: 14px; color: #8C8C8C">EM Cable Wakeboard 2026 · YouTube Analytics</span>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">So arbeiten wir</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">In vier Schritten zum Livestream</h2></div>
<ol style="margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">01</span><h3 class="h-black" style="font-size: 24px">Erstgespräch</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Event, Ort und wohin das Bild gehen soll.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">02</span><h3 class="h-black" style="font-size: 24px">Angebot</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Kameras, Crew und Planung, mit einem individuellen Preis. Immer unverbindlich.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #161616; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 2px #161616">03</span><h3 class="h-black" style="font-size: 24px">Testtag</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Die ganze Kette läuft vorab: Internet, Regie und Stream.</p></li>
<li class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: 64px; line-height: 1; color: #D93A33">04</span><h3 class="h-black" style="font-size: 24px">Live</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Wir produzieren. Sie erhalten die Aufnahmen und die Aufzeichnung zum Nachschauen.</p></li>
</ol>
</div>
</section>


<section style="background: #161616; padding: clamp(96px, 10vw, 160px) 0">
<div class="wrap rv" style="display: flex; flex-direction: column; align-items: flex-start; gap: 32px">
<h2 class="h-black" style="font-size: clamp(56px, 9vw, 150px); line-height: 0.9; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Bereit, <span style="color: #FF5F57">live</span> zu gehen?</h2>
<p style="margin: 0; max-width: 560px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Erzählen Sie uns, was Sie produzieren möchten. Innerhalb von zwei Werktagen erhalten Sie ein unverbindliches, individuelles Angebot.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<a class="btn" href="/de/kontakt">Möglichkeiten entdecken <span aria-hidden="true">→</span></a>
<a class="btn ghost" href="mailto:wouter@berk.productions">wouter@berk.productions</a>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 64px 0 32px">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 72px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 56px; font-size: 16px; line-height: 1.9">
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Leistungen</span><a href="/de/leistungen">Livestreams</a><a href="/de/leistungen">Podcasts</a><a href="/de/leistungen">Aftercare</a><a href="/de/leistungen">Großproduktionen</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">BERK</span><a href="/de/warum-live">Warum live</a><a href="/de/projekte">Projekte</a><a href="/de/ueber-uns">Über uns</a><a href="/de/kontakt">Kontakt</a></div>
<div style="display: flex; flex-direction: column"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 8px">Kontakt</span><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 1px solid #2A2A2A; padding-top: 20px; font-size: 14px; color: #8C8C8C"><span>© 2026 BERK Productions, ein Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. [NUMMER]</span><span>Instagram · YouTube · LinkedIn</span></div>
</div>
</footer>

</div>`}var f=document.getElementById("app");f.textContent="";c(r(p,{}),f);
