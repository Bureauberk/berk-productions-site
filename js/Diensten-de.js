import{a as s,b as p,c,d}from"./chunk-O3OTVWYO.js";var m=d.bind(s),t=class extends p{render(){return h(this.renderVals()||{})}},r=class extends t{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(e.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let a=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=a,document.addEventListener("scroll",a,{capture:!0,passive:!0}),a()}navVals(){let a=this.state||{},e=!!a.menuOpen;return{hdrCls:a.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Men\xFC schlie\xDFen":"Men\xFC \xF6ffnen",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let a=document.querySelector(".site");a&&(this._ro=new IntersectionObserver(e=>{let l=0;e.forEach(o=>{if(!o.isIntersecting)return;let i=o.target;this._ro.unobserve(i),i.style.transitionDelay=l++*80+"ms",i.classList.add("rv-go"),requestAnimationFrame(()=>i.classList.remove("rv-wait")),setTimeout(()=>{i.classList.remove("rv-go"),i.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),a.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function h(n){return m`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${n.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/de" aria-label="BERK, zur Startseite"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Sprache wählen: Deutsch">DE <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Sprache"><a href="/diensten" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/services" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/leistungen" hreflang="de" lang="de" aria-current="true">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/de/kontakt" style="min-height: 46px; padding: 0 20px; font-size: 13px">Gespräch vereinbaren</a>
<button class="burger" type="button" onClick=${n.toggleMenu} aria-expanded=${n.menuExpanded} aria-controls="menu" aria-label=${n.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${n.menuCls} aria-hidden=${n.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hauptmenü"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/de" onClick=${n.closeMenu}><small>01</small>Start</a></li><li><a href="/de/leistungen" aria-current="page" onClick=${n.closeMenu}><small>02</small>Leistungen</a></li><li><a href="/de/warum-live" onClick=${n.closeMenu}><small>03</small>Warum live</a></li><li><a href="/de/projekte" onClick=${n.closeMenu}><small>04</small>Projekte</a></li><li><a href="/de/ueber-uns" onClick=${n.closeMenu}><small>05</small>Über uns</a></li><li><a href="/de/kontakt" onClick=${n.closeMenu}><small>06</small>Kontakt</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Sprache"><a href="/diensten" hreflang="nl" lang="nl">NL</a><a href="/en/services" hreflang="en" lang="en">EN</a><a href="/de/leistungen" hreflang="de" lang="de" aria-current="true">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Kontakt</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0 clamp(56px, 6vw, 88px)">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Leistungen</span>
<h1 class="h-black" style="font-size: clamp(52px, 8vw, 124px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1100px">Live, aufgezeichnet und <span style="color: #FF5F57">danach</span> weiter sichtbar</h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Vier Leistungen, ein Team. Alles mit individuellem Preis und einem unverbindlichen Angebot vorab.</p>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(80px, 9vw, 140px)">

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/8de8495379f82c55f0196e41bed0a4d1.webp" alt="Die Regie von BERK mit dem Bildmischer während eines Livestreams" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">01</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Livestreams</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Wir kümmern uns um Kameras, Regie, Replay, Grafiken und den Stream. Sie kümmern sich um das Event.</p>
<ul class="ticks"><li>Bemannte und unbemannte Kameras, live gemischt</li><li>Replay in Sekunden, eigene Overlays und Live-Scores</li><li>Stream zu YouTube, auf Ihre eigene Website oder mehrere Plattformen</li><li>Testtag vorab, und Starlink, wenn es kein Internet gibt</li><li>Drohnenaufnahmen optional: 1.400 € pro Tag</li></ul>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-left: 4px solid #FF5F57; padding-left: 14px">Die EM Cable Wakeboard liegt inzwischen bei über 30.000 Aufrufen aus ganz Europa. <a href="/de/warum-live" style="color: #D93A33; font-weight: 600">Warum live funktioniert →</a></p>
<span class="price">Basispaket ab 2.750 € pro Tag</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="Kommentatorenstudio von BERK mit zwei Moderatoren am Tisch" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">02</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Podcasts</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Ein Podcast, der auch auf YouTube gut aussieht. Im Studio oder bei Ihnen vor Ort.</p>
<ul class="ticks"><li>Aufnahme mit mehreren Kameras und guten Mikrofonen</li><li>Schnitt für YouTube und Spotify</li><li>Kurze Clips für Social Media aus jeder Folge</li></ul>
<span class="price">Preis: [PREIS PRO FOLGE]</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/4b4ba22a10248f001ac397a1b0e7930d.webp" alt="Kameramann von BERK hinter einer Kamera auf Stativ" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">03</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Großproduktionen</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Multicam für Kongresse und große Events. Regie, Aufnahme und Stream, mit einem festen Ansprechpartner.</p>
<ul class="ticks"><li>Mehrere Säle oder Bühnen gleichzeitig</li><li>Separate Aufnahmen jedes Feeds</li><li>Ein Produktionskonzept mit festen Vereinbarungen</li></ul>
<span class="price">Individueller Preis</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/de4ba877c3ada9391766ea4638d6bd3f.webp" alt="Zwei Editoren arbeiten abends an einem Schnitt" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">04</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Aftercare</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Nach jedem Wettkampftag holt unsere KI die Highlights aus den Aufnahmen. Wir prüfen alles, bevor es online geht.</p>
<ul class="ticks"><li>Highlights pro Tag</li><li>Clips pro Teilnehmer, zum Teilen mit Sponsoren</li><li>Vertikal für Instagram und TikTok</li><li>Alles aus den Aufnahmen der Produktion selbst</li></ul>
<span class="price">Individuell</span>
</div>
</article>

</div>
</section>

<section id="geen-aftermovies" style="background: #EFEFEF; color: #161616; padding: 0 0 clamp(80px, 9vw, 140px)">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; gap: clamp(28px, 4vw, 64px); align-items: flex-start; border-top: 2px solid #161616; padding-top: clamp(40px, 5vw, 72px)">
<div style="flex: 1 1 360px; display: flex; flex-direction: column; gap: 14px"><span class="eyebrow" style="color: #555555">Gut zu wissen</span><h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">Warum wir keine Aftermovies drehen</h2></div>
<div style="flex: 2 1 520px; display: flex; flex-direction: column; gap: 16px; font-size: 18px; line-height: 1.6; color: #3C3C3C">
<p style="margin: 0">Ein Aftermovie verlangt eine völlig andere Art zu filmen. Dafür bewegt sich ein Filmemacher den ganzen Tag frei mit eigener Kamera und eigenem Plan: Stimmung, Details, Publikum, die Menschen hinter den Kulissen. Diese Bilder entstehen nicht aus einer Regie heraus.</p>
<p style="margin: 0">Wir richten alle unsere Kameras auf den Wettkampf und die Übertragung. Aus diesen Aufnahmen machen wir Highlights und Clips pro Teilnehmer: schnell, ehrlich und direkt nutzbar für Ihre Kanäle und Ihre Sponsoren.</p>
<p style="margin: 0">Sie möchten zusätzlich ein Aftermovie? Dann empfehlen wir Ihnen gern einen darauf spezialisierten Filmemacher und stimmen uns am Tag selbst gemeinsam ab.</p>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 32px; border: 2px solid #EFEFEF; box-shadow: 10px 10px 0 #FF5F57; padding: clamp(28px, 4vw, 56px); margin-right: 10px; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 14px; max-width: 760px">
<h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 1; color: #FFFFFF">Individueller Preis, immer unverbindlich</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.6; color: #CFCFCF">Die genannten Beträge sind Richtpreise, zzgl. MwSt. Reisekosten und, falls nötig, Übernachtung und Verpflegung berechnen wir separat. Sie erhalten immer zuerst ein unverbindliches Angebot.</p>
</div>
<a class="btn" href="/de/kontakt">Angebot anfordern <span aria-hidden="true">→</span></a>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, ein Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. [NUMMER]</span></div>
</div>
</footer>

</div>`}var u=document.getElementById("app");u.textContent="";c(s(r,{}),u);
